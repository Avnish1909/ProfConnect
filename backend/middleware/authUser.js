import jwt from 'jsonwebtoken'

// User Authentication Middleware

const authUser = async (req, res, next) => {

    try {

        const { token } = req.headers

        if (!token) {

            return res.status(401).json({

                success: false,

                message: 'Not Authorized Login Again'

            })

        }

        const token_decode = jwt.verify(

            token,

            process.env.JWT_SECRET

        )

        // OLD WORKING LOGIC

        req.body.userId = token_decode.id

        next()

    } catch (error) {

        console.log(error)

        return res.status(401).json({

            success: false,

            message: error.message

        })

    }

}

export default authUser