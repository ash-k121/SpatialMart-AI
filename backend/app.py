from fastapi import FastAPI, UploadFile, File,Request
from fastapi.middleware.cors import CORSMiddleware
from routes.login_routes import router as login_routes
import cv2
import numpy as np
import os

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Backend Running"}




app.include_router(login_routes)
    