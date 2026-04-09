import multer from 'multer';
import path from 'path';
import { ApiError } from '../Utils/ApiError.js'; // Adjust path if needed

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists or create it
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only code files
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.js', '.py', '.java', '.cpp', '.c', '.ts', '.html', '.css', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new ApiError(400, "Invalid file type. Please upload a supported code file."), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});