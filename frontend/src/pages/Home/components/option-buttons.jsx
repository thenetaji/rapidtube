import { useReducer } from "react";
import Button from "../../../components/button.jsx";
import buttonReducer from "../utils/button-reducer.js";

function OptionButtons({ setInputType }){
  const [activeButton,dispatchButton] = useReducer(buttonReducer,"videoandaudio");
  const styles = {
    //is selected
    isTrue1:"bg-blue-600 text-white hover:scale-y-5 transform transition duration-300 ease-in-out",
    isTrue2:"bg-gradient-to-tl to-indigo-500 from-purple-600 text-white hover:scale-y-5 transform transition duration-300 ease-in-out",
    isTrue3:"bg-gradient-to-tr from-pink-500 to-rose-700 text-white hover:scale-y-5 transform transition duration-300 ease-in-out",
    isTrue4:"bg-gradient-to-tl from-fuchsia-500 to-purple-600 text-white hover:scale-y-5 transform transition duration-300 ease-in-out",
    isFalse:"bg-white border border-black text-black"
  };
  
  const toggleAudioVideo = () => {
   dispatchButton({
    type: "VIDEOANDAUDIO"
   });
   setInputType("videoandaudio");
  };
  
  const toggleAudio = () => {
   dispatchButton({
    type: "AUDIOONLY"
   });
   setInputType("audioonly");
  };
  
  const toggleThumbnail = () => {
   dispatchButton({
    type: "THUMBNAIL"
   });
   setInputType("thumbnail");
  };
  
  const toggleSubstitle = () => {
   dispatchButton({
    type: "SUBSTITLE"
   });
   setInputType("substitle");
  };
  
  return(
    <>
    <Button type="Video & Audio" styles={activeButton === "videoandaudio" ? styles.isTrue1 : styles.isFalse} onClick={toggleAudioVideo} />
    <Button type="Audio" styles={activeButton == "audioonly" ? styles.isTrue2 : styles.isFalse} onClick={toggleAudio} />
    <Button type="Thumbnail" styles={activeButton == "thumbnail" ? styles.isTrue3 : styles.isFalse} onClick={toggleThumbnail} />
    <Button type="Substitle" styles={activeButton == "substitle" ? styles.isTrue4 : styles.isFalse} onClick={toggleSubstitle} />
    </>
  )
};

export default OptionButtons;