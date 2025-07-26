import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpellyCharacter } from "@/components/SpellyCharacter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRandomWords, Word } from "@/data/wordsData";
import { toast } from "sonner";
import gardenBackground from "@/assets/garden-background.png";

export const PicturePuzzleGame = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [wordOptions, setWordOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const totalQuestions = 8;

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const randomWords = getRandomWords(4);
    const correctWord = randomWords[0];
    const options = randomWords.map(w => w.word).sort(() => Math.random() - 0.5);
    
    setCurrentWord(correctWord);
    setWordOptions(options);
    setSelectedAnswer(null);
  };

  const handleAnswer = (selectedWord: string) => {
    setSelectedAnswer(selectedWord);
    
    setTimeout(() => {
      const isCorrect = selectedWord === currentWord?.word;
      
      if (isCorrect) {
        setScore(score + 1);
        toast.success("🌟 Correct! Spelly is so proud!");
      } else {
        toast.error(`💔 Oops! The answer was "${currentWord?.word}"`);
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
          style={{ backgroundImage: `url(${gardenBackground})` }}
        />
        
        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <SpellyCharacter size="large" mood={spellyMood} className="mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {percentage >= 80 ? "🎉 Fantastic!" : percentage >= 60 ? "🌟 Well Done!" : "💪 Keep Practicing!"}
          </h1>
          
          <Card className="max-w-md mx-auto p-8 bg-card/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Garden Adventure Complete!</h2>
            <div className="text-6xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : "🌱"}</div>
            <p className="text-xl mb-2">Score: {score}/{totalQuestions}</p>
            <p className="text-lg text-muted-foreground mb-6">{percentage}% Correct!</p>
            
            <div className="space-y-3">
              <Button variant="magic" onClick={restartGame} className="w-full">
                🌻 Plant Again
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
        style={{ backgroundImage: `url(${gardenBackground})` }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Adventures
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Picture Puzzle Garden</h1>
            <div className="text-lg text-muted-foreground">
              Question {questionsAnswered + 1} of {totalQuestions} • Score: {score}
            </div>
          </div>
          
          <SpellyCharacter size="medium" mood="thinking" />
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-magic">
            {currentWord && (
              <>
                {/* Clue */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Help Spelly plant the right word! 🌱
                  </h2>
                  <div className="bg-primary/10 p-6 rounded-2xl mb-6">
                    <p className="text-lg text-foreground font-medium">
                      💭 <strong>Clue:</strong> {currentWord.clue}
                    </p>
                  </div>
                </div>

                {/* Word Options */}
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {wordOptions.map((word, index) => {
                    const isSelected = selectedAnswer === word;
                    const isCorrect = word === currentWord.word;
                    const showResult = selectedAnswer !== null;
                    
                    let buttonVariant: "default" | "magic" | "destructive" = "default";
                    if (showResult) {
                      if (isCorrect) buttonVariant = "magic";
                      else if (isSelected) buttonVariant = "destructive";
                    }

                    return (
                      <Button
                        key={index}
                        variant={buttonVariant}
                        size="lg"
                        onClick={() => !selectedAnswer && handleAnswer(word)}
                        disabled={selectedAnswer !== null}
                        className="h-16 text-lg font-bold transition-all duration-300"
                      >
                        {showResult && isCorrect && "✅ "}
                        {showResult && isSelected && !isCorrect && "❌ "}
                        {word.toUpperCase()}
                      </Button>
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