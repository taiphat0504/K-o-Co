export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, 3
  explanation?: string;
  category?: string;
  assignedTeam?: 'red' | 'blue' | 'all';
  isCustom?: boolean;
}

export type Team = 'red' | 'blue';

export type GameStatus = 'ready' | 'playing' | 'ended';

export type PlayMode = 'simultaneous' | 'turn_based'; // Đua song song hoặc Đấu luân phiên

export interface TeamState {
  currentIndex: number;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  answeredCount: number;
  selectedOption: number | null;
  isAnswering: boolean;
  isCorrect: boolean | null;
}

export interface GameSettings {
  soundEnabled: boolean;
  mode: PlayMode;
  questionsPerSide: number; // 10
  pullStep: number; // units rope moves per correct answer
  maxDisplacement: number; // max rope displacement limit
}
