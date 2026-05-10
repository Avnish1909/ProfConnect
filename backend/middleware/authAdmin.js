import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {

    try {

        const token = req.headers.token;

        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            decoded.email !== process.env.ADMIN_EMAIL
        ) {

            return res.status(401).json({
                success: false,
                message: "Invalid Admin Token"
            });
        }

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export default authAdmin;