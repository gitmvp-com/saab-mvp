import { Base44Client } from '@base44/client'

// Initialize Base44 client
// For MVP: Use demo mode or add your Base44 API key
export const base44 = new Base44Client({
  apiKey: import.meta.env.VITE_BASE44_API_KEY || 'demo',
})

// Define entities
base44.defineEntity('Vehicle', {
  name: 'Vehicle',
  properties: {
    make: { type: 'string', required: true },
    model: { type: 'string', required: true },
    year: { type: 'integer', required: true },
    vin: { type: 'string' },
    license_plate: { type: 'string' },
    color: { type: 'string' },
    purchase_date: { type: 'string', format: 'date' },
    purchase_price: { type: 'number' },
    current_mileage: { type: 'number' },
    photo_url: { type: 'string' },
  },
})

base44.defineEntity('FuelLog', {
  name: 'FuelLog',
  properties: {
    vehicle_id: { type: 'string', required: true },
    date: { type: 'string', format: 'date', required: true },
    mileage: { type: 'number', required: true },
    gallons: { type: 'number' },
    cost_per_gallon: { type: 'number' },
    total_cost: { type: 'number' },
    fuel_type: { type: 'string', enum: ['regular', 'mid_grade', 'premium', 'diesel', 'electric'] },
    station: { type: 'string' },
    full_tank: { type: 'boolean' },
  },
})