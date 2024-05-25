function Button({styles,type,onClick}){
  return(
    <>
     <button className={`w-[45%] h-1/4 font-bold py-2 mb-[6px] px-4 rounded-[8px] whitespace-nowrap ${styles}`} onClick={onClick}>{type}</button>
    </>
 )
};

export default Button;

/*hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105*/