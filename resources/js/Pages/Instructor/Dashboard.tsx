import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    Sparkles,
    Wallet,
    BookOpen,
    DollarSign,
    Users,
    ArrowRight,
    Edit,
    Clock,
    Plus,
    X,
    FolderPlus,
} from 'lucide-react';

interface SaleItem {
    id: number;
    courseTitle: string;
    buyerName: string;
    grossPrice: number;
    netEarned: number;
    date: string;
}

interface CourseSummary {
    id: string;
    title: string;
    status: string;
    price: number;
    students: number;
}

interface Category {
    id: string;
    name: string;
}

interface InstructorDashboardProps {
    instructor: {
        name: string;
        email: string;
        avatar?: string | null;
        walletBalance: number;
    };
    metrics: {
        grossSales: number;
        netEarnings: number;
        walletBalance: number;
        totalStudents: number;
        activeCourses: number;
    };
    recentSales: SaleItem[];
    courses: CourseSummary[];
    categories?: Category[];
}

export default function InstructorDashboard({
    instructor,
    metrics,
    recentSales = [],
    courses = [],
    categories = [],
}: InstructorDashboardProps) {
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
            <Head title="Instructor Studio & Monetization Hub - EduLearn" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                            <span>Instructor Studio & Monetization Hub</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Welcome, {instructor.name}
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Manage your course catalog, design curriculum, and withdraw creator revenue.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/instructor/payouts"
                            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-xs transition flex items-center gap-2"
                        >
                            <Wallet className="w-4 h-4 text-emerald-600" />
                            <span>Wallet & Payouts</span>
                        </Link>

                        <Link
                            href="/instructor/courses"
                            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-xs transition flex items-center gap-2"
                        >
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                            <span>Course Manager</span>
                        </Link>

                        {/* Prominent Create New Course Button */}
                        <button
                            onClick={() => setCreateModalOpen(true)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create New Course</span>
                        </button>
                    </div>
                </div>

                {/* Financial Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Wallet Balance Card */}
                    <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-2">
                            <span>Available Balance</span>
                            <Wallet className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-3xl font-black text-emerald-400">
                            ${metrics.walletBalance.toFixed(2)}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400">Ready for withdrawal</span>
                            <Link
                                href="/instructor/payouts"
                                className="text-xs font-bold text-sky-400 hover:underline flex items-center gap-1"
                            >
                                Withdraw <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Net Earnings (80%) */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                            <span>Net Creator Earnings (80%)</span>
                            <DollarSign className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            ${metrics.netEarnings.toFixed(2)}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between">
                            <span>Gross Sales:</span>
                            <span className="font-bold text-slate-800">${metrics.grossSales.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Total Active Courses */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                            <span>Active Courses</span>
                            <BookOpen className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            {metrics.activeCourses}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] text-slate-500">In catalog</span>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                            >
                                + New Course
                            </button>
                        </div>
                    </div>

                    {/* Enrolled Students */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                            <span>Students Taught</span>
                            <Users className="w-4 h-4 text-sky-600" />
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                            {metrics.totalStudents}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                            Across {metrics.activeCourses} active courses
                        </div>
                    </div>
                </div>

                {/* Courses Management Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">Your Course Catalog</h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Draft, submit for admin review, and update curriculum for your courses.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Course</span>
                            </button>
                            <Link
                                href="/instructor/courses"
                                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                            >
                                View All Courses →
                            </Link>
                        </div>
                    </div>

                    {courses.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                                <FolderPlus className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">No courses created yet</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                                Start sharing your knowledge by creating your first course curriculum.
                            </p>
                            <button
                                onClick={() => setCreateModalOpen(true)}
                                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                            >
                                Create Your First Course
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {courses.map((c) => (
                                <div key={c.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50 transition">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                                            {c.status === 'PUBLISHED' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                                    Published
                                                </span>
                                            )}
                                            {c.status === 'UNDER_REVIEW' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> In Review
                                                </span>
                                            )}
                                            {c.status === 'DRAFT' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                                                    Draft
                                                </span>
                                            )}
                                            {c.status === 'REJECTED' && (
                                                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                                                    Needs Revision
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            ${c.price.toFixed(2)} • {c.students} students enrolled
                                        </div>
                                    </div>

                                    <Link
                                        href={`/instructor/courses/${c.id}/edit`}
                                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold border border-slate-200 transition flex items-center gap-1.5"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        <span>Edit Curriculum</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Sales Ledger */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-base font-bold text-slate-900">Recent Sales & Earnings Breakdown</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Automated 80% net credit recorded for each student purchase.
                        </p>
                    </div>

                    {recentSales.length === 0 ? (
                        <div className="p-8 text-center text-xs text-slate-500">No course purchases recorded yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Course</th>
                                        <th className="px-6 py-3 font-semibold">Buyer</th>
                                        <th className="px-6 py-3 font-semibold">Gross Price</th>
                                        <th className="px-6 py-3 font-semibold">Your Net (80%)</th>
                                        <th className="px-6 py-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentSales.map((sale) => (
                                        <tr key={sale.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-3.5 font-bold text-slate-900">{sale.courseTitle}</td>
                                            <td className="px-6 py-3.5 text-slate-600">{sale.buyerName}</td>
                                            <td className="px-6 py-3.5 font-semibold text-slate-900">${sale.grossPrice.toFixed(2)}</td>
                                            <td className="px-6 py-3.5 font-bold text-emerald-600">+${sale.netEarned.toFixed(2)}</td>
                                            <td className="px-6 py-3.5 text-slate-400">{sale.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
