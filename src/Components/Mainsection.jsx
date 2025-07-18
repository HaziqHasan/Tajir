import React from "react";
import HomeCategory from "./HomeCategory";
import About from "./About";
import Home from "./Home";

export default function Mainsection() {
  return (
    <div className="bg-white ">
      <Home />
      <div className=" shadow-lg">
        <HomeCategory />
      </div>
      <div className=" shadow-lg">
        <About />
      </div>
    </div>
  );
}
