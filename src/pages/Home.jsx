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

  // const scrollToPage2 = () => {
  //   scroller.scrollTo("Page2", {
  //     duration: 750,
  //     smooth: true,
  //     offset: 0,
  //   });
  // };

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
    <div className="overflow-hidden">
      <div className="bghero min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-base-300 dark:via-base-200 dark:to-base-100 border-b">
                <div className="hero w-full relative z-10 flex items-center justify-center ">
          <div className="hero-content text-center mx-auto">
            <div className="max-w-3xl px-4 py-12  rounded-2xl ">
              <h1 className="text-4xl sm:text-7xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent pb-4">
                Track Your Character
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-6"></div>
              <p className="text-xl md:text-2xl text-secondary mb-10 max-w-2xl mx-auto">
                Track your characters items, spells and HP with this easy to use
                web app.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center mb-10">
                <Link to="/Signin">
                  <button className="btn btn-primary w-48 transition-all hover:scale-105 hover:shadow-lg">Login</button>
                </Link>

                <Link to="/account">
                  <button className="btn btn-primary w-48 transition-all hover:scale-105 hover:shadow-lg">
                    View Dashboard
                  </button>
                </Link>
                
                <Link to="/Blog">
                  <button className="btn btn-primary w-48 transition-all hover:scale-105 hover:shadow-lg">
                    View Our Blog
                  </button>
                </Link>
              </div>
              

                
                
                <div className="flex justify-center mt-24 max-h-36">
                  <ScrollContainer>
                    <ScrollPage>
                      <Animator animation={Spin(1)}>
                        <svg
                          className="stroke-secondary w-52"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 420 420"
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
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl text-center md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-12">
            Bring Your Character Sheet to the next level!
          </h1>
          

          <div
            id="Page2"
            className="page2 flex flex-col items-stretch lg:flex-row lg:flex-wrap justify-center gap-8 max-w-6xl mx-auto"
          >

<div className="feature-card flex flex-col md:flex-row lg:flex-col items-center bg-base-200 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-base-300 w-full lg:w-1/3 border-t-4 border-secondary">
  <svg
    className="fill-secondary w-24 h-24 md:mr-6 lg:mr-0 mb-4 lg:mb-6"
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
  <div className="text-center md:text-left lg:text-center">
    <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
      Track Everything You Need
    </h2>
    
    <ul className="flex flex-wrap justify-center md:justify-start lg:justify-center gap-4 mt-2">
      <li className="flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
        <span>Levels</span>
      </li>
      <li className="flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
        <span>Gold</span>
      </li>
      <li className="flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
        <span>Stats</span>
      </li>
      <li className="flex items-center">
        <span className="inline-block w-2 h-2 rounded-full bg-secondary mr-2"></span>
        <span>HP</span>
      </li>
    </ul>
  </div>
</div>  
            

            <div className="feature-card flex flex-col md:flex-row lg:flex-col items-center bg-base-200 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-base-300 w-full lg:w-1/3 border-t-4 border-secondary">
              <svg
                className="fill-secondary w-24 h-24 md:mr-6 lg:mr-0 mb-4 lg:mb-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M58.553 89 42.27 211.8H79V89H58.553zM97 89v122.8h38V89H97zm56 0v122.8h56.666v-17.6h92.668v17.6H359V89H153zm224 0v122.8h38V89h-38zm56 0v122.8h36.73L453.446 89H433zM227.666 212.2v105.2h56.668V212.2h-56.668zM256 223.794a18.667 16.103 0 0 1 18.666 16.1 18.667 16.103 0 0 1-9.666 14.09v37.214h-18V254a18.667 16.103 0 0 1-9.666-14.106 18.667 16.103 0 0 1 18.666-16.1zM41 229.8v127.915l19.334 18.23V229.8H41zm37.334 0v158h355.332v-158H302.334v105.6h-92.668V229.8H78.334zm373.332 0v146.145L471 357.715V229.8h-19.334zM41 382.456V423h43.002L41 382.455zm430 0L427.998 423H471v-40.545zM92 405.8l18.24 17.2h291.52L420 405.8H92z" />
              </svg>
              <div className="text-center md:text-left lg:text-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
                  Keep Your Items Safe
                </h2>
                <p className="leading-relaxed">
                  No more forgetting or double using one-time use items! Keep track of all your equipment in one place.
                </p>
              </div>
            </div>
            

            <div className="feature-card flex flex-col md:flex-row lg:flex-col items-center bg-base-200 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-base-300 w-full lg:w-1/3 border-t-4 border-secondary">
              <svg
                className="fill-secondary w-24 h-24 md:mr-6 lg:mr-0 mb-4 lg:mb-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
              >
                <path d="M512 64h64v192h-64V64zm0 576h64v192h-64V640zM160 480v-64h192v64H160zm576 0v-64h192v64H736zM249.856 199.04l45.248-45.184L430.848 289.6 385.6 334.848 249.856 199.104zM657.152 606.4l45.248-45.248 135.744 135.744-45.248 45.248L657.152 606.4zM114.048 923.2 68.8 877.952l316.8-316.8 45.248 45.248-316.8 316.8zM702.4 334.848 657.152 289.6l135.744-135.744 45.248 45.248L702.4 334.848z" />
              </svg>
              <div className="text-center md:text-left lg:text-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
                  Track Your Spells
                </h2>
                <p className="leading-relaxed">
                  Access to every 5e spell through the 5eAPI. Keep track of spell slots and prepared spells effortlessly.
                </p>
              </div>
            </div>
            
            {/* New Feature Card for Character Sharing */}
            <div className="feature-card flex flex-col md:flex-row lg:flex-col items-center bg-base-200 rounded-xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-base-300 w-full lg:w-1/3 border-t-4 border-secondary">
              <svg
                className="fill-secondary w-24 h-24 md:mr-6 lg:mr-0 mb-4 lg:mb-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <div className="text-center md:text-left lg:text-center">
                <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
                  Share With Your Party
                </h2>
                <p className="leading-relaxed">
                  Share your character sheet as read-only so other players can see your stats without being able to edit anything!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col items-center justify-center mt-24 px-4">
          <div className="bg-base-200 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border-t-4 border-primary">
            <h1 className="text-2xl text-center md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-8">
              Log In with your Google Account Now To Get Started
            </h1>
            <div className="flex justify-center">
              <Link to="/Signin">
                <button className="btn btn-primary btn-lg w-48 transition-transform hover:scale-110 shadow-md hover:shadow-xl">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;