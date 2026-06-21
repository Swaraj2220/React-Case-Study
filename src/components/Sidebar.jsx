import React from 'react'
import { Package, DollarSign, ClipboardCheck, Building2, TrendingUp, ScrollText, Truck, Scale } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { icon: Package, label: 'Order Catalog', tab: 'orders' },
  { icon: DollarSign, label: 'Price History', tab: 'pricing' },
  { icon: ClipboardCheck, label: 'Verification', tab: 'verification' },
  { icon: Building2, label: 'Vendors', tab: 'vendors' },
  { icon: TrendingUp, label: 'Cost Risk', tab: 'risk' },
  { icon: ScrollText, label: 'Inventory Rules', tab: 'rules' },
  { icon: Truck, label: 'Supply Routes', tab: 'routes' },
  { icon: Scale, label: 'Stock Balancer', tab: 'balancing' },
]

export default function Sidebar() {
  const { state, dispatch } = useApp()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-50">
      <div className="px-6 py-6 border-b border-slate-700">
        <h1 className="text-lg font-bold tracking-tight">ProcureCraft</h1>
        <p className="text-sm text-slate-400 mt-0.5">Slate Dashboard</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = state.activeTab === item.tab
          return (
            <button
              key={item.tab}
              onClick={() => dispatch({ type: 'SET_TAB', payload: item.tab })}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
