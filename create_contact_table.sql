-- Create the contact_requests table for the portfolio contact form
-- Run this SQL in your Supabase SQL Editor

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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public inserts to contact_requests" ON contact_requests;
DROP POLICY IF EXISTS "Allow service role to read all contact_requests" ON contact_requests;
DROP POLICY IF EXISTS "Allow service role to update contact_requests" ON contact_requests;

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

-- Grant necessary permissions
GRANT INSERT ON contact_requests TO anon;
GRANT SELECT ON contact_requests TO service_role;
GRANT UPDATE ON contact_requests TO service_role;

-- Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'contact_requests'
ORDER BY ordinal_position;
