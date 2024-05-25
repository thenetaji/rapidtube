import { useState,useContext } from "react";
import InputBox from "./input-box.jsx";
import OptionButtons from "./option-buttons.jsx";
import Button from "../../../components/button.jsx";
import Error from "./error.jsx";
import { FetchData } from "../home.jsx";

function InputState(){
  const { inputValue,setInputValue,setInputType,setShouldFetch } = useContext(FetchData);
  const [error,setError] = useState(null);
  const handleFetchRequest = () => {
    if(inputValue === "" || !inputValue) {
      setError("Input shouldn't be empty!");
    } else {
      setInputValue(inputValue);
      setShouldFetch(true);
    }
  };
  
  return(
     <section className="input-state w-full">
       <InputBox 
         setError={setError}
         inputValue={inputValue} 
         setInputValue={setInputValue}
         setShouldFetch={setShouldFetch} />
        <div className="button-holder mt-4 flex flex-wrap w-full justify-around align-center px-4">
         <OptionButtons setInputType={setInputType} />
        </div>
      <div className="submit-btn w-full px-4 mt-6 h-12">
        <Button type={"Get Video"} styles={"text-white min-w-full min-h-full text-lg bg-gradient-to-r from-indigo-600 to-blue-500 transform active:translate-y-1 lg:hover:scale-105"} onClick={handleFetchRequest} />
        </div>
      {error && <Error errorMsg={error} />}
      </section>
  )
};

export default InputState;