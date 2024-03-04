import { createCourse, getCourses, updateCourse, deleteCourse } from '../Controllers/coursesController.js';
import { Router } from 'express';
import {authorizeAccess}  from '../middleware/userAuth.js'; // Adjust the import path as necessary
import { createCourseModel } from '../Models/coursesModel.js';
import { verifyToken, verifyUser } from '../middleware/auth.js';

const Course =createCourseModel
const router = Router();


// Route to create a new course
router.post('/courses', verifyUser,createCourse);

// Route to get all courses
router.get('/courses', getCourses);

// Route to update a course
// Apply authorizeAccess middleware to ensure only the course owner can update it
router.put('/courses/:id', verifyUser, updateCourse);

// Route to delete a course
// Apply authorizeAccess middleware to ensure only the course owner can delete it
router.delete('/courses/:id', verifyUser, deleteCourse);

export default router;