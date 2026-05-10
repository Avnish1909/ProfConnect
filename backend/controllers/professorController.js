import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import professorModel from "../models/professorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import postModel from "../models/postModel.js";
import { io } from "../server.js"
import { v2 as cloudinary } from "cloudinary";



// API for Professor Login

const loginProfessor = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await professorModel.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (isMatch) {

            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            res.json({
                success: true,
                token
            });

        } else {

            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Get Professor Appointments

const appointmentsProfessor = async (req, res) => {

    try {

        const professorId = req.professorId;

        const appointments =
            await appointmentModel.find({ professorId });

        res.json({
            success: true,
            appointments
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Cancel Appointment

const appointmentCancel = async (req, res) => {

    try {

        const professorId = req.professorId;

        const { appointmentId } = req.body;

        const appointmentData =
            await appointmentModel.findById(appointmentId);

        if (
            appointmentData &&
            appointmentData.professorId.toString() === professorId
        ) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { cancelled: true }
            );

            return res.json({
                success: true,
                message: 'Appointment Cancelled'
            });
        }

        return res.status(403).json({
            success: false,
            message: 'Unauthorized Action'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Complete Appointment

const appointmentComplete = async (req, res) => {

    try {

        const professorId = req.professorId;

        const { appointmentId } = req.body;

        const appointmentData =
            await appointmentModel.findById(appointmentId);

        if (
            appointmentData &&
            appointmentData.professorId.toString() === professorId
        ) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { isCompleted: true }
            );

            return res.json({
                success: true,
                message: 'Appointment Completed'
            });
        }

        return res.status(403).json({
            success: false,
            message: 'Unauthorized Action'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Get All Professors

const professorList = async (req, res) => {

    try {

        const professors = await professorModel
            .find({})
            .select(['-password', '-email']);

        res.json({
            success: true,
            professors
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Change Professor Availability

const changeAvailability = async (req, res) => {

    try {

        const { professorId } = req.body;

        const professorData =
            await professorModel.findById(professorId);

        await professorModel.findByIdAndUpdate(
            professorId,
            {
                available: !professorData.available
            }
        );

        res.json({
            success: true,
            message: 'Availability Changed'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Get Professor Profile

const professorProfile = async (req, res) => {

    try {

        const professorId = req.professorId;

        const profileData = await professorModel
            .findById(professorId)
            .select('-password');

        res.json({
            success: true,
            profileData
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Update Professor Profile

const updateProfessorProfile = async (req, res) => {

    try {

        const professorId = req.professorId;

        const {
            fees,
            address,
            available
        } = req.body;

        await professorModel.findByIdAndUpdate(
            professorId,
            {
                fees,
                address,
                available
            }
        );

        res.json({
            success: true,
            message: 'Profile Updated'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Get Dashboard Data

const professorDashboard = async (req, res) => {

    try {

        const professorId = req.professorId;

        const appointments =
            await appointmentModel.find({ professorId });

        let earnings = 0;

        appointments.map((item) => {

            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });

        let students = [];

        appointments.map((item) => {

            if (!students.includes(item.userId)) {
                students.push(item.userId);
            }
        });

        const dashData = {

            earnings,

            appointments: appointments.length,

            students: students.length,

            latestAppointments: appointments.reverse()
        };

        res.json({
            success: true,
            dashData
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// API to Create Post

const createPost = async (req, res) => {

    try {

        const professorId = req.professorId;

        const content = req.body.content;

        const imageFile = req.file;

        const professorData = await professorModel
            .findById(professorId)
            .select("-password");

        if (!professorData) {

            return res.status(404).json({
                success: false,
                message: "Professor Not Found"
            });
        }

        let imageUrl = "";

        if (imageFile) {

            const uploadedImage =
                await cloudinary.uploader.upload(
                    imageFile.path
                );

            imageUrl = uploadedImage.secure_url;
        }

        const newPost = new postModel({

            professorId,

            professorData,

            content,

            image: imageUrl,

            date: Date.now()
        });

        await newPost.save();
        io.emit("new-post", newPost)

        res.json({
            success: true,
            message: "Post Created"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {

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
};