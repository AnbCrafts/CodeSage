import jwt from 'jsonwebtoken';
import User from '../Models/User.Model.js'; // Adjust path to your User model

export const checkPremiumStatus = async (req, res, next) => {
    try {
        // 1. Extract token from Header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const token = authHeader.split(' ')[1];

        // 2. Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Find User and check subscription status
        const user = await User.findById(decoded.id).select('isPro');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // 4. Permission Logic
        if (!user.isPro) {
            return res.status(403).json({ 
                error: "PREMIUM_REQUIRED",
                message: "This feature is only available for Pro users. Please upgrade your plan." 
            });
        }

        // 5. Attach user info to request for the next handler
        req.user = user;
        next();

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: "TOKEN_EXPIRED", message: "Session expired." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};