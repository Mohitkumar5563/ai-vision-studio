AI Vision Studio
A web application for GPU-accelerated image classification, built to showcase skills for high-paying tech roles at NVIDIA and Google. The project features a React frontend with TypeScript and a FastAPI backend, with plans to integrate PyTorch and CUDA for deep learning.
Technologies

Frontend: React, TypeScript, Tailwind CSS, Vite
Backend: Python, FastAPI
Planned: PyTorch, CUDA, Google Cloud Platform, Vercel

Project Status

Current: Functional frontend for image uploads and backend with placeholder API.
Next Steps: Integrate ResNet-18 model with CUDA for real-time inference.

Setup (For Future Reference)
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000

