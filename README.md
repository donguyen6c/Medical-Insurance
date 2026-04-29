# [Titanic Survival Prediction (Classification)] - [11]

## Mô tả
Bài toán: Dự đoán chi phí bảo hiểm y tế cá nhân (Regression).
Hiện trạng: Chi phí bảo hiểm phụ thuộc vào nhiều yếu tố như độ tuổi, giới tính, BMI, số con, tình trạng hút thuốc và vùng địa lý. Việc dự đoán sai có thể gây thua lỗ cho công ty bảo hiểm hoặc làm mất khách hàng.
Mục tiêu: Xây dựng mô hình hồi quy (charges) từ dữ liệu nhân khẩu học và hành vi. Áp dụng quy trình Machine Learning End-to-End từ EDA đến triển khai Web App.
Dataset: Medical Cost Personal Datasets từ Kaggle.

## Thành viên nhóm
| MSSV | Họ tên | Vai trò |
|------|--------|---------|
| 2251050032 | Nguyễn Ngọc Đô | Leader |
| 2351050203 | Phan Đình Vũ | Member |
| 2351050047 | Huỳnh Văn Hoàng | Member |
| 2351050016 | Nguyễn Văn Công | Member |

## Công nghệ
- ML: Python, sklearn, Jupyter
- Frontend: ReactJS
- Backend: FastAPI
- Tracking: wandb
## Cài đặt và chạy
### Yêu cầu
- Python 3.x, Node.js (nếu dùng React)
### Chạy Notebook
jupyter notebook notebooks/project_analysis.ipynb
### Chạy Backend
Trong MySQL: CREATE DATABASE ai_prediction_db;
Trong Project: cd backend && pip install -r requirements.txt && uvicorn main:app --reload
### Chạy Frontend
cd ./frontend/medical-dashboard && npm install && npm run dev
### Truy cập
- Frontend: http://localhost:5173/
- API: http://127.0.0.1:8000
## Demo
- wandb: [\[link\]](https://wandb.ai/ngocdo5852-dai-hoc-mo/Medical-Insurance-Cost-Prediction/workspace?nw=nwuserngocdo5852)
- Screenshot/video: [\[link\]](https://drive.google.com/drive/folders/1YGvatTJX8CAGA9UtTHxG-MPGFOg2yKDa?usp=sharing)
## Nộp bài
- Báo cáo: report/report.pdf
- wandb link: wandb_link.txt
