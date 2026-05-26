from fastapi import APIRouter,Request
from models.user_models import users_collection
import bcrypt
from services.jwt_services import create_access_token,verify_token,get_current_user
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
    
    token =create_access_token({
        "email":existing_user["email"],
    })

    return {
        "success":True,
        "token":token,
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


    token =create_access_token({
        "email":existing_user["email"],
    })

    return {
        "success":True,
        "token":token,
        "msg": "User created"
    }

@router.get("/me")
async def get_me(request:Request):
    auth_header= request.headers.get("Authorization")
    if not auth_header:

        return {
            "success": False,
            "msg": "No token"
        }

    token = auth_header.split(" ")[1]

    payload = verify_token(token)

    if payload is None:

        return {
            "success": False,
            "msg": "Invalid token"
        }

    return {
        "success": True,
        "user": payload
    }

    