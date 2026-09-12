import React from 'react';
import { Link } from '@inertiajs/react';
import { GraduationCap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                                EduFlow
                                <span className="text-[10px] px-1.5 py-0.5 bg-indigo-500/20 text-indigo-300 font-semibold rounded">
                                    PRO
                                </span>
                            </span>
                        </Link>
                        <p className="text-xs leading-relaxed text-slate-400">
                            Enterprise-grade educational video & curriculum platform benchmarking Coursera & Udemy with automated platform commission and verified cryptographic diplomas.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Escrow Protected Marketplace</span>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Explore</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/courses" className="hover:text-white transition">All Courses</Link></li>
                            <li><Link href="/courses?category=web-development" className="hover:text-white transition">Web Development</Link></li>
                            <li><Link href="/courses?category=ai-machine-learning" className="hover:text-white transition">AI & Machine Learning</Link></li>
                            <li><Link href="/courses?category=ui-ux-design" className="hover:text-white transition">UI/UX Design Systems</Link></li>
                            <li><Link href="/courses?category=cloud-devops" className="hover:text-white transition">Cloud & DevOps</Link></li>
                        </ul>
                    </div>

                    {/* Platform Roles */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Portals</h4>
                        <ul className="space-y-2 text-xs">
                            <li><Link href="/my-learning" className="hover:text-white transition">Student Portal</Link></li>
                            <li><Link href="/instructor" className="hover:text-white transition">Instructor Studio</Link></li>
                            <li><Link href="/admin" className="hover:text-white transition">Admin Control Center</Link></li>
                            <li><Link href="/subscription" className="hover:text-white transition">Pro Pass All-Access</Link></li>
                        </ul>
                    </div>

                    {/* Architecture */}
                    <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Technology</h4>
                        <div className="space-y-2 text-xs text-slate-400">
                            <p className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Laravel v13 + Inertia.js v2</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                                <span>React 19 & Tailwind CSS</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                <span>MySQL Relational Engine</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>20% Platform Commission</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <div>
                        © {new Date().getFullYear()} EduFlow Learning Technologies. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-0.5" /> for modern software engineers.
                    </div>
                </div>
            </div>
        </footer>
    );
}
