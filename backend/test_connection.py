from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_SERVICE_KEY
from datetime import datetime

def test_supabase_connection():
    try:
        # Initialize Supabase client with service role key
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        
        # Try to query the contact_submissions table
        print("\nTesting SELECT query...")
        result = supabase.table("contact_submissions").select("count").execute()
        print("✅ SELECT query successful!")
        print(f"Response: {result}")
        
        # Try to insert a test row
        print("\nTesting INSERT query...")
        test_data = {
            "name": "Test Connection",
            "email": "test@example.com",
            "subject": "Connection Test",
            "message": "Testing database connection",
            "created_at": datetime.utcnow().isoformat(),
            "ip_address": "127.0.0.1",
            "user_agent": "Test Script"
        }
        
        insert_result = supabase.table("contact_submissions").insert(test_data).execute()
        print("✅ INSERT query successful!")
        print(f"Insert Response: {insert_result}")
        
        return True
        
    except Exception as e:
        print("❌ Failed to connect to Supabase")
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    test_supabase_connection() 