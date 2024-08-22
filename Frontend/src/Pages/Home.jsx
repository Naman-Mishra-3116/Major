import React, { useState } from "react";
import { theme } from "../Utils/homeVideoArray";

const Home = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="relative h-screen">
      <video
        src={theme[active].video}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
      ></video>

      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-40 z-10"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-60 z-10"></div>

      <div className="absolute z-20 p-20 mt-4 ml-20">
        <div className="w-full p-5 flex flex-col gap-2 text-white text-left">
          <h1 className="text-[60px] font-bold">{theme[active].theme}</h1>
          <div className="w-[50%] mt-4 text-[20px]">{theme[active].text}</div>
        </div>
      </div>

      <footer className="flex justify-center bottom-14 right-[50%] translate-x-[50%] z-20 flex-col items-center absolute">
        <div className="flex gap-8">
          {theme.map((_, index) => {
            return (
              <div
                className={`w-3 h-3 rounded-full bg-white hover:bg-white cursor-pointer transition-transform duration-300 transform hover:scale-150 ${
                  index === active ? "bg-red-800" : null
                }`}
                key={index}
                onClick={() => {
                  setActive(index);
                }}
              ></div>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default Home;
