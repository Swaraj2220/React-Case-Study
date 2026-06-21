import React, { useState, useMemo } from 'react'
import { Search, ShieldCheck, Flag } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function VendorChecker() {
  const { state } = useApp()
  const [searchTerm, setSearchTerm] = useState('')

  const results = useMemo(() => {
    if (!searchTerm.trim()) return []
    const term = searchTerm.toLowerCase()
    return state.vendors.filter(
      (v) => v.name.toLowerCase().includes(term) || v.legalId.toLowerCase().includes(term)
    )
  }, [searchTerm, state.vendors])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-indigo-600" size={26} />
          Vendor Checker
        </h1>
        <p className="text-sm text-slate-500 mt-1">Verify vendor credentials by ID or name</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by Vendor ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          />
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2">
          <Search size={16} />
          Search
        </button>
      </div>

      <div className="min-h-[200px]">
        {!searchTerm.trim() ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400 mb-4">
              <Search size={28} />
            </div>
            <p className="text-base font-medium text-slate-500">Enter a Vendor ID or Name to verify</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 text-center transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-500 mb-4">
              <Flag size={28} />
            </div>
            <p className="text-lg font-semibold text-red-700">Vendor Not Found</p>
            <p className="text-sm text-slate-500 mt-1">No vendor matches "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-lg shadow-sm border border-green-200 p-5 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-600" />
                    <span className="inline-block px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Verified
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">VID-{String(vendor.id).padStart(3, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{vendor.name}</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Legal ID</p>
                    <p className="font-mono text-slate-700 mt-0.5">{vendor.legalId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Category</p>
                    <p className="text-slate-700 mt-0.5">{vendor.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Contact</p>
                    <p className="text-slate-700 mt-0.5">{vendor.contact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
