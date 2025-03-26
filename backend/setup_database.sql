-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

-- Create contact_responses table
CREATE TABLE IF NOT EXISTS contact_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES contact_submissions(id),
    response_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sent_successfully BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_read ON contact_submissions(read);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Temporarily disable RLS for testing
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_responses DISABLE ROW LEVEL SECURITY;

-- Create spam detection function
CREATE OR REPLACE FUNCTION check_spam()
RETURNS TRIGGER AS $$
DECLARE
  spam_score INTEGER := 0;
BEGIN
  -- Basic checks (expand as needed)
  IF NEW.message ~* 'buy viagra|casino|lottery|win money' THEN
    spam_score := spam_score + 50;
  END IF;
  
  IF NEW.message ~* 'http|www\.' AND (LENGTH(NEW.message) - LENGTH(REPLACE(NEW.message, 'http', ''))) / 4 > 3 THEN
    spam_score := spam_score + 30;
  END IF;
  
  NEW.spam_score := LEAST(spam_score, 100);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for spam detection
DROP TRIGGER IF EXISTS check_spam_before_insert ON contact_submissions;
CREATE TRIGGER check_spam_before_insert
BEFORE INSERT ON contact_submissions
FOR EACH ROW
EXECUTE PROCEDURE check_spam(); 