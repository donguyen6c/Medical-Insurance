from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import InputData
from .model_loader import load_model
from .services import predict_charges

app = FastAPI(title="AI Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
model = load_model()


@app.get("/")
def home():
    return {
        "status": "running",
        "model_loaded": model is not None
    }


@app.post("/predict")
def predict(data: InputData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model chưa load")

    try:
        result = predict_charges(model, data)

        return {
            "success": True,
            "prediction": result
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))