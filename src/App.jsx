import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import OrderCatalog from './components/OrderCatalog'
import PriceChangeUndo from './components/PriceChangeUndo'
import OrderVerification from './components/OrderVerification'
import VendorChecker from './components/VendorChecker'
import CostRiskSorter from './components/CostRiskSorter'
import InventoryRules from './components/InventoryRules'
import LowCostRoute from './components/LowCostRoute'
import StockBalancer from './components/StockBalancer'

function Placeholder({ title }) {
  return (
    <div className="flex items-center justify-center h-96 text-slate-400 text-lg font-medium">
      Coming Soon: {title}
    </div>
  )
}

const TAB_COMPONENTS = {
  orders: () => <OrderCatalog />,
  pricing: () => <PriceChangeUndo />,
  verification: () => <OrderVerification />,
  vendors: () => <VendorChecker />,
  risk: () => <CostRiskSorter />,
  rules: () => <InventoryRules />,
  routes: () => <LowCostRoute />,
  balancing: () => <StockBalancer />,
}

function Dashboard() {
  const { state } = useApp()
  const ActiveComponent = TAB_COMPONENTS[state.activeTab] || TAB_COMPONENTS.orders

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-64 p-8">
        <ActiveComponent />
      </main>
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}
