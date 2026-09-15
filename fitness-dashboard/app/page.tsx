import DataImporter from './components/DataImporter';
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Personal Fitness Data</h1>
        <DataImporter />
      </div>
    </main>
  );
}