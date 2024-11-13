import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, Home } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ThankYou from "@/components/thankyou";
import { StarRating } from "@/components/StarRating";

const SessionEnd = () => {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ThankYou />;
  }

  return (
    <AuroraBackground>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-black/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all border border-white/10">
          <div className="text-center">
            <div className="mb-6">
              <Send className="w-12 h-12 text-white mx-auto animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Goodbye ! 👋</h1>
            <p className="text-gray-300 text-lg mb-8">
              We loved having you here. How was your experience?
            </p>

            <div className="flex justify-center space-x-2 mb-8">
              <StarRating size={5} />
            </div>

            <textarea
              placeholder="Share your thoughts with us..."
              className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-white resize-none border border-gray-800"
              rows="3"
            />

            <div className="flex space-x-4">
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transform hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Submit Feedback</span>
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-gray-900 rounded-lg text-white font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all flex items-center justify-center border border-gray-800"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default SessionEnd;
