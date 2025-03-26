-- Drop existing objects
DROP TABLE IF EXISTS contact_responses;
DROP TABLE IF EXISTS contact_submissions;
DROP FUNCTION IF EXISTS check_spam();

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    read BOOLEAN NOT NULL DEFAULT FALSE,
    replied BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Enable insert for anon" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_submissions;

CREATE POLICY "Enable insert for anon"
ON contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users"
ON contact_submissions
FOR SELECT
TO authenticated
USING (true);

-- Grant permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT SELECT ON contact_submissions TO authenticated; 