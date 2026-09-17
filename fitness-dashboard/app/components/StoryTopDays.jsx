'use client';
import { motion } from 'framer-motion';

// Generated from your exact Pacer CSV data
const topDays = [
    { rank: '01', date: 'JUL 18', steps: 37618, distance: 18.6 },
    { rank: '02', date: 'SEP 09', steps: 36476, distance: 18.4 },
    { rank: '03', date: 'JUL 26', steps: 36275, distance: 18.8 },
    { rank: '04', date: 'AUG 01', steps: 36258, distance: 22.3 },
    { rank: '05', date: 'JUN 21', steps: 36212, distance: 17.3 },
];

export default function StoryTopDays() {
    return (
        <section className="min-h-screen bg-black py-32 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white mb-24"
                >
                    THE DAYS I REALLY <span className="text-indigo-500 italic">MOVED.</span>
                </motion.h2>

                <div className="space-y-16">
                    {topDays.map((day, i) => (
                        <motion.div
                            key={day.rank}
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.2 }}
                            className="group relative border-b border-slate-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
                        >
                            <div className="flex items-baseline gap-6">
                                <span className="text-6xl sm:text-8xl md:text-9xl font-black text-slate-900 group-hover:text-slate-800 transition-colors duration-500">
                                    {day.rank}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-4xl sm:text-6xl font-bold text-white tracking-tighter">
                                        {day.steps.toLocaleString()} <span className="text-xl sm:text-2xl text-slate-500 font-light tracking-normal">STEPS</span>
                                    </span>
                                    <span className="text-indigo-400 font-mono tracking-widest text-sm mt-2">
                                        {day.distance} KM LOGGED
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl sm:text-3xl text-slate-400 font-light">{day.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}