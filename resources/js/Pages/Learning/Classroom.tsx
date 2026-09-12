import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import VideoPlayer from '../../Components/VideoPlayer';
import QuizRunner from '../../Components/QuizRunner';
import confetti from 'canvas-confetti';
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Circle,
    Play,
    BookOpen,
    HelpCircle,
    Award,
    Menu,
    X,
    MessageSquare,
    FileText,
    Sparkles,
} from 'lucide-react';

interface LessonDetail {
    id: string;
    title: string;
    type: string;
    content?: string | null;
    videoUrl?: string | null;
    durationSec: number;
    isCompleted: boolean;
    quizQuestions?: any[];
}

interface SectionDetail {
    id: string;
    title: string;
    lessons: {
        id: string;
        title: string;
        type: string;
        durationSec: number;
        isCompleted: boolean;
    }[];
}

interface ClassroomProps {
    course: {
        id: string;
        title: string;
        slug: string;
        instructor: {
            name: string;
            avatar?: string | null;
        };
        sections: SectionDetail[];
    };
    currentLesson: LessonDetail;
    navigation: {
        prevLessonId?: string | null;
        nextLessonId?: string | null;
    };
    progress: {
        totalLessons: number;
        completedCount: number;
        percent: number;
        certificateCode?: string | null;
    };
}

