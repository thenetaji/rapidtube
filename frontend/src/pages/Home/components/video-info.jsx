import { useRef } from "react";

function VideoInfo({ data }){
  const selectedValue = useRef();
  function downloadVideo(){
    const filteredURL = data.specificFormat.filter(item => item.itag === parseInt(selectedValue.current.value));
    const downloadURL = filteredURL[0].url;
    window.location.href = downloadURL;
  }
   return(
    <>
    <section className="video-info">
    <div className="bg-custom-grey rounded-xl w-full h-full flex flex-wrap items-center justify-center px-4">
     <span className="w-full rounded-[7px] overflow-hidden lg:p-10">
      <picture>
      {data.thumbnails.map((item,index) => (
       <source key={index} media={`(max-width:${item.width}px)`} srcSet={item.url} type="image/png" />
      ))}
       <img src={data.thumbnails[3].url} alt="thumbnail_image" />
      </picture>
     </span>
     <div className="mt-2 w-full font-bold">
      <p className="text-start leading-none text-[0.9rem] md:text-xl">{data.title}</p>
      <p className="text-start text-[0.9rem] md:text-xl mt-2">{`${Math.floor(data.lengthSeconds / 60)}:${data.lengthSeconds % 60}`}</p>
     </div>
     <div className="w-full">
      <select className="border border-black text-start mt-3 rounded p-2 w-full" ref={selectedValue}>
      <optgroup label={selectedValue == "videoandaudio" ? "mp4" : "mp3"}>
      {data.quality.map((item,index) => (<option value={item.itag} key={index}>{item.qualityLabel || `${item.audioQuality} kbps`}</option>
      ))}
       </optgroup>
      </select>
     <button className="w-full bg-purple-700 p-2 rounded-xl mt-3 text-white font-sans border-2 border-teal-600 shadow-2xl shadow-emerald-300" onClick={downloadVideo}> Video</button>
     </div>
    </div>
    </section>
   </>
  )
};

export default VideoInfo;