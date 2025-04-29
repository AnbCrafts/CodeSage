import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header';
import { CodeContext } from '../ContextAPI/CodeContext';
import Loader from '../Components/Loader';
import { assets } from '../assets/assets';

const Analyze = () => { 


  const{handleSaveAsTxt,
    handleCopyExplanation,
    processInput,setProcessInput,
    input,setInput,
    suggestedCode,setSuggestedCode,
    explanation,setExplanation,
    trimmedCode,setTrimmedCode,
    summarizedCode,setSummarizedCode,
    isLoading,
    error,getExplanation,getSuggestion,getSummary,getTrimmedCode} = useContext(CodeContext);

    const [showLoader,setShowLoader] = useState(false);
  
  useEffect(()=>{
    if(btnTxt === "Explain"){

      getExplanation();
    }
    else if(btnTxt === "Summarize"){
getSummary();
    }
    else if(btnTxt === "Trim"){
getTrimmedCode();
    }
    else if(btnTxt === "Suggest"){
      getSuggestion();

    }
    
  },[processInput]);

  useEffect(()=>{
    console.log(explanation);
  },[explanation]);

  const handleClear = ()=>{
    setInput("");
    setExplanation("");
    setSuggestedCode("");
    setSummarizedCode("");
    setTrimmedCode("");
    setBtnTxt("");
  }
  

  const[toggleImg,setToggleImg] = useState(false);
  const[btnTxt,setBtnTxt] = useState("Summarize");
  const toggleDropDown=()=>{
    setToggleImg(!toggleImg)
  }
 

  const handleTask = ()=>{
    if(input.length>0){
      setProcessInput(true);
    }
    else{
      alert("There's nothing to process")
    }
  }
  
  useEffect(()=>{
    console.log(isLoading);
  },[processInput])


 

  

  return (
    <div>

<div className="min-h-screen bg-[#0c0c3a] text-white  w-[90%] mx-auto relative">
      <Header/>
      <Loader isLoading={showLoader}/>

  <div className="flex items-center justify-between w-[100%] gap-5">
    {/* Code Input */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl flex-1">
      <label className="block mb-5 text-purple-300 text-lg">Paste Your Code 👇</label>

      <textarea className="w-full h-100 p-4 rounded-lg bg-[#0e1a40] text-white font-mono resize-none noScroll overflow-y-scroll" value={input} onChange={(e)=>setInput(e.target.value)} />
      <div className="flex justify-between mt-4 relative py-2">
        <button onClick={handleTask} className={`${btnTxt.length?"bg-blue-600 text-lg hover:bg-blue-700":""}  px-4 py-2 rounded-xl block cursor-pointer "`}>{btnTxt}</button> 
               
        <div className={`${toggleImg?"h-50":"h-11"} w-60  border border-white  rounded-xl overflow-y-hidden text-center absolute left-[50%] -translate-x-[50%] flex items-center flex-col justify-between py-1 bg-[#0f172a]`}>
          <div className='absolute h-8 w-8 bg-white top-1 right-3 rounded cursor-pointer  '>
            <img onClick={toggleDropDown} src={!toggleImg ? assets.down : assets.up} className='h-full w-full object-cover' alt="" />

          </div>
        
        <span onClick={()=>setBtnTxt("Summarize")} className="text-lg hover:bg-gray-900 px-4 py-1.5  rounded-xl block mx-auto cursor-pointer w-[100%]">Summarize</span>
        <span onClick={()=>setBtnTxt("Explain")}  className="text-lg hover:bg-gray-700 px-4 py-1.5  rounded-xl block mx-auto cursor-pointer w-[100%]">Explain</span>
        <span onClick={()=>setBtnTxt("Suggest")} className="text-lg hover:bg-gray-700 px-4 py-1.5  rounded-xl block mx-auto cursor-pointer w-[100%]">Suggest</span>
        <span onClick={()=>setBtnTxt("Trim")} className="text-lg hover:bg-gray-700 px-4 py-1.5  rounded-xl block mx-auto cursor-pointer w-[100%]">Trim</span>
          

        </div>

        <button onClick={handleClear} className="text-gray-300 hover:text-red-400 cursor-pointer hover:shadow" disabled={input===""}>Clear</button>
      </div>
    </div>

    {/* AI Output */}
    <div className="bg-[#111842] p-6 rounded-2xl shadow-xl flex-1 ">
      <h2 className="text-xl text-indigo-300 mb-4">AI Response 💬</h2>
      <div className="space-y-4 max-h-[500px] overflow-y-auto noScroll">
        <div className="bg-[#1e3a8a] p-4 rounded-lg shadow">
          <h3 className="font-bold text-purple-300">🧠 Summary:</h3>
          <p className={`max-h-100 overflow-y-scroll scroll-smooth noScroll ${summarizedCode.length?"border border-gray-900 rounded-lg p-2 my-3 text-md text-gray-900":""} `}>{summarizedCode.length?summarizedCode:"This code defines a function that handles user login by verifying credentials..."}</p>
          {summarizedCode && 
          <div className="card-actions flex items-center justify-start gap-5 py-2 px-4 my-3">
            <button onClick={handleCopyExplanation} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Copy</button>
            <button onClick={handleSaveAsTxt} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Save as TXT</button>
          </div>
        }
        </div>
        <div className="bg-[#3b82f6] p-4 rounded-lg shadow">
          <h3 className="font-bold text-indigo-100">📖 Explanation:</h3>
          <p className={`max-h-100 overflow-y-scroll scroll-smooth noScroll ${explanation.length?"border border-gray-900 rounded-lg p-2 my-3 text-md text-gray-900":""} `}>{explanation.length?explanation:"Line-by-line explanation of how the logic flows..."}</p>

          {explanation && 
          <div className="card-actions flex items-center justify-start gap-5 py-2 px-4 my-3">
            <button onClick={handleCopyExplanation} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Copy</button>
            <button onClick={handleSaveAsTxt} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Save as TXT</button>
          </div>
        }
        </div>
        <div className="bg-[#3b82f6] p-4 rounded-lg shadow">
          <h3 className="font-bold text-indigo-100">🤔 Suggestions:</h3>
          <p className={`max-h-100 overflow-y-scroll scroll-smooth noScroll ${suggestedCode.length?"border border-gray-900 rounded-lg p-2 my-3 text-md text-gray-900":""} `}>{suggestedCode.length?suggestedCode:"This code can also be optimized if ....."}</p>
          {suggestedCode && 
          <div className="card-actions flex items-center justify-start gap-5 py-2 px-4 my-3">
            <button onClick={handleCopyExplanation} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Copy</button>
            <button onClick={handleSaveAsTxt} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Save as TXT</button>
          </div>
        }
        </div>
        <div className="bg-[#3b82f6] p-4 rounded-lg shadow">
          <h3 className="font-bold text-indigo-100">✂️ Trimmed:</h3>
          <p className={`max-h-100 overflow-y-scroll scroll-smooth noScroll ${trimmedCode.length?"border border-gray-900 rounded-lg p-2 my-3 text-md text-gray-900":""} `}>{trimmedCode.length?trimmedCode:"This code can also be written like this ....."}</p>
          {trimmedCode && 
          <div className="card-actions flex items-center justify-start gap-5 py-2 px-4 my-3">
            <button onClick={handleCopyExplanation} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Copy</button>
            <button onClick={handleSaveAsTxt} className=' px-4 py-1 rounded text-sm bg-[#0c0c3a] text-white font-semibold cursor-pointer shadow-2xl shadow-[#ffffff6e] hover:shadow-lg transition-all '>Save as TXT</button>
          </div>
        }
        </div>
      </div>
    </div>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12 px-4 w-[90%] mx-auto ">
  {/* Summary */}
  <div className="bg-[#111842] p-6 rounded-2xl shadow-lg text-white hover:shadow-indigo-500/30 transition-all">
    <div className="text-4xl mb-4">🧠</div>
    <h3 className="text-xl font-semibold text-indigo-300 mb-2">Code Summary</h3>
    <p className="text-gray-300 text-sm">
      Get a high-level overview of what your code does — perfect for quick reviews and understanding.
    </p>
  </div>

  {/* Explanation */}
  <div className="bg-[#111842] p-6 rounded-2xl shadow-lg text-white hover:shadow-purple-500/30 transition-all">
    <div className="text-4xl mb-4">📖</div>
    <h3 className="text-xl font-semibold text-purple-300 mb-2">Line-by-Line Explanation</h3>
    <p className="text-gray-300 text-sm">
      Understand each line of your code in plain English — great for learning and debugging.
    </p>
  </div>

  {/* Suggestions */}
  <div className="bg-[#111842] p-6 rounded-2xl shadow-lg text-white hover:shadow-blue-500/30 transition-all">
    <div className="text-4xl mb-4">🛠️</div>
    <h3 className="text-xl font-semibold text-blue-300 mb-2">Suggestions</h3>
    <p className="text-gray-300 text-sm">
      Improve your code with AI-generated tips for optimization, best practices, and structure.
    </p>
  </div>

  {/* Shorten Code */}
  <div className="bg-[#111842] p-6 rounded-2xl shadow-lg text-white hover:shadow-pink-500/30 transition-all">
    <div className="text-4xl mb-4">✂️</div>
    <h3 className="text-xl font-semibold text-pink-300 mb-2">Shorten Code</h3>
    <p className="text-gray-300 text-sm">
      Minimize your code while keeping its logic intact — cleaner, faster, and more readable.
    </p>
  </div>
</div>


      
    </div>
  )
}

export default Analyze
