import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../../../Layouts/AppLayout';
import {
    BookOpen,
    Video,
    FileText,
    HelpCircle,
    Plus,
    Trash2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Save,
    Send,
    ExternalLink,
    DollarSign,
    Sparkles,
    Play,
    ArrowLeft,
    X,
} from 'lucide-react';

interface LessonItem {
    id: string;
    title: string;
    type: string;
    videoUrl?: string | null;
    durationSec: number;
    isFreePreview: boolean;
    content?: string | null;
    quizQuestions?: any[];
}

interface SectionItem {
    id: string;
    title: string;
    order: number;
    lessons: LessonItem[];
}

interface CourseEditProps {
    course: {
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
        rejectionReason?: string | null;
        categoryId?: string | null;
        sections: SectionItem[];
    };
    categories: { id: string; name: string }[];
}

export default function CourseEdit({ course, categories = [] }: CourseEditProps) {
    const [activeTab, setActiveTab] = useState<'basics' | 'media' | 'curriculum' | 'pricing'>('curriculum');
    const [saving, setSaving] = useState(false);

    // Form states
    const [title, setTitle] = useState(course.title);
    const [subtitle, setSubtitle] = useState(course.subtitle || '');
    const [description, setDescription] = useState(course.description || '');
    const [categoryId, setCategoryId] = useState(course.categoryId || categories[0]?.id || '');
    const [level, setLevel] = useState(course.level || 'All Levels');
    const [language, setLanguage] = useState(course.language || 'English');
    const [thumbnail, setThumbnail] = useState(course.thumbnail || '');
    const [promoVideoUrl, setPromoVideoUrl] = useState(course.promoVideoUrl || '');
    const [price, setPrice] = useState(course.price.toString());
    const [isFree, setIsFree] = useState(course.isFree);

    // Modals
    const [addSectionOpen, setAddSectionOpen] = useState(false);
    const [sectionTitle, setSectionTitle] = useState('');

    const [addLessonOpen, setAddLessonOpen] = useState(false);
    const [targetSectionId, setTargetSectionId] = useState('');
    const [lessonType, setLessonType] = useState<'VIDEO' | 'ARTICLE' | 'QUIZ'>('VIDEO');
    const [lessonTitle, setLessonTitle] = useState('');
    const [lessonVideoUrl, setLessonVideoUrl] = useState('');
    const [lessonDuration, setLessonDuration] = useState('300');
    const [lessonContent, setLessonContent] = useState('');
    const [lessonIsFree, setLessonIsFree] = useState(false);

    // Quiz creation states
    const [quizQuestion, setQuizQuestion] = useState('');
    const [quizOptions, setQuizOptions] = useState(['', '', '', '']);
    const [quizCorrectAnswer, setQuizCorrectAnswer] = useState(0);
    const [quizExplanation, setQuizExplanation] = useState('');

    const handleSaveBasics = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        router.put(`/instructor/courses/${course.id}`, {
            title,
            subtitle,
            description,
            categoryId,
            level,
            language,
            thumbnail,
            promoVideoUrl,
            price,
            isFree,
        }, {
            onFinish: () => setSaving(false),
        });
    };

    const handleAddSection = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sectionTitle.trim()) return;

        router.post(`/instructor/courses/${course.id}/sections`, {
            title: sectionTitle,
        }, {
            onSuccess: () => {
                setSectionTitle('');
                setAddSectionOpen(false);
            },
        });
    };

    const handleDeleteSection = (sectionId: string) => {
        if (!confirm('Are you sure you want to remove this section and all its lessons?')) return;
        router.delete(`/instructor/courses/${course.id}/sections/${sectionId}`);
    };

    const handleAddLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!lessonTitle.trim()) return;

        const payload: any = {
            sectionId: targetSectionId,
            title: lessonTitle,
            type: lessonType,
            durationSec: parseInt(lessonDuration, 10),
            isFreePreview: lessonIsFree,
        };

        if (lessonType === 'VIDEO') {
            payload.videoUrl = lessonVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        } else if (lessonType === 'ARTICLE') {
            payload.content = lessonContent;
        } else if (lessonType === 'QUIZ') {
            payload.quizQuestions = [
                {
                    question: quizQuestion || 'Assessment Question',
                    options: quizOptions.filter((o) => o.trim() !== ''),
                    correctAnswer: quizCorrectAnswer,
                    explanation: quizExplanation,
                },
            ];
        }

        router.post(`/instructor/courses/${course.id}/lessons`, payload, {
            onSuccess: () => {
                setLessonTitle('');
                setLessonVideoUrl('');
                setLessonContent('');
                setAddLessonOpen(false);
            },
        });
    };

    const handleDeleteLesson = (lessonId: string) => {
        if (!confirm('Are you sure you want to remove this lesson?')) return;
        router.delete(`/instructor/courses/${course.id}/lessons/${lessonId}`);
    };

    const handleSubmitForReview = () => {
        router.post(`/instructor/courses/${course.id}/submit`);
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
                {/* Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/instructor"
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-black text-slate-900 line-clamp-1">
                                    {course.title}
                                </h1>
                                {course.status === 'PUBLISHED' && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                        Published
                                    </span>
                                )}
                                {course.status === 'UNDER_REVIEW' && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> In Review
                                    </span>
                                )}
                                {course.status === 'DRAFT' && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                                        Draft
                                    </span>
                                )}
                                {course.status === 'REJECTED' && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-bold">
                                        Rejected
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Interactive course builder & curriculum designer
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={`/courses/${course.slug}`}
                            target="_blank"
                            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Preview</span>
                        </Link>

                        {course.status !== 'PUBLISHED' && (
                            <button
                                type="button"
                                onClick={handleSubmitForReview}
                                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5 cursor-pointer"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>Submit for Admin Approval</span>
                            </button>
                        )}
                    </div>
                </div>

                {course.status === 'REJECTED' && course.rejectionReason && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold">Admin Moderation Feedback: </span>
                            {course.rejectionReason}
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex border-b border-slate-200 text-xs font-bold text-slate-500">
                    <button
                        type="button"
                        onClick={() => setActiveTab('curriculum')}
                        className={`px-5 py-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
                            activeTab === 'curriculum'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent hover:text-slate-800'
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Curriculum Structure</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('basics')}
                        className={`px-5 py-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
                            activeTab === 'basics'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent hover:text-slate-800'
                        }`}
                    >
                        <FileText className="w-4 h-4" />
                        <span>Course Basics</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('media')}
                        className={`px-5 py-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
                            activeTab === 'media'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent hover:text-slate-800'
                        }`}
                    >
                        <Video className="w-4 h-4" />
                        <span>Media & Trailer</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('pricing')}
                        className={`px-5 py-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
                            activeTab === 'pricing'
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent hover:text-slate-800'
                        }`}
                    >
                        <DollarSign className="w-4 h-4" />
                        <span>Pricing & Revenue</span>
                    </button>
                </div>

                {/* TAB 1: CURRICULUM */}
                {activeTab === 'curriculum' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Curriculum Organizer</h2>
                                <p className="text-xs text-slate-500">
                                    Organize lectures into ordered sections. Add streaming videos, study guides, and quizzes.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAddSectionOpen(true)}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Section</span>
                            </button>
                        </div>

                        {course.sections.length === 0 ? (
                            <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center text-xs text-slate-500">
                                No sections created yet. Click "Add Section" to begin structuring your course.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {course.sections.map((section, sIdx) => (
                                    <div
                                        key={section.id}
                                        className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
                                    >
                                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
                                                    {sIdx + 1}
                                                </span>
                                                <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setTargetSectionId(section.id);
                                                        setAddLessonOpen(true);
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    <span>Add Lesson</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteSection(section.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="divide-y divide-slate-100 p-2">
                                            {section.lessons.length === 0 ? (
                                                <div className="p-4 text-center text-xs text-slate-400">
                                                    No lectures in this section yet.
                                                </div>
                                            ) : (
                                                section.lessons.map((lesson) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="p-3 flex items-center justify-between text-xs hover:bg-slate-50/70 rounded-lg transition"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {lesson.type === 'VIDEO' && <Video className="w-4 h-4 text-indigo-600" />}
                                                            {lesson.type === 'ARTICLE' && <FileText className="w-4 h-4 text-sky-600" />}
                                                            {lesson.type === 'QUIZ' && <HelpCircle className="w-4 h-4 text-amber-600" />}

                                                            <span className="font-semibold text-slate-800">{lesson.title}</span>

                                                            {lesson.isFreePreview && (
                                                                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                                                    Free Preview
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-400 font-mono text-[11px]">
                                                                {Math.round(lesson.durationSec / 60)}m
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteLesson(lesson.id)}
                                                                className="text-slate-400 hover:text-red-600 transition cursor-pointer"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 2: BASICS */}
                {activeTab === 'basics' && (
                    <form onSubmit={handleSaveBasics} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-3xl">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
                                <input
                                    type="text"
                                    value={subtitle}
                                    onChange={(e) => setSubtitle(e.target.value)}
                                    className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description</label>
                                <textarea
                                    rows={6}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-slate-50 text-xs p-4 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <select
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        className="w-full bg-slate-50 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
                                    <select
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                        className="w-full bg-slate-50 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                    >
                                        <option value="All Levels">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Instruction Language</label>
                                    <input
                                        type="text"
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{saving ? 'Saving...' : 'Save Basics'}</span>
                        </button>
                    </form>
                )}

                {/* TAB 3: MEDIA */}
                {activeTab === 'media' && (
                    <form onSubmit={handleSaveBasics} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-3xl">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Course Thumbnail Image URL</label>
                            <input
                                type="text"
                                value={thumbnail}
                                onChange={(e) => setThumbnail(e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                            />
                            {thumbnail && (
                                <img src={thumbnail} alt="Thumbnail preview" className="w-64 h-36 object-cover rounded-xl mt-3 border" />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Promotional Trailer Video Stream URL</label>
                            <input
                                type="text"
                                value={promoVideoUrl}
                                onChange={(e) => setPromoVideoUrl(e.target.value)}
                                placeholder="https://..."
                                className="w-full bg-slate-50 text-xs px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{saving ? 'Saving...' : 'Save Media'}</span>
                        </button>
                    </form>
                )}

                {/* TAB 4: PRICING */}
                {activeTab === 'pricing' && (
                    <form onSubmit={handleSaveBasics} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-2xl">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 mb-1">Course Access & Pricing</h3>
                            <p className="text-xs text-slate-500 mb-4">
                                Set individual course pricing. The platform fee (20%) is automatically calculated.
                            </p>

                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isFree}
                                        onChange={(e) => setIsFree(e.target.checked)}
                                        className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                                    />
                                    <span>Make this course 100% Free for all students</span>
                                </label>

                                {!isFree && (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Price ($ USD)</label>
                                        <div className="relative max-w-xs">
                                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                className="w-full bg-slate-50 text-sm font-bold pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                            />
                                        </div>

                                        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-600 max-w-xs">
                                            <div className="flex justify-between">
                                                <span>Your Net Share (80%):</span>
                                                <span className="font-bold text-emerald-600">
                                                    ${(parseFloat(price || '0') * 0.8).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-slate-400 text-[11px]">
                                                <span>Platform Operating Fee (20%):</span>
                                                <span>${(parseFloat(price || '0') * 0.2).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{saving ? 'Saving...' : 'Save Pricing'}</span>
                        </button>
                    </form>
                )}
            </div>

            {/* Modal: Add Section */}
            {addSectionOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <form onSubmit={handleAddSection} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Add New Syllabus Section</h3>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                required
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                                placeholder="e.g. Section 2: Building Full-Stack REST APIs"
                                className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setAddSectionOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                            >
                                Create Section
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Modal: Add Lesson */}
            {addLessonOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <form onSubmit={handleAddLesson} className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900">Add Lesson</h3>
                            <button type="button" onClick={() => setAddLessonOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Lesson Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {(['VIDEO', 'ARTICLE', 'QUIZ'] as const).map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setLessonType(t)}
                                        className={`py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                                            lessonType === t
                                                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Lesson Title</label>
                            <input
                                type="text"
                                required
                                value={lessonTitle}
                                onChange={(e) => setLessonTitle(e.target.value)}
                                placeholder="e.g. Master React Server Actions"
                                className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                            />
                        </div>

                        {lessonType === 'VIDEO' && (
                            <>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Video Streaming URL</label>
                                    <input
                                        type="text"
                                        value={lessonVideoUrl}
                                        onChange={(e) => setLessonVideoUrl(e.target.value)}
                                        placeholder="https://commondatastorage.googleapis.com/.../sample.mp4"
                                        className="w-full bg-slate-50 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Duration (Seconds)</label>
                                        <input
                                            type="number"
                                            value={lessonDuration}
                                            onChange={(e) => setLessonDuration(e.target.value)}
                                            className="w-full bg-slate-50 text-xs px-3.5 py-2 rounded-xl border border-slate-200"
                                        />
                                    </div>
                                    <div className="flex items-center pt-5">
                                        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={lessonIsFree}
                                                onChange={(e) => setLessonIsFree(e.target.checked)}
                                                className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                                            />
                                            <span>Free Preview</span>
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        {lessonType === 'ARTICLE' && (
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Study Guide Content</label>
                                <textarea
                                    rows={6}
                                    value={lessonContent}
                                    onChange={(e) => setLessonContent(e.target.value)}
                                    placeholder="Write markdown or rich text reading material for this lesson..."
                                    className="w-full bg-slate-50 text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                                />
                            </div>
                        )}

                        {lessonType === 'QUIZ' && (
                            <div className="space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Question</label>
                                    <input
                                        type="text"
                                        value={quizQuestion}
                                        onChange={(e) => setQuizQuestion(e.target.value)}
                                        placeholder="What is the benefit of React Server Components?"
                                        className="w-full bg-white text-xs px-3 py-2 rounded-lg border border-slate-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block font-semibold text-slate-700">Options (Select radio for correct answer)</label>
                                    {quizOptions.map((opt, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="quizCorrect"
                                                checked={quizCorrectAnswer === idx}
                                                onChange={() => setQuizCorrectAnswer(idx)}
                                                className="accent-indigo-600"
                                            />
                                            <input
                                                type="text"
                                                value={opt}
                                                onChange={(e) => {
                                                    const next = [...quizOptions];
                                                    next[idx] = e.target.value;
                                                    setQuizOptions(next);
                                                }}
                                                placeholder={`Option ${idx + 1}`}
                                                className="w-full bg-white text-xs px-2.5 py-1.5 rounded-lg border border-slate-200"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-700 mb-1">Explanation</label>
                                    <input
                                        type="text"
                                        value={quizExplanation}
                                        onChange={(e) => setQuizExplanation(e.target.value)}
                                        placeholder="Why this answer is correct..."
                                        className="w-full bg-white text-xs px-3 py-1.5 rounded-lg border border-slate-200"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setAddLessonOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                            >
                                Add Lesson to Section
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AppLayout>
    );
}
