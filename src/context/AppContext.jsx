import React, { createContext, useContext, useReducer, useCallback } from 'react'
import {
  catalogItems as initialCatalog,
  priceLogs as initialPriceLogs,
  verificationQueue as initialVerificationQueue,
  approvedOrders as initialApproved,
  rejectedOrders as initialRejected,
  vendors as initialVendors,
  purchaseRequests as initialRequests,
  inventoryRules as initialRules,
  supplyRoutes as initialRoutes,
  warehouses as initialWarehouses,
} from '../data/mockData'

const AppContext = createContext(null)

const initialState = {
  activeTab: 'orders',
  toast: null,
  catalogItems: initialCatalog,
  priceLogs: initialPriceLogs,
  verificationQueue: [...initialVerificationQueue],
  approvedOrders: [...initialApproved],
  rejectedOrders: [...initialRejected],
  vendors: initialVendors,
  purchaseRequests: initialRequests,
  inventoryRules: [...initialRules],
  supplyRoutes: initialRoutes,
  warehouses: JSON.parse(JSON.stringify(initialWarehouses)),
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.payload }

    case 'APPROVE_ORDER': {
      const [approved, ...rest] = state.verificationQueue
      if (!approved) return state
      return {
        ...state,
        verificationQueue: rest,
        approvedOrders: [...state.approvedOrders, { ...approved, status: 'approved' }],
        toast: { message: `Order from ${approved.requester} approved`, type: 'success' },
      }
    }

    case 'REJECT_ORDER': {
      const [rejected, ...rest] = state.verificationQueue
      if (!rejected) return state
      return {
        ...state,
        verificationQueue: rest,
        rejectedOrders: [...state.rejectedOrders, { ...rejected, status: 'rejected' }],
        toast: { message: `Order from ${rejected.requester} rejected`, type: 'error' },
      }
    }

    case 'UNDO_PRICE': {
      const updatedLogs = state.priceLogs.map((log) =>
        log.id === action.payload
          ? { ...log, currentPrice: log.oldPrice }
          : log
      )
      const target = state.priceLogs.find((l) => l.id === action.payload)
      return {
        ...state,
        priceLogs: updatedLogs,
        toast: { message: `Price reverted for ${target.itemName}`, type: 'success' },
      }
    }

    case 'TOGGLE_RULE': {
      const updatedRules = state.inventoryRules.map((rule) =>
        rule.id === action.payload ? { ...rule, active: !rule.active } : rule
      )
      return { ...state, inventoryRules: updatedRules }
    }

    case 'ADD_RULE': {
      return {
        ...state,
        inventoryRules: [...state.inventoryRules, action.payload],
        toast: { message: 'New inventory rule added', type: 'success' },
      }
    }

    case 'BALANCE_STOCK': {
      const eastItems = state.warehouses.East.items
      const westItems = state.warehouses.West.items
      const itemMap = {}
      eastItems.forEach((item) => {
        itemMap[item.itemId] = { ...item }
      })
      westItems.forEach((item) => {
        if (itemMap[item.itemId]) {
          itemMap[item.itemId].stock += item.stock
        } else {
          itemMap[item.itemId] = { ...item }
        }
      })

      const balancedEast = eastItems.map((item) => {
        const total = itemMap[item.itemId].stock
        const half = Math.floor(total / 2)
        return { ...item, stock: half }
      })
      const balancedWest = westItems.map((item) => {
        const total = itemMap[item.itemId].stock
        const half = Math.floor(total / 2)
        return { ...item, stock: total - half }
      })

      return {
        ...state,
        warehouses: {
          East: { ...state.warehouses.East, items: balancedEast },
          West: { ...state.warehouses.West, items: balancedWest },
        },
        toast: { message: 'Warehouse stock balanced evenly', type: 'success' },
      }
    }

    case 'SHOW_TOAST':
      return { ...state, toast: action.payload }

    case 'HIDE_TOAST':
      return { ...state, toast: null }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
