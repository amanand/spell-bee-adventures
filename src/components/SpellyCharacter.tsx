import { useState } from "react";
import spellyImage from "@/assets/spelly-character.png";

interface SpellyCharacterProps {
  className?: string;
  mood?: "happy" | "excited" | "thinking" | "celebrating";
  size?: "small" | "medium" | "large";
}

export const SpellyCharacter = ({ 
  className = "", 
  mood = "happy", 
  size = "medium" 
}: SpellyCharacterProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24", 
    large: "w-32 h-32"
  };

  const moodAnimations = {
    happy: "animate-float",
    excited: "animate-bounce-gentle",
    thinking: "animate-wiggle",
    celebrating: "animate-sparkle"
  };

  return (
    <div 
      className={`relative ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={spellyImage}
        alt="Spelly the Bee"
        className={`w-full h-full object-contain transition-all duration-300 ${moodAnimations[mood]} ${
          isHovered ? "scale-110 filter brightness-110" : ""
        }`}
      />
      
      {/* Magical sparkles when hovered */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-sparkle opacity-80" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-full animate-sparkle delay-300 opacity-60" />
          <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-primary-glow rounded-full animate-sparkle delay-500 opacity-70" />
        </>
      )}
    </div>
  );
};