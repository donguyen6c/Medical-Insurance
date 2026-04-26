import { useMemo, useState } from "react";
import "./App.css";
import History from "./History";

const API_URL = "http://127.0.0.1:8000/predict";

const initialForm = {
  age: "",
  sex: "male",
  bmi: "",
  children: "",
  smoker: "no",
  region: "southeast",
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const payload = useMemo(() => {
    return {
      age: Number(form.age || 0),
      sex: form.sex,
      bmi: Number(form.bmi || 0),
      children: Number(form.children || 0),
      smoker: form.smoker,
      region: form.region,
    };
  }, [form]);

  const riskLevel = useMemo(() => {
    let score = 0;
    if (Number(form.age) >= 50) score += 2;
    if (Number(form.bmi) >= 30) score += 2;
    if (form.smoker === "yes") score += 4;
    if (Number(form.children) >= 3) score += 1;

    if (score >= 6) return "High";
    if (score >= 3) return "Medium";
    return "Low";
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (form.age === "") newErrors.age = "Vui lòng nhập Age";
    else if (Number(form.age) <= 0) newErrors.age = "Tuổi không được bé hơn 1";

    if (form.bmi === "") newErrors.bmi = "Vui lòng nhập BMI";
    else if (Number(form.bmi) < 0) newErrors.bmi = "BMI không được âm";

    if (form.children === "") newErrors.children = "Vui lòng nhập Children";
    else if (Number(form.children) < 0)
      newErrors.children = "Con không được phép âm";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setError("Vui lòng nhập đủ dữ liệu trước khi predict");
      return;
    }

    setErrors({});
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Cannot connect to API");
    } finally {
      setLoading(false);
    }
  };

  if (screen === "history") {
    return <History onBack={() => setScreen("home")} />;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Medical Insurance Predictor</h1>
          <p>
            Nhập thông tin khách hàng để gửi dữ liệu lên FastAPI và nhận kết quả
            dự đoán chi phí bảo hiểm.
          </p>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setScreen("history")}
          >
            Xem lịch sử
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Customer Type</span>
            <strong>{form.smoker === "yes" ? "Smoker" : "Non-smoker"}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Risk Level</span>
            <strong>{riskLevel}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">Prediction</span>
            <strong>
              {result?.prediction !== undefined
                ? `$${Number(result.prediction).toLocaleString()}`
                : "Waiting"}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">API Status</span>
            <strong>{loading ? "Loading..." : result ? "Connected" : "Idle"}</strong>
          </div>
        </div>

        <div className="layout">
          <div className="panel">
            <h2 style={{ color: "black" }}>Customer Information</h2>

            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Nhập vào tuổi"
                />
                {errors.age && <div className="field-error">{errors.age}</div>}
              </div>

              <div className="form-group">
                <label>Sex</label>
                <select name="sex" value={form.sex} onChange={handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label>BMI</label>
                <input
                  type="number"
                  step="0.1"
                  name="bmi"
                  value={form.bmi}
                  onChange={handleChange}
                  placeholder="Nhập vào BMI"
                />
                {errors.bmi && <div className="field-error">{errors.bmi}</div>}
              </div>

              <div className="form-group">
                <label>Children</label>
                <input
                  type="number"
                  name="children"
                  value={form.children}
                  onChange={handleChange}
                  placeholder="Nhập số con"
                />
                {errors.children && (
                  <div className="field-error">{errors.children}</div>
                )}
              </div>

              <div className="form-group">
                <label>Smoker</label>
                <select name="smoker" value={form.smoker} onChange={handleChange}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Region</label>
                <select name="region" value={form.region} onChange={handleChange}>
                  <option value="southwest">Southwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="northeast">Northeast</option>
                </select>
              </div>

              <div className="button-row">
                <button type="submit" className="primary-btn" disabled={loading}>
                  {loading ? "Predicting..." : "Predict Charge"}
                </button>

                <button type="button" className="secondary-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="panel">
            <h2>Request Preview</h2>
            <pre className="code-block">{JSON.stringify(payload, null, 2)}</pre>

            <h2 style={{ marginTop: "24px", color: "black" }}>
              Prediction Result
            </h2>

            {error && <div className="error-box">{error}</div>}

            {result ? (
              <div className="result-box">
                <p className="result-title">Predicted insurance charge</p>
                <h3>
                  {result.prediction !== undefined
                    ? `$${Number(result.prediction).toLocaleString()}`
                    : "No prediction field"}
                </h3>
                <pre className="code-block">{JSON.stringify(result, null, 2)}</pre>
              </div>
            ) : (
              <div className="empty-box">
                Chưa có kết quả. Hãy nhập dữ liệu và bấm <b>Predict Charge</b>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}