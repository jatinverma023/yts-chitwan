import React from 'react'
import StatCard from './components/StatCard'
import ChartPlaceholder from './ChartPlaceholder'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="8,421" delta="+4.2%" />
        <StatCard title="Active Sessions" value="1,189" delta="+1.8%" />
        <StatCard title="Revenue" value="$24,980" delta="+6.1%" />
        <StatCard title="Errors" value="14" delta="-2.3%" />
      </section>

      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-700/20 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Traffic Overview</h2>
          <ChartPlaceholder />
        </div>

        <div className="bg-slate-900/40 border border-slate-700/20 rounded-xl p-4">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="p-3 rounded-md bg-slate-800/30">New user signed up — <span className="text-slate-400">2m ago</span></li>
            <li className="p-3 rounded-md bg-slate-800/30">Payment received — <span className="text-slate-400">1h ago</span></li>
            <li className="p-3 rounded-md bg-slate-800/30">Server deploy success — <span className="text-slate-400">5h ago</span></li>
          </ul>
        </div>
      </section>
    </div>
  )
}
