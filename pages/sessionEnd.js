import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, Home, Heart } from "lucide-react";

const SessionEnd = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setFeedback("");
      setRating(0);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-[#0290F7] mx-auto animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 mb-6">
            Your feedback means the world to us!
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#0290F7] to-[#0260A7] rounded-lg text-white font-semibold hover:from-[#0280D7] hover:to-[#025097] transform hover:scale-105 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all border border-[#0290F7]/10">
        <div className="text-center">
          <div className="mb-6">
            <Send className="w-12 h-12 text-[#0290F7] mx-auto animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-[#0290F7]  bg-clip-text text-transparent mb-4">
            Goodbye ! 👋
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            We loved having you here. How was your experience?
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transform hover:scale-110 transition-all"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? "fill-[#0290F7] text-[#0290F7]"
                      : "text-gray-500"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts with us..."
            className="w-full px-4 py-3 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 mb-6 focus:outline-none focus:ring-2 focus:ring-[#0290F7] resize-none border border-gray-700"
            rows="3"
          />

          <div className="flex space-x-4">
            <button
              onClick={handleSubmitFeedback}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0290F7] to-[#64B5F6] rounded-lg text-white font-semibold hover:from-[#0280D7] hover:to-[#5495D6] transform hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#0290F7]/20"
            >
              <Send className="w-4 h-4" />
              <span>Submit Feedback</span>
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gray-700/50 rounded-lg text-white font-semibold hover:bg-gray-600/50 transform hover:scale-105 transition-all flex items-center justify-center border border-gray-600"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEnd;
