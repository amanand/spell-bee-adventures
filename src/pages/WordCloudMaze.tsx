import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpellyCharacter } from "@/components/SpellyCharacter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRandomWords, Word } from "@/data/wordsData";
import { toast } from "sonner";
import forestBackground from "@/assets/forest-background.png";

export const WordCloudMaze = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const totalQuestions = 10;

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateIncorrectSpellings = (word: string): string[] => {
    const variations = [];
    const letters = word.toLowerCase();
    
    // Common spelling mistakes
    const replacements = [
      ['c', 'k'], ['k', 'c'], ['ph', 'f'], ['f', 'ph'],
      ['s', 'z'], ['z', 's'], ['i', 'y'], ['y', 'i'],
      ['e', 'a'], ['a', 'e'], ['o', 'u'], ['u', 'o']
    ];
    
    // Double letters
    if (letters.length > 3) {
      for (let i = 0; i < letters.length - 1; i++) {
        if (letters[i] !== letters[i + 1]) {
          const doubled = letters.slice(0, i + 1) + letters[i] + letters.slice(i + 1);
          variations.push(doubled);
        }
      }
    }
    
    // Letter substitutions
    replacements.forEach(([from, to]) => {
      if (letters.includes(from)) {
        variations.push(letters.replace(new RegExp(from, 'g'), to));
      }
    });
    
    // Remove/add letters
    if (letters.length > 4) {
      variations.push(letters.slice(0, -1)); // Remove last letter
      variations.push(letters.slice(1)); // Remove first letter
    }
    
    // Add extra letters
    variations.push(letters + letters[letters.length - 1]); // Double last letter
    variations.push(letters[0] + letters); // Double first letter
    
    // Filter out the original word and return 3 variations
    const filtered = variations
      .filter(v => v !== letters && v.length > 2)
      .slice(0, 3);
    
    // If we don't have enough variations, create some manual ones
    while (filtered.length < 3) {
      const randomPos = Math.floor(Math.random() * letters.length);
      const randomChar = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
      const variation = letters.slice(0, randomPos) + randomChar + letters.slice(randomPos + 1);
      if (!filtered.includes(variation) && variation !== letters) {
        filtered.push(variation);
      }
    }
    
    return filtered.slice(0, 3);
  };

  const generateNewQuestion = () => {
    const randomWords = getRandomWords(1);
    const correctWord = randomWords[0];
    const incorrectSpellings = generateIncorrectSpellings(correctWord.word);
    const allOptions = [correctWord.word.toLowerCase(), ...incorrectSpellings];
    
    // Shuffle the options
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    
    setCurrentWord(correctWord);
    setWordOptions(shuffledOptions);
    setSelectedAnswer(null);
  };

  const handleAnswer = (selectedWord: string) => {
    setSelectedAnswer(selectedWord);
    
    setTimeout(() => {
      const isCorrect = selectedWord === currentWord?.word.toLowerCase();
      
      if (isCorrect) {
        setScore(score + 1);
        toast.success("✨ Perfect! You found the right path!");
      } else {
        toast.error(`🌫️ Wrong path! The correct spelling was "${currentWord?.word}"`);
      }

      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= totalQuestions) {
        setGameComplete(true);
      } else {
        setTimeout(() => generateNewQuestion(), 1500);
      }
    }, 1000);
  };

  const restartGame = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setGameComplete(false);
    generateNewQuestion();
  };

  if (gameComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const spellyMood = percentage >= 80 ? "celebrating" : percentage >= 60 ? "happy" : "thinking";

    return (
      <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${forestBackground})` }}
        />
        
        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <SpellyCharacter size="large" mood={spellyMood} className="mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {percentage >= 80 ? "🎉 Maze Master!" : percentage >= 60 ? "🌟 Great Explorer!" : "🌫️ Keep Exploring!"}
          </h1>
          
          <Card className="max-w-md mx-auto p-8 bg-card/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Word Cloud Adventure Complete!</h2>
            <div className="text-6xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "🌫️"}</div>
            <p className="text-xl mb-2">Score: {score}/{totalQuestions}</p>
            <p className="text-lg text-muted-foreground mb-6">{percentage}% Correct!</p>
            
            <div className="space-y-3">
              <Button variant="magic" onClick={restartGame} className="w-full">
                🌫️ Navigate Again
              </Button>
              <Button variant="adventure" onClick={() => navigate("/")} className="w-full">
                🏠 Back to Adventures
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${forestBackground})` }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Adventures
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Word Cloud Maze</h1>
            <div className="text-lg text-muted-foreground">
              Cloud {questionsAnswered + 1} of {totalQuestions} • Score: {score}
            </div>
          </div>
          
          <SpellyCharacter size="medium" mood="thinking" />
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-magic">
            {currentWord && (
              <>
                {/* Instructions */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Navigate through the misty maze! 🌫️
                  </h2>
                  <div className="bg-primary/10 p-6 rounded-2xl mb-6">
                    <p className="text-lg text-foreground font-medium">
                      💭 <strong>Find the correct spelling:</strong> {currentWord.clue}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Choose the path with the correctly spelled word!
                    </p>
                  </div>
                </div>

                {/* Word Cloud Options */}
                <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {wordOptions.map((word, index) => {
                    const isSelected = selectedAnswer === word;
                    const isCorrect = word === currentWord.word.toLowerCase();
                    const showResult = selectedAnswer !== null;
                    
                    let buttonVariant: "default" | "magic" | "destructive" | "outline" = "outline";
                    if (showResult) {
                      if (isCorrect) buttonVariant = "magic";
                      else if (isSelected) buttonVariant = "destructive";
                    }

                    return (
                      <div key={index} className="relative">
                        {/* Cloud background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl blur-sm transform rotate-1" />
                        <div className="absolute inset-0 bg-gradient-to-tl from-white/15 to-white/10 rounded-3xl blur-sm transform -rotate-1" />
                        
                        <Button
                          variant={buttonVariant}
                          size="lg"
                          onClick={() => !selectedAnswer && handleAnswer(word)}
                          disabled={selectedAnswer !== null}
                          className="relative w-full h-20 text-xl font-bold transition-all duration-300 hover:scale-105 bg-white/80 hover:bg-white/90 text-foreground border-2 border-white/50"
                        >
                          {showResult && isCorrect && "✨ "}
                          {showResult && isSelected && !isCorrect && "❌ "}
                          <span className="relative z-10">{word.toUpperCase()}</span>
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="bg-muted rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-honey h-full transition-all duration-500"
                      style={{ width: `${((questionsAnswered) / totalQuestions) * 100}%` }}
                    />
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-2">
                    Progress: {questionsAnswered}/{totalQuestions} completed
                  </p>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};