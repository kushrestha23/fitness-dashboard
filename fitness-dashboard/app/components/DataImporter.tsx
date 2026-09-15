'use client';

import { useState } from 'react';
import Papa from 'papaparse';

export default function DataImporter() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            parseAndPreview(selectedFile);
        }
    };

    const parseAndPreview = (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const data = results.data as any[];
                const headers = results.meta.fields || [];

                // Auto-detect file type based on specific headers
                let source = 'unknown';
                if (headers.includes('Recovery score %')) {
                    source = 'whoop';
                } else if (headers.includes('Steps') && headers.includes('Date')) {
                    source = 'pacer';
                }

                setPreview({
                    source,
                    totalRecords: data.length,
                    rawData: data,
                });
            }
        });
    };

    const handleImport = async () => {
        if (!preview || preview.source === 'unknown') return;
        setLoading(true);
        setMessage('');

        // Normalize the data before sending to the server
        const mappedRecords = preview.rawData.map((row: any) => {
            if (preview.source === 'pacer') {
                return {
                    date: row['Date'],
                    steps: parseInt(row['Steps']) || 0,
                    distance_km: row['Distance(meters)'] ? (parseFloat(row['Distance(meters)']) / 1000).toFixed(2) : 0,
                    active_time_mins: row['ActiveTime(seconds)'] ? Math.round(parseInt(row['ActiveTime(seconds)']) / 60) : 0
                };
            } else if (preview.source === 'whoop') {
                const dateStr = row['Cycle start time'] ? row['Cycle start time'].split(' ')[0] : null;
                return {
                    date: dateStr,
                    recovery_score: parseInt(row['Recovery score %']) || null,
                    strain: parseFloat(row['Day Strain']) || null,
                    rhr: parseInt(row['Resting heart rate (bpm)']) || null,
                    hrv: parseInt(row['Heart rate variability (ms)']) || null,
                    sleep_duration_mins: parseInt(row['Asleep duration (min)']) || null,
                    sleep_performance: parseInt(row['Sleep performance %']) || null,
                    calories_burned: parseInt(row['Energy burned (cal)']) || null
                };
            }
        }).filter((r: any) => r && r.date);

        try {
            const res = await fetch('/api/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ source: preview.source, records: mappedRecords })
            });

            const result = await res.json();
            if (res.ok) {
                setMessage(`✅ Success! Upserted ${result.upserted} records.`);
            } else {
                setMessage(`❌ Error: ${result.error}`);
            }
        } catch (err) {
            setMessage('An error occurred during network request.');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-sm border rounded-lg mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Import Health Data</h2>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV Export</label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {preview && (
                <div className="bg-gray-50 p-4 rounded-md mb-6 border">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">Preview</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li><strong>Detected Source:</strong> <span className="uppercase">{preview.source}</span></li>
                        <li><strong>Records Found:</strong> {preview.totalRecords.toLocaleString()}</li>
                    </ul>

                    {preview.source === 'unknown' && (
                        <p className="text-red-500 text-xs mt-2">
                            Error: Could not determine data source. Please upload a valid Pacer or WHOOP CSV.
                        </p>
                    )}
                </div>
            )}

            <button
                onClick={handleImport}
                disabled={!preview || preview.source === 'unknown' || loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
                {loading ? 'Importing Data...' : 'Import Data'}
            </button>

            {message && (
                <div className={`mt-4 p-3 text-sm rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {message}
                </div>
            )}
        </div>
    );
}