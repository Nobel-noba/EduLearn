import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import {
    Play,
    CheckCircle2,
    Clock,
    BookOpen,
    Award,
    Globe,
    Star,
    ChevronDown,
    ChevronUp,
    ShieldCheck,
    Smartphone,
    HelpCircle,
    X,
} from 'lucide-react';

interface LessonItem {
    id: string;
    title: string;
    order: number;
    type: string;
    durationSec: number;
    isFreePreview: boolean;
    videoUrl?: string | null;
    quizQuestionsCount: number;
}

interface SectionItem {
    id: string;
    title: string;
    order: number;
    lessons: LessonItem[];
}

interface ReviewItem {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user: {
        name: string;
        avatar?: string | null;
    };
}

interface CourseDetail {
    id: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description: string;
    thumbnail?: string | null;
    promoVideoUrl?: string | null;
    price: number;
    isFree: boolean;
    level: string;
    language: string;
    status: string;
    category?: { id: string; name: string; slug: string } | null;
    instructor: {
        id: string;
        name: string;
        avatar?: string | null;
        headline?: string | null;
        bio?: string | null;
    };
    sections: SectionItem[];
    reviews: ReviewItem[];
    totalLessons: number;
    totalDurationSec: number;
    enrollmentCount: number;
    rating: number;
    reviewCount: number;
}

interface ShowProps {
    course: CourseDetail;
    isEnrolled: boolean;
    firstLessonId?: string | null;
}

