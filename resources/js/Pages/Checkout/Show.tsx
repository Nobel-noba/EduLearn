import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { ShieldCheck, CreditCard, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CheckoutProps {
    course: {
        id: string;
        title: string;
        slug: string;
        thumbnail?: string | null;
        price: number;
        isFree: boolean;
        level: string;
        instructor: {
            name: string;
            avatar?: string | null;
        };
    };
    financials: {
        commissionRate: number;
        platformFee: number;
        instructorNet: number;
    };
}

export default function CheckoutShow({ course, financials }: CheckoutProps) {
    const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'PAYPAL'>('CARD');
    const [processing, setProcessing] = useState(false);

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.post(`/checkout/${course.id}`, {
            paymentMethod,
        });
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout & Enrollment</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Secure platform escrow purchase with immediate classroom access.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Payment Form */}
                    <div className="md:col-span-7 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-indigo-600" />
                                <span>Select Payment Method</span>
                            </h2>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('CARD')}
                                    className={`p-4 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                                        paymentMethod === 'CARD'
                                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                >
                                    <span className="text-xs">Credit or Debit Card</span>
                                    <span className="text-[10px] text-slate-500 mt-2">Instant Enrollment</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('PAYPAL')}
                                    className={`p-4 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                                        paymentMethod === 'PAYPAL'
                                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                                    }`}
                                >
                                    <span className="text-xs font-bold text-sky-600">PayPal Checkout</span>
                                    <span className="text-[10px] text-slate-500 mt-2">Fast & Protected</span>
                                </button>
                            </div>

                            {/* Simulated card fields */}
                            {paymentMethod === 'CARD' && (
                                <div className="space-y-3 pt-2">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            readOnly
                                            value="•••• •••• •••• 4242 (Simulated Test Card)"
                                            className="w-full bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="12 / 28"
                                                className="w-full bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-700 mb-1">CVC</label>
                                            <input
                                                type="text"
                                                readOnly
                                                value="888"
                                                className="w-full bg-slate-50 text-xs text-slate-700 px-3.5 py-2.5 rounded-xl border border-slate-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>256-bit encrypted simulated gateway transaction.</span>
                            </div>
                        </div>

                        {/* Escrow Guarantee Box */}
                        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex items-start gap-3.5">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-emerald-950">Platform Escrow Protection</h4>
                                <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                                    Funds are automatically split: {100 - financials.commissionRate}% is credited to instructor {course.instructor.name} and {financials.commissionRate}% is preserved as platform operating fee.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-5">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-6">
                            <h2 className="text-base font-bold text-slate-900">Order Summary</h2>

                            <div className="flex gap-3 pb-4 border-b border-slate-100">
                                <img
                                    src={
                                        course.thumbnail ||
                                        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&auto=format&fit=crop&q=80'
                                    }
                                    alt={course.title}
                                    className="w-20 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                                />
                                <div>
                                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">{course.title}</h3>
                                    <div className="text-[10px] text-slate-500 mt-1">Instructor: {course.instructor.name}</div>
                                </div>
                            </div>

                            {/* Line items */}
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-slate-600">
                                    <span>Course Price</span>
                                    <span className="font-semibold text-slate-900">${course.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-[11px]">
                                    <span>Platform Fee ({financials.commissionRate}%)</span>
                                    <span>${financials.platformFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-500 text-[11px]">
                                    <span>Creator Net Credit ({100 - financials.commissionRate}%)</span>
                                    <span>${financials.instructorNet.toFixed(2)}</span>
                                </div>
                                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-slate-900">
                                    <span>Total Due</span>
                                    <span className="text-indigo-600">${course.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <form onSubmit={handlePay}>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>{processing ? 'Processing Transaction...' : 'Complete & Start Learning'}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>

                            <div className="space-y-2 text-[11px] text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Instant enrollment & verified diploma</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Lifetime access to curriculum & updates</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
