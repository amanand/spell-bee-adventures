import { useState } from "react";
import { SpellyCharacter } from "@/components/SpellyCharacter";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import forestBackground from "@/assets/forest-background.png";
import gardenBackground from "@/assets/garden-background.png";
import unscramblerMachine from "@/assets/unscrambler-machine.png";

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: "picture-puzzle",
      title: "Picture Puzzle Garden",
      description: "Help Spelly plant the right words for each picture!",
      icon: "🌻",
      backgroundImage: gardenBackground,
      difficulty: "easy" as const,
      isLocked: false
    },
    {
      id: "word-maze", 
      title: "Word Cloud Maze",
      description: "Navigate through clouds to find the correct spellings!",
      icon: "☁️",
      difficulty: "medium" as const,
      isLocked: false
    },
    {
      id: "unscrambler",
      title: "Mystery Unscrambler",
      description: "Use the magical machine to unscramble jumbled words!",
      icon: "⚙️",
      backgroundImage: unscramblerMachine,
      difficulty: "medium" as const,
      isLocked: false
    },
    {
      id: "letter-river",
      title: "Alphabet River",
      description: "Cross the river by filling in the missing letters!",
      icon: "🌊",
      difficulty: "hard" as const,
      isLocked: true
    }
  ];

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    // TODO: Navigate to specific game component
    console.log(`Starting game: ${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Background forest image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${forestBackground})` }}
      />
      
      {/* Floating magical particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-accent rounded-full animate-sparkle opacity-50" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary-glow rounded-full animate-bounce-gentle opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with Spelly */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <SpellyCharacter size="large" mood="excited" />
          </div>
          
          <h1 className="text-5xl font-bold text-foreground mb-4 animate-bounce-gentle">
            Spelly's Spell Bee Adventure!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Spelly the bee on magical adventures through enchanted worlds where words come to life! 
            Choose your spelling challenge and let the magic begin! ✨
          </p>

          <Button variant="magic" size="hero" className="animate-glow">
            🎯 View My Progress
          </Button>
        </div>

        {/* Game Selection Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Choose Your Adventure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                icon={game.icon}
                backgroundImage={game.backgroundImage}
                difficulty={game.difficulty}
                onPlay={() => handleGameSelect(game.id)}
                isLocked={game.isLocked}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="flex justify-center mb-4">
            <SpellyCharacter size="medium" mood="happy" />
          </div>
          <p className="text-lg text-muted-foreground">
            "Let's make spelling magical! Click on any adventure to begin!" - Spelly 🐝
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
