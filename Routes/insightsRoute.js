import express from 'express';
import { addInsight, getAllInsight, getOneInsight, updateInsight, deleteInsight } from '../Controllers/insightsController.js';
import { verifyToken, verifyUser } from '../middleware/auth.js';

const router = express.Router();

// Route to create a new insight
router.post('/insights',verifyUser, addInsight);

// Route to get all insights
router.get('/insights', getAllInsight);

// Route to get a single insight by ID
router.get('/insights/:id', getOneInsight);

// Route to update an insight
router.put('/insights/:id', verifyUser,updateInsight);

// Route to delete an insight
router.delete('/insights/:id',verifyUser, deleteInsight);

export default router;
