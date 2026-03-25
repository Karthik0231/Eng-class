import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY

const authUser = async (req, res, next) => {
    try {
        // const token = req.header("auth-token");
        const token = req.cookies.mycookie;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token required"
            })
        }
        const decoded = jwt.verify(token, SECRET_KEY) //payload
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "invalid token"
        })
    }
}

export default authUser;