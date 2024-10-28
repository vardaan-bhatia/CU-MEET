import Navbar from "@/components/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Video, Plus } from "lucide-react"; // Importing icons
import { people } from "@/lib/people";
import { useState } from "react";
import SignupFormDemo from "@/components/example/signup-form-demo";
export default function Home() {
  const [input, setinput] = useState(false);

  const handleInput = () => {
    setinput(true);
  };
  return (
    <>
      <AuroraBackground>
        <Navbar />
        {input ? (
          <div className="flex items-center justify-center min-h-screen px-6">
            <SignupFormDemo />
          </div>
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-bold text-white mb-4 md:text-7xl max-w-7xl">
              Welcome to CU-Meet, the Seamless Video Conferencing Platform
            </h1>
            <p className="text-base sm:text-xl text-gray-200 max-w-4xl mb-8 mt-2">
              Connect, collaborate, and communicate effortlessly with friends
              and colleagues on a platform designed for all your video
              conferencing needs.
            </p>
            <div className="mb-14">
              {" "}
              <div className="flex sm:flex-row gap-2 sm:gap-0 flex-col mb-2 items-center justify-center">
                {" "}
                <div className="flex flex-row">
                  {" "}
                  <AnimatedTooltip items={people} />
                </div>
                <span className="text-xl ml-6 ">⭐⭐⭐⭐⭐</span>
              </div>
              <span className="text-gray-200 text-center">
                Trusted by many users. Product by{" "}
                <a
                  href="https://www.linkedin.com/in/vardaan-bhatia-028446203/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Vardaan Bhatia
                </a>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {
                <button
                  onClick={handleInput}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-black font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-transparent hover:text-white hover:shadow-lg"
                >
                  <Video className="w-5 h-5" />
                  Join Room
                </button>
              }
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-transparent hover:shadow-lg">
                <Plus className="w-5 h-5" />
                Create Room
              </button>
            </div>
          </div>
        )}
      </AuroraBackground>
    </>
  );
}
