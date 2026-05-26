from fastapi import APIRouter,Request,Depends
from models.user_models import users_collection
import bcrypt
from fastapi import FastAPI, UploadFile, File,Request
from services.jwt_services import create_access_token,verify_token,get_current_user
import os,cv2

router = APIRouter()


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload")
async def upload_image(current_user = Depends(get_current_user),image: UploadFile = File(...)):
    if current_user is None:
        return {
            "success": False,
            "msg": "Unauthorized"
        }
    
    try:

        file_path = os.path.join(
            UPLOAD_FOLDER,
            image.filename
        )

        # Read uploaded bytes
        contents = await image.read()

        # Save file
        with open(file_path, "wb") as f:
            f.write(contents)

        # Read image
        img = cv2.imread(file_path)

        if img is None:
            return {
                "error": "OpenCV could not read image"
            }

        height, width, channels = img.shape

        gray = cv2.cvtColor(
            img,
            cv2.COLOR_BGR2GRAY
        )

        _, thresh = cv2.threshold(
            gray,
            180,
            255,
            cv2.THRESH_BINARY_INV
        )

        contours, _ = cv2.findContours(
            thresh,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        detected_objects = []

        for contour in contours:

            area = cv2.contourArea(contour)

            if area > 500:

                x, y, w, h = cv2.boundingRect(contour)

                detected_objects.append({
                    "x": int(x),
                    "y": int(y),
                    "width": int(w),
                    "height": int(h)
                })

        return {
            "objects_detected": detected_objects
        }

    except Exception as e:

        print(e)

        return {
            "error": str(e)
        }