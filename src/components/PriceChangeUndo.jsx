import React from 'react'
import { DollarSign, RotateCcw } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function PriceChangeUndo() {
  const { state, dispatch } = useApp()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <DollarSign className="text-indigo-600" size={26} />
          Price Change Log
        </h1>
        <p className="text-sm text-slate-500 mt-1">Track and revert supplier price changes</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Item</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Supplier</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Old Price</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">New Price</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
              <th className="text-right px-4 py-3 font-semibold text-slate-600">Current Price</th>
              <th className="text-center px-4 py-3 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.priceLogs.map((log) => {
              const isCheaper = log.currentPrice < log.newPrice
              const isPricier = log.currentPrice > log.newPrice
              const alreadyReverted = log.currentPrice === log.oldPrice

              return (
                <tr
                  key={log.id}
                  className={`border-b border-slate-100 transition-colors ${
                    isCheaper ? 'bg-green-50' : isPricier ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-slate-800">{log.itemName}</td>
                  <td className="px-4 py-3 text-slate-600">{log.supplier}</td>
                  <td className="px-4 py-3 text-right text-slate-500 line-through">₹{log.oldPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-right text-slate-700">₹{log.newPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-slate-600">{log.date}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800">₹{log.currentPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => dispatch({ type: 'UNDO_PRICE', payload: log.id })}
                      disabled={alreadyReverted}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        alreadyReverted
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      <RotateCcw size={14} />
                      Undo
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
