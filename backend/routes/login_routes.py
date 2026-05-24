from fastapi import APIRouter,Request
from models.user_models import users_collection
import bcrypt
router = APIRouter()


@router.post("/login")
async def login(request: Request):

    data = await request.json()

    existing_user = await users_collection.find_one(
        {"email": data["email"]}
    )

    if existing_user is None:

        return {
            "success": False,
            "msg": "User not found"
        }

    password_match = bcrypt.checkpw(
        data["password"].encode("utf-8"),
        existing_user["password"].encode("utf-8")
    )

    if not password_match:

        return {
            "success": False,
            "msg": "Wrong password"
        }

    return {
        "success": True,
        "msg": "Login successful"
    }

@router.post("/signup")
async def signup(request: Request):

    data = await request.json()

    existing_user = await users_collection.find_one(
        {"email": data["email"]}
    )

    if existing_user is not None:

        return {
            "success": False,
            "msg": "User already exists"
        }

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password.decode("utf-8"),
        "role": data["role"]
    }

    await users_collection.insert_one(user)

    return {
        "success": True,
        "msg": "User created"
    }