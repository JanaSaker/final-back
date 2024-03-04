import express from 'express';
import { createCVs, getCVs, updateCV, deleteCV } from '../Controllers/cvsController.js';
import upload from '../middleware/multer.js';
import { verifyToken, verifyUser } from '../middleware/auth.js';


const router = express.Router();

// Route to create a new CV
router.post('/cvs', verifyUser,upload.single("file"),
createCVs);

// Route to get all CVs
router.get('/cvs',getCVs);

// Route to update a CV
router.put('/cvs/:id',verifyUser, updateCV);

// Route to delete a CV
router.delete('/cvs/:id', verifyUser ,deleteCV);

export default router;
