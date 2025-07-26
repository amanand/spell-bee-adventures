import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  backgroundImage?: string;
  difficulty: "easy" | "medium" | "hard";
  onPlay: () => void;
  isLocked?: boolean;
}

export const GameCard = ({ 
  title, 
  description, 
  icon, 
  backgroundImage,
  difficulty, 
  onPlay, 
  isLocked = false 
}: GameCardProps) => {
  const difficultyColors = {
    easy: "bg-secondary text-secondary-foreground",
    medium: "bg-primary text-primary-foreground", 
    hard: "bg-accent text-accent-foreground"
  };

  return (
    <Card className="group relative overflow-hidden bg-card hover:shadow-magic transition-all duration-300 hover:scale-105 cursor-pointer">
      {/* Background image if provided */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Lock overlay for locked games */}
      {isLocked && (
        <div className="absolute inset-0 bg-muted/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-sm text-muted-foreground">Complete previous adventures!</p>
          </div>
        </div>
      )}

      <div className="relative z-5 p-6">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-gradient-honey rounded-full flex items-center justify-center shadow-honey group-hover:animate-bounce-gentle">
            {icon}
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          {/* Difficulty badge */}
          <div className="flex justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>

          {/* Play button */}
          <div className="pt-2">
            <Button 
              variant="adventure" 
              size="sm"
              onClick={onPlay}
              disabled={isLocked}
              className="group-hover:scale-105"
            >
              {isLocked ? "Locked" : "Start Adventure!"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};