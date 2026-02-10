from fastapi import APIRouter, HTTPException
from .db import supabase

router = APIRouter()

@router.get("/status")
async def get_waitlist_status():
    from .db import supabase, db_error
    
    if supabase is None:
        # Return the specific configuration error so we can see it on the dashboard
        raise HTTPException(status_code=500, detail=f"Configuration Error: {db_error}")

    try:
        # Fetch exact count of rows in 'waitlist' table
        response = supabase.table("waitlist").select("*", count="exact", head=True).execute()
        return {
            "count": response.count,
            "status": "live"
        }
    except Exception as e:
        print(f"Error fetching count: {e}")
        # Return a fallback for demo purposes/error handling
        raise HTTPException(status_code=500, detail="Could not fetch waitlist count")
