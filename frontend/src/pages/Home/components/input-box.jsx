import { useState,useEffect } from "react";

function InputBox({ inputValue,setInputValue,setShouldFetch,setError }){
  const [isClearIcon,setClearIcon] = useState(false); //to show or not
  useEffect(() => {
    if(inputValue === "") {
      setClearIcon(false);
    } else {
      setClearIcon(true);
    };
  },[inputValue]);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleKeyDown = (event) => {
    if(inputValue === "" && event.key === "Enter") {
      setError("Input shouldn't be empty!");
    } else if(event.key === "Enter") {
      event.preventDefault();
      setShouldFetch(true);
    };
  };
  
  const clearInput = () => {
    setInputValue("");
    setClearIcon(false);
  };
  return(
    <>
    <div className="w-full h-1/3 px-4">
      <div className="border-2 border-indigo-800 flex rounded-xl overflow-hidden hover:scale-105 bg-white">
       <label htmlFor="input-box"></label>
       <input type="text" placeholder="Search or paste Youtube URL" className="w-full h-full p-4 rounded-xl placeholder-gray-800 placeholder-opacity-75 relative focus:outline-none" id="input-box" onChange={handleInputChange} onKeyDown={handleKeyDown}/>
       {isClearIcon && (
        <button onClick={clearInput} className="relative right-2 bg-transparent">
          <img src="/icons/close.svg" alt="clear" type="image/svg" />
          </button>
      )}
     </div>
   </div>
    </>
  )
};

export default InputBox;