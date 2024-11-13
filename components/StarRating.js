import { Star } from "lucide-react";
import React, { useState } from "react";

export const StarRating = ({ size }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      {Array.from({ length: size }).map((_, index) => (
        <button
          key={index}
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={`w-8 h-8 ${
              index < (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-500"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};
