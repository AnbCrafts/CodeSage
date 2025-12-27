import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import UserModel from "../Models/User.Model.js";
import { generateToken } from "../Utils/Token.Utility.js";
import { getHashSecret } from "../Utils/secureHash.utility.js"; 
import ApiError from '../Utils/APIError.utility.js';
import handleResponse from '../Utils/HandleResponse.Utility.js';
import asyncHandler from '../Utils/AsyncHandler.utility.js';
import ChatModel from '../Models/Chat.Model.js';

const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Validation
    if (!username || !email || !password) {
        throw new ApiError(400, "Missing required fields");
    }

    // 2. Check if User Exists (Fix: Use $or to check both fields individually)
    const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password should be at least 8 characters long");
    }

    // 3. Hash Password 
    // NOTE: If you used the Mongoose Pre-save hook I gave you earlier, 
    // you can SKIP these two lines. Just pass 'password' directly.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User (This automatically saves to DB)
    const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    // 5. Generate Token
    const token = generateToken(newUser._id);

    // 6. Custom Security Hash Logic
    const loginTime = Date.now();
    const secret = getHashSecret(newUser.createdAt.toString());
    const payload = newUser._id.toString() + loginTime + secret;
    const secureHash = crypto.createHash('sha256').update(payload).digest('hex');

    // 7. Prepare Response Data (Hide Password)
    const userData = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        secureHash,
        token,
        loginTime,
        secret,
        payload
    };

    // 8. Send Standardized Response
    handleResponse(res, 201, "User Registered successfully", userData);
});

const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body || {};

  if (!identifier || !password) {
    throw new ApiError(400, "Email/Username and password are required");
  }

  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  const loginTime = Date.now();
  const secret = getHashSecret(user.createdAt.toString());
  const payload = user._id.toString() + loginTime + secret;
  const secureHash = crypto.createHash("sha256").update(payload).digest("hex");

  const userData = {
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
    secureHash,
  };

  return handleResponse(res, 200, "User logged in successfully", userData);
});

const getChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  // Fetch chats directly (BEST PRACTICE)
  const chats = await ChatModel.find({ userId })
    .sort({ createdAt: -1 });

  // Empty chats is NOT an error
  return handleResponse(res, 200, "User chats fetched", chats);
});


export const getUserData = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await UserModel.findById(userId)
    .select("username email createdAt usage chats isPro") // Make sure to select 'chats'
    .populate({
      path: "chats",
      select: "title result code action language createdAt", // Select fields from ChatModel
      options: { sort: { createdAt: -1 } } // Optional: Sort by newest first
    });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const userData = {
    username: user.username,
    email: user.email,
    usage: user.usage, // You fetched it, so you should probably return it
    createdAt: user.createdAt,
    chats: user.chats || [], // This is now an array of full chat objects
    isPro:user.isPro
  };

  return handleResponse(res, 200, "User data fetched", userData);
});


 



export { register,getChats,login };