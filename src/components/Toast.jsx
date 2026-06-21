import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'

const typeStyles = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
}

export default function Toast() {
  const { state, dispatch } = useApp()
  const toast = state.toast

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      dispatch({ type: 'HIDE_TOAST' })
    }, 3000)
    return () => clearTimeout(timer)
  }, [toast, dispatch])

  if (!toast) return null

  return (
    <div className="fixed top-6 right-6 z-[100] animate-slide-in">
      <div
        className={`${typeStyles[toast.type] || 'bg-slate-700'} text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2`}
      >
        {toast.type === 'success' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {toast.type === 'error' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {toast.type === 'info' && (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        )}
        {toast.message}
      </div>
    </div>
  )
}
