import React from "react";
import video from "../assets/evermore.mp4";

const Home = () => {
  return (
    <div className="relative h-lvh">
      <video
        src={video}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 h-full w-full object-cover z-0"
      ></video>
      <div className="relative z-20 flex items-center justify-center h-full pt-[80px]">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Welcome to My Website</h1>
          <p className="text-lg mt-4">
            Here is some more information about the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

