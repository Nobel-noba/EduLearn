import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { BookOpen, Edit, ExternalLink, Clock, Plus, ArrowLeft, X, FolderPlus } from 'lucide-react';

interface CourseItem {
    id: string;
    title: string;
    slug: string;
    status: string;
    price: number;
    isFree: boolean;
    level: string;
    category: string;
    studentsCount: number;
    sectionsCount: number;
    updatedAt: string;
}

interface Category {
    id: string;
    name: string;
}

interface InstructorCoursesProps {
    courses: CourseItem[];
    categories?: Category[];
}

export default function InstructorCoursesIndex({ courses = [], categories = [] }: InstructorCoursesProps) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState(categories[0]?.id || '');
    const [newPrice, setNewPrice] = useState('49.99');
    const [newLevel, setNewLevel] = useState('All Levels');
    const [creating, setCreating] = useState(false);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        setCreating(true);
        router.post('/instructor/courses', {
            title: newTitle,
            categoryId: newCategory || (categories[0]?.id || null),
            price: newPrice,
            level: newLevel,
        }, {
            onFinish: () => {
                setCreating(false);
                setCreateModalOpen(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Course Management - Instructor Studio" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/instructor"
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Course Management
                            </h1>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Manage and update your curriculum, media, and pricing.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setCreateModalOpen(true)}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create New Course</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    {courses.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                                <FolderPlus className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">No courses in catalog</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                                Click the button below to start authoring your first course.
                            </p>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                            >
                                Create New Course
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50 transition"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900">{course.title}</h3>
                                            {course.status === 'PUBLISHED' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                                    Published
                                                </span>
                                            )}
                                            {course.status === 'UNDER_REVIEW' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> In Review
                                                </span>
                                            )}
                                            {course.status === 'DRAFT' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                                                    Draft
                                                </span>
                                            )}
                                            {course.status === 'REJECTED' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                                                    Needs Revision
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span>Category: <strong className="text-slate-700">{course.category}</strong></span>
                                            <span>•</span>
                                            <span>{course.sectionsCount} sections</span>
                                            <span>•</span>
                                            <span>{course.studentsCount} students</span>
                                            <span>•</span>
                                            <span>Price: <strong className="text-slate-900">${course.price.toFixed(2)}</strong></span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/courses/${course.slug}`}
                                            target="_blank"
                                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Preview</span>
                                        </Link>

                                        <Link
                                            href={`/instructor/courses/${course.id}/edit`}
                                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                            <span>Edit Course</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create New Course Modal */}
            {createModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-900">Create New Course</h2>
                            <button
                                onClick={() => setCreateModalOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-6">
                            Set the foundational details for your course. You can design sections and add video lessons in the curriculum builder next.
                        </p>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="e.g. Modern Full-Stack Cloud Architecture"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Category
                                </label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
                                >
                                    {categories.length > 0 ? (
                                        categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">General</option>
                                    )}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Price ($ USD)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                                    />
                                    <span className="text-[10px] text-slate-400 mt-1 block">Set 0.00 for free course</span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Difficulty Level
                                    </label>
                                    <select
                                        value={newLevel}
                                        onChange={(e) => setNewLevel(e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
                                    >
                                        <option value="All Levels">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating || !newTitle.trim()}
                                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
                                >
                                    {creating ? 'Creating Course...' : 'Continue to Curriculum Builder →'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
