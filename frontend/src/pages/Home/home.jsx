import { createContext, useState, useEffect, useMemo } from "react";
import HeroSection from "./components/hero-section.jsx";
import useFetch from "../../hooks/useFetch.js";
import AboutHome from "./components/about-home.jsx";

export const FetchData = createContext({
  error: null,
  data: null,
  isLoading: false,
  inputValue: '',
  setInputValue: () => {},
  setInputType: () => {},
  setShouldFetch: () => {}
});

function Home() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("videoandaudio");

  const payload = useMemo(() => ({
    method: "POST",
    body: { inputValue, inputType },
  }), [inputValue, inputType]);

  const { data, error, isLoading } = useFetch(shouldFetch ? "/search" : null, payload);

  useEffect(() => {
    if (data || error) {
      setShouldFetch(false);
      setInputValue("");
    }
  }, [data, error]);

  return (
    <FetchData.Provider value={{
      inputValue,
      setInputValue,
      setInputType,
      setShouldFetch,
      data,
      error,
      isLoading,
    }}>
      <main className="home w-full border border-green-700">
        <div className="w-full h-full flex flex-col pb-7 rounded-b-xl h-[83vh] space-y-8 bg-gradient-to-bl from-sky-300 to-indigo-300 border-black border md:h-[52vh] md:p-10 lg:h-full lg:p-20">
          <HeroSection />
        </div>
      </main>
      <AboutHome />
    </FetchData.Provider>
  );
}

export default Home;