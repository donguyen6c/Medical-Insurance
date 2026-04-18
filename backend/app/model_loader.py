import joblib
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent.parent / "notebooks" / "models" / "random_forest_regressor_pipeline.joblib"
# MODEL_PATH = "../../notebooks/models/random_forest_regressor_pipeline.joblib"


def load_model():
    try:
        loaded = joblib.load(MODEL_PATH)

        if isinstance(loaded, dict):
            return loaded["pipeline"]

        return loaded

    except Exception as e:
        print("Lỗi load model:", e)
        return None
    
if __name__ == '__main__':
    load_model()