from fastapi import FastAPI
from Logs import ExecutorLogs, AiLogs
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173", 
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ExecutorLogs.router, prefix="/executor-logs", tags=["ExecutorLogs"])
app.include_router(AiLogs.router, prefix="/ai-logs", tags=["AiLogs"])