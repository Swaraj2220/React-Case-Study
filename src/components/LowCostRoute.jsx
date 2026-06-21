import React from 'react'
import { Truck } from 'lucide-react'
import { useApp } from '../context/AppContext'

function formatCurrency(val) {
  return '₹' + val.toLocaleString('en-IN')
}

export default function LowCostRoute() {
  const { state } = useApp()
  const routes = state.supplyRoutes

  const withTotal = routes.map(r => ({ ...r, total: r.cost + r.fees }))
  const sorted = [...withTotal].sort((a, b) => a.total - b.total)
  const lowest = sorted[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
          <Truck size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Supply Route Optimizer</h1>
          <p className="text-sm text-slate-500">Find the most cost-effective logistics route</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Route', 'Carrier', 'Cost', 'Time', 'Fees', 'Total', 'Status'].map(h => (
                <th key={h} className={`px-4 py-3 font-semibold text-slate-600 ${h === 'Cost' || h === 'Fees' || h === 'Total' ? 'text-right' : h === 'Status' ? 'text-center' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => {
              const isLowest = r.id === lowest.id
              return (
                <tr
                  key={r.id}
                  className={`border-b border-slate-100 last:border-0 ${
                    isLowest ? 'bg-green-50 border-l-4 border-l-green-500' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-slate-700">{r.route}</td>
                  <td className="px-4 py-3 text-slate-600">{r.carrier}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700">{formatCurrency(r.cost)}</td>
                  <td className="px-4 py-3 text-slate-600">{r.time}</td>
                  <td className="px-4 py-3 text-right font-medium text-slate-700">{formatCurrency(r.fees)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">{formatCurrency(r.total)}</td>
                  <td className="px-4 py-3 text-center">
                    {isLowest ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        🏆 Lowest Cost
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Lowest cost route: </span>
          {lowest.route} via {lowest.carrier} — {formatCurrency(lowest.total)}
        </p>
      </div>
    </div>
  )
}
