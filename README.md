# ReproCare

A comprehensive reproductive health platform built with React and Node.js. The application provides reproductive health tracking, education, consultation, and product shopping features.

## Project Structure

```
├── backend/           # Node.js server
│   ├── config/       # Server configuration
│   ├── middleware/   # Express middleware
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Server entry point
│
└── Client/           # React frontend
    ├── public/       # Static assets
    └── src/
        ├── components/   # Reusable components
        ├── context/     # React context providers
        ├── pages/       # Application pages
        └── config/      # Frontend configuration
```

## Features

- User authentication
- Reproductive health tracking
- Health education resources
- Doctor consultation
- Product shopping
- Profile management
- Mood tracking

## Technology Stack

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (file uploads)

### Frontend
- React
- React Router
- TailwindCSS
- Context API
- React-Toastify

## Setup

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file with required environment variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5002
```

4. Start the server:
```bash
npm start
```

### Frontend

1. Navigate to client directory:
```bash
cd Client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile
- `POST /api/users/upload-profile-image` - Upload profile image
- `GET /api/moods` - Get user moods
- `POST /api/moods` - Create mood entry
- `GET /api/moods/stats` - Get mood statistics
