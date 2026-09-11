import { motion } from 'motion/react';
import { Flag, Flame, Sparkles } from 'lucide-react';

interface TugOfWarArenaProps {
  ropeDisplacement: number; // e.g. -5 (full red) to +5 (full blue)
  maxDisplacement: number;
  lastPullSide: 'red' | 'blue' | null;
  isPulling: boolean;
  redScore: number;
  blueScore: number;
}

interface PullerCharacterProps {
  team: 'red' | 'blue';
  idx: number;
  isAnchor: boolean;
  isPulling: boolean;
  lastPullSide: 'red' | 'blue' | null;
  key?: string | number;
}

// Dedicated Animated Puller Stickman Component
function PullerCharacter({
  team,
  idx,
  isAnchor,
  isPulling,
  lastPullSide,
}: PullerCharacterProps) {
  const isRed = team === 'red';
  const isThisTeamPulling = isPulling && lastPullSide === team;
  const isOtherTeamPulling = isPulling && lastPullSide !== null && lastPullSide !== team;

  // Motion physics configuration:
  // IDLE: Figure stands completely upright (rotate: 0, x: 0, y: 0) and STILL (no continuous bobbing).
  // WHEN PULLING: Body leans backward, stomps back and exerts full force.
  // WHEN DRAGGED: Body leans forward, stumbles toward the center line.
  let xAnim: number | number[] = 0;
  let rotateAnim: number | number[] = 0;
  let yAnim: number | number[] = 0;

  if (isThisTeamPulling) {
    if (isRed) {
      // Red pullers lean BACKWARD to the left when pulling
      xAnim = [0, -32 - idx * 3, -26 - idx * 2];
      rotateAnim = [0, -45, -36];
      yAnim = [0, 4, 1];
    } else {
      // Blue pullers lean BACKWARD to the right when pulling
      xAnim = [0, 32 + idx * 3, 26 + idx * 2];
      rotateAnim = [0, 45, 36];
      yAnim = [0, 4, 1];
    }
  } else if (isOtherTeamPulling) {
    if (isRed) {
      // Red pullers pulled FORWARD towards the center (leaning forward/right)
      xAnim = [0, 28 + idx * 2, 20 + idx * 2];
      rotateAnim = [0, 22, 15];
      yAnim = [-1, 3, 0];
    } else {
      // Blue pullers pulled FORWARD towards the center (leaning forward/left)
      xAnim = [0, -28 - idx * 2, -20 - idx * 2];
      rotateAnim = [0, -22, -15];
      yAnim = [-1, 3, 0];
    }
  }

  return (
    <motion.div
      key={`${team}-puller-${idx}`}
      animate={{
        x: xAnim,
        rotate: rotateAnim,
        y: yAnim,
      }}
      transition={{
        duration: isPulling ? 0.75 : 0.4,
        repeat: 0,
        ease: 'easeOut',
      }}
      className="relative flex flex-col items-center origin-bottom select-none z-20"
    >
      {/* SHOUT BUBBLE: Action feedback */}
      {isAnchor && isThisTeamPulling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1.15, y: -4 }}
          exit={{ opacity: 0 }}
          className="absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] tracking-tight shadow-lg border border-amber-300 z-40 flex items-center gap-1"
        >
          <span>LÙI LẠI KÉO!</span>
          <span>🔥</span>
        </motion.div>
      )}

      {/* DRAGGED FORWARD PANIC BUBBLE */}
      {isAnchor && isOtherTeamPulling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1.1, y: -4 }}
          exit={{ opacity: 0 }}
          className="absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] tracking-tight shadow-lg border border-rose-300 z-40 flex items-center gap-1"
        >
          <span>Á! BỊ KÉO TỚI!</span>
          <span>💦</span>
        </motion.div>
      )}

      {/* CHARACTER HEAD */}
      <div
        className={`relative w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center font-black text-xs ${
          isRed
            ? 'bg-gradient-to-b from-rose-500 to-rose-700 text-rose-50'
            : 'bg-gradient-to-b from-blue-500 to-blue-700 text-blue-50'
        }`}
      >
        {/* Headband */}
        <div className="absolute top-1.5 inset-x-0 h-1.5 bg-amber-400 shadow-sm" />

        {/* Headband tail fluttering */}
        <motion.div
          animate={
            isThisTeamPulling
              ? { rotate: isRed ? [-20, -35, -20] : [20, 35, 20] }
              : { rotate: 0 }
          }
          className={`absolute -top-0.5 ${isRed ? '-left-2' : '-right-2'} w-2.5 h-1.5 bg-amber-400 rounded-sm`}
        />

        {/* FACIAL EXPRESSIONS */}
        <span className="relative z-10 text-[10px] font-mono">
          {isThisTeamPulling ? (
            // Exertion / Gritting teeth
            <span className="text-amber-200 text-[11px] font-black">{'>_<'}</span>
          ) : isOtherTeamPulling ? (
            // Panicked / Dragged forward
            <span className="text-white text-[11px] font-black">{'o_o'}</span>
          ) : (
            isRed ? 'ĐỎ' : 'XANH'
          )}
        </span>

        {/* Sweat drops if straining or dragged */}
        {(isThisTeamPulling || isOtherTeamPulling) && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [-2, -8] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className={`absolute -top-2 ${isRed ? '-right-1' : '-left-1'} text-cyan-300 text-xs`}
          >
            💦
          </motion.div>
        )}
      </div>

      {/* CHARACTER BODY & ARMS */}
      <div
        className={`relative w-7 h-10 rounded-t-lg border flex flex-col items-center justify-between p-0.5 shadow-inner -mt-1 ${
          isRed
            ? 'bg-rose-700 border-rose-500 text-rose-200'
            : 'bg-blue-700 border-blue-500 text-blue-200'
        }`}
      >
        {/* ARMS GRIPPING ROPE: Position changes based on pulling vs dragged */}
        <motion.div
          animate={
            isThisTeamPulling
              ? {
                  // Arms pulling tightly back towards chest
                  x: isRed ? -4 : 4,
                  scaleX: 1.1,
                }
              : isOtherTeamPulling
              ? {
                  // Arms stretched out straight desperately holding on
                  x: isRed ? 5 : -5,
                  scaleX: 1.2,
                }
              : { x: 0 }
          }
          className="w-full flex justify-between px-0.5 mt-1"
        >
          {/* Left hand glove */}
          <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-600 shadow-sm" />
          {/* Right hand glove */}
          <div className="w-2.5 h-2.5 rounded-full bg-amber-200 border border-amber-600 shadow-sm" />
        </motion.div>

        {/* Jersey Number / Role */}
        <span className="text-[8px] font-black tracking-tighter mb-1">
          {isAnchor ? 'TRỤ' : `#${idx + 1}`}
        </span>
      </div>

      {/* LEGS & FEET STANCE */}
      <div className="w-8 flex justify-between -mt-1 relative">
        {/* Back Leg (Bracing) */}
        <motion.div
          animate={
            isThisTeamPulling
              ? {
                  // Stomping backward and bending deeper
                  skewX: isRed ? 22 : -22,
                  scaleY: 0.9,
                }
              : isOtherTeamPulling
              ? {
                  // Skidding forward
                  skewX: isRed ? -15 : 15,
                }
              : {
                  skewX: 0,
                  scaleY: 1,
                }
          }
          className="w-3 h-4 bg-slate-800 rounded-sm border-t border-slate-600"
        />

        {/* Front Leg (Pulling/Sliding) */}
        <motion.div
          animate={
            isThisTeamPulling
              ? {
                  skewX: isRed ? -18 : 18,
                  scaleY: 0.95,
                }
              : isOtherTeamPulling
              ? {
                  skewX: isRed ? -10 : 10,
                }
              : {
                  skewX: 0,
                  scaleY: 1,
                }
          }
          className="w-3 h-4 bg-slate-800 rounded-sm border-t border-slate-600"
        />
      </div>

      {/* GROUND FRICTION / DUST / SKID EFFECT AT FEET */}
      {isThisTeamPulling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.4, 1.8], x: isRed ? -6 : 6 }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="absolute -bottom-2 text-[10px] text-amber-300 font-mono select-none pointer-events-none"
        >
          💨
        </motion.div>
      )}

      {isOtherTeamPulling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.9, 0.3], x: isRed ? [0, 6] : [0, -6] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className="absolute -bottom-2.5 text-[9px] text-slate-300/80 font-mono select-none pointer-events-none"
        >
          {isRed ? '═══ 💨' : '💨 ═══'}
        </motion.div>
      )}
    </motion.div>
  );
}

