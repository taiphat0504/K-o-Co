import { useState, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  Volume2,
  VolumeX,
  PlusCircle,
  Swords,
  Trophy,
  ArrowRightLeft,
  Info,
  Layers,
} from 'lucide-react';
import { Question, Team } from './types';
import { DEFAULT_QUESTIONS, getRandomQuestions } from './data/defaultQuestions';
import { sound } from './utils/sound';
import { TugOfWarArena } from './components/TugOfWarArena';
import { QuizCard } from './components/QuizCard';
import { QuestionManagerModal } from './components/QuestionManagerModal';
import { VictoryModal } from './components/VictoryModal';

const STORAGE_KEY = 'TUG_OF_WAR_CUSTOM_QUESTIONS';
const QUESTIONS_PER_SIDE = 10;
const MAX_DISPLACEMENT = 5; // Reaching -5 or +5 triggers instant knockout win

export default function App() {
  // Sound mute state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play Mode: 'turn_based' (luân phiên) or 'simultaneous' (song song)
  const [playMode, setPlayMode] = useState<'simultaneous' | 'turn_based'>('turn_based');
  const [currentTurn, setCurrentTurn] = useState<Team>('red');

  // Custom questions loaded from localStorage
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Modal states
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [winner, setWinner] = useState<'red' | 'blue' | 'draw'>('draw');

  // Tug of War Rope displacement: -MAX_DISPLACEMENT (Red full) to +MAX_DISPLACEMENT (Blue full)
  const [ropeDisplacement, setRopeDisplacement] = useState(0);
  const [lastPullSide, setLastPullSide] = useState<'red' | 'blue' | null>(null);
  const [isPulling, setIsPulling] = useState(false);

  // 10 Random questions for each side
  const [redQuestions, setRedQuestions] = useState<Question[]>([]);
  const [blueQuestions, setBlueQuestions] = useState<Question[]>([]);

  // Team Red Quiz state
  const [redIndex, setRedIndex] = useState(0);
  const [redCorrect, setRedCorrect] = useState(0);
  const [redWrong, setRedWrong] = useState(0);
  const [redSelectedOption, setRedSelectedOption] = useState<number | null>(null);
  const [redIsAnswering, setRedIsAnswering] = useState(false);
  const [redIsCorrect, setRedIsCorrect] = useState<boolean | null>(null);

  // Team Blue Quiz state
  const [blueIndex, setBlueIndex] = useState(0);
  const [blueCorrect, setBlueCorrect] = useState(0);
  const [blueWrong, setBlueWrong] = useState(0);
  const [blueSelectedOption, setBlueSelectedOption] = useState<number | null>(null);
  const [blueIsAnswering, setBlueIsAnswering] = useState(false);
  const [blueIsCorrect, setBlueIsCorrect] = useState<boolean | null>(null);

  // Combined question pool
  const allQuestions = [...DEFAULT_QUESTIONS, ...customQuestions];

  // Initialize or restart match with 10 random questions per team
  const startNewMatch = useCallback(() => {
    // Separate team-specific questions if any, otherwise sample from pool
    const redPool = allQuestions.filter((q) => q.assignedTeam === 'red' || q.assignedTeam === 'all' || !q.assignedTeam);
    const bluePool = allQuestions.filter((q) => q.assignedTeam === 'blue' || q.assignedTeam === 'all' || !q.assignedTeam);

    const redSample = getRandomQuestions(QUESTIONS_PER_SIDE, redPool.length >= QUESTIONS_PER_SIDE ? redPool : allQuestions);
    const blueSample = getRandomQuestions(QUESTIONS_PER_SIDE, bluePool.length >= QUESTIONS_PER_SIDE ? bluePool : allQuestions);

    setRedQuestions(redSample);
    setBlueQuestions(blueSample);

    // Reset rope and scores
    setRopeDisplacement(0);
    setLastPullSide(null);
    setIsPulling(false);

    // Reset Red
    setRedIndex(0);
    setRedCorrect(0);
    setRedWrong(0);
    setRedSelectedOption(null);
    setRedIsAnswering(false);
    setRedIsCorrect(null);

    // Reset Blue
    setBlueIndex(0);
    setBlueCorrect(0);
    setBlueWrong(0);
    setBlueSelectedOption(null);
    setBlueIsAnswering(false);
    setBlueIsCorrect(null);

    setCurrentTurn('red');
    setIsVictoryOpen(false);
    sound.playWhistleSound();
  }, [allQuestions]);

  // Initial load
  useEffect(() => {
    startNewMatch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle sound toggle
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  // Check end game condition
  const evaluateGameEnd = (
    currentRope: number,
    rIndex: number,
    bIndex: number,
    rScore: number,
    bScore: number
  ) => {
    // Instant knockout if rope pulled all the way to boundary
    if (currentRope <= -MAX_DISPLACEMENT) {
      setWinner('red');
      setIsVictoryOpen(true);
      return;
    }
    if (currentRope >= MAX_DISPLACEMENT) {
      setWinner('blue');
      setIsVictoryOpen(true);
      return;
    }

    // If both teams completed all questions
    if (rIndex >= QUESTIONS_PER_SIDE && bIndex >= QUESTIONS_PER_SIDE) {
      if (currentRope < 0) {
        setWinner('red');
      } else if (currentRope > 0) {
        setWinner('blue');
      } else {
        // Equal rope: compare correct questions count
        if (rScore > bScore) {
          setWinner('red');
        } else if (bScore > rScore) {
          setWinner('blue');
        } else {
          setWinner('draw');
        }
      }
      setIsVictoryOpen(true);
    }
  };

  // Handle answering for RED team
  const handleSelectRedOption = (optionIndex: number) => {
    if (redIsAnswering || redIndex >= QUESTIONS_PER_SIDE) return;
    if (playMode === 'turn_based' && currentTurn !== 'red') return;

    const currentQ = redQuestions[redIndex];
    if (!currentQ) return;

    setRedSelectedOption(optionIndex);
    setRedIsAnswering(true);
    const isCorrect = optionIndex === currentQ.correctIndex;
    setRedIsCorrect(isCorrect);

    let nextRope = ropeDisplacement;

    if (isCorrect) {
      // Pull rope towards RED (negative direction)
      nextRope = Math.max(-MAX_DISPLACEMENT, ropeDisplacement - 1);
      setRopeDisplacement(nextRope);
      setLastPullSide('red');
      setIsPulling(true);
      setRedCorrect((prev) => prev + 1);
      sound.playPullSound('red');
      sound.playCorrectSound();

      setTimeout(() => setIsPulling(false), 850);
    } else {
      // WRONG ANSWER: rope stands completely still!
      setRedWrong((prev) => prev + 1);
      sound.playWrongSound();
    }

    // Advance to next question after 1.2s delay
    setTimeout(() => {
      const nextIndex = redIndex + 1;
      setRedIndex(nextIndex);
      setRedSelectedOption(null);
      setRedIsAnswering(false);
      setRedIsCorrect(null);

      // In turn-based mode, pass turn to Blue if Blue has questions left
      if (playMode === 'turn_based') {
        if (blueIndex < QUESTIONS_PER_SIDE) {
          setCurrentTurn('blue');
        }
      }

      // Check if match has concluded
      evaluateGameEnd(
        nextRope,
        nextIndex,
        blueIndex,
        isCorrect ? redCorrect + 1 : redCorrect,
        blueCorrect
      );
    }, 1200);
  };

  // Handle answering for BLUE team
  const handleSelectBlueOption = (optionIndex: number) => {
    if (blueIsAnswering || blueIndex >= QUESTIONS_PER_SIDE) return;
    if (playMode === 'turn_based' && currentTurn !== 'blue') return;

    const currentQ = blueQuestions[blueIndex];
    if (!currentQ) return;

    setBlueSelectedOption(optionIndex);
    setBlueIsAnswering(true);
    const isCorrect = optionIndex === currentQ.correctIndex;
    setBlueIsCorrect(isCorrect);

    let nextRope = ropeDisplacement;

    if (isCorrect) {
      // Pull rope towards BLUE (positive direction)
      nextRope = Math.min(MAX_DISPLACEMENT, ropeDisplacement + 1);
      setRopeDisplacement(nextRope);
      setLastPullSide('blue');
      setIsPulling(true);
      setBlueCorrect((prev) => prev + 1);
      sound.playPullSound('blue');
      sound.playCorrectSound();

      setTimeout(() => setIsPulling(false), 850);
    } else {
      // WRONG ANSWER: rope stands completely still!
      setBlueWrong((prev) => prev + 1);
      sound.playWrongSound();
    }

    // Advance to next question after 1.2s delay
    setTimeout(() => {
      const nextIndex = blueIndex + 1;
      setBlueIndex(nextIndex);
      setBlueSelectedOption(null);
      setBlueIsAnswering(false);
      setBlueIsCorrect(null);

      // In turn-based mode, pass turn to Red if Red has questions left
      if (playMode === 'turn_based') {
        if (redIndex < QUESTIONS_PER_SIDE) {
          setCurrentTurn('red');
        }
      }

      // Check if match has concluded
      evaluateGameEnd(
        nextRope,
        redIndex,
        nextIndex,
        redCorrect,
        isCorrect ? blueCorrect + 1 : blueCorrect
      );
    }, 1200);
  };

  // Custom question additions & deletions
  const handleAddCustomQuestion = (newQ: Omit<Question, 'id'>) => {
    const questionWithId: Question = {
      ...newQ,
      id: `custom_${Date.now()}`,
    };
    const updated = [questionWithId, ...customQuestions];
    setCustomQuestions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleDeleteCustomQuestion = (id: string) => {
    const updated = customQuestions.filter((q) => q.id !== id);
    setCustomQuestions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetDefaults = () => {
    setCustomQuestions([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center p-2 sm:p-4 md:p-6 select-none font-sans">
      {/* 
        16:9 WIDESCREEN GAME CONTAINER:
        Bố cục 16:9 theo chuẩn màn hình game, câu hỏi Đỏ bên trái Đội Đỏ, câu hỏi Xanh bên phải Đội Xanh
      */}
      <main
        id="game-fixed-container"
        className="relative w-full max-w-[1440px] xl:aspect-[16/9] min-h-[580px] rounded-3xl bg-slate-900/95 border border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-3 sm:p-4 md:p-5 flex flex-col justify-between gap-3 overflow-hidden backdrop-blur-xl"
      >
        {/* TOP HEADER BAR & CONTROLS */}
        <header className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          {/* Game Title & Branding */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-white font-black">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                TRÒ CHƠI KÉO CO TRẮC NGHIỆM
              </h1>
              <p className="text-[11px] text-slate-400">
                10 câu hỏi mỗi bên • Đúng kéo dây về • Sai dây đứng yên
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Play Mode Selector: Turn-based vs Simultaneous */}
            <button
              id="mode-toggle-button"
              type="button"
              onClick={() => {
                sound.playClick();
                setPlayMode((prev) => (prev === 'turn_based' ? 'simultaneous' : 'turn_based'));
              }}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Đổi chế độ: Đấu luân phiên hoặc Đua song song cùng lúc"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Chế độ:</span>
              <strong className="text-amber-300">
                {playMode === 'turn_based' ? 'Luân phiên' : 'Song song'}
              </strong>
            </button>

            {/* Custom Questions Manager Button */}
            <button
              id="open-question-manager-btn"
              type="button"
              onClick={() => {
                sound.playClick();
                setIsManagerOpen(true);
              }}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-bold text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Tự thêm câu hỏi</span>
              {customQuestions.length > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black rounded text-[10px]">
                  {customQuestions.length}
                </span>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              id="sound-toggle-btn"
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-rose-950/40 border-rose-800 text-rose-300'
              }`}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* New Match / Reset */}
            <button
              id="reset-match-btn"
              type="button"
              onClick={startNewMatch}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ván mới</span>
            </button>
          </div>
        </header>

        {/* 
          MAIN COMPETITION STAGE (CÂU HỎI NẰM 2 BÊN NGANG VỚI SÀN THI ĐẤU):
          Left side: Ô câu hỏi trắc nghiệm Đội Đỏ
          Middle: Sàn thi đấu kéo co với đoạn dây và vạch kẻ chính giữa màn hình
          Right side: Ô câu hỏi trắc nghiệm Đội Xanh
        */}
        <section
          id="main-battlefield-stage"
          className="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] xl:grid-cols-[330px_1fr_330px] gap-3 sm:gap-4 items-stretch"
        >
          {/* LEFT QUIZ BOX: ĐỘI ĐỎ (NẰM BÊN TRÁI NGANG VỚI SÀN ĐẤU) */}
          <div className="order-2 lg:order-1 flex flex-col h-full">
            <QuizCard
              team="red"
              teamName="Đội Đỏ"
              currentQuestion={redQuestions[redIndex] || null}
              currentIndex={redIndex}
              totalQuestions={QUESTIONS_PER_SIDE}
              selectedOption={redSelectedOption}
              isAnswering={redIsAnswering}
              isCorrect={redIsCorrect}
              isTurnMode={playMode === 'turn_based'}
              isCurrentTurn={currentTurn === 'red'}
              onSelectOption={handleSelectRedOption}
              correctAnswersCount={redCorrect}
            />
          </div>

          {/* CENTER ARENA: SÀN THI ĐẤU KÉO CO (Ở GIỮA MÀN HÌNH VỚI ĐOẠN DÂY VÀ VẠCH KẺ CHÍNH GIỮA) */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <TugOfWarArena
              ropeDisplacement={ropeDisplacement}
              maxDisplacement={MAX_DISPLACEMENT}
              lastPullSide={lastPullSide}
              isPulling={isPulling}
              redScore={redCorrect}
              blueScore={blueCorrect}
            />
          </div>

          {/* RIGHT QUIZ BOX: ĐỘI XANH (NẰM BÊN PHẢI NGANG VỚI SÀN ĐẤU) */}
          <div className="order-3 lg:order-3 flex flex-col h-full">
            <QuizCard
              team="blue"
              teamName="Đội Xanh"
              currentQuestion={blueQuestions[blueIndex] || null}
              currentIndex={blueIndex}
              totalQuestions={QUESTIONS_PER_SIDE}
              selectedOption={blueSelectedOption}
              isAnswering={blueIsAnswering}
              isCorrect={blueIsCorrect}
              isTurnMode={playMode === 'turn_based'}
              isCurrentTurn={currentTurn === 'blue'}
              onSelectOption={handleSelectBlueOption}
              correctAnswersCount={blueCorrect}
            />
          </div>
        </section>

        {/* FOOTER HELPER TIPS */}
        <footer className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Luật chơi: Mỗi bên trả lời 10 câu. Trả lời đúng cờ tiêu sẽ tiến về phía đội mình. Trả lời sai dây đứng yên.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" />
              Tổng kho: {allQuestions.length} câu
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" />
              Mốc thắng trực tiếp: ±{MAX_DISPLACEMENT} bước
            </span>
          </div>
        </footer>
      </main>

      {/* QUESTION MANAGER MODAL (TỰ THÊM CÂU HỎI) */}
      <QuestionManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        customQuestions={customQuestions}
        totalQuestionsCount={allQuestions.length}
        onAddQuestion={handleAddCustomQuestion}
        onDeleteQuestion={handleDeleteCustomQuestion}
        onResetDefaults={handleResetDefaults}
      />

      {/* VICTORY CELEBRATION MODAL */}
      <VictoryModal
        isOpen={isVictoryOpen}
        winner={winner}
        redScore={redCorrect}
        blueScore={blueCorrect}
        ropeDisplacement={ropeDisplacement}
        onRestart={startNewMatch}
      />
    </div>
  );
}
