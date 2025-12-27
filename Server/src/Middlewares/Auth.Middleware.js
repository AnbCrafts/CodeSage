import jwt from "jsonwebtoken";
import UserModel from "../Models/User.Model.js";
import ApiError from "../Utils/APIError.utility.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // ⚠️ Use next() for async errors, don't just throw
      throw new ApiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id).select("_id");

    if (!user) {
      throw new ApiError(401, "Invalid token");
    }

    req.user = user; 
    next();
  } catch (error) {
    // Pass the error to your global error handler
    next(error); 
  }
};

export default authMiddleware;