export function TugOfWarArena({
  ropeDisplacement,
  maxDisplacement,
  lastPullSide,
  isPulling,
  redScore,
  blueScore,
}: TugOfWarArenaProps) {
  // Convert displacement to visual offset in pixels
  // Appropriate for arena width within the 3-column layout
  const visualOffset = (ropeDisplacement / maxDisplacement) * 115;

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 border border-slate-750 p-3 sm:p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
      {/* Stadium lights & background ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-rose-500 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-950/40 to-transparent" />
      </div>

      {/* Arena Status Bar on top */}
      <div className="relative z-10 flex items-center justify-between mb-3 px-1 sm:px-2">
        {/* Left Status: Red */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>ĐỘI ĐỎ</span>
            <span className="ml-0.5 px-1.5 py-0.2 bg-rose-500 text-white rounded text-[11px]">
              {redScore}
            </span>
          </div>
        </div>

        {/* Center Meter & Status Indicator */}
        <div className="flex flex-col items-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1">
            {ropeDisplacement === 0 ? (
              <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3 h-3" /> Cân bằng (0)
              </span>
            ) : ropeDisplacement < 0 ? (
              <span className="text-rose-400 font-bold text-[11px]">
                ← Đỏ đang dẫn (+{Math.abs(ropeDisplacement)})
              </span>
            ) : (
              <span className="text-blue-400 font-bold text-[11px]">
                Xanh đang dẫn (+{ropeDisplacement}) →
              </span>
            )}
          </div>
          {/* Visual step gauge */}
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: maxDisplacement * 2 + 1 }).map((_, idx) => {
              const stepValue = idx - maxDisplacement;
              const isCurrent = stepValue === ropeDisplacement;
              const isCenter = stepValue === 0;
              const isRedActive = stepValue < 0 && stepValue >= ropeDisplacement;
              const isBlueActive = stepValue > 0 && stepValue <= ropeDisplacement;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-300 rounded-sm ${
                    isCurrent
                      ? 'w-2 h-4.5 bg-amber-400 ring-2 ring-amber-300 ring-offset-1 ring-offset-slate-900'
                      : isCenter
                      ? 'w-1.5 h-3.5 bg-white/80'
                      : isRedActive
                      ? 'w-1.5 h-3 bg-rose-500'
                      : isBlueActive
                      ? 'w-1.5 h-3 bg-blue-500'
                      : 'w-1 h-2 bg-slate-700'
                  }`}
                  title={`Bước: ${stepValue}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right Status: Blue */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold tracking-wide">
            <span className="mr-0.5 px-1.5 py-0.2 bg-blue-500 text-white rounded text-[11px]">
              {blueScore}
            </span>
            <span>ĐỘI XANH</span>
            <Flame className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          </div>
        </div>
      </div>

      {/* Main Tug Of War Stage Canvas (Center between the two question panels) */}
      <div className="relative flex-1 min-h-[320px] w-full rounded-xl bg-gradient-to-b from-slate-950 via-slate-925 to-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-end">
        {/* Court markings background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px)] bg-[size:32px_100%] opacity-20" />

          {/* Left Win line */}
          <div className="absolute left-6 sm:left-10 inset-y-0 w-0.5 border-l-2 border-dashed border-rose-500/50 flex flex-col justify-between py-3 text-[9px] text-rose-400/90 font-mono select-none">
            <span>THẮNG</span>
            <span>← VẠCH ĐÍCH</span>
            <span>THẮNG</span>
          </div>

          {/* Right Win line */}
          <div className="absolute right-6 sm:right-10 inset-y-0 w-0.5 border-r-2 border-dashed border-blue-500/50 flex flex-col justify-between py-3 text-[9px] text-blue-400/90 font-mono select-none">
            <span>THẮNG</span>
            <span>VẠCH ĐÍCH →</span>
            <span>THẮNG</span>
          </div>

          {/* CENTER LINE (Vạch kẻ chính giữa màn hình theo yêu cầu) */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)] z-10 flex flex-col items-center justify-between py-2">
            <div className="w-3 h-3 rounded-full bg-amber-300 shadow-md ring-2 ring-amber-500" />
            <div className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[9px] rounded uppercase tracking-wider shadow">
              VẠCH GIỮA
            </div>
            <div className="w-3 h-3 rounded-full bg-amber-300 shadow-md ring-2 ring-amber-500" />
          </div>
        </div>

        {/* Pitch ground turf bottom strip */}
        <div className="w-full h-11 sm:h-12 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border-t-2 border-emerald-600/40 relative flex items-center justify-center">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
          <div className="text-[9px] sm:text-[10px] font-mono text-emerald-300/70 uppercase tracking-widest text-center px-2">
            ← KÉO VỀ ĐỘI ĐỎ | VẠCH GIỮA | KÉO VỀ ĐỘI XANH →
          </div>
        </div>

        {/* MOVING TUG-OF-WAR GROUP: Rope, Red Ribbon, and Pullers on both ends */}
        <motion.div
          className="absolute inset-x-0 bottom-8 sm:bottom-10 h-32 flex items-center justify-center pointer-events-none"
          animate={{
            x: visualOffset,
          }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 20,
          }}
        >
          {/* THE ROPE */}
          <motion.div
            animate={
              isPulling
                ? {
                    scaleY: [1, 0.75, 1],
                  }
                : { scaleY: 1 }
            }
            transition={{ duration: 0.3 }}
            className="absolute w-[190%] sm:w-[150%] h-4 sm:h-5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-t border-b border-amber-500/60 flex items-center justify-center overflow-hidden"
          >
            {/* Rope twisted diagonal texture */}
            <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,#78350f,#78350f_6px,#b45309_6px,#b45309_12px)]" />
          </motion.div>

          {/* RED RIBBON / FLAG IN THE EXACT CENTER OF THE ROPE */}
          <div className="absolute z-30 flex flex-col items-center">
            {/* Knot / Flag */}
            <motion.div
              animate={
                isPulling
                  ? {
                      rotate: lastPullSide === 'red' ? [-16, -28, -14, 0] : [16, 28, 14, 0],
                      y: [-6, 0],
                      scale: [1, 1.25, 1],
                    }
                  : { rotate: 0, y: 0, scale: 1 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Ribbon bow */}
              <div className="w-5 h-6 bg-red-600 rounded-sm shadow-lg ring-2 ring-white flex items-center justify-center">
                <Flag className="w-3.5 h-3.5 text-white fill-white" />
              </div>
              {/* Dangling ribbon tail */}
              <div className="w-2.5 h-7 bg-red-600 rounded-b shadow -mt-0.5 border-l border-r border-red-700" />
            </motion.div>
          </div>

          {/* LEFT TEAM: 3 Red Pullers (Đội Đỏ lùi lại dồn lực kéo khi đúng, nhích tới khi Xanh kéo) */}
          <div className="absolute right-[50%] mr-10 sm:mr-14 flex items-center gap-1 sm:gap-1.5">
            {[2, 1, 0].map((idx) => (
              <PullerCharacter
                key={`red-char-${idx}`}
                team="red"
                idx={idx}
                isAnchor={idx === 2}
                isPulling={isPulling}
                lastPullSide={lastPullSide}
              />
            ))}
          </div>

          {/* RIGHT TEAM: 3 Blue Pullers (Đội Xanh lùi lại dồn lực kéo khi đúng, nhích tới khi Đỏ kéo) */}
          <div className="absolute left-[50%] ml-10 sm:ml-14 flex items-center gap-1 sm:gap-1.5">
            {[0, 1, 2].map((idx) => (
              <PullerCharacter
                key={`blue-char-${idx}`}
                team="blue"
                idx={idx}
                isAnchor={idx === 2}
                isPulling={isPulling}
                lastPullSide={lastPullSide}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
