import React from 'react';
import { Award, ShieldCheck, Printer, Calendar, CheckCircle2 } from 'lucide-react';

interface CertificateCardProps {
    code: string;
    studentName: string;
    courseTitle: string;
    instructorName: string;
    issuedAt: string;
    verificationUrl?: string;
}

export default function CertificateCard({
    code,
    studentName,
    courseTitle,
    instructorName,
    issuedAt,
    verificationUrl,
}: CertificateCardProps) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto my-8">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between mb-4 print:hidden">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Official Verified Credential #{code}</span>
                </div>
                <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition cursor-pointer"
                >
                    <Printer className="w-4 h-4" />
                    <span>Print or Save PDF</span>
                </button>
            </div>

            {/* Certificate Canvas */}
            <div className="relative bg-gradient-to-br from-amber-50/60 via-white to-indigo-50/40 p-8 sm:p-14 rounded-2xl border-8 border-amber-900/20 shadow-2xl overflow-hidden print:border-4 print:shadow-none print:m-0 print:p-8">
                {/* Decorative border frame */}
                <div className="absolute inset-3 border-2 border-amber-600/30 rounded-xl pointer-events-none" />
                <div className="absolute inset-5 border border-amber-600/15 rounded-lg pointer-events-none" />

                {/* Watermark Background Seal */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                    <Award className="w-96 h-96 text-amber-900" />
                </div>

                <div className="relative z-10 text-center space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 shadow-lg shadow-amber-500/20 mb-2">
                            <Award className="w-9 h-9" />
                        </div>
                        <h1 className="text-xs sm:text-sm uppercase tracking-[0.3em] font-extrabold text-amber-800">
                            Certificate of Completion
                        </h1>
                        <p className="text-xs text-slate-500 font-medium">
                            EduFlow Platform Global Accreditation
                        </p>
                    </div>

                    <div className="py-2">
                        <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1 font-serif">
                            {studentName}
                        </h2>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            for successfully mastering the curriculum, passing all assessment modules, and fulfilling the technical standards for
                        </p>
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-900 mt-2">
                            {courseTitle}
                        </h3>
                    </div>

                    {/* Signatures & Seal */}
                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 items-end gap-6 border-t border-amber-900/10 max-w-2xl mx-auto">
                        {/* Instructor */}
                        <div className="text-center sm:text-left space-y-1">
                            <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-1">
                                {instructorName}
                            </div>
                            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                Lead Instructor
                            </div>
                        </div>

                        {/* Gold Seal */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full border-4 border-dashed border-amber-600 flex items-center justify-center bg-gradient-to-tr from-amber-400 to-yellow-200 text-amber-950 shadow-md">
                                <div className="text-center">
                                    <CheckCircle2 className="w-6 h-6 mx-auto text-amber-900" />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">VERIFIED</span>
                                </div>
                            </div>
                        </div>

                        {/* Issue Date & Code */}
                        <div className="text-center sm:text-right space-y-1">
                            <div className="text-sm font-semibold text-slate-800 border-b border-slate-300 pb-1 flex items-center justify-center sm:justify-end gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                <span>{issuedAt}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase">
                                Code: {code}
                            </div>
                        </div>
                    </div>

                    {/* Verification Footer Link */}
                    {verificationUrl && (
                        <div className="pt-4 text-[10px] text-slate-400 print:text-[8px]">
                            Verify credential integrity at: <span className="font-mono text-indigo-600 underline">{verificationUrl}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
