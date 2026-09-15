import DataImporter from './components/DataImporter';
import Dashboard from './components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Personal Fitness Analytics</h1>
          <p className="text-gray-600 mt-1">Full-stack data engineering pipeline connecting Pacer & WHOOP metrics.</p>
        </div>

        <Dashboard />
        <div className="mt-12">
          <DataImporter />
        </div>
      </div>
    </main>
  );
}