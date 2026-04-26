import { useEffect, useState } from "react";

const HISTORY_URL = "http://127.0.0.1:8000/predictions";

export default function History({ onBack }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(HISTORY_URL);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Cannot load history");
      }

      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError(err.message || "Cannot connect to API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="hero">
          <h1>Prediction History</h1>
          <p>Xem lại các lần dự đoán chi phí bảo hiểm đã lưu trong hệ thống.</p>

          <button type="button" className="secondary-btn" onClick={onBack}>
            Quay lại màn hình chính
          </button>
        </div>

        <div className="panel">
          <h2 style={{ color: "black" }}>History List</h2>

          {error && <div className="error-box">{error}</div>}

          {loading ? (
            <div className="empty-box">Đang tải lịch sử...</div>
          ) : history.length > 0 ? (
            <div className="history-list">
              {history.map((item) => (
                <div className="history-card" key={item.id}>
                  <div className="history-header">
                    <strong>#{item.id}</strong>
                    <span>{new Date(item.created_at).toLocaleString()}</span>
                  </div>

                  <div className="history-grid">
                    <p><b>Age:</b> {item.age}</p>
                    <p><b>Sex:</b> {item.sex}</p>
                    <p><b>BMI:</b> {item.bmi}</p>
                    <p><b>Children:</b> {item.children}</p>
                    <p><b>Smoker:</b> {item.smoker}</p>
                    <p><b>Region:</b> {item.region}</p>
                  </div>

                  <div className="history-result">
                    Prediction: ${Number(item.prediction).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-box">Chưa có lịch sử dự đoán.</div>
          )}
        </div>
      </div>
    </div>
  );
}