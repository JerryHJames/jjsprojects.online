from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_SERVICE_KEY
from supabase.lib.client_options import ClientOptions

def test_supabase_connection():
    try:
        # Initialize with public schema
        options = ClientOptions(schema="public")
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY, options=options)
        
        # Test connection by trying to fetch tables
        result = supabase.table("contact_submissions").select("*").limit(1).execute()
        print("Successfully connected to Supabase")
        print("Table data:", result.data)
        
        return True
    except Exception as e:
        print(f"Error connecting to Supabase: {e}")
        return False

if __name__ == "__main__":
    test_supabase_connection() 