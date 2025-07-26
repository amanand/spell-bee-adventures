import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpellyCharacter } from "@/components/SpellyCharacter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRandomWords, Word } from "@/data/wordsData";
import { toast } from "sonner";
import unscramblerMachine from "@/assets/unscrambler-machine.png";

export const UnscramblerGame = () => {
  const navigate = useNavigate();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const totalQuestions = 6;

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const scrambleWord = (word: string): string[] => {
    const letters = word.toUpperCase().split('');
    // Fisher-Yates shuffle
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  };

  const generateNewQuestion = () => {
    const randomWords = getRandomWords(1);
    const word = randomWords[0];
    const scrambled = scrambleWord(word.word);
    
    setCurrentWord(word);
    setScrambledLetters(scrambled);
    setUserAnswer([]);
    setIsChecking(false);
  };

  const handleLetterClick = (index: number) => {
    if (isChecking) return;
    
    const letter = scrambledLetters[index];
    setUserAnswer([...userAnswer, letter]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
  };

  const handleRemoveLetter = (index: number) => {
    if (isChecking) return;
    
    const letter = userAnswer[index];
    setScrambledLetters([...scrambledLetters, letter]);
    setUserAnswer(userAnswer.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    if (userAnswer.length !== currentWord?.word.length) {
      toast.error("Please use all the letters!");
      return;
    }

    setIsChecking(true);
    const userWord = userAnswer.join('').toLowerCase();
    const correctWord = currentWord?.word.toLowerCase() || '';
    
    setTimeout(() => {
      const isCorrect = userWord === correctWord;
      
      if (isCorrect) {
        setScore(score + 1);
        toast.success("🎉 Perfect! The machine is happy!");
      } else {
        toast.error(`🔧 Oops! The answer was "${currentWord?.word.toUpperCase()}"`);
      }

      const newQuestionsAnswered = questionsAnswered + 1;
      setQuestionsAnswered(newQuestionsAnswered);

      if (newQuestionsAnswered >= totalQuestions) {
        setGameComplete(true);
      } else {
        setTimeout(() => generateNewQuestion(), 2000);
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
        <div className="relative z-10 container mx-auto px-4 py-8 text-center">
          <SpellyCharacter size="large" mood={spellyMood} className="mx-auto mb-6" />
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {percentage >= 80 ? "🎉 Master Unscrambler!" : percentage >= 60 ? "⚙️ Well Done!" : "🔧 Keep Trying!"}
          </h1>
          
          <Card className="max-w-md mx-auto p-8 bg-card/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Machine Mission Complete!</h2>
            <div className="text-6xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 60 ? "⚙️" : "🔧"}</div>
            <p className="text-xl mb-2">Score: {score}/{totalQuestions}</p>
            <p className="text-lg text-muted-foreground mb-6">{percentage}% Correct!</p>
            
            <div className="space-y-3">
              <Button variant="magic" onClick={restartGame} className="w-full">
                🔧 Fix More Words
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
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back to Adventures
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Mystery Unscrambler</h1>
            <div className="text-lg text-muted-foreground">
              Word {questionsAnswered + 1} of {totalQuestions} • Score: {score}
            </div>
          </div>
          
          <SpellyCharacter size="medium" mood="thinking" />
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/90 backdrop-blur-sm shadow-magic">
            {currentWord && (
              <>
                {/* Machine Image */}
                <div className="text-center mb-8">
                  <img 
                    src={unscramblerMachine} 
                    alt="Unscrambler Machine"
                    className="w-32 h-32 mx-auto mb-4 animate-wiggle"
                  />
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Fix the Word Machine! ⚙️
                  </h2>
                  <div className="bg-primary/10 p-6 rounded-2xl mb-6">
                    <p className="text-lg text-foreground font-medium">
                      💭 <strong>Clue:</strong> {currentWord.clue}
                    </p>
                  </div>
                </div>

                {/* Scrambled Letters */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-center mb-4">Broken Letters:</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {scrambledLetters.map((letter, index) => (
                      <Button
                        key={`scrambled-${index}`}
                        variant="outline"
                        size="lg"
                        onClick={() => handleLetterClick(index)}
                        disabled={isChecking}
                        className="w-12 h-12 text-xl font-bold hover:scale-110 transition-transform"
                      >
                        {letter}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* User Answer */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-center mb-4">Your Word:</h3>
                  <div className="flex flex-wrap justify-center gap-2 min-h-[60px] bg-muted/30 rounded-lg p-4">
                    {userAnswer.map((letter, index) => (
                      <Button
                        key={`answer-${index}`}
                        variant="magic"
                        size="lg"
                        onClick={() => handleRemoveLetter(index)}
                        disabled={isChecking}
                        className="w-12 h-12 text-xl font-bold hover:scale-110 transition-transform"
                      >
                        {letter}
                      </Button>
                    ))}
                    {userAnswer.length === 0 && (
                      <p className="text-muted-foreground self-center">Click letters to build your word!</p>
                    )}
                  </div>
                </div>

                {/* Check Button */}
                <div className="text-center mb-6">
                  <Button
                    variant="adventure"
                    size="lg"
                    onClick={checkAnswer}
                    disabled={userAnswer.length !== currentWord.word.length || isChecking}
                    className="px-12"
                  >
                    {isChecking ? "🔧 Checking..." : "⚙️ Fix the Machine!"}
                  </Button>
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