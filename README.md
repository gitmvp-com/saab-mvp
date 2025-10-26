# Saab MVP - Vehicle Fuel Tracker

A simplified MVP version of the [Saab](https://github.com/zpthanos/Saab) vehicle maintenance tracking app, focused on fuel logging and tracking.

## Features

✅ **Vehicle Profile Management**
- Add and manage your vehicle information
- Track make, model, year, VIN, license plate
- Monitor current mileage

✅ **Fuel Logging**
- Record fuel fill-ups with date, mileage, and cost
- Track fuel type (Regular, Premium, Diesel, etc.)
- Calculate MPG automatically from fill-up data
- Monitor total fuel spending
- Track average cost per gallon

✅ **Dashboard**
- Overview of vehicle stats
- Fuel economy tracking
- Recent activity feed
- Total spending summary

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **Backend**: Base44 (BaaS platform)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Base44 account (optional for demo)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gitmvp-com/saab-mvp.git
cd saab-mvp
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up Base44:
   - Sign up at [Base44](https://base44.io)
   - Get your API key
   - Create `.env` file:
```env
VITE_BASE44_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## Project Structure

```
saab-mvp/
├── src/
│   ├── api/
│   │   └── base44Client.js    # Base44 configuration
│   ├── components/
│   │   ├── AddFuelForm.jsx    # Fuel logging form
│   │   ├── RecentActivity.jsx # Activity feed
│   │   └── StatsCard.jsx      # Dashboard stat cards
│   ├── pages/
│   │   ├── Dashboard.jsx      # Main dashboard
│   │   ├── Fuel.jsx           # Fuel logs page
│   │   └── VehicleProfile.jsx # Vehicle management
│   ├── App.jsx                # App router
│   ├── Layout.jsx             # App layout with nav
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Usage

### 1. Add Your Vehicle
- Navigate to the "Vehicle" tab
- Fill in your vehicle details (Make, Model, Year are required)
- Save your vehicle profile

### 2. Log Fuel Fill-ups
- Go to the "Fuel" tab
- Click "Add Fill-up"
- Enter fill-up details:
  - Date and mileage (required)
  - Gallons and cost per gallon
  - Fuel type and station name
  - Mark as "Full Tank" for MPG calculation

### 3. View Dashboard
- See your vehicle stats at a glance
- Monitor fuel economy (calculated from full tank fill-ups)
- Track total spending
- Review recent activity

## MPG Calculation

The app automatically calculates MPG when:
- You have at least 2 "Full Tank" fill-ups
- Each fill-up has mileage and gallons recorded
- Formula: `(Current Mileage - Previous Mileage) / Gallons`

## Differences from Original Saab

This MVP simplifies the original app by:
- ❌ Removing service records tracking
- ❌ Removing documents/receipts management
- ❌ Removing maintenance alerts
- ❌ Removing photo uploads
- ✅ Focusing on fuel tracking as the core feature
- ✅ Simplified UI components (no shadcn/ui)
- ✅ Self-contained styling (inline Tailwind)

## Base44 Backend

This app uses [Base44](https://base44.io) as a Backend-as-a-Service:
- **Entities**: Vehicle, FuelLog
- **No server setup required**
- **Real-time data sync**
- **Demo mode available** (no API key needed for testing)

## Build for Production

```bash
npm run build
npm run preview
```

## License

MIT

## Credits

Based on [Saab](https://github.com/zpthanos/Saab) by zpthanos

---

**Note**: This is an MVP (Minimum Viable Product) focusing on fuel tracking. For the full feature set including service records, documents, and maintenance alerts, check out the [original Saab repository](https://github.com/zpthanos/Saab).