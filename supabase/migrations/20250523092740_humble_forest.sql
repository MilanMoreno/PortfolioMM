/*
  # Create contact_requests table with public insert access

  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `subject` (text)
      - `processed` (boolean, default false)
      - `email_sent` (boolean, default false)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `contact_requests` table
    - Add policy for public inserts
    - Add policy for authenticated users to read all data
*/

-- Create the contact_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  subject text,
  processed boolean DEFAULT false,
  email_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (no authentication required)
CREATE POLICY "Allow public inserts to contact_requests"
  ON contact_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow service role to read all data
CREATE POLICY "Allow service role to read all contact_requests"
  ON contact_requests
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy to allow service role to update all data
CREATE POLICY "Allow service role to update contact_requests"
  ON contact_requests
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);