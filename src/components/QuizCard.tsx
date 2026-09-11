import { motion } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, Trophy, ShieldAlert } from 'lucide-react';
import { Question, Team } from '../types';

interface QuizCardProps {
  team: Team;
  teamName: string;
  currentQuestion: Question | null;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: number | null;
  isAnswering: boolean;
  isCorrect: boolean | null;
  isCurrentTurn?: boolean;
  isTurnMode?: boolean;
  onSelectOption: (optionIndex: number) => void;
  correctAnswersCount: number;
}

export function QuizCard({
  team,
  teamName,
  currentQuestion,
  currentIndex,
  totalQuestions,
  selectedOption,
  isAnswering,
  isCorrect,
  isCurrentTurn = true,
  isTurnMode = false,
  onSelectOption,
  correctAnswersCount,
}: QuizCardProps) {
  const isRed = team === 'red';
  const progressPercent = Math.min(100, Math.round(((currentIndex) / totalQuestions) * 100));
  const isFinished = currentIndex >= totalQuestions || !currentQuestion;

  const OPTION_LABELS = ['A', 'B', 'C', 'D'];

  const theme = isRed
    ? {
        border: 'border-rose-500/30',
        activeBorder: 'border-rose-500',
        bg: 'from-slate-900/95 via-rose-950/20 to-slate-900/95',
        badge: 'bg-rose-500 text-white',
        accentText: 'text-rose-400',
        optionHover: 'hover:border-rose-400 hover:bg-rose-500/10',
        shadow: 'shadow-[0_8px_30px_rgb(225,29,72,0.1)]',
      }
    : {
        border: 'border-blue-500/30',
        activeBorder: 'border-blue-500',
        bg: 'from-slate-900/95 via-blue-950/20 to-slate-900/95',
        badge: 'bg-blue-500 text-white',
        accentText: 'text-blue-400',
        optionHover: 'hover:border-blue-400 hover:bg-blue-500/10',
        shadow: 'shadow-[0_8px_30px_rgb(59,130,246,0.1)]',
      };

  return (
    <div
      id={`${team}-quiz-card`}
      className={`relative w-full h-full min-h-[460px] rounded-2xl bg-gradient-to-b ${theme.bg} border ${
        !isCurrentTurn && isTurnMode ? 'border-slate-800 opacity-60' : theme.border
      } p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 ${theme.shadow} backdrop-blur-sm`}
    >
      {/* Team Header & Progress Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${theme.badge} shadow`}
            >
              {teamName}
            </span>
            {isTurnMode && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                  isCurrentTurn
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isCurrentTurn ? 'Đang lượt' : 'Chờ lượt'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400">
              Câu{' '}
              <strong className={theme.accentText}>
                {Math.min(currentIndex + 1, totalQuestions)}
              </strong>
              /{totalQuestions}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800/80 rounded-full h-1.5 mb-2.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isRed ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-400 to-blue-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Finished State */}
        {isFinished ? (
          <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.badge}`}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-100">
              Đã hoàn thành 10/10 câu hỏi!
            </h4>
            <p className="text-xs text-slate-400 max-w-[240px]">
              Đúng được <strong className="text-emerald-400">{correctAnswersCount}</strong>/{totalQuestions} câu.
              Đang chờ kết quả kéo co...
            </p>
          </div>
        ) : (
          /* Active Question Content */
          <div className="flex flex-col">
            {/* Category tag */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60">
                <HelpCircle className="w-2.5 h-2.5 text-slate-400" />
                {currentQuestion?.category || 'Kiến thức chung'}
              </span>
              {currentQuestion?.isCustom && (
                <span className="text-[9px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-700/50 px-1.5 py-0.2 rounded">
                  Tự thêm
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="min-h-[58px] flex items-center">
              <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                {currentQuestion?.question}
              </h3>
            </div>

            {/* 4 Choices */}
            <div className="flex flex-col gap-1.5 mt-2">
              {currentQuestion?.options.map((option, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isTheCorrectOption = currentQuestion.correctIndex === optIdx;

                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200';

                if (selectedOption !== null) {
                  if (isSelected && isCorrect) {
                    btnStyle =
                      'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      'bg-rose-600 border-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-shake';
                  } else if (!isSelected && isTheCorrectOption && !isCorrect) {
                    // Highlight the correct one so player learns
                    btnStyle =
                      'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 ring-1 ring-emerald-500';
                  } else {
                    btnStyle = 'bg-slate-850/60 border-slate-800 text-slate-400 opacity-60';
                  }
                } else if (!isAnswering && (!isTurnMode || isCurrentTurn)) {
                  btnStyle = `bg-slate-800/90 border-slate-700 hover:text-white ${theme.optionHover} active:scale-[0.98]`;
                }

                return (
                  <button
                    key={optIdx}
                    id={`${team}-option-${optIdx}`}
                    type="button"
                    disabled={isAnswering || (isTurnMode && !isCurrentTurn)}
                    onClick={() => onSelectOption(optIdx)}
                    className={`relative p-2 rounded-xl border text-left flex items-center gap-2 transition-all duration-150 text-xs font-medium disabled:cursor-not-allowed group ${btnStyle}`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 transition-colors ${
                        isSelected && isCorrect
                          ? 'bg-emerald-500 text-white'
                          : isSelected && !isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-700/80 text-slate-300 group-hover:bg-slate-600'
                      }`}
                    >
                      {OPTION_LABELS[optIdx]}
                    </span>
                    <span className="flex-1 leading-snug break-words text-[11.5px]">{option}</span>

                    {/* Feedback icon */}
                    {isSelected && isCorrect && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                    )}
                    {isSelected && !isCorrect && (
                      <XCircle className="w-3.5 h-3.5 text-rose-200 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer Feedback Message */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 min-h-[26px] flex items-center justify-between text-xs">
        {selectedOption !== null ? (
          isCorrect ? (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Đúng! Kéo dây về! (+1)</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-400 font-semibold flex items-center gap-1 text-[11px]"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Sai! Dây đứng yên.</span>
            </motion.div>
          )
        ) : isTurnMode && !isCurrentTurn ? (
          <span className="text-slate-400 italic text-[10px]">Chờ đối thủ trả lời...</span>
        ) : (
          <span className="text-slate-400 text-[10px]">
            Chọn 1 trong 4 đáp án A, B, C, D
          </span>
        )}

        <div className="text-[10px] text-slate-400">
          Đúng: <strong className="text-slate-200">{correctAnswersCount}</strong>
        </div>
      </div>
    </div>
  );
}
