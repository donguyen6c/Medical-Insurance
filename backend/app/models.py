from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy.sql import func

from .database import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)

    age = Column(Integer, nullable=False)
    sex = Column(String(20), nullable=False)
    bmi = Column(Float, nullable=False)
    children = Column(Integer, nullable=False)
    smoker = Column(String(20), nullable=False)
    region = Column(String(50), nullable=False)

    prediction = Column(Float, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)