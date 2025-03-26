from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from datetime import datetime
from config import SUPABASE_URL, SUPABASE_SERVICE_KEY, DB_SCHEMA
from supabase.lib.client_options import ClientOptions
from fastapi.responses import JSONResponse
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Contact Form API")

# Configure CORS - More restrictive for production
allowed_origins = [
    "https://jjsprojects.online",  # Production domain
    "https://www.jjsprojects.online",  # Production www subdomain
    "https://jjsprojects-online.vercel.app",  # Vercel deployment URL
]

# Add localhost for development if not in production
if os.environ.get("VERCEL_ENV") != "production":
    allowed_origins.extend([
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:5000",
        "http://127.0.0.1:5000"
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],  # Added OPTIONS for preflight requests
    allow_headers=["*"],
    expose_headers=["*"]  # Added to expose headers if needed
)

# Initialize Supabase client with service key for admin operations
try:
    options = ClientOptions(
        schema=DB_SCHEMA,
        headers={"apiKey": SUPABASE_SERVICE_KEY}
    )
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY, options=options)
    logger.info(f"Successfully connected to Supabase using schema: {DB_SCHEMA}")
except Exception as e:
    logger.error(f"Error connecting to Supabase: {e}")
    raise

# Pydantic models
class ContactSubmission(BaseModel):
    name: str
    email: str
    subject: str
    message: str

@app.post("/api/contact")
async def submit_contact(submission: ContactSubmission, request: Request):
    try:
        logger.info(f"Received submission from: {submission.email}")
        
        # Get client info
        client_host = request.client.host if request.client else None
        user_agent = request.headers.get("user-agent")

        # Prepare submission data
        submission_data = {
            "name": submission.name,
            "email": submission.email,
            "subject": submission.subject,
            "message": submission.message,
            "created_at": datetime.utcnow().isoformat(),
            "read": False,
            "replied": False,
            "spam_score": 0,
            "ip_address": client_host,
            "user_agent": user_agent
        }

        logger.info("Attempting to insert contact submission into database")

        # Insert into Supabase with explicit schema
        result = supabase.table("contact_submissions").insert(submission_data).execute()
        logger.info(f"Successfully inserted submission with ID: {result.data[0]['id']}")
        
        return JSONResponse(
            content={"message": "Message submitted successfully", "id": result.data[0]["id"]},
            status_code=200
        )

    except Exception as e:
        error_msg = f"Error submitting contact form: {str(e)}"
        logger.error(error_msg)
        return JSONResponse(
            content={"detail": error_msg},
            status_code=500
        )

# Health check endpoint for Vercel
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "schema": DB_SCHEMA}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 