import React from "react";
import { Link } from "react-router-dom";
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";



function Home() {
  return (
    <div>

      <div className="bghero h-screen -mt-12">
      <div className="hero min-h-screen">
        
        <div className="hero-content text-center">
          <div className=" max-w-3xl">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Track Your Character
            </h1>
            <p className="py-6 text-2xl text-accent-content">
              Track your characters items, spells and HP with this easy to use
              web app. 
            </p>
            <div className="flex flex-col items-center  gap-2 justify-center sm:flex-row  ">
              <Link to="/Signin">
                <button className="btn btn-primary w-40">Login</button>
              </Link>

              <Link to="/account">
                <button className="btn btn-primary w-40">View Dashboard</button>
              </Link>
              <Link to="/Blog">
                <button className="btn btn-primary w-40">View Our Blog</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
