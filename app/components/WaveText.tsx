import React from "react";

type WaveTextProps = {
  text: string;
  delayStep?: number; // how much delay between letters
  className?: string;
};

export default function WaveText({ text, delayStep = 0.12, className = "" }: WaveTextProps) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-letter"
          style={{ animationDelay: `${i * delayStep}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
