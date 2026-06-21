import React from 'react'
import { TrendingUp } from 'lucide-react'
import { useApp } from '../context/AppContext'

function formatCurrency(val) {
  return '₹' + val.toLocaleString('en-IN')
}

export default function CostRiskSorter() {
  const { state } = useApp()
  const requests = state.purchaseRequests

  const withDelta = requests.map(r => ({ ...r, delta: r.totalCost - r.budget }))
  const sorted = [...withDelta].sort((a, b) => b.delta - a.delta)

  const overBudget = sorted.filter(r => r.delta > 0).length
  const onBudget = sorted.filter(r => r.delta === 0).length
  const underBudget = sorted.filter(r => r.delta < 0).length

  const totalBudget = sorted.reduce((s, r) => s + r.budget, 0)
  const totalCost = sorted.reduce((s, r) => s + r.totalCost, 0)

  function rowClass(delta) {
    if (delta > 0) return 'bg-red-50 border-l-4 border-red-500'
    if (delta === 0) return 'bg-green-50 border-l-4 border-green-500'
    return 'bg-blue-50 border-l-4 border-blue-500'
  }

  function badge(delta) {
    if (delta > 0) return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Over Budget</span>
    if (delta === 0) return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">On Budget</span>
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Under Budget</span>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
          <TrendingUp size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Cost Risk Sorter</h1>
          <p className="text-sm text-slate-500">Rank purchase requests by budget risk</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Requests', value: sorted.length, color: 'text-slate-800' },
          { label: 'Total Budget', value: formatCurrency(totalBudget), color: 'text-slate-800' },
          { label: 'Total Cost', value: formatCurrency(totalCost), color: 'text-slate-800' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="font-medium text-slate-700">Summary:</span>
        <span className="text-red-600 font-medium">{overBudget} Over Budget</span>
        <span>·</span>
        <span className="text-green-600 font-medium">{onBudget} On Budget</span>
        <span>·</span>
        <span className="text-blue-600 font-medium">{underBudget} Under Budget</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Request ID', 'Item', 'Department', 'Total Cost', 'Budget', 'Delta', 'Risk Level'].map(h => (
                <th key={h} className={`px-4 py-3 font-semibold text-slate-600 ${h === 'Delta' || h === 'Total Cost' || h === 'Budget' ? 'text-right' : h === 'Risk Level' ? 'text-center' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => (
              <tr key={r.id} className={`${rowClass(r.delta)} border-b border-slate-100 last:border-0`}>
                <td className="px-4 py-3 font-medium text-slate-700">#{r.id}</td>
                <td className="px-4 py-3 text-slate-600">{r.item}</td>
                <td className="px-4 py-3 text-slate-600">{r.department}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-700">{formatCurrency(r.totalCost)}</td>
                <td className="px-4 py-3 text-right font-medium text-slate-700">{formatCurrency(r.budget)}</td>
                <td className={`px-4 py-3 text-right font-semibold ${r.delta > 0 ? 'text-red-600' : r.delta < 0 ? 'text-blue-600' : 'text-green-600'}`}>
                  {r.delta > 0 ? '+' : ''}{formatCurrency(Math.abs(r.delta))}
                </td>
                <td className="px-4 py-3 text-center">{badge(r.delta)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
