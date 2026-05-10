import express from 'express';

import {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    paymentStripe,
    verifyStripe,
    getAllPosts
} from '../controllers/userController.js';

import upload from '../middleware/multer.js';

import authUser from '../middleware/authUser.js';

const userRouter = express.Router();


// Register User Route
userRouter.post(
    "/register",
    registerUser
);


// Login User Route
userRouter.post(
    "/login",
    loginUser
);


// Get User Profile Route
userRouter.get(
    "/get-profile",
    authUser,
    getProfile
);


// Update User Profile Route
userRouter.post(
    "/update-profile",
    authUser,
    upload.single('image'),
    updateProfile
);


// Book Appointment Route
userRouter.post(
    "/book-appointment",
    authUser,
    bookAppointment
);


// Get User Appointments Route
userRouter.get(
    "/appointments",
    authUser,
    listAppointment
);


// Cancel Appointment Route
userRouter.post(
    "/cancel-appointment",
    authUser,
    cancelAppointment
);


// Razorpay Payment Route
userRouter.post(
    "/payment-razorpay",
    authUser,
    paymentRazorpay
);


// Verify Razorpay Payment Route
userRouter.post(
    "/verifyRazorpay",
    authUser,
    verifyRazorpay
);


// Stripe Payment Route
userRouter.post(
    "/payment-stripe",
    authUser,
    paymentStripe
);


// Verify Stripe Payment Route
userRouter.post(
    "/verifyStripe",
    authUser,
    verifyStripe
);


// Get All Posts Route
userRouter.get(
    "/posts",
    getAllPosts
);

export default userRouter;