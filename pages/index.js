import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <>
      <AuroraBackground>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold text-white mb-4 md:text-7xl max-w-7xl">
            Welcome to CU-Meet, the Seamless Video Conferencing Platform
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-5xl mb-8">
            Connect, collaborate, and communicate effortlessly with friends and
            colleagues on a platform designed for all your video conferencing
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-gray-800 hover:shadow-lg cursor-pointer">
              Join Room
            </button>
            <button className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-lg transition transform duration-200 ease-in-out hover:bg-gray-800 hover:shadow-lg cursor-pointer">
              Create Room
            </button>
          </div>
        </div>
      </AuroraBackground>
    </>
  );
}
