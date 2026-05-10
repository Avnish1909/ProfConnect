import express from 'express';

import {
    loginProfessor,
    appointmentsProfessor,
    appointmentCancel,
    professorList,
    changeAvailability,
    appointmentComplete,
    professorDashboard,
    professorProfile,
    updateProfessorProfile,
    createPost
} from '../controllers/professorController.js';

import authProfessor from '../middleware/authProfessor.js';

import upload from '../middleware/multer.js';

const professorRouter = express.Router();


// Professor Login Route
professorRouter.post(
    "/login",
    loginProfessor
);


// Cancel Appointment Route
professorRouter.post(
    "/cancel-appointment",
    authProfessor,
    appointmentCancel
);


// Get Appointments Route
professorRouter.get(
    "/appointments",
    authProfessor,
    appointmentsProfessor
);


// Get All Professors Route
professorRouter.get(
    "/list",
    professorList
);


// Change Availability Route
professorRouter.post(
    "/change-availability",
    authProfessor,
    changeAvailability
);


// Complete Appointment Route
professorRouter.post(
    "/complete-appointment",
    authProfessor,
    appointmentComplete
);


// Dashboard Route
professorRouter.get(
    "/dashboard",
    authProfessor,
    professorDashboard
);


// Profile Route
professorRouter.get(
    "/profile",
    authProfessor,
    professorProfile
);


// Update Profile Route
professorRouter.post(
    "/update-profile",
    authProfessor,
    updateProfessorProfile
);


// Create Post Route
professorRouter.post(
    '/create-post',
    upload.single('image'),
    authProfessor,
    createPost
)

export default professorRouter;