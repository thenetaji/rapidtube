import { useContext,useRef,useState } from "react";
import { Functions as FunctionContext } from "./container.jsx";
import Loader from "./loader.jsx";

function InputButton(){
  const { fetchData,isFetching } = useContext(FunctionContext);
  const inputData = useRef();
  const [contentType,setContentType] = useState("videoandaudio");
  
  const toggleType = (name) => {
    if(name == "videoandaudio"){
      if(contentType == "videoandaudio"){
        return;
      }
      setContentType("videoandaudio")
    } else if(name == "audioonly"){
      if(contentType == "audioonly"){
        return;
      }
      setContentType("audioonly")
    };
  };
  
  const requestFetch = () => {
    if(inputData.current.value){
      fetchData(inputData.current.value,contentType);
    };
  };
  return(
    <>
    <div className="w-full h-1/3 mt-6">
    <label htmlFor="input-box"></label>
     <input type="text" placeholder="Search or paste Youtube URL here" className="w-full h-full p-4 rounded-xl border-2 border-cyan-600 focus:border focus:border-pink-500 required:border-red-500 shadow-sm shadow-cyan-500 hover:-translate-y-2 hover:scale-105" id="input-box" ref={inputData} />
    <div className="w-full h-1/4 mt-4 px-2">
    <div className="flex justify-between items-center mb-3">
    <button className={`hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 font-bold py-2 px-4 rounded-[8px] shadow-lg w-full mr-1 active:shadow-md active:shadow-blue-600 ${contentType == "videoandaudio" ? "bg-blue-500 text-white" : null} ${contentType != "videoandaudio" ? "border border-black" : null}`} onClick={() => {toggleType("videoandaudio")}}>Video & Audio</button>
    <button className={`hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 font-bold py-2 px-4 rounded-[8px] shadow-lg w-full active:shadow-md active:shadow-blue-400 ${contentType == "audioonly" ? "bg-blue-500 text-white" : null} ${contentType != "audioonly" ? "border border-black" : null}`} onClick={() => {toggleType("audioonly")}}>Only Audio</button>
    </div>
     {isFetching ? <Loader /> : <button type="submit" className="border-2 border-blue-800 rounded-[10px] bg-indigo-500 linear-cyan text-white w-full h-full p-2 text-xl mt-2 font-serif shadow-lg shadow-purple-600 transition duration-500 ease-in-out" onClick={requestFetch}>
     Download Video
     </button>}
    </div>
   </div>
    </>
  )
}

export default InputButton;