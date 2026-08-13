# Sprint 11: Fullstack System Integration (MERN Stack)

## Project Overview
This repository contains the Sprint 11 submission for Prodesk IT Internship (Track B: Fullstack Developers). The project demonstrates fullstack system integration using the MERN stack (MongoDB, Express, React, Node.js), featuring complete CRUD operations, dynamic state handling, multipart form uploads, and asset streaming to Cloudinary CDN.


## 🚀 Key Features & Phased Deliverables

### Phase 1: Base Architecture (P0)
- **API Hydration:** Deprecated static mock data and connected React client to local Node.js REST API endpoints (`http://localhost:5000/api/items`).
- **Data Fetching:** Executed asynchronous `useEffect` hooks for dynamic client hydration from MongoDB.
- **CORS Resolution:** Configured `cors` middleware in Express to allow cross-origin requests from the client application.

### Phase 2: State & Integration (P1)
- **Data Injection:** Integrated interactive form UI sending `POST` requests to write document payloads directly into MongoDB.
- **Data Deletion:** Implemented `DELETE` action handlers that trigger server-side deletion and instantly mutate local React state.
- **State Management:** Integrated dynamic visual loading indicators during API requests and clean error boundary alerts for connection failures.

### Phase 3: Advanced Optimization (P2)
- **Multipart Architecture:** Engineered file upload capabilities utilizing `FormData` and `multer` memory storage buffers.
- **Asset Uploads & CDN Streaming:** Streamed file buffers to Cloudinary CDN and stored secured image URLs inside MongoDB documents.


## 🛠️ Tech Stack
- **Frontend:** React.js, Axios, CSS3 (Modern Dashboard UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Middleware & Services:** Multer, Cloudinary CDN, CORS, Dotenv