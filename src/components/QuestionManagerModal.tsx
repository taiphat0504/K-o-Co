import React, { useState } from 'react';
import { X, Plus, Trash2, HelpCircle, Check, AlertCircle, BookOpen, RotateCcw } from 'lucide-react';
import { Question } from '../types';

interface QuestionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customQuestions: Question[];
  totalQuestionsCount: number;
  onAddQuestion: (newQuestion: Omit<Question, 'id'>) => void;
  onDeleteQuestion: (id: string) => void;
  onResetDefaults: () => void;
}

export function QuestionManagerModal({
  isOpen,
  onClose,
  customQuestions,
  totalQuestionsCount,
  onAddQuestion,
  onDeleteQuestion,
  onResetDefaults,
}: QuestionManagerModalProps) {
  const [questionText, setQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [category, setCategory] = useState('Đố vui');
  const [assignedTeam, setAssignedTeam] = useState<'red' | 'blue' | 'all'>('all');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      setErrorMsg('Vui lòng nhập nội dung câu hỏi!');
      return;
    }
    if (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ 4 đáp án A, B, C, D!');
      return;
    }

    onAddQuestion({
      question: questionText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctIndex,
      category: category.trim() || 'Tổng hợp',
      assignedTeam,
      isCustom: true,
    });

    // Reset form
    setQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectIndex(0);
    setErrorMsg('');
    setSuccessMsg('Đã thêm câu hỏi mới thành công!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleFillSample = () => {
    setQuestionText('Con vật nào sau đây được gọi là "Chúa sơn lâm"?');
    setOptA('Sư tử');
    setOptB('Hổ (Cọp)');
    setOptC('Báo hoa mai');
    setOptD('Gấu đen');
    setCorrectIndex(1);
    setCategory('Động vật');
    setAssignedTeam('all');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        id="question-manager-modal"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Quản lý & Thêm câu hỏi trắc nghiệm
              </h3>
              <p className="text-xs text-slate-400">
                Tổng kho: <strong className="text-amber-400">{totalQuestionsCount}</strong> câu ({customQuestions.length} câu tự tạo)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Add New Question Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Thêm câu hỏi mới
              </span>
              <button
                type="button"
                onClick={handleFillSample}
                className="text-xs text-slate-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
              >
                + Điền mẫu thử nhanh
              </button>
            </div>

            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Question text */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nội dung câu hỏi:
              </label>
              <textarea
                rows={2}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Ví dụ: Vị vua nào sáng lập ra triều đại nhà Lý ở Việt Nam?"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-slate-100 placeholder:text-slate-500 resize-none"
              />
            </div>

            {/* 4 Options with radio for correct option */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                4 Lựa chọn trả lời (Tích chọn tròn ở phương án đúng):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'A', value: optA, setter: setOptA, idx: 0 },
                  { label: 'B', value: optB, setter: setOptB, idx: 1 },
                  { label: 'C', value: optC, setter: setOptC, idx: 2 },
                  { label: 'D', value: optD, setter: setOptD, idx: 3 },
                ].map(({ label, value, setter, idx }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                      correctIndex === idx
                        ? 'border-emerald-500/80 bg-emerald-950/30'
                        : 'border-slate-800 bg-slate-900/80'
                    }`}
                  >
                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="correctIndex"
                        checked={correctIndex === idx}
                        onChange={() => setCorrectIndex(idx)}
                        className="accent-emerald-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span
                        className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                          correctIndex === idx ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {label}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Đáp án ${label}...`}
                      className="w-full bg-transparent text-xs text-slate-200 focus:outline-none placeholder:text-slate-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Category and Team targeting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Chủ đề / Thể loại:
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Khoa học, Lịch sử, Thể thao, Đố vui..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phân bổ câu hỏi:
                </label>
                <select
                  value={assignedTeam}
                  onChange={(e) => setAssignedTeam(e.target.value as 'red' | 'blue' | 'all')}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-400 text-slate-100 cursor-pointer"
                >
                  <option value="all">Kho chung (Cả Đội Đỏ & Đội Xanh)</option>
                  <option value="red">Chỉ dành cho Đội Đỏ</option>
                  <option value="blue">Chỉ dành cho Đội Xanh</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Thêm câu hỏi vào trò chơi
            </button>
          </form>

          {/* List of Custom Questions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Danh sách câu hỏi tự thêm ({customQuestions.length})
              </h4>
              {customQuestions.length > 0 && (
                <span className="text-[11px] text-slate-400">
                  Đã tự động lưu vào bộ nhớ trình duyệt
                </span>
              )}
            </div>

            {customQuestions.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-400">
                Bạn chưa tạo câu hỏi tùy chỉnh nào. Hãy dùng form phía trên để thêm câu hỏi riêng cho học sinh hoặc bạn bè!
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {customQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 font-semibold">
                          {q.category || 'Tự thêm'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {q.assignedTeam === 'red' ? 'Đội Đỏ' : q.assignedTeam === 'blue' ? 'Đội Xanh' : 'Chung'}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-200">{q.question}</p>
                      <p className="text-emerald-400 text-[11px]">
                        Đáp án đúng: {['A', 'B', 'C', 'D'][q.correctIndex]}. {q.options[q.correctIndex]}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteQuestion(q.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn khôi phục kho câu hỏi về mặc định?')) {
                onResetDefaults();
              }
            }}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Khôi phục mặc định
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Đóng & Tiếp tục chơi
          </button>
        </div>
      </div>
    </div>
  );
}
