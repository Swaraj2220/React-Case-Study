import React from 'react'
import { Scale } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function StockBalancer() {
  const { state, dispatch } = useApp()
  const { East, West } = state.warehouses

  const allItemIds = [...new Set([...East.items.map(i => i.itemId), ...West.items.map(i => i.itemId)])]

  function getMaxStock(itemId) {
    const eastItem = East.items.find(i => i.itemId === itemId)
    const westItem = West.items.find(i => i.itemId === itemId)
    return Math.max(eastItem?.stock || 0, westItem?.stock || 0)
  }

  function barWidth(itemId, stock) {
    const max = getMaxStock(itemId)
    if (max === 0) return '0%'
    return ((stock / max) * 100).toFixed(0) + '%'
  }

  function suggestedActions() {
    const suggestions = []
    const eastMap = {}
    East.items.forEach(i => { eastMap[i.itemId] = i })
    const westMap = {}
    West.items.forEach(i => { westMap[i.itemId] = i })

    const shared = allItemIds.filter(id => eastMap[id] && westMap[id])
    shared.forEach(id => {
      const e = eastMap[id]
      const w = westMap[id]
      if (e.stock !== w.stock) {
        const diff = Math.abs(e.stock - w.stock)
        const halfDiff = Math.floor(diff / 2)
        if (halfDiff > 0) {
          const from = e.stock > w.stock ? 'East' : 'West'
          const to = e.stock > w.stock ? 'West' : 'East'
          suggestions.push(`Transfer ${halfDiff} units of ${e.itemName} from ${from} to ${to} to balance levels.`)
        }
      }
    })

    const onlyEast = allItemIds.filter(id => eastMap[id] && !westMap[id])
    onlyEast.forEach(id => {
      const e = eastMap[id]
      if (e.stock > 5) {
        suggestions.push(`Consider stocking ${e.itemName} at West warehouse for regional coverage.`)
      }
    })

    const onlyWest = allItemIds.filter(id => westMap[id] && !eastMap[id])
    onlyWest.forEach(id => {
      const w = westMap[id]
      if (w.stock > 5) {
        suggestions.push(`Consider stocking ${w.itemName} at East warehouse for regional coverage.`)
      }
    })

    if (suggestions.length === 0) {
      suggestions.push('All items are perfectly balanced across warehouses.')
    }

    return suggestions.slice(0, 4)
  }

  function renderWarehouse(wh, label, accentColor) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex-1">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{label}</h3>
        <p className="text-sm text-slate-400 mb-4">{wh.name}</p>
        <div className="space-y-4">
          {wh.items.map(item => {
            const pct = barWidth(item.itemId, item.stock)
            return (
              <div key={item.itemId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{item.itemName}</span>
                  <span className="font-semibold text-slate-800">{item.stock} units</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${accentColor}`}
                    style={{ width: pct }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const actions = suggestedActions()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <Scale size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Stock Reorder Balancer</h1>
            <p className="text-sm text-slate-500">Manage and rebalance warehouse inventory</p>
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: 'BALANCE_STOCK' })}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Balance Now
        </button>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        {renderWarehouse(East, 'Warehouse East', 'bg-indigo-500')}
        {renderWarehouse(West, 'Warehouse West', 'bg-amber-500')}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="text-base font-bold text-slate-800 mb-3">Smart Suggestions</h3>
        {actions.length === 0 ? (
          <p className="text-sm text-slate-400">No suggestions available.</p>
        ) : (
          <ul className="space-y-2">
            {actions.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-0.5 text-indigo-500 font-bold">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
