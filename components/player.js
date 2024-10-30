// Player.js
import ReactPlayer from "react-player";
import React from "react";

export const Player = ({ playerId, stream, muted, playing }) => {
  return (
    <div>
      <ReactPlayer
        url={stream}
        muted={muted}
        playing={playing}
        key={playerId}
      />
    </div>
  );
};
