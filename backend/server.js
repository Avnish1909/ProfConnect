// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";

// import userRouter from "./routes/userRoute.js";
// import professorRouter from "./routes/professorRoute.js";
// import adminRouter from "./routes/adminRoute.js";


// // App Config
// const app = express();

// const port = process.env.PORT || 4000;


// // Connect Database
// connectDB();


// // Connect Cloudinary
// connectCloudinary();


// // Middlewares
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.use(cors());


// // API Endpoints
// app.use("/api/user", userRouter);

// app.use("/api/admin", adminRouter);

// app.use("/api/professor", professorRouter);


// // Test Route
// app.get("/", (req, res) => {

//     res.status(200).send(
//         "Professor Appointment Booking API Working"
//     );
// });


// // Global Error Handler
// app.use((err, req, res, next) => {

//     console.log(err.stack);

//     res.status(500).json({
//         success: false,
//         message: err.message
//     });
// });


// // Start Server
// app.listen(port, () => {

//     console.log(
//         `Server started on PORT: ${port}`
//     );
// });




import express from "express";
import cors from "cors";
import "dotenv/config";

import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import professorRouter from "./routes/professorRoute.js";
import adminRouter from "./routes/adminRoute.js";


// App Config

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 4000;


// Socket.IO

export const io = new Server(server, {

    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }

});


io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {

        console.log("User Disconnected:", socket.id);

    });

});


// Connect Database

connectDB();


// Connect Cloudinary

connectCloudinary();


// Middlewares

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());


// API Endpoints

app.use("/api/user", userRouter);

app.use("/api/admin", adminRouter);

app.use("/api/professor", professorRouter);


// Test Route

app.get("/", (req, res) => {

    res.status(200).send(
        "Professor Appointment Booking API Working"
    );

});


// Global Error Handler

app.use((err, req, res, next) => {

    console.log(err.stack);

    res.status(500).json({
        success: false,
        message: err.message
    });

});


// Start Server

server.listen(port, () => {

    console.log(
        `Server started on PORT: ${port}`
    );

});