import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  ShieldAlert,
  BookOpen,
  DollarSign,
  Wallet,
  Users,
} from 'lucide-react';

interface AdminNavProps {
  commissionRate?: number;
  pendingCourses?: number;
  pendingPayoutsCount?: number;
}

export default function AdminNav({
  commissionRate = 20,
  pendingCourses = 0,
  pendingPayoutsCount = 0,
}: AdminNavProps) {
  const { url } = usePage();

  const isCurrent = (path: string) => {
    if (path === '/admin') {
      return url === '/admin' || url === '/admin/';
    }
    return url.startsWith(path);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>EduLearn Master Operations Center</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Platform Administrator Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Governing transactions, course moderation, commission splits, and payouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700 text-slate-300">
            Platform Share: <strong className="text-amber-400 font-black">{commissionRate}%</strong>
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 pt-6 overflow-x-auto text-xs font-bold scrollbar-none">
        <Link
          href="/admin"
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
            isCurrent('/admin')
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <span>Overview</span>
        </Link>

        <Link
          href="/admin/courses"
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
            isCurrent('/admin/courses')
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Course Moderation</span>
          {pendingCourses > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              {pendingCourses}
            </span>
          )}
        </Link>

        <Link
          href="/admin/finances"
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
            isCurrent('/admin/finances')
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
          <span>Finances & Commission</span>
        </Link>

        <Link
          href="/admin/payouts"
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
            isCurrent('/admin/payouts')
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-sky-400" />
          <span>Instructor Payouts</span>
          {pendingPayoutsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-sky-400 text-slate-950 text-[10px] font-black">
              {pendingPayoutsCount}
            </span>
          )}
        </Link>

        <Link
          href="/admin/users"
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0 transition ${
            isCurrent('/admin/users')
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-purple-400" />
          <span>User Management</span>
        </Link>
      </div>
    </div>
  );
}
