# Image Gallery App (Dockerized)

A simple Image Gallery Application built with Node.js (backend) and Nginx (frontend), fully containerized using Docker and Docker Compose.  
You can add, upload, and delete images. Images and metadata are stored persistently using Docker volumes.

## Features
- Upload images from local device  
- Add images via URL  
- Delete images from the gallery  
- Persistent storage for uploaded images (survives container restarts)  
- Containerized frontend (Nginx) and backend (Node.js/Express)  
- Easy to deploy with Docker Hub or GitHub  

## Project Structure
image-gallery-app/
  backend/         
    Dockerfile
    server.js
    package.json
    images.json
    uploads/     

  frontend/        
    Dockerfile
    index.html

  docker-compose.yml
  README.md

## Prerequisites
- Install Docker  
- Install Docker Compose  

## Run Locally
git clone https://github.com/<your-username>/image-gallery-app.git
cd image-gallery-app
docker-compose up --build

Open in browser:
Frontend: http://localhost:8080  
Backend API: http://localhost:5000/api/images  

## Persistent Storage
Uploaded images and metadata (images.json) are stored in Docker volumes:
- gallery_data stores images.json  
- gallery_uploads stores uploaded image files  

## Push Images to Docker Hub
docker build -t <your-dockerhub-username>/image-gallery-backend ./backend
docker push <your-dockerhub-username>/image-gallery-backend

docker build -t <your-dockerhub-username>/image-gallery-frontend ./frontend
docker push <your-dockerhub-username>/image-gallery-frontend

## License
MIT License. Feel free to use and modify.
