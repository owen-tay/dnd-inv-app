import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  }, [user]);

  return (
    <div>
      <div className="bghero h-screen -mt-12">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className=" max-w-3xl mb-36">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Sign In With Google Below.{" "}
              </h1>
              <div className="max-w-[240px] m-auto py-4">
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
