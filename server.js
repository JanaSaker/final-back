import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from "sequelize";
import courseRouter from './Routes/coursesRoute.js';
import cvRouter from './Routes/cvsRoute.js';
import jobRouter from './Routes/jobsRoute.js';
import keyLangRouter from './Routes/keyLangsRoute.js';
import userRouter from './Routes/usersRoute.js';
import insightRouter from './Routes/insightsRoute.js';
import path from 'path'; // Import the path module
import { fileURLToPath } from 'url'; // Import the fileURLToPath function

dotenv.config();
const app = express();

const corOptions = {
 origin: 'http://localhost:3000'
};

// Middleware
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Middleware function
app.use((req, res, next) => {
 console.log(req.path, req.method);
 next();
});

// Testing API
app.get("/", (req, res) => {
 res.json({ message: 'hello from api' });
});

app.listen(process.env.PORT, () => {
 console.log("server listening on port", process.env.PORT);
});

// Routes
app.use('/api/', courseRouter);
app.use('/api/', cvRouter);
app.use('/api/', insightRouter);
app.use('/api/', jobRouter);
app.use('/api/', keyLangRouter);
app.use('/api/', userRouter);
