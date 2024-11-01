// Loading.js
import React from "react";
import { FadeLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div
      style={{ textAlign: "center", color: "#fff" }}
      className="items-center flex flex-col justify-center gap-5"
    >
      {" "}
      {/* Center the text and set color */}
      <FadeLoader color="#fff" size={60} />{" "}
    </div>
  );
};
