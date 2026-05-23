from motor.motor_asyncio import AsyncIOMotorClient
import os

from dotenv import load_dotenv
load_dotenv()
MONGO_URI=os.getenv("MONGO_URI")
client = AsyncIOMotorClient(
    MONGO_URI
)
async def check_mongo():

    try:

        await client.admin.command("ping")

        print("MongoDB Connected Successfully")

    except Exception as e:

        print("MongoDB Connection Failed")
        print(e)
db = client["SpatialMartAI"]

users_collection = db["users"]