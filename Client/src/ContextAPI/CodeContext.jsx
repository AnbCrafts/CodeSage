import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const CodeContext = createContext();

export const CodeContextProvider = ({ children }) => {

  // Ensure this port matches your Server (5000 or 9000)
  const backendURI = "http://localhost:9000/api"; 
  const navigate = useNavigate();

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

const [userInfo,setUserInfo] = useState(null);
const getInfo = async()=>{
      try {
        const response = await axios.get(`${backendURI}/user/info`,{headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }})

        if(response && response.data.success){
          const data = response.data.userData;
          setUserInfo(data);
        }else{
          toast.error("No response or negative response from server")
        }
        
      } catch (error) {
        toast.error(error.message);
      }
}

const {secureHash} = useParams();
useEffect(() => {
  if (!secureHash) return;

  const token = localStorage.getItem("token");
  if (!token) return;

  getInfo();
}, [secureHash]);


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

  const codeContextValue = {
    input, setInput,
    isLoading, error,
    handleCode, result,
    handleCopyExplanation, handleSaveAsTxt,register,currUserData,getInfo,userInfo,getUserChats,userChats
  };



 

  return (
    <CodeContext.Provider value={codeContextValue}>
      {children}
    </CodeContext.Provider>
  );
};