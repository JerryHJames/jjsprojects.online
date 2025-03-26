-- First, disable RLS
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;

-- Then enable it again with a public policy
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Enable authenticated read" ON contact_submissions;

-- Create a policy that allows anyone to insert
CREATE POLICY "Enable public insert"
ON contact_submissions
FOR INSERT
TO PUBLIC
WITH CHECK (true);

-- Create a policy that allows authenticated users to read
CREATE POLICY "Enable authenticated read"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true); 