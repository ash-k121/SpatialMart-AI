from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from fastapi import Request
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def create_access_token(data:dict):
    payload=data.copy()

    expire=datetime.utcnow()+ timedelta(hours=1)
    payload.update({
        "exp":expire
    })
    token= jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)
    return token

def verify_token(token:str):
    try:
        payload=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    
async def get_current_user(request: Request):

    auth_header = request.headers.get(
        "Authorization"
    )

    if not auth_header:

        return None

    token = auth_header.split(" ")[1]

    payload = verify_token(token)

    return payload