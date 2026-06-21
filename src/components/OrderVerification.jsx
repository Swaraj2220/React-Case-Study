import React, { useState } from 'react'
import { CheckCircle, XCircle, ClipboardCheck, ChevronDown, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
}

export default function OrderVerification() {
  const { state, dispatch } = useApp()
  const [showApproved, setShowApproved] = useState(true)
  const [showRejected, setShowRejected] = useState(true)

  const nextOrder = state.verificationQueue[0]
  const totalProcessed = state.approvedOrders.length + state.rejectedOrders.length
  const totalOrders = totalProcessed + state.verificationQueue.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ClipboardCheck className="text-indigo-600" size={26} />
          Order Verification
        </h1>
      </div>

      <div className="text-sm text-slate-500 font-medium">
        {totalProcessed} of {totalOrders} orders processed
      </div>

      {nextOrder ? (
        <div className="bg-white rounded-lg shadow-md border-2 border-indigo-400 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Next Pending Order</h2>
            <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Order #{nextOrder.id}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Requester</p>
              <p className="text-base font-semibold text-slate-800 mt-0.5">{nextOrder.requester}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Department</p>
              <p className="text-base font-semibold text-slate-800 mt-0.5">{nextOrder.department}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Amount</p>
              <p className="text-base font-semibold text-slate-800 mt-0.5">{formatINR(nextOrder.amount)}</p>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => dispatch({ type: 'APPROVE_ORDER' })}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              <CheckCircle size={18} />
              Approve
            </button>
            <button
              onClick={() => dispatch({ type: 'REJECT_ORDER' })}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-sm"
            >
              <XCircle size={18} />
              Reject
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle size={28} />
          </div>
          <p className="text-lg font-semibold text-slate-700">All orders have been processed</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <button
            onClick={() => setShowApproved(!showApproved)}
            className="w-full flex items-center justify-between px-4 py-3 bg-green-50 hover:bg-green-100 transition-colors"
          >
            <span className="text-sm font-semibold text-green-700">
              Approved Orders ({state.approvedOrders.length})
            </span>
            {showApproved ? <ChevronDown size={18} className="text-green-600" /> : <ChevronRight size={18} className="text-green-600" />}
          </button>
          {showApproved && (
            <div className="px-4 py-3">
              {state.approvedOrders.length === 0 ? (
                <p className="text-sm text-slate-400 py-2">No approved orders yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {state.approvedOrders.map((order) => (
                    <span
                      key={order.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                    >
                      <CheckCircle size={12} />
                      {order.requester} — {formatINR(order.amount)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <button
            onClick={() => setShowRejected(!showRejected)}
            className="w-full flex items-center justify-between px-4 py-3 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <span className="text-sm font-semibold text-red-700">
              Rejected Orders ({state.rejectedOrders.length})
            </span>
            {showRejected ? <ChevronDown size={18} className="text-red-600" /> : <ChevronRight size={18} className="text-red-600" />}
          </button>
          {showRejected && (
            <div className="px-4 py-3">
              {state.rejectedOrders.length === 0 ? (
                <p className="text-sm text-slate-400 py-2">No rejected orders yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {state.rejectedOrders.map((order) => (
                    <span
                      key={order.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                    >
                      <XCircle size={12} />
                      {order.requester} — {formatINR(order.amount)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
