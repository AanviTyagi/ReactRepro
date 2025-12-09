const fs = require('fs');
const path = require('path');

const content = `MONGODB_URI=mongodb+srv://shreeraam1234:shreeraam1234@cluster0.klxwmmw.mongodb.net/reprocare?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=reprocare_jwt_secret_2024
PORT=5002`;

fs.writeFileSync(path.join(__dirname, '.env'), content.trim());
console.log('.env file created successfully');
