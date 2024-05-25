import InputButton from "./input-box";
import VideoInfo from "./video-info.jsx"
import { useContext,useEffect } from "react";
import { Functions as FunctionContext } from "./container.jsx";

function HeroSection(){
  const { data } = useContext(FunctionContext);
  return(
    <main className="h-3/4 w-full p-4 flex flex-col justify-between items-center border">
    <section className="input">
     <h2 className="text-center text-indigo-800 mt-3 text-2xl">
     Download Youtube Videos & Audios
     </h2>
     <p className="text-center mt-2 mx-2">Download Youtube videos and audios at high quality on any device</p>
     </section>
     {!data ? <InputButton /> : <VideoInfo />}
    </main>
  )
}

export default HeroSection;