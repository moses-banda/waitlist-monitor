import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = None
db_error = None

try:
    if not url or not key:
        raise ValueError("SUPABASE_URL or SUPABASE_KEY is missing from environment.")
    
    # Check if keys are accidentally wrapped in quotes which happens sometimes in copy-paste
    if url.startswith('"') or url.startswith("'"):
        url = url.strip('"').strip("'")
    if key.startswith('"') or key.startswith("'"):
        key = key.strip('"').strip("'")
        
    supabase = create_client(url, key)
except Exception as e:
    print(f"Database Connection Error: {e}")
    db_error = str(e)
