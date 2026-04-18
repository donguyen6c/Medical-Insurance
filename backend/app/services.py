import pandas as pd

def predict_charges(model, data):
    df = pd.DataFrame([data.model_dump()])
    result = model.predict(df)[0]

    return round(float(result), 2)