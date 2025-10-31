import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import "../app.css"; // Adjust path if needed

export default function LandingPage() {
  const [isGlitching, setIsGlitching] = useState(false);
  let timeoutId: NodeJS.Timeout;
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate(); // ✅ added

  const handleMouseMove = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!isGlitching) setIsGlitching(true);

    // stop the glitch shortly after mouse stops moving
    timeoutId = setTimeout(() => setIsGlitching(false), 300);
  };

  // when clicking "noreference", show video and play with sound
  const handleClick = () => {
    setShowVideo(true);
    // give React a tick to mount the <video>, then play with audio
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = 1;
        videoRef.current.play().catch(() => {
          /* if a browser blocks it, you can show controls as a fallback */
        });
      }
    }, 0);
  };

  // ✅ new: navigate when video finishes
  const handleVideoEnd = () => {
    navigate("/home");
  };

  return (
    <div
      className={`relative glitch flex items-center justify-center text-white ${
        isGlitching ? "glitch-active" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Background video */}
      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          src="/videos/walker.mp4"
          autoPlay
          playsInline
          onEnded={handleVideoEnd} // ✅ added
        />
      )}

      <h1
        className="text-2xl relative z-10 -mt-15 -ml-62 text-black cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-light">no</span>
        <span className="font-bold">reference</span>
      </h1>
    </div>
  );
}