export default function CourseShow({
    course,
    isEnrolled,
    firstLessonId,
}: ShowProps) {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        [course.sections[0]?.id || '']: true,
    });
    const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

    const toggleSection = (id: string) => {
        setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const durationMinutes = Math.round(course.totalDurationSec / 60);

    return (
        <AppLayout>
            <div className="flex-1 pb-16">
                {/* Hero Banner (Coursera / Udemy dark theme) */}
                <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 space-y-4">
                            {/* Breadcrumb / Category */}
                            <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold uppercase tracking-wider">
                                <Link href="/courses" className="hover:underline">Courses</Link>
                                <span>/</span>
                                {course.category && <span>{course.category.name}</span>}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                                {course.subtitle || course.description}
                            </p>

                            {/* Badges / Rating Row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                                <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-black uppercase text-[10px] tracking-wide">
                                    Bestseller
                                </span>

                                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                                    <span>{course.rating.toFixed(1)}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-slate-400 font-normal">({course.reviewCount} ratings)</span>
                                </div>

                                <span className="text-slate-500">•</span>
                                <span className="text-slate-300">{course.enrollmentCount} learners</span>

                                <span className="text-slate-500">•</span>
                                <div className="flex items-center gap-1.5 text-slate-300">
                                    <span>Created by</span>
                                    <span className="font-semibold text-indigo-300 underline underline-offset-2">
                                        {course.instructor.name}
                                    </span>
                                </div>

                                <span className="text-slate-500">•</span>
                                <div className="flex items-center gap-1 text-slate-400">
                                    <Globe className="w-3.5 h-3.5" />
                                    <span>{course.language}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Grid Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Details & Curriculum */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* "What you'll learn" card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">What you will master</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-700">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>End-to-end architecture & production deployment best practices</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>Build complete real-world portfolio applications from scratch</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>Master industry tooling, state management, and type safety</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>Earn an official verifiable Certificate of Completion</span>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum Section Breakdown */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
                                    <div className="text-xs text-slate-500 mt-0.5">
                                        {course.sections.length} sections • {course.totalLessons} lectures • {durationMinutes} min total length
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const allOpen = Object.keys(openSections).length === course.sections.length;
                                        if (allOpen) {
                                            setOpenSections({});
                                        } else {
                                            const next: Record<string, boolean> = {};
                                            course.sections.forEach((s) => (next[s.id] = true));
                                            setOpenSections(next);
                                        }
                                    }}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                >
                                    Toggle all sections
                                </button>
                            </div>

                            <div className="space-y-3">
                                {course.sections.map((section) => {
                                    const isOpen = openSections[section.id];
                                    const sectionDuration = Math.round(
                                        section.lessons.reduce((acc, l) => acc + l.durationSec, 0) / 60
                                    );

                                    return (
                                        <div
                                            key={section.id}
                                            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleSection(section.id)}
                                                className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition text-left cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {isOpen ? (
                                                        <ChevronUp className="w-4 h-4 text-slate-500" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4 text-slate-500" />
                                                    )}
                                                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                                                        {section.title}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {section.lessons.length} lectures • {sectionDuration}m
                                                </div>
                                            </button>

                                            {isOpen && (
                                                <div className="divide-y divide-slate-100 px-5 py-2">
                                                    {section.lessons.map((lesson) => (
                                                        <div
                                                            key={lesson.id}
                                                            className="py-3 flex items-center justify-between text-xs sm:text-sm"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {lesson.type === 'QUIZ' ? (
                                                                    <HelpCircle className="w-4 h-4 text-amber-500" />
                                                                ) : lesson.type === 'ARTICLE' ? (
                                                                    <BookOpen className="w-4 h-4 text-sky-500" />
                                                                ) : (
                                                                    <Play className="w-4 h-4 text-indigo-500" />
                                                                )}
                                                                <span className="text-slate-800 font-medium">{lesson.title}</span>
                                                                {lesson.type === 'QUIZ' && (
                                                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800 font-bold">
                                                                        Quiz
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="flex items-center gap-3">
                                                                {lesson.isFreePreview && lesson.videoUrl && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setPreviewVideoUrl(lesson.videoUrl || null)}
                                                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1 cursor-pointer"
                                                                    >
                                                                        <Play className="w-3 h-3 fill-indigo-600" /> Preview
                                                                    </button>
                                                                )}
                                                                <span className="text-xs text-slate-400 font-mono">
                                                                    {Math.round(lesson.durationSec / 60)}m
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Course Overview</h2>
                            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                                {course.description}
                            </div>
                        </div>

                        {/* Instructor Bio Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Your Instructor</h2>
                            <div className="flex items-start gap-4">
                                <img
                                    src={
                                        course.instructor.avatar ||
                                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                                    }
                                    alt={course.instructor.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200 shrink-0"
                                />
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">{course.instructor.name}</h3>
                                    <p className="text-xs text-indigo-600 font-semibold">{course.instructor.headline}</p>
                                    {course.instructor.bio && (
                                        <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
                                            {course.instructor.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Student Reviews */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                <span>Verified Student Reviews</span>
                            </h2>

                            {course.reviews.length === 0 ? (
                                <p className="text-xs text-slate-500">No student reviews yet for this course.</p>
                            ) : (
                                <div className="space-y-6">
                                    {course.reviews.map((rev) => (
                                        <div key={rev.id} className="border-b border-slate-100 pb-6 last:border-none last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2.5">
                                                    <img
                                                        src={
                                                            rev.user.avatar ||
                                                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
                                                        }
                                                        alt={rev.user.name}
                                                        className="w-7 h-7 rounded-full object-cover border"
                                                    />
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-900">{rev.user.name}</div>
                                                        <div className="text-[10px] text-slate-400">{rev.createdAt}</div>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star
                                                            key={s}
                                                            className={`w-3 h-3 ${
                                                                s <= rev.rating
                                                                    ? 'fill-amber-400 text-amber-400'
                                                                    : 'text-slate-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sticky Purchase Box */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                            {/* Thumbnail / Trailer click */}
                            <div className="relative aspect-video bg-black group cursor-pointer" onClick={() => {
                                if (course.promoVideoUrl) setPreviewVideoUrl(course.promoVideoUrl);
                            }}>
                                <img
                                    src={
                                        course.thumbnail ||
                                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
                                    }
                                    alt={course.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white text-indigo-600 flex items-center justify-center shadow-lg transition">
                                        <Play className="w-6 h-6 ml-1 fill-indigo-600" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 inset-x-0 text-center text-white text-[11px] font-bold drop-shadow">
                                    Preview Course Trailer
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <div className="text-3xl font-black text-slate-900">
                                        {course.isFree ? 'FREE' : `$${course.price.toFixed(2)}`}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>30-Day Money-Back Guarantee</span>
                                    </div>
                                </div>

                                {isEnrolled ? (
                                    <Link
                                        href={firstLessonId ? `/learn/${course.id}/lecture/${firstLessonId}` : '/my-learning'}
                                        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm text-center block shadow-lg shadow-emerald-600/20 transition"
                                    >
                                        Go to Learning Classroom
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/checkout/${course.id}`}
                                        className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm text-center block shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition"
                                    >
                                        Enroll Now
                                    </Link>
                                )}

                                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                                    <div className="font-bold text-slate-900">This course includes:</div>
                                    <div className="flex items-center gap-2.5">
                                        <Clock className="w-4 h-4 text-indigo-600" />
                                        <span>{durationMinutes} minutes of on-demand streaming</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <BookOpen className="w-4 h-4 text-indigo-600" />
                                        <span>{course.totalLessons} structured lectures & quizzes</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Smartphone className="w-4 h-4 text-indigo-600" />
                                        <span>Access on desktop, tablet, and mobile</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Award className="w-4 h-4 text-indigo-600" />
                                        <span>Verified Cryptographic Certificate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Trailer Modal */}
            {previewVideoUrl && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setPreviewVideoUrl(null)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <video
                            src={previewVideoUrl}
                            controls
                            autoPlay
                            className="w-full aspect-video"
                        />
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
