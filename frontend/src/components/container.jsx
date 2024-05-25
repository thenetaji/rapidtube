import { useState,createContext } from "react";

 export const Functions = createContext();
 function WrapperContainer({children}){
   const BASE_URL = import.meta.env.VITE_BASE_URL;
   const [isFetching,setIsFetching] = useState(false);
   const [data,setData] = useState(undefined);
  
  function fetchData(input,inputType){
    setIsFetching(true);
    fetch(`${BASE_URL}/search`,{
      method:"POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify({
        url:input,
        type:inputType
      })
    })
    .then(response => {
      if(!response.ok){
        throw new Error("Network Error");
      };
      return response.json();
    })
    .then(data => {
      setData(data);
      setIsFetching(false);
    })
    .catch(error => console.log(error))
    .finally(() => setIsFetching(false))
  }
  return(
   <Functions.Provider value={{
     data,fetchData,isFetching
   }}>
     {children}
   </Functions.Provider>
  )
};

export default WrapperContainer;