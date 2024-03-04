import express from 'express';
import {
  addUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  login,
} from '../Controllers/usersController.js';
import upload from '../middleware/multer.js';
import { verifyAdmin, verifyUser, verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single("profile"), addUser); // Public registration endpoint
router.post('/login', login);

// Admin routes
router.post('/users', upload.single("profile"),addUser); // Only admins can add users
router.get('/users',getAllUser); // Only admins can get all users
router.get('/users/:id',getOneUser); // Only admins can get a specific user
router.put('/users/:id' ,updateUser); // Only admins can update a user
router.delete('/users/:id' ,verifyAdmin,deleteUser); // Only admins can delete a user

// User routes
router.get('/profile/:id', getOneUser); // Users can get their own profile
router.put('/profile', verifyUser,updateUser); // Users can update their own profile
router.delete('/profile',  verifyUser,deleteUser); // Users can delete their own profile

export default router;
