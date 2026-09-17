'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function WeightChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch('/api/telemetry');
                const json = await res.json();
                if (json.success) {
                    setData(json.records);
                }
            } catch (err) {
                console.error('Failed to load telemetry:', err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <div className="text-slate-400 text-sm p-4 font-mono">Loading telemetry stream...</div>;

    return (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden my-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">Weight Optimization Pipeline</h3>
                    <p className="text-xs text-slate-400 font-mono mt-1">Timeline: May 2026 — Present (Baseline: 118 kg)</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                    ● LIVE NEON DB
                </span>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis
                            dataKey="log_date"
                            stroke="#64748b"
                            fontSize={12}
                            tickFormatter={(dateStr) => {
                                const d = new Date(dateStr);
                                return `${d.getMonth() + 1}/${d.getDate()}`;
                            }}
                        />
                        <YAxis
                            domain={['dataMin - 1', 'dataMax + 1']}
                            stroke="#64748b"
                            fontSize={12}
                            unit=" kg"
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '12px' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="weight_kg"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: '#6366f1', r: 4 }}
                            activeDot={{ r: 7, fill: '#818cf8' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}