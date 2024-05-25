function Loader(){
  return(
    <button className="border-2 border-teal-500 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-500 text-white w-full h-full p-2 text-xl mt-2 font-serif shadow-lg hover:shadow-xl transition duration-500ease-in-out hover:bg-gradient-to-l hover:from-teal-500 hover:to-cyan-400 active:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-75">
      <span className="relative">Loading...</span>
     </button>
  )
}

export default Loader;