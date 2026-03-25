import os
import requests
from fastapi import APIRouter
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

PKEY = os.getenv("PKEY")
APIKEY = os.getenv("APIKEY")
EXECUTOR_LOGS_URL = os.getenv("EXECUTOR_LOGS_URL")

@router.get("/fetch-data/")
def fetch_data(session_id: str):

    headers = {
        "pkey": PKEY,
        "apikey": APIKEY,
        "Accept": "application/json"
    }

    params = {
        "sessionId": session_id
    }

    try:
        response = requests.get(EXECUTOR_LOGS_URL, headers=headers, params=params)

        if response.status_code != 200:
            return {
                "error": f"Request failed with status {response.status_code}",
                "details": response.text
            }

        return response.json()

    except requests.exceptions.RequestException as e:
        return {"error": str(e)}