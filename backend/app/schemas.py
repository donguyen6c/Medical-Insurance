from pydantic import BaseModel, Field

class InputData(BaseModel):
    age: int = Field(..., gt=0)
    sex: str
    bmi: float = Field(..., gt=0)
    children: int = Field(..., ge=0)
    smoker: str
    region: str