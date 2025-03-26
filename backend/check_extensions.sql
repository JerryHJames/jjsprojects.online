-- List all installed extensions
SELECT * FROM pg_extension;

-- List all schemas
SELECT schema_name 
FROM information_schema.schemata;

-- Enable commonly used extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- List current user and their permissions
SELECT current_user, session_user;
SELECT * FROM pg_roles WHERE rolname = current_user; 