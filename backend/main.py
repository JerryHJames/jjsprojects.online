from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from supabase import create_client, Client
from datetime import datetime
import re
from config import SUPABASE_URL, SUPABASE_KEY

# Initialize FastAPI app
app = FastAPI(title="Contact Form API")

# Configure CORS
origins = [
    "http://localhost:8000",
    "http://localhost:3000",
    "https://jjsprojects.online",
    "https://www.jjsprojects.online"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase client with anon key for public operations
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Pydantic models
class ContactSubmission(BaseModel):
    name: str
    email: str
    subject: str
    message: str

    @validator('email')
    def validate_email(cls, v):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", v):
            raise ValueError('Invalid email format')
        return v

@app.post("/api/contact")
async def submit_contact(submission: ContactSubmission, request: Request):
    try:
        # Prepare submission data
        submission_data = {
            "name": submission.name,
            "email": submission.email,
            "subject": submission.subject,
            "message": submission.message,
            "created_at": datetime.utcnow().isoformat()
        }

        # Insert into Supabase
        result = supabase.table("contact_submissions").insert(submission_data).execute()
        
        return {"message": "Message submitted successfully", "id": result.data[0]["id"]}

    except Exception as e:
        print(f"Error: {str(e)}")  # Add this line for debugging
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 