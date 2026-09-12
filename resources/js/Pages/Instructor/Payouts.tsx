import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Building,
} from 'lucide-react';

interface Payout {
  id: number;
  amount: number;
  method: string;
  details: string;
  status: string;
  adminNote: string | null;
  requestedAt: string;
  processedAt: string | null;
}

interface Props {
  walletBalance: number;
  payouts: Payout[];
}

export default function InstructorPayouts({ walletBalance, payouts }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    amount: '',
    method: 'PAYPAL',
    details: '',
  });

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    post('/instructor/payouts', {
      onSuccess: () => {
        setModalOpen(false);
        reset();
      },
    });
  };

  const disbursedTotal = payouts
    .filter((p) => p.status === 'PAID')
    .reduce((a, b) => a + b.amount, 0);

  const pendingTotal = payouts
    .filter((p) => p.status === 'REQUESTED')
    .reduce((a, b) => a + b.amount, 0);

  return (
    <AppLayout>
      <Head title="Wallet & Creator Payouts - EduLearn" />

      <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Wallet & Creator Payouts</h1>
            <p className="text-xs text-slate-500 mt-1">
              Withdraw your 80% net course sales directly to PayPal or bank wire transfer.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            disabled={walletBalance <= 0}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md shadow-indigo-200 transition flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Request Payout</span>
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-2">
              <span>Available to Withdraw</span>
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">${walletBalance.toFixed(2)}</div>
            <p className="text-[10px] text-slate-400 mt-2">Minimum withdrawal: $20.00</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Disbursed to Date</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">${disbursedTotal.toFixed(2)}</div>
            <p className="text-[10px] text-slate-400 mt-2">Verified wire transactions</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Pending Clearance</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-600">${pendingTotal.toFixed(2)}</div>
            <p className="text-[10px] text-slate-400 mt-2">Awaiting admin review</p>
          </div>
        </div>

        {/* Payouts History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Payout Requests History</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Track status of withdrawal requests submitted to platform administration.
            </p>
          </div>

          {payouts.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No withdrawal requests submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Recipient Details</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date Requested</th>
                    <th className="p-4">Admin Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payouts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4 font-black text-slate-900 text-sm">
                        ${p.amount.toFixed(2)}
                      </td>
                      <td className="p-4 font-semibold text-slate-700">{p.method}</td>
                      <td className="p-4 text-slate-600 font-mono text-[11px]">{p.details}</td>
                      <td className="p-4">
                        {p.status === 'PAID' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        )}
                        {p.status === 'REQUESTED' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1 w-fit">
                            <Clock className="w-3 h-3" /> Under Review
                          </span>
                        )}
                        {p.status === 'REJECTED' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-200 flex items-center gap-1 w-fit">
                            <AlertCircle className="w-3 h-3" /> Declined
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-400">{p.requestedAt}</td>
                      <td className="p-4 text-slate-500 text-[11px]">{p.adminNote || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal: Request Payout */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
              <h2 className="text-lg font-black text-slate-900 mb-1">Request Creator Payout</h2>
              <p className="text-xs text-slate-500 mb-6">
                Funds will be transferred to your account after verification by the platform admin.
              </p>

              {errors.amount && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.amount}</span>
                </div>
              )}

              <form onSubmit={handleRequestPayout} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Withdrawal Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={walletBalance}
                    required
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    placeholder={`Max: $${walletBalance.toFixed(2)}`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Disbursal Method
                  </label>
                  <select
                    value={data.method}
                    onChange={(e) => setData('method', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden bg-white"
                  >
                    <option value="PAYPAL">PayPal Transfer</option>
                    <option value="BANK_TRANSFER">Direct Wire / ACH</option>
                    <option value="STRIPE_CONNECT">Stripe Express</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account / Routing / Email Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={data.details}
                    onChange={(e) => setData('details', e.target.value)}
                    placeholder={
                      data.method === 'PAYPAL'
                        ? 'e.g. your-paypal-email@domain.com'
                        : 'e.g. Bank Name, Routing #, Account #'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                  >
                    {processing ? 'Submitting...' : 'Submit Withdrawal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
