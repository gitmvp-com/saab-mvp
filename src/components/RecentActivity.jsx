import React from 'react'
import { DollarSign, Calendar } from 'lucide-react'
import { format } from 'date-fns'

export default function RecentActivity({ activities, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (activities.length === 0) {
    return null
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="border-l-2 border-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{activity.title}</p>
                <p className="text-slate-400 text-xs mt-1">{activity.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(activity.date), 'MMM d, yyyy')}
                </div>
              </div>
              {activity.cost && (
                <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                  <DollarSign className="w-3 h-3" />
                  {activity.cost.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}