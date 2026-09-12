import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';

export interface Question {
    id: string;
    question: string;
    options: string | string[];
    correctAnswer: number;
    explanation?: string | null;
}

interface QuizRunnerProps {
    questions: Question[];
    onQuizPassed?: () => void;
    onNextLesson?: () => void;
    isAlreadyCompleted?: boolean;
}

export default function QuizRunner({
    questions,
    onQuizPassed,
    onNextLesson,
    isAlreadyCompleted = false,
}: QuizRunnerProps) {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const handleSelect = (questionIndex: number, optionIndex: number) => {
        if (submitted) return;
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: optionIndex,
        }));
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctAnswer) {
                correctCount++;
            }
        });

        const percent = Math.round((correctCount / questions.length) * 100);
        setScore(percent);
        setSubmitted(true);

        if (percent >= 70 && onQuizPassed) {
            onQuizPassed();
        }
    };

    const handleRetry = () => {
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(null);
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
                No quiz questions available for this module.
            </div>
        );
    }

    const isPassed = score !== null && score >= 70;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-indigo-400" />
                        Module Assessment Quiz
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Answer all {questions.length} questions. Score 70% or higher to pass and complete this lesson.
                    </p>
                </div>

                {isAlreadyCompleted && !submitted && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Already Passed
                    </span>
                )}
            </div>

            {/* Quiz Results Summary */}
            {submitted && (
                <div
                    className={`p-6 rounded-xl mb-8 border transition-all ${
                        isPassed
                            ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200'
                            : 'bg-red-950/40 border-red-600 text-red-200'
                    }`}
                >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            {isPassed ? (
                                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-400 shrink-0" />
                            )}
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    {isPassed ? 'Outstanding! You Passed the Quiz' : 'Needs Review - Passing Grade is 70%'}
                                </h3>
                                <p className="text-xs text-slate-300">
                                    Your Score: <span className="font-bold text-base">{score}%</span> (
                                    {questions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} of{' '}
                                    {questions.length} correct)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleRetry}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-slate-700 transition cursor-pointer"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                            </button>

                            {isPassed && onNextLesson && (
                                <button
                                    type="button"
                                    onClick={onNextLesson}
                                    className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition cursor-pointer"
                                >
                                    <span>Next Lesson</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Questions List */}
            <div className="space-y-8">
                {questions.map((q, qIndex) => {
                    let options: string[] = [];
                    try {
                        options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
                    } catch {
                        options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
                    }

                    const userAnswer = selectedAnswers[qIndex];
                    const isCorrect = submitted && userAnswer === q.correctAnswer;
                    const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correctAnswer;

                    return (
                        <div
                            key={q.id || qIndex}
                            className="p-5 rounded-xl bg-slate-950/60 border border-slate-800"
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                                    {qIndex + 1}
                                </span>
                                <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                                    {q.question}
                                </p>
                            </div>

                            <div className="space-y-2.5 ml-9">
                                {options.map((opt, optIndex) => {
                                    const isSelected = userAnswer === optIndex;
                                    let optStyle =
                                        'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300';

                                    if (submitted) {
                                        if (optIndex === q.correctAnswer) {
                                            optStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                                        } else if (isSelected && !isCorrect) {
                                            optStyle = 'bg-red-950/70 border-red-500 text-red-200 line-through';
                                        }
                                    } else if (isSelected) {
                                        optStyle = 'bg-indigo-950/80 border-indigo-500 text-white font-semibold';
                                    }

                                    return (
                                        <button
                                            type="button"
                                            key={optIndex}
                                            disabled={submitted}
                                            onClick={() => handleSelect(qIndex, optIndex)}
                                            className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${optStyle}`}
                                        >
                                            <span>{opt}</span>
                                            {submitted && optIndex === q.correctAnswer && (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                                            )}
                                            {submitted && isSelected && !isCorrect && (
                                                <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation note */}
                            {submitted && q.explanation && (
                                <div className="mt-4 ml-9 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                                    <span className="font-semibold text-indigo-400">Explanation: </span>
                                    {q.explanation}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer action */}
            {!submitted && (
                <div className="mt-8 flex justify-end border-t border-slate-800 pt-6">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={Object.keys(selectedAnswers).length < questions.length}
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <span>Submit Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
