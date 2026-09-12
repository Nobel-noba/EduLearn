import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
  Users,
  Search,
  ShieldCheck,
  Ban,
  UserCheck,
  GraduationCap,
  BookOpen,
  DollarSign,
} from 'lucide-react';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  walletBalance: number;
  isSuspended: boolean;
  coursesCount: number;
  enrollmentsCount: number;
  joinedAt: string;
}

interface Props {
  users: UserItem[];
}

export default function AdminUsers({ users }: Props) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, newRole: string) => {
    setActionLoadingId(userId);
    router.post(`/admin/users/${userId}/role`, {
      role: newRole,
    }, {
      onFinish: () => setActionLoadingId(null),
    });
  };

  const handleToggleSuspension = (userId: string) => {
    setActionLoadingId(userId);
    router.post(`/admin/users/${userId}/toggle-suspend`, {}, {
      onFinish: () => setActionLoadingId(null),
    });
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AppLayout>
      <Head title="User Accounts & Governance - EduLearn Admin" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AdminNav />

        {/* Header & Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              User Accounts & Role Governance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect user activities, toggle permissions, manage suspensions, and promote creators.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {['ALL', 'INSTRUCTOR', 'STUDENT', 'ADMIN'].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  roleFilter === r
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {r === 'ALL'
                  ? `All (${users.length})`
                  : `${r} (${users.filter((u) => u.role === r).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name or email address..."
            className="w-full bg-white text-slate-900 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden shadow-xs"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Current Role</th>
                  <th className="p-4">Enrollments</th>
                  <th className="p-4">Courses Created</th>
                  <th className="p-4">Wallet Balance</th>
                  <th className="p-4">Account Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      No users match the search filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              user.avatar ||
                              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
                            }
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-[10px] text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Selector */}
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          disabled={actionLoadingId === user.id}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50 focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="STUDENT">STUDENT</option>
                          <option value="INSTRUCTOR">INSTRUCTOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {user.enrollmentsCount} courses
                      </td>

                      <td className="p-4 font-semibold text-slate-700">
                        {user.coursesCount} created
                      </td>

                      <td className="p-4 font-bold text-emerald-600">
                        ${user.walletBalance.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {user.isSuspended ? (
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-200 flex items-center gap-1 w-fit">
                            <Ban className="w-3 h-3" /> Suspended
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                            <UserCheck className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>

                      {/* Toggle Suspension */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleSuspension(user.id)}
                          disabled={actionLoadingId === user.id}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 ${
                            user.isSuspended
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300'
                              : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                          }`}
                        >
                          {user.isSuspended ? 'Reactivate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
