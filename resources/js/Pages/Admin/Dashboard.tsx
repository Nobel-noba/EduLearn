import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
  TrendingUp,
  Sparkles,
  Clock,
  Wallet,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Metrics {
  gmv: number;
  platformProfit: number;
  disbursedPayouts: number;
  pendingPayouts: number;
  pendingPayoutsCount: number;
  pendingCourses: number;
  totalUsers: number;
  totalCourses: number;
  commissionRate: number;
}

interface OrderItem {
  id: number;
  transactionRef: string;
  buyerName: string;
  buyerEmail: string;
  totalAmount: number;
  platformFee: number;
  instructorShare: number;
  paymentMethod: string;
  status: string;
  courseTitle: string;
  date: string;
}

interface Props {
  metrics: Metrics;
  recentOrders: OrderItem[];
}

export default function AdminDashboard({ metrics, recentOrders }: Props) {
  return (
    <AppLayout>
      <Head title="Platform Administrator Dashboard - EduLearn" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AdminNav
          commissionRate={metrics.commissionRate}
          pendingCourses={metrics.pendingCourses}
          pendingPayoutsCount={metrics.pendingPayoutsCount}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Gross Marketplace Volume */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Gross Marketplace Volume</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              ${metrics.gmv.toFixed(2)}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Total learner transactions processed
            </div>
          </div>

          {/* Platform Commission Profit */}
          <div className="bg-gradient-to-tr from-amber-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between text-xs text-amber-200 font-semibold mb-2">
              <span>Platform Commission ({metrics.commissionRate}%)</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              ${metrics.platformProfit.toFixed(2)}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-200/80">
              Direct platform net profit retained
            </div>
          </div>

          {/* Courses Pending Moderation */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Courses Awaiting Review</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {metrics.pendingCourses}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Requires Admin action</span>
              <Link href="/admin/courses" className="text-xs font-bold text-indigo-600 hover:underline">
                Review &rarr;
              </Link>
            </div>
          </div>

          {/* Pending Payout Requests */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Pending Payout Requests</span>
              <Wallet className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              {metrics.pendingPayoutsCount} (${metrics.pendingPayouts.toFixed(2)})
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Instructors awaiting disbursal</span>
              <Link href="/admin/payouts" className="text-xs font-bold text-sky-600 hover:underline">
                Disburse &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Grid: Pending Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Course Moderation Quick Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> Course Approval Queue
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {metrics.pendingCourses} Pending
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Instructor Course Submissions
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Before courses are published to the public marketplace, administrators must inspect the syllabus, video quality, and quizzes to ensure high standards.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/admin/courses"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Inspect Pending Submissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Payout Clearance Quick Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5" /> Financial Clearance
                </span>
                <span className="text-xs font-bold text-slate-500">
                  ${metrics.pendingPayouts.toFixed(2)} Requested
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Instructor Withdrawal Requests
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Review instructor bank/PayPal transfer requests. Once verified, click &ldquo;Approve & Mark as Paid&rdquo; to execute the transfer.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <Link
                href="/admin/payouts"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>Review Payout Requests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Orders Transaction Ledger */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Platform Transaction Ledger</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every course purchase routes through platform escrow, automatically securing the platform commission.
              </p>
            </div>

            <Link href="/admin/finances" className="text-xs font-bold text-indigo-600 hover:underline">
              View All Transactions &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Transaction Ref</th>
                  <th className="p-4">Buyer</th>
                  <th className="p-4">Course</th>
                  <th className="p-4">Gross Total</th>
                  <th className="p-4">Platform Fee ({metrics.commissionRate}%)</th>
                  <th className="p-4">Instructor Share</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-700">{ord.transactionRef}</td>
                    <td className="p-4 text-slate-800 font-medium">{ord.buyerName}</td>
                    <td className="p-4 text-slate-600 font-medium max-w-xs truncate">
                      {ord.courseTitle}
                    </td>
                    <td className="p-4 font-bold text-slate-900">${ord.totalAmount.toFixed(2)}</td>
                    <td className="p-4 font-black text-amber-600">+${ord.platformFee.toFixed(2)}</td>
                    <td className="p-4 font-semibold text-slate-600">${ord.instructorShare.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
