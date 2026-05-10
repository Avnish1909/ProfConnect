import express from 'express';

import {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addProfessor,
    allProfessors,
    adminDashboard,
    specialityStats
} from '../controllers/adminController.js';

import {
    changeAvailability
} from '../controllers/professorController.js';

import authAdmin from '../middleware/authAdmin.js';

import upload from '../middleware/multer.js';

const adminRouter = express.Router();


// Admin Login Route
adminRouter.post(
    "/login",
    loginAdmin
);


// Add Professor Route
adminRouter.post(
  "/add-professor",
  upload.single('image'),
  authAdmin,
  addProfessor
)


// Get All Appointments Route
adminRouter.get(
    "/appointments",
    authAdmin,
    appointmentsAdmin
);


// Cancel Appointment Route
adminRouter.post(
    "/cancel-appointment",
    authAdmin,
    appointmentCancel
);


// Get All Professors Route
adminRouter.get(
    "/all-professors",
    authAdmin,
    allProfessors
);


// Change Professor Availability Route
adminRouter.post(
    "/change-availability",
    authAdmin,
    changeAvailability
);


// Admin Dashboard Route
adminRouter.get(
    "/dashboard",
    authAdmin,
    adminDashboard
);


// Department Statistics Route
adminRouter.get(
    "/speciality-stats",
    authAdmin,
    specialityStats
);

export default adminRouter;