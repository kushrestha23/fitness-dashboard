// Inside app/page.tsx
import WeightChart from './components/WeightChart';       // Notice the 's' and relative path
import TelemetryStory from './components/TelemetryStory';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Fitness Telemetry Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Live data pipeline tracking weight optimization since May 2026.</p>
        </div>

        {/* 1. The Story / Milestones Section */}
        <TelemetryStory />

        {/* 2. The Interactive Weight Line Chart Section */}
        <WeightChart />

      </div>
    </main>
  );
}