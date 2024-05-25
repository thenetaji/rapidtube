import { useContext } from "react";
import HeroState from "./hero-state.jsx";

function HeroSection() {
  return (
    <>
      <section className="about-site px-4 mt-6">
        <h2 className="text-3xl text-center amaranth-bold">
          RapidTube: YouTube Video, Audio & Thumbnail downloader
        </h2>
      </section>
      <HeroState />
    </>
  );
}

export default HeroSection;