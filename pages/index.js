import Navbar from "../components/Navbar";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Video, Plus } from "lucide-react"; // Importing icons
import { people } from "@/lib/people";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useModal } from "@/context/modalContext";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { openModal } = useModal();
  const router = useRouter();

  const createRoom = () => {
    const roomId = uuidv4();

    router.push(`/${roomId}`);
  };

  return (
    <AuroraBackground>
      <Navbar />
      <Modal />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl mt-10 sm:mt-0 font-bold text-white mb-2 sm:mb-4 md:text-7xl max-w-7xl">
          Welcome to CU-Meet, the Seamless Video Conferencing Platform
        </h1>
        <p className="text-base sm:text-xl text-gray-200 max-w-4xl mb-16 mt-2">
          Connect, collaborate, and communicate effortlessly with friends and
          colleagues on a platform designed for all your video conferencing
          needs.
        </p>

        <div className="mb-8 sm:mb-16">
          <div className="flex sm:flex-row gap-2 sm:gap-0 flex-col mb-2 items-center justify-center">
            <div className="flex flex-row">
              <AnimatedTooltip items={people} />
            </div>
            <span className="text-xl ml-6">⭐⭐⭐⭐⭐</span>
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

        <div className="flex flex-col sm:flex-row gap-5">
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-200 text-black font-semibold text-sm sm:text-lg transition duration-200 hover:bg-transparent hover:text-white hover:shadow-lg"
            onClick={openModal}
          >
            <Video className="w-5 h-5" />
            Join or Create a Room
          </button>
          <button
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white font-semibold text-sm sm:text-lg transition duration-200 hover:bg-transparent hover:shadow-lg"
            onClick={createRoom}
          >
            <Plus className="w-5 h-5" />
            Start Instant Meeting
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
}
