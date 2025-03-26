# Contact Form Backend

This is the backend service for the contact form on jjsprojects.online. It handles form submissions, stores them in Supabase, and provides admin endpoints for managing submissions.

## Setup Instructions

1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Unix or MacOS:
   source venv/bin/activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your actual credentials:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase anon/public key
   - `SENDGRID_API_KEY`: Your SendGrid API key for email notifications
   - `ADMIN_EMAIL`: Your email address for notifications
   - `JWT_SECRET`: A secure random string for JWT token generation

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL editor
   - Copy the contents of `setup_database.sql`
   - Run the SQL commands

## Running the Server

To start the development server:
```bash
uvicorn main:app --reload
```

The server will start at `http://localhost:8000`

## API Endpoints

### Public Endpoints

- `POST /api/contact`
  - Submit a new contact form message
  - Required fields: name, email, subject, message

### Admin Endpoints (Protected)

- `GET /api/admin/submissions`
  - Get all contact form submissions
  - Requires authentication

- `PATCH /api/admin/submissions/{submission_id}`
  - Mark a submission as read
  - Requires authentication

## Security Features

- Rate limiting (5 requests per IP per hour)
- Spam detection
- Row Level Security (RLS) in Supabase
- CORS protection
- Input validation
- Email notifications for new submissions

## Development

The project uses:
- FastAPI for the web framework
- Supabase for the database
- Pydantic for data validation
- SendGrid for email notifications

## Testing

To run tests:
```bash
pytest
```

## Deployment

The backend is designed to be deployed on any Python-compatible hosting service. Make sure to:
1. Set up all environment variables
2. Configure CORS settings for your domain
3. Set up proper authentication for admin endpoints
4. Configure SSL/TLS for secure communication 