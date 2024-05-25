 function BouncingLoader(){
   return(
     <div className="w-full h-full">
     <div className="bg-transparent flex justify-center items-center space-x-2 w-full h-full">
       <span className="sr-only">Loading...</span>
       <span className="rounded-full bg-black w-8 h-8 animate-pulse [animation-delay:0s]"></span>
       <span className="rounded-full bg-black w-8 h-8 animate-pulse [animation-delay:-0.15s]"></span>
       <span className="rounded-full bg-black w-8 h-8 animate-pulse [animation-delay:-0.30s]"></span>
       <span className="rounded-full bg-black w-8 h-8 animate-pulse [animation-delay:-0.45s]"></span>
        <span className="rounded-full bg-black w-8 h-8 animate-pulse [animation-delay:-0.60s]"></span>
     </div>
   </div>
 )
};

export default BouncingLoader;