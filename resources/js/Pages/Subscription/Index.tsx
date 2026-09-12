import React from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface SubscriptionProps {
    pricing: {
        monthly: number;
        annual: number;
    };
}

export default function SubscriptionIndex({ pricing }: SubscriptionProps) {
    const handleSubscribe = () => {
        router.post('/subscription', {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>EduFlow Pro Unlimited Pass</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                        Unlimited Access to Every Course
                    </h1>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Upgrade your software engineering skills with unlimited access to all bootcamps, masterclasses, assessment quizzes, and verified diplomas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                    {/* Monthly Pass */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-900">Monthly Pro Pass</h3>
                            <p className="text-xs text-slate-500">Flexible month-to-month access. Cancel anytime.</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-slate-900">${pricing.monthly.toFixed(2)}</span>
                                <span className="text-xs text-slate-500">/ month</span>
                            </div>

                            <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Access to all published bootcamps</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Hands-on assessment quizzes</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    <span>Verifiable completion certificates</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubscribe}
                            className="mt-8 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                        >
                            Activate Monthly Pass
                        </button>
                    </div>

                    {/* Annual Pass - Highlighted */}
                    <div className="relative bg-gradient-to-br from-indigo-900 to-slate-950 p-8 rounded-3xl border-2 border-indigo-500 shadow-2xl flex flex-col justify-between text-white">
                        <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow">
                            Best Value (Save 30%)
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span>Annual Master Pass</span>
                                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                            </h3>
                            <p className="text-xs text-slate-300">Complete curriculum for serious career switchers.</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-white">${pricing.annual.toFixed(2)}</span>
                                <span className="text-xs text-slate-400">/ year</span>
                            </div>

                            <ul className="space-y-3 pt-4 border-t border-indigo-800/60 text-xs text-slate-200">
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                    <span>Unlimited streaming on all courses</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                    <span>All future course releases included</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                    <span>Direct Q&A with lead instructors</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                    <span>Cryptographic diploma registry verification</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={handleSubscribe}
                            className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition cursor-pointer"
                        >
                            Activate Annual Pass (Instant Unlock)
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
