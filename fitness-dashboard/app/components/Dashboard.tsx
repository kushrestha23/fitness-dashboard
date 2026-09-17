'use client';

import { useEffect, useState } from 'react';
import FitnessCharts from './FitnessCharts';

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState('14'); // default 14 days

    useEffect(() => {
        setLoading(true);
        fetch(`/api/metrics?range=${range}`)
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load metrics:', err);
                setLoading(false);
            });
    }, [range]);

    if (loading && !data) {
        return <div className="text-center py-10 text-gray-500">Loading analytics...</div>;
    }

    if (!data || !data.summary || data.summary.total_days === '0') {
        return (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center mt-6">
                <p className="text-blue-800 font-medium">No fitness metrics found in the database yet.</p>
                <p className="text-blue-600 text-sm mt-1">Upload both your Pacer and WHOOP CSV files below to populate your analytics!</p>
            </div>
        );
    }

    const metrics = data.summary;

    return (
        <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>

                {/* Range Selector Tabs */}
                <div className="inline-flex rounded-md shadow-sm bg-gray-100 p-1">
                    <button
                        onClick={() => setRange('7')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${range === '7' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Last 7 Days
                    </button>
                    <button
                        onClick={() => setRange('14')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${range === '14' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Last 14 Days
                    </button>
                    <button
                        onClick={() => setRange('30')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${range === '30' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Last 30 Days
                    </button>
                    <button
                        onClick={() => setRange('all')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${range === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        All Time
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Avg Daily Steps</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {parseInt(metrics.avg_daily_steps || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 mt-2">Lifetime Total: {parseInt(metrics.lifetime_steps || 0).toLocaleString()} steps</p>
                </div>

                <div className="bg-white p-5 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Avg Recovery Score</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {metrics.avg_recovery ? `${metrics.avg_recovery}%` : 'N/A'}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">WHOOP Recovery Index</p>
                </div>

                <div className="bg-white p-5 rounded-lg border shadow-sm">
                    <p className="text-sm font-medium text-gray-500">Avg Sleep Duration</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                        {metrics.avg_sleep_hours ? `${metrics.avg_sleep_hours} hrs` : 'N/A'}
                    </p>
                    <p className="text-xs text-purple-600 mt-2">Rest & Recovery Quality</p>
                </div>
            </div>

            {/* Charts Section */}
            <FitnessCharts recentData={data.recent} />
        </div>
    );
}