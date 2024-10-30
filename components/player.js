import ReactPlayer from "react-player";
import React from "react";

export const Player = (props) => {
  const { playerId, url, muted, playing } = props;
  return (
    <div>
      <ReactPlayer url={url} muted={muted} playing={playing} key={playerId} />
    </div>
  );
};
