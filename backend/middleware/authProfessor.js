import jwt from 'jsonwebtoken'

// Professor Authentication Middleware

const authProfessor = async (req, res, next) => {

    const { ptoken } = req.headers

    if (!ptoken) {

        return res.json({
            success: false,
            message: 'Not Authorized Login Again'
        })
    }

    try {

        const token_decode = jwt.verify(
            ptoken,
            process.env.JWT_SECRET
        )

        // OLD SUPPORT
        req.body.professorId = token_decode.id

        // NEW SUPPORT
        req.professorId = token_decode.id

        next()

    } catch (error) {

        console.log(error)

        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authProfessor;