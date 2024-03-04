import express from 'express';
import { createJobs, getJobs, updateJob, deleteJob } from '../Controllers/jobsController.js';
import { verifyToken, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new job
router.post('/jobs',verifyUser,createJobs);

// Route to get all jobs
router.get('/jobs', getJobs);

// Route to update a job
router.put('/jobs/:id', verifyUser,updateJob);

// Route to delete a job
router.delete('/jobs/:id', verifyUser,deleteJob);

export default router;
