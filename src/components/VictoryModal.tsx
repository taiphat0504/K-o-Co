import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Flame, RotateCcw, Award, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface VictoryModalProps {
  isOpen: boolean;
  winner: 'red' | 'blue' | 'draw';
  redScore: number;
  blueScore: number;
  ropeDisplacement: number;
  onRestart: () => void;
}

export function VictoryModal({
  isOpen,
  winner,
  redScore,
  blueScore,
  ropeDisplacement,
  onRestart,
}: VictoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      sound.playWinFanfare();
      // Trigger festive confetti
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isRedWinner = winner === 'red';
  const isBlueWinner = winner === 'blue';
  const isDraw = winner === 'draw';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 via-slate-925 to-slate-950 border border-slate-750 p-6 sm:p-8 shadow-2xl text-center flex flex-col items-center space-y-5">
        {/* Trophy Glow */}
        <div className="relative">
          <div
            className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${
              isRedWinner ? 'bg-rose-500' : isBlueWinner ? 'bg-blue-500' : 'bg-amber-500'
            }`}
          />
          <div
            className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl border ${
              isRedWinner
                ? 'bg-gradient-to-br from-rose-500 to-rose-700 border-rose-400 text-white'
                : isBlueWinner
                ? 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-400 text-white'
                : 'bg-gradient-to-br from-amber-500 to-amber-700 border-amber-400 text-slate-950'
            }`}
          >
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            KẾT QUẢ CHUNG CUỘC
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
              isRedWinner ? 'text-rose-400' : isBlueWinner ? 'text-blue-400' : 'text-amber-400'
            }`}
          >
            {isRedWinner && '🏆 ĐỘI ĐỎ CHIẾN THẮNG!'}
            {isBlueWinner && '🏆 ĐỘI XANH CHIẾN THẮNG!'}
            {isDraw && '🤝 TRẬN ĐẤU BẤT PHÂN THẮNG BẠI!'}
          </h2>
          <p className="text-xs text-slate-300">
            {isRedWinner && 'Đội Đỏ đã xuất sắc trả lời đúng nhiều câu hỏi và kéo trọn sợi dây!'}
            {isBlueWinner && 'Đội Xanh đã xuất sắc trả lời đúng nhiều câu hỏi và kéo trọn sợi dây!'}
            {isDraw && 'Hai đội có cùng số lần kéo hoặc dây đang ở thế giằng co tuyệt đối!'}
          </p>
        </div>

        {/* Score Comparison Board */}
        <div className="w-full grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
          {/* Red Stats */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <div className="flex items-center gap-1 text-xs font-bold text-rose-400 uppercase">
              <Flame className="w-3.5 h-3.5" /> Đội Đỏ
            </div>
            <div className="text-2xl font-black text-rose-300 mt-1">{redScore}</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {redScore}/10 câu đúng
            </div>
          </div>

          {/* Blue Stats */}
          <div className="flex flex-col items-center p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-1 text-xs font-bold text-blue-400 uppercase">
              <Flame className="w-3.5 h-3.5" /> Đội Xanh
            </div>
            <div className="text-2xl font-black text-blue-300 mt-1">{blueScore}</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {blueScore}/10 câu đúng
            </div>
          </div>
        </div>

        {/* Rope summary note */}
        <div className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span>
            Vị trí cờ tiêu cuối cùng:{' '}
            <strong className="text-slate-200">
              {ropeDisplacement === 0
                ? 'Ngay chính giữa'
                : ropeDisplacement < 0
                ? `Lệch về Đội Đỏ (${Math.abs(ropeDisplacement)} bước)`
                : `Lệch về Đội Xanh (${ropeDisplacement} bước)`}
            </strong>
          </span>
        </div>

        {/* Restart Button */}
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all active:scale-[0.98] cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Bắt đầu ván mới (10 câu ngẫu nhiên)
        </button>
      </div>
    </div>
  );
}
