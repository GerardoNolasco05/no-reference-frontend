import { useState } from "react";
import "../app.css"; // Adjust path if needed

export default function LandingPage() {
  const [isGlitching, setIsGlitching] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseMove = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!isGlitching) setIsGlitching(true);

    // stop the glitch shortly after mouse stops moving
    timeoutId = setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <div
      className={`glitch flex items-center justify-center text-white ${
        isGlitching ? "glitch-active" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      <h1 className="text-5xl">
        <span className="font-light">no</span>
        <span className="font-bold">reference</span>
      </h1>
    </div>
  );
}
