import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    Sparkles,
    ArrowRight,
    Star,
    BookOpen,
    Users,
    ShieldCheck,
    TrendingUp,
    Award,
    CheckCircle2,
} from 'lucide-react';

interface CourseItem {
    id: string;
    title: string;
    slug: string;
    subtitle?: string;
    thumbnail?: string;
    price: number;
    isFree: boolean;
    level: string;
    category?: { name: string; slug: string } | null;
    instructor?: { name: string; avatar?: string | null; headline?: string | null } | null;
    totalLessons: number;
    enrollmentCount: number;
    rating: number;
    reviewCount: number;
}

interface CategoryItem {
    id: string;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    courseCount: number;
}

interface InstructorItem {
    id: string;
    name: string;
    avatar?: string | null;
    headline?: string | null;
    courseCount: number;
}

interface HomeProps {
    featuredCourses: CourseItem[];
    categories: CategoryItem[];
    topInstructors: InstructorItem[];
    stats: {
        totalCourses: number;
        totalEnrollments: number;
        totalCertificates: number;
        totalInstructors: number;
    };
}

export default function Home({
    featuredCourses = [],
    categories = [],
    topInstructors = [],
    stats,
}: HomeProps) {
    return (
        <AppLayout>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700/80 text-indigo-300 text-xs font-semibold backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Next-Generation Education Marketplace</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                            Master In-Demand Skills.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                                Learn from the Best.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                            High-caliber video courses, hands-on quizzes, and cryptographically verified certificates.
                            Built for instructors to monetize their knowledge and students to accelerate their careers.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link
                                href="/courses"
                                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <span>Browse All Courses</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/instructor"
                                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm backdrop-blur-md transition hover:text-white"
                            >
                                Teach & Earn 80% Split
                            </Link>
                        </div>

                        {/* Quick stats pills */}
                        <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                            <div>
                                <div className="text-2xl font-black text-white">{stats.totalCertificates} Verified</div>
                                <div className="text-xs text-slate-400">Diplomas Issued</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-indigo-400">80 / 20</div>
                                <div className="text-xs text-slate-400">Creator Revenue Split</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-emerald-400">Escrow</div>
                                <div className="text-xs text-slate-400">Platform Protected</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero visual card */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 p-3 shadow-2xl border border-slate-700/80">
                            <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
                                <img
                                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
                                    alt="Featured Course Preview"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                                    <span className="px-2.5 py-1 rounded bg-amber-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider w-fit mb-2">
                                        POPULAR BOOTCAMP
                                    </span>
                                    <h3 className="text-lg font-bold text-white leading-tight">
                                        Full-Stack Web Engineering 2026
                                    </h3>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                                            <Star className="w-3.5 h-3.5 fill-amber-400" /> 5.0
                                        </span>
                                        <span>•</span>
                                        <span>Interactive Quizzes & Video</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verified badge card floating */}
                            <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 rounded-xl p-3.5 shadow-xl flex items-center gap-3 backdrop-blur-lg">
                                <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">Course Complete</div>
                                    <div className="text-[10px] text-slate-400">Auto-issues verified diploma</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Bar */}
            <section className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Explore Top Disciplines</h2>
                            <p className="text-xs text-slate-500">Dive straight into our curated curriculum collections</p>
                        </div>
                        <Link href="/courses" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                            All Disciplines <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/courses?category=${cat.slug}`}
                                className="p-5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-indigo-50/40 hover:shadow-md transition group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{cat.description}</p>
                                <div className="mt-3 text-[11px] font-semibold text-slate-400 group-hover:text-indigo-500">
                                    {cat.courseCount} Courses Available
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses Marketplace */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Highest Rated Learning</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900">Featured Courses</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Complete multi-section courses with full video lessons, quizzes, and certificates
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                    >
                        Explore All
                    </Link>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                            {/* Course Thumbnail */}
                            <Link href={`/courses/${course.slug}`} className="relative aspect-video overflow-hidden bg-slate-900 block">
                                <img
                                    src={
                                        course.thumbnail ||
                                        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
                                    }
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 text-white text-[11px] font-bold backdrop-blur-xs">
                                        {course.level}
                                    </span>
                                </div>
                            </Link>

                            {/* Course Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                {course.category && (
                                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                                        {course.category.name}
                                    </span>
                                )}

                                <Link href={`/courses/${course.slug}`}>
                                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-2 leading-snug">
                                        {course.title}
                                    </h3>
                                </Link>

                                {course.subtitle && (
                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                        {course.subtitle}
                                    </p>
                                )}

                                {/* Instructor */}
                                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                                    <img
                                        src={
                                            course.instructor?.avatar ||
                                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
                                        }
                                        alt={course.instructor?.name || 'Instructor'}
                                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                                    />
                                    <span className="font-medium text-slate-800 line-clamp-1">
                                        {course.instructor?.name}
                                    </span>
                                </div>

                                {/* Meta Stats */}
                                <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span>{course.rating.toFixed(1)}</span>
                                        <span className="text-slate-400 font-normal">({course.reviewCount})</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                            {course.totalLessons} lessons
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5 text-slate-400" />
                                            {course.enrollmentCount}
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom Price & Action */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                    <div>
                                        {course.isFree ? (
                                            <span className="text-base font-black text-emerald-600">FREE</span>
                                        ) : (
                                            <span className="text-lg font-black text-slate-900">
                                                ${course.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <Link
                                        href={`/courses/${course.slug}`}
                                        className="px-4 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition"
                                    >
                                        View Syllabus
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Platform Guarantee Section */}
            <section className="bg-slate-100/70 border-t border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Platform Escrow Protection</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Automated platform-mediated transactions with a 20% platform share and 80% direct creator disbursement.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Cryptographic Certificates</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Unique verifiable serial numbers generated immediately upon 100% course lecture & quiz completion.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Quality Moderation Engine</h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                Admin supervision workflow ensuring all courses meet strict technical and pedagogical standards before going live.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
