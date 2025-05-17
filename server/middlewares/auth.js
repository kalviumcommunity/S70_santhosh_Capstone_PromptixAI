import jwt from 'jsonwebtoken'

const userAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authenticated, Login Again" });
    }
    const token = authHeader.split(' ')[1];
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userID = tokenDecode.id;
            next();
        } else {
            return res.status(401).json({ message: "Not Authenticated", success: false });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
