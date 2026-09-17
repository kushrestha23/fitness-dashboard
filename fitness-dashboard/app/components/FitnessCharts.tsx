'use client';

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export default function FitnessCharts({ recentData }: { recentData: any[] }) {
    if (!recentData || recentData.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Pacer Steps Trend */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Daily Steps (Pacer)</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={recentData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Bar dataKey="steps" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* WHOOP Recovery Trend */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recovery & Strain (WHOOP)</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={recentData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="recovery_score" stroke="#10b981" strokeWidth={2} name="Recovery %" />
                            <Line type="monotone" dataKey="strain" stroke="#f59e0b" strokeWidth={2} name="Strain" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}