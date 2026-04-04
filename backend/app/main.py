from fastapi import FastAPI
from app.routers.predict import router as predict_router

app = FastAPI(title="Medical Insurance API", version="1.0.0")

app.include_router(predict_router, prefix="/api", tags=["Prediction"])

@app.get("/")
def root():
    return {"message": "API is running"}