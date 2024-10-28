import Navbar from "@/components/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Video, Plus } from "lucide-react"; // Importing icons
import { people } from "@/lib/people";
export default function Home() {
  return (
    <>
      <AuroraBackground>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-4 md:text-7xl max-w-7xl">
            Welcome to CU-Meet, the Seamless Video Conferencing Platform
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-4xl mb-8 mt-2">
            Connect, collaborate, and communicate effortlessly with friends and
            colleagues on a platform designed for all your video conferencing
            needs.
          </p>
          <div className="mb-14">
            {" "}
            <span className="flex flex-row mb-2 items-center justify-center">
              {" "}
              <AnimatedTooltip items={people} />
              <span className="text-xl ml-6">⭐⭐⭐⭐⭐</span>
            </span>
            <span className="text-gray-200">Tursted by many users</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-black font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-gray-300 hover:shadow-lg">
              <Video className="w-5 h-5" />
              Join Room
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-gray-950 hover:shadow-lg">
              <Plus className="w-5 h-5" />
              Create Room
            </button>
          </div>
        </div>
      </AuroraBackground>
    </>
  );
}
