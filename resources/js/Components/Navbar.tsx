import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    GraduationCap,
    Search,
    BookOpen,
    LayoutDashboard,
    ShieldAlert,
    ChevronDown,
    Sparkles,
} from 'lucide-react';

export interface UserSession {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
    avatar?: string | null;
    walletBalance: number;
}

export default function Navbar() {
    const { auth } = usePage<{ auth: { user: UserSession | null } }>().props;
    const user = auth?.user;

    const [searchQuery, setSearchQuery] = useState('');
    const [demoOpen, setDemoOpen] = useState(false);

    const handleSwitchDemo = (role: string) => {
        setDemoOpen(false);
        router.post('/auth/switch-demo', { role }, {
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/courses', { search: searchQuery.trim() });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
            {/* Top Announcement Bar with Demo Switcher */}
            <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium text-slate-300">
                            Interactive Multi-Role Learning Platform
                        </span>
                        <span className="hidden md:inline text-slate-500">•</span>
                        <span className="hidden md:inline text-slate-400">
                            Laravel + Inertia.js Architecture with Automated 20% Platform Commission
                        </span>
                    </div>

                    {/* Persona Switcher */}
                    <div className="flex items-center gap-2 relative">
                        <span className="text-slate-400 hidden sm:inline">Active Persona:</span>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDemoOpen(!demoOpen)}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs border border-slate-700 transition cursor-pointer"
                            >
                                {user?.role === 'ADMIN' && (
                                    <span className="text-amber-400">👑 Admin ({user.name})</span>
                                )}
                                {user?.role === 'INSTRUCTOR' && (
                                    <span className="text-sky-400">🎓 Instructor ({user.name})</span>
                                )}
                                {(!user || user?.role === 'STUDENT') && (
                                    <span className="text-emerald-400">💻 Student ({user?.name || 'Student'})</span>
                                )}
                                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            </button>

                            {demoOpen && (
                                <div className="absolute right-0 mt-1.5 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50">
                                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                                        Switch Test Persona
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleSwitchDemo('admin')}
                                        className="w-full text-left px-2.5 py-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs text-white cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold text-amber-300">👑 Eleanor Vance</div>
                                            <div className="text-[10px] text-slate-400">Platform Super Admin</div>
                                        </div>
                                        <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-800">
                                            ADMIN
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSwitchDemo('instructor')}
                                        className="w-full text-left px-2.5 py-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs text-white cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold text-sky-300">🎓 Alex Rivera</div>
                                            <div className="text-[10px] text-slate-400">Software Architect Instructor</div>
                                        </div>
                                        <span className="text-[10px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800">
                                            CREATOR
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSwitchDemo('sarah')}
                                        className="w-full text-left px-2.5 py-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs text-white cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold text-purple-300">🎨 Sarah Jenkins</div>
                                            <div className="text-[10px] text-slate-400">Lead Design Instructor</div>
                                        </div>
                                        <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                                            CREATOR
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSwitchDemo('student')}
                                        className="w-full text-left px-2.5 py-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs text-white cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold text-emerald-300">💻 John Doe</div>
                                            <div className="text-[10px] text-slate-400">Learner & Subscriber</div>
                                        </div>
                                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                                            STUDENT
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSwitchDemo('emma')}
                                        className="w-full text-left px-2.5 py-2 rounded hover:bg-slate-800 flex items-center justify-between text-xs text-white cursor-pointer"
                                    >
                                        <div>
                                            <div className="font-semibold text-pink-300">🚀 Emma Watson</div>
                                            <div className="text-[10px] text-slate-400">Enrolled Learner</div>
                                        </div>
                                        <span className="text-[10px] bg-pink-950 text-pink-300 px-1.5 py-0.5 rounded border border-pink-800">
                                            STUDENT
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                                EduFlow
                                <span className="text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-700 font-semibold rounded-md">
                                    PRO
                                </span>
                            </span>
                        </div>
                    </Link>

                    {/* Explore Link */}
                    <Link
                        href="/courses"
                        className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
                    >
                        <BookOpen className="w-4 h-4" />
                        Explore Courses
                    </Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search courses, skills, technologies..."
                            className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 text-sm pl-10 pr-4 py-2 rounded-full border border-transparent focus:border-indigo-400 focus:outline-hidden transition shadow-inner"
                        />
                    </div>
                </form>

                {/* Right Navigation & Role Actions */}
                <div className="flex items-center gap-3">
                    {/* Admin Control Center Link */}
                    {user?.role === 'ADMIN' && (
                        <Link
                            href="/admin"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition shadow-xs"
                        >
                            <ShieldAlert className="w-4 h-4 text-amber-600" />
                            <span>Admin Center</span>
                        </Link>
                    )}

                    {/* Instructor Studio Link */}
                    {(user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN') && (
                        <Link
                            href="/instructor"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 rounded-lg text-xs font-bold transition shadow-xs"
                        >
                            <LayoutDashboard className="w-4 h-4 text-sky-600" />
                            <span>Instructor Studio</span>
                            {user?.role === 'INSTRUCTOR' && (
                                <span className="ml-1 px-1.5 py-0.2 bg-sky-200 text-sky-800 rounded font-semibold text-[10px]">
                                    ${Number(user.walletBalance || 0).toFixed(2)}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Subscription Pro Pass */}
                    <Link
                        href="/subscription"
                        className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100 transition"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Pro Pass</span>
                    </Link>

                    {/* Student My Learning */}
                    <Link
                        href="/my-learning"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-slate-700 hover:text-indigo-600 font-medium text-xs md:text-sm transition"
                    >
                        My Learning
                    </Link>

                    {/* User Profile / Status */}
                    {user && (
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                            <img
                                src={
                                    user.avatar ||
                                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                                }
                                alt={user.name}
                                className="w-8 h-8 rounded-full border border-slate-300 object-cover"
                            />
                            <div className="hidden lg:block text-left">
                                <div className="text-xs font-semibold text-slate-900 leading-tight">
                                    {user.name}
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium capitalize">
                                    {user.role.toLowerCase()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
