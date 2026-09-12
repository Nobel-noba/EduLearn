import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminNav from '@/Components/AdminNav';
import {
  DollarSign,
  Sparkles,
  Sliders,
  TrendingUp,
  Save,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

interface PlatformSettings {
  commissionRate: number;
  subscriptionPrice: number;
  platformName: string;
}

interface OrderItem {
  id: number;
  transactionRef: string;
  buyerName: string;
  courseTitle: string;
  totalAmount: number;
  platformFee: number;
  instructorShare: number;
  paymentMethod: string;
  date: string;
}

interface Aggregates {
  totalRevenue: number;
  platformProfit: number;
  instructorPaid: number;
  totalPaidOut: number;
}

interface Props {
  settings: PlatformSettings;
  orders: OrderItem[];
  aggregates: Aggregates;
}

export default function AdminFinances({ settings, orders, aggregates }: Props) {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const { data, setData, post, processing } = useForm({
    commissionRate: settings.commissionRate,
    subscriptionPrice: settings.subscriptionPrice,
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/finances/settings', {
      onSuccess: () => {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      },
    });
  };

  const creatorSharePercentage = (100 - Number(data.commissionRate || 0)).toFixed(1);

  return (
    <AppLayout>
      <Head title="Platform Finances & Commission - EduLearn Admin" />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <AdminNav commissionRate={settings.commissionRate} />

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Platform Financial Engine & Commission Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the platform fee rate, track incoming escrow payments, and monitor creator revenue splits.
          </p>
        </div>

        {/* Grid: Settings form + Financial overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Commission Configuration Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>Platform Fee Parameters</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              All course payments pass through the platform escrow first. The commission percentage specified below is automatically retained as platform profit.
            </p>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Global Platform Commission Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    required
                    value={data.commissionRate}
                    onChange={(e) => setData('commissionRate', parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                    %
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Instructors automatically receive (100 - {data.commissionRate})% ={' '}
                  <strong className="text-emerald-600 font-bold">
                    {creatorSharePercentage}%
                  </strong>{' '}
                  net credit.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Pro Pass Subscription Price ($ USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={data.subscriptionPrice}
                    onChange={(e) => setData('subscriptionPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">
                    /mo
                  </span>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Settings updated successfully!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{processing ? 'Updating...' : 'Update Platform Parameters'}</span>
              </button>
            </form>
          </div>

          {/* Global Financial Metrics */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gradient-to-tr from-amber-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-200 font-semibold mb-2">
                  <span>Net Platform Profit Retained</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400">
                  ${aggregates.platformProfit.toFixed(2)}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[11px] text-amber-200/80">
                Retained from {orders.length} transactions based on {settings.commissionRate}% commission rate
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Gross Marketplace Volume</span>
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ${aggregates.totalRevenue.toFixed(2)}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Total customer payments processed
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Total Creator Share Credited</span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ${aggregates.instructorPaid.toFixed(2)}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Distributed to instructor balances
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                  <span>Disbursed via Payouts</span>
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ${aggregates.totalPaidOut.toFixed(2)}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500">
                Successfully wired to instructor accounts
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Orders Ledger */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">Platform Transaction Ledger</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time record of all student payments with fee deductions and creator net earnings.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Tx Reference</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Course Item</th>
                  <th className="p-4">Gross Sale</th>
                  <th className="p-4">Platform Cut</th>
                  <th className="p-4">Instructor Net</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-700">{ord.transactionRef}</td>
                    <td className="p-4 font-semibold text-slate-800">{ord.buyerName}</td>
                    <td className="p-4 font-medium text-slate-800 max-w-xs truncate">
                      {ord.courseTitle}
                    </td>
                    <td className="p-4 font-bold text-slate-900">${ord.totalAmount.toFixed(2)}</td>
                    <td className="p-4 font-black text-amber-600">+${ord.platformFee.toFixed(2)}</td>
                    <td className="p-4 font-bold text-emerald-600">${ord.instructorShare.toFixed(2)}</td>
                    <td className="p-4 text-slate-600 font-medium">{ord.paymentMethod}</td>
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
