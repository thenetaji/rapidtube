import { useState, useEffect, useContext } from "react";
import InputState from "./input-state.jsx";
import Error from "./error.jsx";
import Loader from "../../../components/loader.jsx";
import VideoInfo from "./video-info.jsx";
import { FetchData } from "../home.jsx";

function HeroState() {
  const { data,error,isLoading} = useContext(FetchData);
  const [state, setState] = useState("input-state");

  useEffect(() => {
    if (isLoading) {
      setState("loading-state");
    } else if (error) {
      setState("error-state");
    } else if (data) {
      setState("video-state");
    }
  }, [data, error, isLoading]);

  return (
    <section className="input-and-video-section w-full h-[50vh]">
      {(state === "input-state" || state === "error-state") && <InputState />}
      {error && <Error errorMsg={error.message} />}
      {state === "loading-state" && <Loader />}
      {state === "video-state" && <VideoInfo data={data}/>}
    </section>
  );
}

export default HeroState;