export default function Classroom({
    course,
    currentLesson,
    navigation,
    progress: initialProgress,
}: ClassroomProps) {
    const [progress, setProgress] = useState(initialProgress);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'resources'>('overview');
    const [showCertModal, setShowCertModal] = useState(false);

    const toggleLessonProgress = async (lessonId: string, currentStatus: boolean) => {
        const nextStatus = !currentStatus;

        try {
            const res = await fetch(`/learn/${course.id}/progress/${lessonId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ completed: nextStatus }),
            });
            const data = await res.json();

            if (data.success) {
                setProgress((prev) => ({
                    ...prev,
                    completedCount: data.completedCount,
                    percent: data.percent,
                    certificateCode: data.certificateCode || prev.certificateCode,
                }));

                // Update current lesson status
                currentLesson.isCompleted = data.completed;

                if (data.courseCompleted && data.certificateCode) {
                    setShowCertModal(true);
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 },
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleNext = () => {
        if (navigation.nextLessonId) {
            router.visit(`/learn/${course.id}/lecture/${navigation.nextLessonId}`);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
            {/* Top Distraction-Free Header */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 sticky top-0 z-40">
                <div className="flex items-center gap-4">
                    <Link
                        href="/my-learning"
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">My Learning</span>
                    </Link>

                    <div className="h-5 w-px bg-slate-800 hidden sm:block" />

                    <div>
                        <h1 className="text-xs sm:text-sm font-bold text-white line-clamp-1 max-w-md sm:max-w-xl">
                            {course.title}
                        </h1>
                        <div className="text-[10px] text-slate-400 line-clamp-1">
                            {currentLesson.title}
                        </div>
                    </div>
                </div>

                {/* Right Header Navigation & Certificate button */}
                <div className="flex items-center gap-3">
                    {/* Certificate Badge if unlocked */}
                    {progress.certificateCode && (
                        <Link
                            href={`/certificates/${progress.certificateCode}`}
                            target="_blank"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition"
                        >
                            <Award className="w-4 h-4 text-slate-950" />
                            <span>View Diploma</span>
                        </Link>
                    )}

                    {/* Progress Indicator */}
                    <div className="hidden md:flex items-center gap-2 text-xs">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                                className={`h-full transition-all duration-300 ${
                                    progress.percent === 100 ? 'bg-emerald-400' : 'bg-indigo-500'
                                }`}
                                style={{ width: `${progress.percent}%` }}
                            />
                        </div>
                        <span className="font-mono text-slate-400 font-bold">{progress.percent}%</span>
                    </div>

                    {/* Prev / Next buttons */}
                    <div className="flex items-center gap-1">
                        {navigation.prevLessonId ? (
                            <Link
                                href={`/learn/${course.id}/lecture/${navigation.prevLessonId}`}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                                title="Previous Lecture"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Link>
                        ) : (
                            <button disabled className="p-1.5 rounded-lg bg-slate-900 text-slate-700 cursor-not-allowed">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        )}

                        {navigation.nextLessonId ? (
                            <Link
                                href={`/learn/${course.id}/lecture/${navigation.nextLessonId}`}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-sm"
                            >
                                <span>Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        ) : (
                            <button disabled className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-600 text-xs font-bold cursor-not-allowed">
                                Course End
                            </button>
                        )}
                    </div>

                    {/* Toggle Sidebar mobile */}
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 lg:hidden cursor-pointer"
                    >
                        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Left Side: Video Player or Article or Quiz */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* 1. Lesson Content Type */}
                        {currentLesson.type === 'VIDEO' && (
                            <VideoPlayer
                                url={
                                    currentLesson.videoUrl ||
                                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                                }
                                title={currentLesson.title}
                                isCompleted={currentLesson.isCompleted}
                                onMarkComplete={() => toggleLessonProgress(currentLesson.id, currentLesson.isCompleted)}
                                onEnded={() => {
                                    if (!currentLesson.isCompleted) {
                                        toggleLessonProgress(currentLesson.id, false);
                                    }
                                }}
                            />
                        )}

                        {currentLesson.type === 'QUIZ' && (
                            <QuizRunner
                                questions={currentLesson.quizQuestions || []}
                                isAlreadyCompleted={currentLesson.isCompleted}
                                onQuizPassed={() => {
                                    if (!currentLesson.isCompleted) {
                                        toggleLessonProgress(currentLesson.id, false);
                                    }
                                }}
                                onNextLesson={handleNext}
                            />
                        )}

                        {currentLesson.type === 'ARTICLE' && (
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 text-slate-200 shadow-xl space-y-6">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
                                        <BookOpen className="w-4 h-4" />
                                        <span>Technical Reading & Study Guide</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleLessonProgress(currentLesson.id, currentLesson.isCompleted)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                                            currentLesson.isCompleted
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                                        }`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>{currentLesson.isCompleted ? 'Completed' : 'Mark as Read'}</span>
                                    </button>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-black text-white">{currentLesson.title}</h2>
                                <div className="text-sm leading-relaxed whitespace-pre-line text-slate-300 space-y-4 font-normal">
                                    {currentLesson.content || 'Study notes and documentation provided by the instructor.'}
                                </div>
                            </div>
                        )}

                        {/* 2. Lecture Navigation Bar below player */}
                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                            <div>
                                <h3 className="text-sm font-bold text-white">{currentLesson.title}</h3>
                                <p className="text-xs text-slate-400">
                                    Duration: {Math.round(currentLesson.durationSec / 60)} min • Type: {currentLesson.type}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => toggleLessonProgress(currentLesson.id, currentLesson.isCompleted)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                                    currentLesson.isCompleted
                                        ? 'bg-emerald-600/90 text-white hover:bg-emerald-700'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                                }`}
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{currentLesson.isCompleted ? 'Lesson Completed' : 'Mark Lesson Complete'}</span>
                            </button>
                        </div>

                        {/* 3. Community / Tabs */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                            <div className="flex border-b border-slate-800 text-xs font-semibold text-slate-400">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('overview')}
                                    className={`px-5 py-3 border-b-2 transition cursor-pointer ${
                                        activeTab === 'overview'
                                            ? 'border-indigo-500 text-white bg-slate-800/40'
                                            : 'border-transparent hover:text-slate-200'
                                    }`}
                                >
                                    Overview & Notes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('qa')}
                                    className={`px-5 py-3 border-b-2 transition cursor-pointer ${
                                        activeTab === 'qa'
                                            ? 'border-indigo-500 text-white bg-slate-800/40'
                                            : 'border-transparent hover:text-slate-200'
                                    }`}
                                >
                                    Student Q&A
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('resources')}
                                    className={`px-5 py-3 border-b-2 transition cursor-pointer ${
                                        activeTab === 'resources'
                                            ? 'border-indigo-500 text-white bg-slate-800/40'
                                            : 'border-transparent hover:text-slate-200'
                                    }`}
                                >
                                    Lesson Resources
                                </button>
                            </div>

                            <div className="p-6 text-xs text-slate-300">
                                {activeTab === 'overview' && (
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-white text-sm">About this lecture</h4>
                                        <p className="leading-relaxed text-slate-400">
                                            This lecture is part of the comprehensive curriculum taught by {course.instructor.name}.
                                            Make sure to take careful notes and complete all assessments to unlock your verified certificate.
                                        </p>
                                    </div>
                                )}

                                {activeTab === 'qa' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>Ask a question to the instructor or fellow learners.</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Write your question..."
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-hidden focus:border-indigo-500"
                                        />
                                    </div>
                                )}

                                {activeTab === 'resources' && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <FileText className="w-4 h-4 text-indigo-400" />
                                                <span>Lecture Code Repository & Slides.pdf</span>
                                            </div>
                                            <span className="text-[10px] text-slate-500 font-mono">2.4 MB</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Side: Curriculum Sidebar Drawer */}
                <aside
                    className={`w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0 ${
                        sidebarOpen ? 'block' : 'hidden lg:block'
                    }`}
                >
                    <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Course Content
                        </h2>
                        <span className="text-[11px] text-slate-400 font-mono">
                            {progress.completedCount} / {progress.totalLessons}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-slate-800">
                        {course.sections.map((section, sIdx) => (
                            <div key={section.id}>
                                <div className="p-3.5 bg-slate-950/50 text-slate-300 text-xs font-bold">
                                    {section.title}
                                </div>
                                <div className="divide-y divide-slate-800/60">
                                    {section.lessons.map((lesson) => {
                                        const isCurrent = lesson.id === currentLesson.id;
                                        return (
                                            <Link
                                                key={lesson.id}
                                                href={`/learn/${course.id}/lecture/${lesson.id}`}
                                                className={`p-3.5 flex items-start gap-3 text-xs transition block ${
                                                    isCurrent
                                                        ? 'bg-indigo-950/60 border-l-4 border-indigo-500 text-white'
                                                        : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                                                }`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleLessonProgress(lesson.id, lesson.isCompleted);
                                                    }}
                                                    className="mt-0.5 shrink-0 hover:scale-110 transition cursor-pointer"
                                                >
                                                    {lesson.isCompleted ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                                                    ) : (
                                                        <Circle className="w-4 h-4 text-slate-600" />
                                                    )}
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <div className={`font-medium line-clamp-2 ${isCurrent ? 'text-white' : ''}`}>
                                                        {lesson.title}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                                                        <span>{lesson.type}</span>
                                                        <span>•</span>
                                                        <span>{Math.round(lesson.durationSec / 60)}m</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            {/* 100% Completion Confetti Celebration Modal */}
            {showCertModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-amber-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                            <Award className="w-10 h-10" />
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>Congratulations!</span>
                            </div>
                            <h2 className="text-2xl font-black text-white">100% Curriculum Completed</h2>
                            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                                You have fulfilled all requirements for <span className="font-bold text-white">{course.title}</span>. Your official cryptographic certificate of completion has been generated.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-400">
                            Certificate ID: {progress.certificateCode}
                        </div>

                        <div className="space-y-2">
                            <Link
                                href={`/certificates/${progress.certificateCode}`}
                                target="_blank"
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs block shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition"
                            >
                                Open Verified Certificate
                            </Link>
                            <button
                                type="button"
                                onClick={() => setShowCertModal(false)}
                                className="w-full py-2.5 text-xs text-slate-400 hover:text-white transition cursor-pointer"
                            >
                                Back to Classroom
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
