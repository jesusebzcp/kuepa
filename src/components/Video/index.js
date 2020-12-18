import React from "react";

const Video = () => {
  return (
    <div className="contIframe">
      <iframe
        width={560}
        height={315}
        src="https://www.youtube.com/embed/JkkVchGIUsE"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <h4>Matemáticas (clase en vivo)</h4>
    </div>
  );
};

export default Video;
