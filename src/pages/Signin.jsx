import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaDiceD20 } from "react-icons/fa";

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user, navigate]);

  return (
    <div className="bghero min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="hero w-full relative z-10 flex items-center justify-center">
        <div className="hero-content text-center">
          <div className="max-w-md px-8 py-12 bg-base-100 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-2xl border-t-4 border-secondary">
            <div className="flex justify-center mb-6">
              <FaDiceD20 className="text-secondary w-16 h-16" />
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-4">
              Welcome to DnD Tracker
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full mb-6"></div>
            
            <p className="text-base-content opacity-90 mb-8">
              Sign in with your Google account to access all features and track your character progress.
            </p>
            
            <div className="flex justify-center mb-4">
              <div className="transform transition-transform hover:scale-105">
                <GoogleButton onClick={handleGoogleSignIn} />
              </div>
            </div>
            

          </div>
        </div>
      </div>
      

    </div>
  );
};

export default Signin;