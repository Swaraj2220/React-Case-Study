import React, { useState } from 'react'
import { ScrollText, Plus, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function InventoryRules() {
  const { state, dispatch } = useApp()
  const rules = state.inventoryRules
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ description: '', team: '', warehouse: '', category: '', threshold: '' })

  const activeCount = rules.filter(r => r.active).length

  function handleToggle(id) {
    dispatch({ type: 'TOGGLE_RULE', payload: id })
  }

  function handleAdd() {
    if (!form.description || !form.team || !form.warehouse || !form.category || !form.threshold) return
    dispatch({
      type: 'ADD_RULE',
      payload: {
        id: Date.now(),
        description: form.description,
        team: form.team,
        warehouse: form.warehouse,
        category: form.category,
        threshold: Number(form.threshold),
        active: true,
      },
    })
    setShowModal(false)
    setForm({ description: '', team: '', warehouse: '', category: '', threshold: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <ScrollText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Inventory Rules Hub</h1>
            <p className="text-sm text-slate-500">{activeCount} active rule{activeCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} />
          Add Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            className={`bg-white rounded-xl shadow-sm border-t-4 p-5 flex flex-col justify-between ${
              rule.active ? 'border-t-green-500 border border-slate-200 border-t-4' : 'border-t-slate-300 border border-slate-200 border-t-4'
            }`}
          >
            <div>
              <p className="text-sm font-medium text-slate-800 leading-relaxed">{rule.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">{rule.team}</span>
                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">{rule.warehouse}</span>
                <span className="px-2 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">{rule.category}</span>
                <span className="px-2 py-1 rounded-md bg-indigo-50 text-xs font-medium text-indigo-600">Threshold: {rule.threshold}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs font-medium text-slate-400">{rule.active ? 'Active' : 'Inactive'}</span>
              <button
                onClick={() => handleToggle(rule.id)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  rule.active ? 'bg-green-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    rule.active ? 'translate-x-[18px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800">Add Inventory Rule</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Description', key: 'description', type: 'text' },
                { label: 'Team', key: 'team', type: 'text' },
                { label: 'Warehouse', key: 'warehouse', type: 'text' },
                { label: 'Category', key: 'category', type: 'text' },
                { label: 'Threshold', key: 'threshold', type: 'number' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
