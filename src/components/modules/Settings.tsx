import { Settings as SettingsIcon, Bell, Shield, CreditCard, Globe, Mail, User, Save } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your platform settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">General Settings</h2>
                <p className="text-sm text-slate-600">Manage your platform's general configuration</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="NearU Admin"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@nearu.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Default Language</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Default Currency</label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Notification Settings</h2>
                <p className="text-sm text-slate-600">Configure how you want to receive notifications</p>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive email updates about important events' },
                  { label: 'Push Notifications', desc: 'Get push notifications on your device' },
                  { label: 'Order Updates', desc: 'Notify me when orders are placed or updated' },
                  { label: 'Merchant Applications', desc: 'Alert when new merchants apply' },
                  { label: 'KYC Submissions', desc: 'Notify about new KYC verification requests' },
                  { label: 'System Alerts', desc: 'Important system updates and maintenance' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-blue-200 transition-all">
                    <div>
                      <p className="font-semibold text-slate-900">{item.label}</p>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={index < 4} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Security Settings</h2>
                <p className="text-sm text-slate-600">Manage your account security and privacy</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield size={16} className="text-white" />
                    </div>
                    <p className="font-semibold text-green-900">Your account is secure</p>
                  </div>
                  <p className="text-sm text-green-700">Two-factor authentication is enabled</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left">
                    <p className="font-semibold text-slate-900">Change Password</p>
                    <p className="text-sm text-slate-600">Update your account password</p>
                  </button>

                  <button className="w-full px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left">
                    <p className="font-semibold text-slate-900">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-600">Manage 2FA settings</p>
                  </button>

                  <button className="w-full px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left">
                    <p className="font-semibold text-slate-900">Active Sessions</p>
                    <p className="text-sm text-slate-600">View and manage active sessions</p>
                  </button>

                  <button className="w-full px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-left">
                    <p className="font-semibold text-slate-900">Login History</p>
                    <p className="text-sm text-slate-600">Review recent login activity</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Billing & Payments</h2>
                <p className="text-sm text-slate-600">Manage billing information and payment methods</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-blue-100 mb-1">Current Plan</p>
                    <p className="text-3xl font-bold">Enterprise</p>
                  </div>
                  <CreditCard size={48} className="text-blue-200" />
                </div>
                <p className="text-blue-100">$299/month • Unlimited merchants & orders</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-slate-600">Expires 12/2025</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">Primary</span>
                  </div>
                </div>

                <button className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-slate-600 font-medium">
                  + Add Payment Method
                </button>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Integrations</h2>
                <p className="text-sm text-slate-600">Connect third-party services and APIs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Stripe', desc: 'Payment processing', connected: true, icon: CreditCard },
                  { name: 'SendGrid', desc: 'Email notifications', connected: true, icon: Mail },
                  { name: 'Twilio', desc: 'SMS notifications', connected: false, icon: Bell },
                  { name: 'Google Maps', desc: 'Location services', connected: true, icon: Globe },
                  { name: 'Firebase', desc: 'Push notifications', connected: false, icon: Bell },
                  { name: 'AWS S3', desc: 'File storage', connected: true, icon: SettingsIcon }
                ].map((integration, index) => {
                  const Icon = integration.icon;
                  return (
                    <div key={index} className="p-4 border border-slate-200 rounded-xl hover:border-blue-200 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Icon size={20} className="text-slate-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{integration.name}</p>
                            <p className="text-sm text-slate-600">{integration.desc}</p>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full px-4 py-2 rounded-xl font-medium transition-all ${
                          integration.connected
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {integration.connected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 mt-6">
            <button className="px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-medium">
              Cancel
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
