from fastapi import APIRouter,Request
from models.user_models import users_collection
router = APIRouter()


@router.post("/login")
async def login(request:Request):
    data=await request.json();
    result = await users_collection.insert_one(data)
    return {"msg":"received"}
