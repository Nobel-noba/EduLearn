import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  Building,
  DollarSign,
  X,
} from 'lucide-react';

interface Instructor {
  name: string;
  email: string;
  walletBalance: number;
}

interface PayoutItem {
  id: number;
  amount: number;
  method: string;
  details: string;
  status: string;
  adminNote: string | null;
  requestedAt: string;
  processedAt: string | null;
  instructor: Instructor;
}

interface Props {
  payouts: PayoutItem[];
}

export default function AdminPayouts({ payouts }: Props) {
  const [filter, setFilter] = useState<string>('ALL');
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedPayoutId, setSelectedPayoutId] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState('');

  const pendingPayouts = payouts.filter((p) => p.status === 'REQUESTED');
  const pendingTotal = pendingPayouts.reduce((a, b) => a + b.amount, 0);

  const handleApprove = (id: number) => {
    setProcessingId(id);
    router.post(`/admin/payouts/${id}/approve`, {
      adminNote: 'Approved and disbursed via clearing wire.',
    }, {
      onFinish: () => setProcessingId(null),
    });
  };

  const handleReject = () => {
    if (!selectedPayoutId || !rejectNote.trim()) return;
    setProcessingId(selectedPayoutId);
    router.post(`/admin/payouts/${selectedPayoutId}/reject`, {
      adminNote: rejectNote,
    }, {
      onFinish: () => {
        setProcessingId(null);
        setRejectModalOpen(false);
        setRejectNote('');
        setSelectedPayoutId(null);
      },
    });
  };

  const filtered = payouts.filter((p) => {
    if (filter === 'ALL') return true;
    return p.status === filter;
  });

  return (
    <AppLayout>
      <Head title="Instructor Payout Clearances - EduLearn Admin" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AdminNav pendingPayoutsCount={pendingPayouts.length} />

        {/* Header & Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Instructor Payout Requests & Clearances
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review, approve, and disburse creator earnings from platform escrow.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {[
              { id: 'ALL', label: `All (${payouts.length})` },
              {
                id: 'REQUESTED',
                label: `Pending Approval (${pendingPayouts.length})`,
              },
              {
                id: 'PAID',
                label: `Paid (${payouts.filter((p) => p.status === 'PAID').length})`,
              },
              {
                id: 'REJECTED',
                label: `Declined (${payouts.filter((p) => p.status === 'REJECTED').length})`,
              },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  filter === f.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
              Clearance Queue
            </div>
            <div className="text-3xl font-black text-white mt-1">
              ${pendingTotal.toFixed(2)}{' '}
              <span className="text-sm font-normal text-slate-400">awaiting approval</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 max-w-sm text-left sm:text-right leading-relaxed">
            Instructors receive 80% net course sales automatically in their wallet. Approving requests confirms disbursal from the platform clearing account.
          </div>
        </div>

        {/* Payouts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Instructor</th>
                  <th className="p-4">Requested Amount</th>
                  <th className="p-4">Method & Details</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Admin Audit Note</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400">
                      No payout requests match this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {p.instructor.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{p.instructor.name}</div>
                            <div className="text-[10px] text-slate-400">{p.instructor.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-black text-slate-900 text-sm">
                        ${p.amount.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] mr-1.5">
                          {p.method}
                        </span>
                        <span className="font-mono text-slate-600 text-[11px]">{p.details}</span>
                      </td>

                      <td className="p-4 text-slate-400">{p.requestedAt}</td>

                      <td className="p-4">
                        {p.status === 'PAID' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Paid & Disbursed
                          </span>
                        )}
                        {p.status === 'REQUESTED' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1 w-fit animate-pulse">
                            <Clock className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                        {p.status === 'REJECTED' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-200 flex items-center gap-1 w-fit">
                            <AlertCircle className="w-3 h-3" /> Declined
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-slate-500 text-[11px] max-w-xs truncate">
                        {p.adminNote || '—'}
                      </td>

                      <td className="p-4 text-right">
                        {p.status === 'REQUESTED' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApprove(p.id)}
                              disabled={processingId === p.id}
                              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs cursor-pointer disabled:opacity-50"
                            >
                              {processingId === p.id ? 'Processing...' : 'Approve & Pay'}
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPayoutId(p.id);
                                setRejectModalOpen(true);
                              }}
                              disabled={processingId === p.id}
                              className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs transition cursor-pointer disabled:opacity-50"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] font-medium">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decline Modal */}
        {rejectModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
              <h3 className="text-lg font-black text-slate-900 mb-1">Decline Withdrawal Request</h3>
              <p className="text-xs text-slate-500 mb-4">
                Provide a reason for declining. The requested amount will be safely refunded back to the instructor's wallet balance.
              </p>

              <textarea
                rows={3}
                required
                value={rejectNote}
                onChange={(e) => setRejectNote(e.target.value)}
                placeholder="e.g. PayPal email could not be verified. Please double-check payment recipient details in your profile."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-xs focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-hidden mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRejectModalOpen(false);
                    setRejectNote('');
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!rejectNote.trim() || processingId !== null}
                  onClick={handleReject}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {processingId ? 'Processing...' : 'Decline & Refund'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
