export interface Word {
  word: string;
  category: 'english' | 'evs' | 'math-ict';
  difficulty: 'easy' | 'medium' | 'hard';
  clue?: string;
  imagePrompt?: string;
}

export const wordsData: Word[] = [
  // ENGLISH Words
  { word: 'branch', category: 'english', difficulty: 'easy', clue: 'A part of a tree that grows out from the trunk', imagePrompt: 'A tree branch with leaves' },
  { word: 'swing', category: 'english', difficulty: 'easy', clue: 'A seat hanging from ropes or chains', imagePrompt: 'A playground swing' },
  { word: 'nibble', category: 'english', difficulty: 'medium', clue: 'To take small bites', imagePrompt: 'A mouse nibbling cheese' },
  { word: 'quite', category: 'english', difficulty: 'medium', clue: 'To a certain extent; fairly', imagePrompt: 'Someone looking satisfied' },
  { word: 'beehive', category: 'english', difficulty: 'easy', clue: 'A home where bees live', imagePrompt: 'A wooden beehive with bees flying around' },
  { word: 'scare', category: 'english', difficulty: 'easy', clue: 'To frighten someone', imagePrompt: 'A child looking scared' },
  { word: 'ashamed', category: 'english', difficulty: 'hard', clue: 'Feeling embarrassed or guilty', imagePrompt: 'Someone looking down with embarrassment' },
  { word: 'noise', category: 'english', difficulty: 'easy', clue: 'A loud or unpleasant sound', imagePrompt: 'Sound waves or loud music' },
  { word: 'lovely', category: 'english', difficulty: 'medium', clue: 'Beautiful or attractive', imagePrompt: 'A beautiful flower garden' },

  // EVS Words  
  { word: 'dislikes', category: 'evs', difficulty: 'medium', clue: 'Things you do not enjoy', imagePrompt: 'Someone making a displeased face' },
  { word: 'hobbies', category: 'evs', difficulty: 'medium', clue: 'Activities you enjoy in your free time', imagePrompt: 'Art supplies, books, and sports equipment' },
  { word: 'cartoons', category: 'evs', difficulty: 'easy', clue: 'Animated shows for children', imagePrompt: 'A TV showing colorful cartoon characters' },
  { word: 'mangoes', category: 'evs', difficulty: 'easy', clue: 'Sweet yellow tropical fruits', imagePrompt: 'Fresh ripe mangoes on a tree' },
  { word: 'family', category: 'evs', difficulty: 'easy', clue: 'People related to you', imagePrompt: 'A happy family together' },
  { word: 'siblings', category: 'evs', difficulty: 'hard', clue: 'Your brothers and sisters', imagePrompt: 'Children playing together' },
  { word: 'surname', category: 'evs', difficulty: 'hard', clue: 'Your family name or last name', imagePrompt: 'A name tag or ID card' },
  { word: 'nuclear', category: 'evs', difficulty: 'hard', clue: 'A small family with parents and children', imagePrompt: 'Parents with their children' },
  { word: 'brother', category: 'evs', difficulty: 'easy', clue: 'A male sibling', imagePrompt: 'Two boys playing together' },
  { word: 'parents', category: 'evs', difficulty: 'easy', clue: 'Your mother and father', imagePrompt: 'A mom and dad together' },

  // MATH/ICT Words
  { word: 'zero', category: 'math-ict', difficulty: 'easy', clue: 'The number that means nothing', imagePrompt: 'The number 0 in colorful digits' },
  { word: 'eleven', category: 'math-ict', difficulty: 'medium', clue: 'The number that comes after ten', imagePrompt: 'The number 11 with dots or objects' },
  { word: 'nineteen', category: 'math-ict', difficulty: 'hard', clue: 'The number between eighteen and twenty', imagePrompt: 'The number 19 with counting objects' },
  { word: 'forty', category: 'math-ict', difficulty: 'medium', clue: 'Four groups of ten', imagePrompt: 'The number 40 with groups of ten' },
  { word: 'count', category: 'math-ict', difficulty: 'easy', clue: 'To say numbers in order', imagePrompt: 'Fingers counting numbers' },
  { word: 'robots', category: 'math-ict', difficulty: 'easy', clue: 'Machines that can move and work', imagePrompt: 'Friendly colorful robots' },
  { word: 'drones', category: 'math-ict', difficulty: 'medium', clue: 'Flying machines without pilots', imagePrompt: 'A drone flying in the sky' },
  { word: 'laptops', category: 'math-ict', difficulty: 'medium', clue: 'Portable computers', imagePrompt: 'An open laptop computer' },
  { word: 'tablets', category: 'math-ict', difficulty: 'medium', clue: 'Flat touch-screen devices', imagePrompt: 'A tablet with colorful apps' },
  { word: 'household', category: 'math-ict', difficulty: 'hard', clue: 'All the people living in one home', imagePrompt: 'A house with a family inside' },
];

export const getWordsByCategory = (category: Word['category']) => {
  return wordsData.filter(word => word.category === category);
};

export const getWordsByDifficulty = (difficulty: Word['difficulty']) => {
  return wordsData.filter(word => word.difficulty === difficulty);
};

export const getRandomWords = (count: number, category?: Word['category']) => {
  const pool = category ? getWordsByCategory(category) : wordsData;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};