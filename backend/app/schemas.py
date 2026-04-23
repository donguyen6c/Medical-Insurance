from pydantic import BaseModel, Field
from datetime import datetime

class InputData(BaseModel):
    age: int = Field(..., gt=0)
    sex: str
    bmi: float = Field(..., gt=0)
    children: int = Field(..., ge=0)
    smoker: str
    region: str

class PredictionHistoryResponse(BaseModel):
    id: int
    age: int
    sex: str
    bmi: float
    children: int
    smoker: str
    region: str
    prediction: float
    created_at: datetime

    model_config = {
        "from_attributes": True
    }