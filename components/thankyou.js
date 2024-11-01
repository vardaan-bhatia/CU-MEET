import React from "react";
import { useRouter } from "next/navigation";
import { Heart, Home } from "lucide-react";
import { AuroraBackground } from "./ui/aurora-background";

const ThankYou = () => {
  const router = useRouter();

  return (
    <AuroraBackground>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-white mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-lg text-white mb-6">
            Your feedback helps us grow!
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all flex items-center justify-center mx-auto space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default ThankYou;
