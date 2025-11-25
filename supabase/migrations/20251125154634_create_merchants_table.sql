/*
  # Create Merchants Table

  1. New Tables
    - `merchants`
      - `id` (uuid, primary key) - Unique identifier for merchant
      - `name` (text) - Owner's full name
      - `email` (text, unique) - Contact email
      - `phone` (text) - Contact phone number
      - `business_name` (text) - Business/store name
      - `category` (text) - Business category (Restaurant, Cafe, Grocery, etc.)
      - `status` (text) - Account status (active, inactive, pending, suspended)
      - `kyc_status` (text) - KYC verification status (pending, approved, rejected)
      - `revenue` (numeric) - Total revenue generated
      - `orders` (integer) - Total number of orders
      - `location` (text) - Business location/address
      - `rating` (numeric) - Average rating (0-5)
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `merchants` table
    - Add policies for authenticated admin users to manage merchants
*/

CREATE TABLE IF NOT EXISTS merchants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  business_name text NOT NULL,
  category text NOT NULL DEFAULT 'Restaurant',
  status text NOT NULL DEFAULT 'pending',
  kyc_status text NOT NULL DEFAULT 'pending',
  revenue numeric DEFAULT 0,
  orders integer DEFAULT 0,
  location text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view merchants"
  ON merchants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert merchants"
  ON merchants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update merchants"
  ON merchants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete merchants"
  ON merchants
  FOR DELETE
  TO authenticated
  USING (true);