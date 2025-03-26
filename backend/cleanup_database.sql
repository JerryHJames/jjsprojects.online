-- Drop any existing triggers
DROP TRIGGER IF EXISTS on_new_submission ON contact_submissions;
DROP TRIGGER IF EXISTS check_spam_before_insert ON contact_submissions;

-- Drop any existing functions
DROP FUNCTION IF EXISTS notify_new_submission();
DROP FUNCTION IF EXISTS check_spam();

-- Recreate the spam check function without email notification
CREATE OR REPLACE FUNCTION check_spam()
RETURNS TRIGGER AS $$
DECLARE
  spam_score INTEGER := 0;
BEGIN
  -- Basic checks
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

-- Recreate the spam check trigger
CREATE TRIGGER check_spam_before_insert
BEFORE INSERT ON contact_submissions
FOR EACH ROW
EXECUTE FUNCTION check_spam();

-- Ensure RLS is properly configured
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Enable insert for anon" ON contact_submissions;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON contact_submissions;

-- Create policies
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