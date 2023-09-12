import React from "react";
import { Link } from "react-router-dom";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import { scroller } from "react-scroll";

import BgDice from "../images/backgroundDice.svg";
import "../App.css";

function Home() {
  //scroller
  const scrollToPage2 = () => {
    scroller.scrollTo("Page2", {
      duration: 500,
      smooth: true,
      offset: -100,
    });
  };

  //spin animation

  const Spin = (cycle) => ({
    in: {
      style: {
        // `p` is number (0~1)
        // When just before this page appear, `p` will be 0
        // When this page filled your screen, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
    out: {
      style: {
        // `p` is number (0~1)
        // When this page filled your screen, `p` will be 0
        // When just after this page disappear, `p` will be 1
        transform: (p) => `rotate(${p * 360 * cycle}deg)`,
      },
    },
  });

  return (
    <div>
      <div className="bghero h-screen -mt-12">
        <div className="hero min-h-screen">
          <div className="hero-content mt-20 text-center">
            <ScrollContainer className="h-screen  flex items-center absolute z-0  justify-center">
              <ScrollPage>
                <Animator animation={Spin(1)}>
                  <svg
                    className="stroke-base-content mt-10"
                    xmlns="http://www.w3.org/2000/svg"
                    width="435"
                    height="435"
                    fill="none"
                  >
                    <g
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="16.667"
                      filter="url(#a)"
                    >
                      <path d="M217.5 22.656 48.469 120.078v194.844L217.5 412.344l169.031-97.422V120.078L217.5 22.656Z" />
                      <path d="M217.5 22.656 105.922 140.895 48.469 314.922 217.5 339.069l169.031-24.147-57.454-174.027L217.5 22.656Z" />
                      <path d="M217.5 339.069 105.923 140.895h223.154L217.5 339.069ZM217.5 339.069v73.275M105.922 140.895l-57.453-20.817M329.078 140.895l57.453-20.817" />
                    </g>
                    <defs>
                      <filter
                        id="a"
                        width="443"
                        height="443"
                        x="-4"
                        y="0"
                        color-interpolation-filters="sRGB"
                        filterUnits="userSpaceOnUse"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          result="hardAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_1_12"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="effect1_dropShadow_1_12"
                          result="shape"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          result="hardAlpha"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        />
                        <feOffset dx="7" dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite
                          in2="hardAlpha"
                          k2="-1"
                          k3="1"
                          operator="arithmetic"
                        />
                        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
                        <feBlend
                          in2="shape"
                          result="effect2_innerShadow_1_12"
                        />
                      </filter>
                    </defs>
                  </svg>
                </Animator>
              </ScrollPage>
            </ScrollContainer>

            <div className=" max-w-3xl z-10">
              <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Track Your Character
              </h1>
              <p className="py-6 text-2xl text-secondary mt-10">
                Track your characters items, spells and HP with this easy to use
                web app.
              </p>
              <div className="flex flex-col items-center  gap-2 justify-center sm:flex-row  ">
                <Link to="/Signin">
                  <button className="btn btn-primary w-40">Login</button>
                </Link>

                <Link to="/account">
                  <button className="btn btn-primary w-40">
                    View Dashboard
                  </button>
                </Link>
                <Link to="/Blog">
                  <button className="btn btn-primary w-40">
                    View Our Blog
                  </button>
                </Link>
              </div>
              <div className="">
                <a className="downbutton" onClick={scrollToPage2}>
                  {" "}
                  <div className="flex justify-center mt-20  ease-in-out duration-300">
                    <svg
                      className=" fill-secondary w-16 animate-bounce cursor-pointer  hover:scale-110"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div className="flex justify-center w-full">
          <h1 className="text-2xl text-center md:text-4xl font-bold bg-gradient-to-r from-secondary my-7 to-primary bg-clip-text text-transparent">
            Bring Your Character Sheet to the next level!
          </h1>
        </div>
        <div
          id="Page2"
          className="page2 flex flex-col items-center lg:flex-row-reverse md:items-center flex-wrap justify-evenly"
        >
          {" "}
          <div className="flex items-center gap-10 bg-base-200 rounded-3xl shadow-xl HomeCard  w-full sm:w-1/2 lg:w-1/4 mt-3 h-60">
            {" "}
            <svg
              className="fill-secondary w-36"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M19 0h4a1 1 0 0 1 1 1v4a1 1 0 0 1-.293.707L11.914 17.5l1.793 1.793a1 1 0 0 1-1.414 1.414l-2.5-2.5-.33-.329L6 20.995A3 3 0 1 1 3.005 18l3.117-3.464-.33-.329-2.5-2.5a1 1 0 1 1 1.415-1.414L6.5 12.086 18.293.293A1 1 0 0 1 19 0ZM7.914 13.5l.293.293 2 2 .293.293L22 4.586V2h-2.586l-11.5 11.5Zm-.376 2.452-2.534 2.816a3.014 3.014 0 0 1 .228.228l2.816-2.534-.51-.51Zm-4.331 4.07a1 1 0 1 0-.414 1.957 1 1 0 0 0 .414-1.958Z"
                clip-rule="evenodd"
              />
            </svg>
            <div>
              <h2 className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                With This App you can Track:
              </h2>
              <ul class="list-disc">
                <li>Levels</li>
                <li>Gold</li>
                <li>Stats</li>
                <li>HP</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-10 bg-base-200 rounded-3xl shadow-xl HomeCard w-full sm:w-1/2 lg:w-1/4 mt-3 h-60">
            {" "}
            <svg
              className="fill-secondary w-36"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M58.553 89 42.27 211.8H79V89H58.553zM97 89v122.8h38V89H97zm56 0v122.8h56.666v-17.6h92.668v17.6H359V89H153zm224 0v122.8h38V89h-38zm56 0v122.8h36.73L453.446 89H433zM227.666 212.2v105.2h56.668V212.2h-56.668zM256 223.794a18.667 16.103 0 0 1 18.666 16.1 18.667 16.103 0 0 1-9.666 14.09v37.214h-18V254a18.667 16.103 0 0 1-9.666-14.106 18.667 16.103 0 0 1 18.666-16.1zM41 229.8v127.915l19.334 18.23V229.8H41zm37.334 0v158h355.332v-158H302.334v105.6h-92.668V229.8H78.334zm373.332 0v146.145L471 357.715V229.8h-19.334zM41 382.456V423h43.002L41 382.455zm430 0L427.998 423H471v-40.545zM92 405.8l18.24 17.2h291.52L420 405.8H92z" />
            </svg>
            <div>
              <h2 className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Keep Your Items Safe
              </h2>
              <p className="">
                No more forgetting or double Using One time use items!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-10 bg-base-200 rounded-3xl shadow-xl HomeCard w-full sm:w-1/2 lg:w-1/4 mt-3 h-60">
            {" "}
            <svg
              className="fill-secondary w-36"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
            >
              <path d="M512 64h64v192h-64V64zm0 576h64v192h-64V640zM160 480v-64h192v64H160zm576 0v-64h192v64H736zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248L657.152 606.4zM114.048 923.2 68.8 877.952l316.8-316.8 45.248 45.248-316.8 316.8zM702.4 334.848 657.152 289.6l135.744-135.744 45.248 45.248L702.4 334.848z" />
            </svg>
            <div>
              <h2 className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Track Your Spells
              </h2>
              <p className="">Access to Every 5e Spell through the 5eAPI </p>
            </div>
          </div>
        </div>
        <div className="flex-col justify-center  mt-12 ">
          <h1 className="text-2xl text-center md:text-4xl font-bold bg-gradient-to-r from-secondary my-7 to-primary bg-clip-text text-transparent">
            Log In with your Google Account Now To Get Started.
          </h1>
          <div className="w-screen flex justify-center"> 
          <Link to="/Signin">
            <button className="btn btn-primary w-40">Login</button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
