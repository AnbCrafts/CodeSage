import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CodeContext = createContext();

export const CodeContextProvider = ({ children }) => {

        const backendURI = "http://localhost:9000/api/code";


      const [processInput,setProcessInput] = useState(false);
      const [input,setInput] = useState("");
      const [explanation,setExplanation] = useState("");
      const [suggestedCode,setSuggestedCode] = useState("");
      const [trimmedCode,setTrimmedCode] = useState("");
      const [summarizedCode,setSummarizedCode] = useState("");
    
    
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState("");
    
      const handleCopyExplanation = async () => {
        try {
          await navigator.clipboard.writeText(explanation);
          alert('Explanation copied to clipboard!'); // Optional: Provide user feedback
        } catch (err) {
          console.error('Failed to copy text: ', err);
          alert('Failed to copy explanation.'); // Optional: Inform the user of the error
        }
      };
    
      const handleSaveAsTxt = () => {
        const filename = 'explanation.txt';
        const text = explanation;
      
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      };

      const getExplanation = async () => {
          setIsLoading(true);
          setError("");
          try {
            const response = await axios.post(`${backendURI}/explain`, { code: input }); // Send input as an object
            if (response.data.success) {
              setExplanation(response.data.explanation);
            } else {
              console.log("Cannot get response");
              setError("Failed to get explanation from the server.");
            }
          } catch (error) {
            console.error("Error fetching explanation:", error);
            setError("An error occurred while fetching the explanation.");
          } finally {
            setIsLoading(false);
          }
        };
      const getSuggestion = async () => {
          setIsLoading(true);
          setError("");
          try {
            const response = await axios.post(`${backendURI}/suggest`, { code: input }); // Send input as an object
            if (response.data.success) {
              setSuggestedCode(response.data.suggestion);
            } else {
              console.log("Cannot get response");
              setError("Failed to get suggestion from the server.");
            }
          } catch (error) {
            console.error("Error fetching suggestion:", error);
            setError("An error occurred while fetching the suggestion.");
          } finally {
            setIsLoading(false);
          }
        };

        const getTrimmedCode = async () => {
          setIsLoading(true);
          setError("");
          try {
            const response = await axios.post(`${backendURI}/trim`, { code: input }); // Send input as an object
            if (response.data.success) {
              setSuggestedCode(response.data.trimmed);
            } else {
              console.log("Cannot get response");
              setError("Failed to get trimmed code from the server.");
            }
          } catch (error) {
            console.error("Error fetching trimmed code:", error);
            setError("An error occurred while fetching the trimmed code.");
          } finally {
            setIsLoading(false);
          }
        };

        const getSummary = async () => {
          setIsLoading(true);
          setError("");
          try {
            const response = await axios.post(`${backendURI}/summarize`, { code: input }); // Send input as an object
            if (response.data.success) {
              setSuggestedCode(response.data.summary);
            } else {
              console.log("Cannot get response");
              setError("Failed to get summarized code from the server.");
            }
          } catch (error) {
            console.error("Error fetching summarized code:", error);
            setError("An error occurred while fetching the summarized code.");
          } finally {
            setIsLoading(false);
          }
        };  


  const codeContextValue = {
    handleSaveAsTxt,
    handleCopyExplanation,
    processInput,setProcessInput,
    input,setInput,
    suggestedCode,setSuggestedCode,
    explanation,setExplanation,
    trimmedCode,setTrimmedCode,
    summarizedCode,setSummarizedCode,
    isLoading,
    error,
    getExplanation,getSuggestion,getSummary,getTrimmedCode

    
  };

  return (
    <CodeContext.Provider value={codeContextValue}>
      {children}
    </CodeContext.Provider>
  );
};