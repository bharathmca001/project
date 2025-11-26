import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search, Download, Filter } from 'lucide-react';
import { logger } from '../../services/logger';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchKeys?: (keyof T)[];
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  loading?: boolean;
  filters?: FilterOption[];
  onFilterChange?: (filters: Record<string, string>) => void;
}

type SortOrder = 'asc' | 'desc' | null;

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  title,
  searchKeys = [],
  onRowClick,
  actions,
  loading = false,
  filters = [],
  onFilterChange,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          return String(value).toLowerCase().includes(query);
        })
      );

      logger.debug('DataTable', `Filtered ${data.length} items to ${result.length}`, {
        searchTerm,
        searchKeys,
      });
    }

    if (sortKey && sortOrder) {
      result.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      logger.debug('DataTable', `Sorted by ${String(sortKey)}`, {
        sortOrder,
      });
    }

    return result;
  }, [data, searchTerm, sortKey, sortOrder, searchKeys]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key: keyof T) => {
    if (!columns.find((col) => col.key === key && col.sortable !== false)) return;

    if (sortKey === key) {
      setSortOrder(
        sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc'
      );
      if (sortOrder === 'desc') {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }

    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    logger.info('DataTable', `Search initiated`, { value });
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setActiveFilters(newFilters);
    setCurrentPage(1);
    onFilterChange?.(newFilters);
    logger.info('DataTable', 'Filters applied', newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});
    logger.info('DataTable', 'Filters cleared');
  };

  const handleExport = () => {
    const csv = [
      columns.map((col) => col.label).join(','),
      ...filteredData.map((row) =>
        columns
          .map((col) => {
            const value = row[col.key];
            return typeof value === 'string' && value.includes(',')
              ? `"${value}"`
              : value;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'export'}-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    logger.info('DataTable', `Exported ${filteredData.length} rows`);
  };

  const SortIcon = ({ columnKey }: { columnKey: keyof T }) => {
    if (sortKey !== columnKey) return null;
    return sortOrder === 'asc' ? (
      <ChevronUp size={16} className="inline ml-1 text-blue-600" />
    ) : (
      <ChevronDown size={16} className="inline ml-1 text-blue-600" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {filters.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors font-medium ${
                Object.keys(activeFilters).length > 0
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Filter size={16} />
              Filters
              {Object.keys(activeFilters).length > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {Object.keys(activeFilters).length}
                </span>
              )}
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 whitespace-nowrap">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="text-sm text-slate-600 whitespace-nowrap">
            {filteredData.length > 0 ? (
              <>
                Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                <span className="font-semibold">
                  {Math.min(startIndex + itemsPerPage, filteredData.length)}
                </span>{' '}
                of <span className="font-semibold">{filteredData.length}</span>
              </>
            ) : (
              'No data found'
            )}
          </div>
        </div>

        {showFilters && filters.length > 0 && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Filter Options</h3>
              {Object.keys(activeFilters).length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {filter.label}
                  </label>
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">All</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredData.length === 0 ? (
          <div className="text-center py-8">
            <Filter size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-slate-600">No data available</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    {columns.map((column) => (
                      <th
                        key={String(column.key)}
                        onClick={() =>
                          column.sortable !== false && handleSort(column.key)
                        }
                        className={`text-left py-4 px-4 text-sm font-semibold text-slate-600 ${
                          column.sortable !== false
                            ? 'cursor-pointer hover:bg-slate-50'
                            : ''
                        } ${column.className || ''}`}
                      >
                        <div className="flex items-center">
                          {column.label}
                          <SortIcon columnKey={column.key} />
                        </div>
                      </th>
                    ))}
                    {actions && (
                      <th className="text-center py-4 px-4 text-sm font-semibold text-slate-600">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-default"
                      onClick={() => onRowClick?.(row)}
                    >
                      {columns.map((column) => (
                        <td
                          key={String(column.key)}
                          className={`py-4 px-4 text-sm text-slate-700 ${
                            column.className || ''
                          }`}
                        >
                          {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key]}
                        </td>
                      ))}
                      {actions && (
                        <td className="py-4 px-4 text-center">
                          {actions(row)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
