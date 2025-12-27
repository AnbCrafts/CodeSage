import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
// import toast from 'react-toastify';
export const CodeContext = createContext();

export const CodeContextProvider = ({ children }) => {

  // Ensure this port matches your Server (5000 or 9000)
  const backendURI = "http://localhost:9000/api"; 
  const navigate = useNavigate();
const {secureHash} = useParams();
const [proUser,setProUser] = useState(false);

  const [input, setInput] = useState("");
  const [result, setResult] = useState(""); // Default to empty string, not null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currUserData,setCurrUserData] = useState(null);
  const [userChats,setUserChats] = useState([]);
  const register = async (formData, path) => {
  try {
    if (!formData) {
      toast.warn("User data is required");
      return;
    }

    const response = await axios.post(
      `${backendURI}/user/${path}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response || !response.data?.success) {
      toast.error("Authentication failed");
      return;
    }

    const userData = response.data.data;

    setCurrUserData(userData);

    localStorage.setItem("userId", userData._id);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("secureHash", userData.secureHash);

    navigate(`/code-sage/${userData.secureHash}`);
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

// Inside CodeContext.jsx

const [userInfo, setUserInfo] = useState(null);
// const [isLoading, setIsLoading] = useState(true); // Default to true to prevent "Login" flash

const getInfo = async () => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setIsLoading(false);
      return;
    }

    const response = await axios.get(`${backendURI}/user/info`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.success) {
      // ⚠️ Verify 'data' vs 'userData' matches your backend response
      setUserInfo(response.data.data || response.data.userData); 
    } else {
      toast.error(response.data.message || "Failed to retrieve user data");
      // Optional: localStorage.removeItem("token"); // Auto-logout on invalid session
    }

  } catch (error) {
    console.error("Fetch Info Error:", error);
    const errorMessage = error.response?.data?.message || "Session expired or network error";
    // toast.error(errorMessage); // Optional: Silence generic errors on load
  } finally {
    setIsLoading(false);
  }
};

// ✅ FIX: Run immediately on mount, don't wait for secureHash
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    getInfo();
  } else {
    setIsLoading(false); // Stop loading immediately if no token
  }
}, []);


const handleCode = async (data) => {
  if (!data || !data.code) {
    toast.error("Please provide code to analyze.");
    return;
  }

  setIsLoading(true);
  setResult("");

  try {
    const response = await axios.post(
      `${backendURI}/code/analyze`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const aiResult = response.data?.data?.result;

    if (aiResult) {
      setResult(aiResult);
    } else {
      console.log("Unexpected response shape:", response.data);
      toast.error("No response received from AI.");
    }

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Analysis failed.");
  } finally {
    setIsLoading(false);
  }
};


const getUserChats = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await axios.get(
      `${backendURI}/user/chats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data?.success) {
      // console.log("reponse for chats - ", response)
      setUserChats(response.data.data); // 🔥 FIX
    } else {
      toast.error("Failed to fetch chats");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load chats");
  }
};


// Ensure backendURI is defined at the top of your file
// const backendURI = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api"; 

// Add secureHash as a second parameter
const subscribeToPro = async (planType = "monthly", secureHash) => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("You must be logged in to upgrade.");
      setIsLoading(false);
      return;
    }

    if (!secureHash) {
       toast.error("Workspace identifier missing.");
       setIsLoading(false);
       return;
    }

    const response = await axios.post(
      `${backendURI}/subscribe/create-checkout-session`, 
      { 
        planType, 
        secureHash // <--- Send the hash to the backend
      }, 
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );

    if (response.data.url) {
      window.location.href = response.data.url; 
    } else {
      toast.error("Failed to initiate payment session.");
    }

  } catch (error) {
    console.error("Payment Error:", error);
    toast.error(error.response?.data?.message || "Payment Error");
  } finally {
    setIsLoading(false);
  }
};



  // --- UTILITIES ---
  const handleCopyExplanation = async () => {
    if (!result) return toast.info("Nothing to copy!");
    try {
      await navigator.clipboard.writeText(result);
      toast.success('Copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy.');
    }
  };  

  const handleSaveAsTxt = () => {
    if (!result) return toast.info("Nothing to save!");
    const filename = 'codesage_analysis.txt';
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(result));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };








const sendCustomEmail = async (data) => {
    const toastId = toast.loading("Sending message...");

    // 1. READ VARIABLES INSIDE THE FUNCTION (Fixes loading issues)
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_AUTOREPLY_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      // 2. DEBUG CHECK: Stop immediately if keys are missing
      if (!SERVICE_ID || !PUBLIC_KEY || !ADMIN_TEMPLATE_ID) {
        console.error("❌ EmailJS Error: Missing Environment Variables");
        console.log({ SERVICE_ID, PUBLIC_KEY, ADMIN_TEMPLATE_ID }); // See which one is missing in Console
        throw new Error("System configuration error: Missing API Keys");
      }

      // 3. Validate Input Data
      if (!data.user_name || !data.user_email || !data.message) {
        toast.error("Please fill in all fields", { id: toastId });
        return false;
      }

      const templateParams = {
        user_name: data.user_name,
        user_email: data.user_email,
        message: data.message,
        subject: data.subject || "General Inquiry",
        to_name: "CodeSage Admin",
      };

      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY);

      if (AUTOREPLY_TEMPLATE_ID) {
        emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY)
          .catch(err => console.warn("Auto-reply failed (non-critical):", err));
      }

      toast.success("Message sent successfully!", { id: toastId });
      return true;

    } catch (error) {
      console.error("Email Error Details:", error);
      // Show specific error if it's the key issue
      const msg = error.text || error.message || "Failed to send";
      toast.error(`Error: ${msg}`, { id: toastId });
      return false;
    }
  };



  const codeContextValue = {
    input, setInput,
    isLoading, error,
    handleCode, result,
    handleCopyExplanation, handleSaveAsTxt,register,currUserData,getInfo,userInfo,getUserChats,userChats,
    sendCustomEmail,subscribeToPro,proUser
  };
 


  return (
    <CodeContext.Provider value={codeContextValue}>
      {children}
    </CodeContext.Provider>
  );
};