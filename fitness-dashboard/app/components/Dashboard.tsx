'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [metrics, setMetrics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/metrics')
            .then((res) => res.json())
            .then((data) => {
                setMetrics(data.summary);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load metrics:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-gray-500">Loading analytics...</div>;
    }

    if (!metrics || !metrics.total_days || metrics.total_days === '0') {
        return (
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center mt-6">
                <p className="text-blue-800 font-medium">No fitness metrics found in the database yet.</p>
                <p className="text-blue-600 text-sm mt-1">Use the importer above to upload your Pacer or WHOOP CSV files!</p>
            </div>
        );
    }

    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>

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
        </div>
    );
}