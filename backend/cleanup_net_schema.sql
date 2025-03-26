-- Drop any existing foreign key constraints
DO $$ 
DECLARE 
    constraint_rec RECORD;
BEGIN
    FOR constraint_rec IN (
        SELECT tc.constraint_name, tc.table_name
        FROM information_schema.table_constraints tc
        WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public'
    ) LOOP
        EXECUTE format('ALTER TABLE %I DROP CONSTRAINT %I', constraint_rec.table_name, constraint_rec.constraint_name);
    END LOOP;
END $$;

-- Drop any existing triggers
DO $$ 
DECLARE 
    trigger_rec RECORD;
BEGIN
    FOR trigger_rec IN (
        SELECT tgname, relname
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        WHERE c.relname = 'contact_submissions'
    ) LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON %I', trigger_rec.tgname, trigger_rec.relname);
    END LOOP;
END $$;

-- Drop any existing functions (only in public schema)
DO $$ 
DECLARE 
    func_rec RECORD;
BEGIN
    FOR func_rec IN (
        SELECT proname
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
    ) LOOP
        EXECUTE format('DROP FUNCTION IF EXISTS public.%I() CASCADE', func_rec.proname);
    END LOOP;
END $$;

-- Drop the net schema if it exists
DROP SCHEMA IF EXISTS net CASCADE;

-- Drop all tables
DROP TABLE IF EXISTS contact_responses CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;

-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    read BOOLEAN NOT NULL DEFAULT FALSE,
    replied BOOLEAN NOT NULL DEFAULT FALSE,
    spam_score SMALLINT DEFAULT 0,
    ip_address VARCHAR(45),
    user_agent TEXT
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