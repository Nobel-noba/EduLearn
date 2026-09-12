import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { BookOpen, Award, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface EnrollmentItem {
    id: string;
    enrolledAt: string;
    course: {
        id: string;
        title: string;
        slug: string;
        thumbnail?: string | null;
        instructor: {
            name: string;
        };
    };
    totalLessons: number;
    completedLessons: number;
    progressPercent: number;
    firstLessonId?: string | null;
    certificate?: {
        code: string;
    } | null;
}

interface CertificateItem {
    id: string;
    code: string;
    courseTitle: string;
    issuedAt: string;
}

interface MyLearningProps {
    enrollments: EnrollmentItem[];
    certificates: CertificateItem[];
}

export default function MyLearning({
    enrollments = [],
    certificates = [],
}: MyLearningProps) {
    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Learning</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track your coursework progress, continue lectures, and access verified diplomas.
                    </p>
                </div>

                {/* Enrolled Courses Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            <span>Enrolled Courses ({enrollments.length})</span>
                        </h2>
                        <Link href="/courses" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                            Find More Courses →
                        </Link>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800">No courses enrolled yet</h3>
                            <p className="text-xs text-slate-500 mt-1">Explore our catalog and start learning today.</p>
                            <Link
                                href="/courses"
                                className="inline-block mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enr) => (
                                <div
                                    key={enr.id}
                                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="relative aspect-video bg-slate-900 overflow-hidden">
                                            <img
                                                src={
                                                    enr.course.thumbnail ||
                                                    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
                                                }
                                                alt={enr.course.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {enr.progressPercent === 100 && (
                                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                                                    <CheckCircle2 className="w-3 h-3" /> Completed
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-5 space-y-3">
                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-2">
                                                {enr.course.title}
                                            </h3>
                                            <div className="text-[11px] text-slate-500">
                                                Instructor: {enr.course.instructor.name}
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="pt-2">
                                                <div className="flex items-center justify-between text-xs mb-1.5">
                                                    <span className="font-semibold text-slate-700">
                                                        {enr.progressPercent}% complete
                                                    </span>
                                                    <span className="text-slate-400 text-[11px]">
                                                        {enr.completedLessons} / {enr.totalLessons} lessons
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-500 rounded-full ${
                                                            enr.progressPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                                                        }`}
                                                        style={{ width: `${enr.progressPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                                        {enr.certificate ? (
                                            <Link
                                                href={`/certificates/${enr.certificate.code}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition"
                                            >
                                                <Award className="w-3.5 h-3.5 text-amber-600" />
                                                <span>Certificate</span>
                                            </Link>
                                        ) : <div />}

                                        <Link
                                            href={`/learn/${enr.course.id}/lecture/${enr.firstLessonId || 'first'}`}
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
                                        >
                                            <Play className="w-3.5 h-3.5 fill-white" />
                                            <span>{enr.progressPercent === 100 ? 'Review Course' : 'Resume'}</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Certificates Section */}
                <section className="pt-6 border-t border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span>Earned Certificates ({certificates.length})</span>
                    </h2>

                    {certificates.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                            Complete 100% of any course curriculum and quizzes to unlock an official verified credential.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {certificates.map((cert) => (
                                <Link
                                    key={cert.id}
                                    href={`/certificates/${cert.code}`}
                                    className="p-5 rounded-2xl bg-gradient-to-tr from-amber-50/70 to-white border border-amber-200/80 shadow-xs hover:shadow-md transition flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                                            <Award className="w-6 h-6 text-amber-600" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-mono text-amber-800 font-bold uppercase tracking-wider">
                                                {cert.code}
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                                                {cert.courseTitle}
                                            </h4>
                                            <div className="text-[10px] text-slate-400 mt-0.5">
                                                Issued on {cert.issuedAt}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition" />
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}
