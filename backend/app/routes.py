from fastapi import APIRouter, File, UploadFile, Form
import mysql.connector
import shutil
import os

router = APIRouter()

# MySQL connection
db = mysql.connector.connect(
    host=os.getenv("DB_HOST", "mysql"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "MySecureP@ss1"),
    database=os.getenv("DB_NAME", "social_app")
)

@router.post("/upload_photo/")
async def upload_photo(file: UploadFile = File(...), text: str = Form(...), user: str = Form(...)):
    file_location = f"files/photos/{file.filename}"
    with open(file_location, "wb+") as f:
        shutil.copyfileobj(file.file, f)

    cursor = db.cursor()
    cursor.execute("INSERT INTO photos (user, text, file_location) VALUES (%s, %s, %s)", (user, text, file_location))
    db.commit()

    return {"message": "Photo uploaded successfully"}
