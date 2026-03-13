# [Titanic Survival Prediction (Classification)] - [5]

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
cd backend && pip install -r requirements.txt && python app/main.py
### Chạy Frontend
cd frontend && npm install && npm start
### Truy cập
- Frontend: http://localhost:3000
- API: http://localhost:5000 (hoặc port tương ứng)
## Demo
- wandb: [link]
- Screenshot/video: [link hoặc mô tả]
## Nộp bài
- Báo cáo: report/report.pdf
- wandb link: wandb_link.txt