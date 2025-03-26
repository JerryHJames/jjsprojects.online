-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_submissions;

-- Enable RLS on the table
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts
CREATE POLICY "Enable insert for anon"
ON contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy for authenticated users to select
CREATE POLICY "Enable select for authenticated users"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);

-- Grant necessary permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated; 