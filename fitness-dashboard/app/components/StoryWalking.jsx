'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Using your actual parsed Pacer data!
const weeklyData = [
    { week: 'WEEK OF JUL 13', steps: 113535, distance: 75.2 },
    { week: 'WEEK OF JUL 20', steps: 127162, distance: 90.3 },
    { week: 'WEEK OF JUL 27', steps: 149029, distance: 105.8 },
    { week: 'WEEK OF AUG 03', steps: 148625, distance: 88.9 },
    { week: 'WEEK OF AUG 24', steps: 156564, distance: 124.3 },
    { week: 'WEEK OF AUG 31', steps: 144707, distance: 105.2 },
    { week: 'WEEK OF SEP 07', steps: 190966, distance: 133.3, isHighest: true },
];

export default function StoryWalking() {
    const [hoveredWeek, setHoveredWeek] = useState(null);

    // The max steps value helps calculate the relative width of the bars
    const maxSteps = Math.max(...weeklyData.map(d => d.steps));

    return (
        <section className="min-h-screen bg-black py-32 px-6 flex flex-col items-center justify-center border-t border-slate-900 relative">

            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white mb-6">
                        I WALKED. <span className="text-slate-600">A LOT.</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-light max-w-2xl">
                        My weekly step counts transformed over the summer. The data shows a massive escalation in my physical activity, culminating in September.
                    </p>
                </motion.div>

                {/* The Animated Visual Journey Chart */}
                <div className="space-y-6">
                    {weeklyData.map((data, index) => {
                        const widthPercentage = (data.steps / maxSteps) * 100;
                        const isHovered = hoveredWeek === data.week;

                        return (
                            <motion.div
                                key={data.week}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredWeek(data.week)}
                                onMouseLeave={() => setHoveredWeek(null)}
                                className="relative group cursor-pointer"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-2">
                                    <span className="text-xs font-mono text-slate-500 w-32 shrink-0">{data.week}</span>

                                    {/* The Animated Bar */}
                                    <div className="flex-1 h-12 bg-slate-900/50 rounded-r-lg relative overflow-hidden flex items-center">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${widthPercentage}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                                            className={`h-full ${data.isHighest ? 'bg-indigo-600' : 'bg-slate-700 group-hover:bg-slate-600'} transition-colors duration-300`}
                                        />

                                        {/* Hover Stats Overlay */}
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute left-4 flex items-baseline gap-4"
                                            >
                                                <span className="text-white font-bold tracking-tight text-xl">{data.steps.toLocaleString()} STEPS</span>
                                                <span className="text-slate-300 font-mono text-xs">{data.distance} KM</span>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Dynamic Explanation for highest week */}
                                {data.isHighest && isHovered && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-indigo-400 text-sm font-light mt-2 sm:ml-[152px]"
                                    >
                                        This was my most active week in the entire dataset.
                                    </motion.p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}