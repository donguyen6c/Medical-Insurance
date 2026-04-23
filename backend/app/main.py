from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .schemas import InputData, PredictionHistoryResponse
from .model_loader import load_model
from .services import predict_charges
from .models import PredictionHistory
from .database import Base, engine, get_db
from typing import List


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
Base.metadata.create_all(bind=engine)
model = load_model()


@app.get("/")
def home():
    return {
        "status": "running",
        "model_loaded": model is not None
    }


@app.post("/predict")
def predict(data: InputData, db: Session = Depends(get_db)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model chưa load")

    try:
        result = predict_charges(model, data)

        history = PredictionHistory(
            age=data.age,
            sex=data.sex,
            bmi=data.bmi,
            children=data.children,
            smoker=data.smoker,
            region=data.region,
            prediction=result,
        )

        db.add(history)
        db.commit()
        db.refresh(history)

        return {
            "success": True,
            "prediction": result
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
 


@app.get("/predictions", response_model=List[PredictionHistoryResponse])
def get_predictions(db: Session = Depends(get_db)):
    histories = db.query(PredictionHistory)\
        .order_by(PredictionHistory.id.desc())\
        .all()

    return histories