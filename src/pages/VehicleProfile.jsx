import React, { useState } from 'react'
import { base44 } from '../api/base44Client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Car, Loader2, Edit2, Save } from 'lucide-react'

export default function VehicleProfile() {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: () => base44.entities.Vehicle.list(),
  })

  const vehicle = vehicles[0]

  const [formData, setFormData] = useState(
    vehicle || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      vin: '',
      license_plate: '',
      color: '',
      current_mileage: '',
    }
  )

  React.useEffect(() => {
    if (vehicle) {
      setFormData(vehicle)
    }
  }, [vehicle])

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Vehicle.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      setIsEditing(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data) => base44.entities.Vehicle.update(vehicle.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      setIsEditing(false)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      year: formData.year ? parseInt(formData.year) : undefined,
      current_mileage: formData.current_mileage ? parseFloat(formData.current_mileage) : undefined,
    }

    if (vehicle) {
      updateMutation.mutate(submitData)
    } else {
      createMutation.mutate(submitData)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    )
  }

  const showForm = !vehicle || isEditing

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Car className="w-6 h-6 text-blue-400" />
              {vehicle ? 'Vehicle Profile' : 'Add Your Vehicle'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {vehicle ? 'Manage your vehicle information' : 'Set up your vehicle profile'}
            </p>
          </div>
          {vehicle && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-700 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">Make *</label>
                  <input
                    value={formData.make}
                    onChange={(e) => setFormData((prev) => ({ ...prev, make: e.target.value }))}
                    placeholder="e.g., Toyota"
                    className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">Model *</label>
                  <input
                    value={formData.model}
                    onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
                    placeholder="e.g., Camry"
                    className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">Year *</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                    placeholder="2024"
                    className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">Color</label>
                  <input
                    value={formData.color}
                    onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
                    placeholder="e.g., Silver"
                    className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 text-sm">VIN</label>
                <input
                  value={formData.vin}
                  onChange={(e) => setFormData((prev) => ({ ...prev, vin: e.target.value }))}
                  placeholder="Vehicle Identification Number"
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 text-sm">License Plate</label>
                <input
                  value={formData.license_plate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, license_plate: e.target.value }))}
                  placeholder="ABC-1234"
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 text-sm">Current Mileage</label>
                <input
                  type="number"
                  value={formData.current_mileage}
                  onChange={(e) => setFormData((prev) => ({ ...prev, current_mileage: e.target.value }))}
                  placeholder="0"
                  className="w-full bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                {vehicle && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData(vehicle)
                    }}
                    className="flex-1 bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  {createMutation.isPending || updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Make</p>
                  <p className="text-white font-medium">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Model</p>
                  <p className="text-white font-medium">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Year</p>
                  <p className="text-white font-medium">{vehicle.year}</p>
                </div>
                {vehicle.color && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Color</p>
                    <p className="text-white font-medium">{vehicle.color}</p>
                  </div>
                )}
                {vehicle.vin && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-400 mb-1">VIN</p>
                    <p className="text-white font-medium text-sm">{vehicle.vin}</p>
                  </div>
                )}
                {vehicle.license_plate && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">License Plate</p>
                    <p className="text-white font-medium">{vehicle.license_plate}</p>
                  </div>
                )}
                {vehicle.current_mileage && (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">Current Mileage</p>
                    <p className="text-white font-medium">{vehicle.current_mileage.toLocaleString()} miles</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}