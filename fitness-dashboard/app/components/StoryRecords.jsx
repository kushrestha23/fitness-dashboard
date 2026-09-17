'use client';
import { motion } from 'framer-motion';

const records = [
    { title: "MY BIGGEST DAY", value: "37,618", unit: "STEPS", date: "JUL 18" },
    { title: "MY LONGEST WALK", value: "22.3", unit: "KM", date: "AUG 01" },
    { title: "MY LOWEST WEIGHT", value: "104.45", unit: "KG", date: "SEP 17" },
    { title: "MY BEST RECOVERY", value: "92", unit: "%", date: "WHOOP PEAK" },
    { title: "MY LONGEST SLEEP", value: "8.0", unit: "HOURS", date: "MAX REST" }
];

export default function StoryRecords() {
    return (
        <section className="min-h-screen bg-black py-32 px-6 flex flex-col justify-center border-t border-slate-900">
            <div className="max-w-7xl mx-auto w-full">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-24 text-center"
                >
                    Chapter 06 // The Records Wall
                </motion.h2>

                <div className="flex flex-col gap-16 md:gap-24">
                    {records.map((record, index) => (
                        <motion.div
                            key={record.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="flex flex-col md:flex-row md:items-baseline justify-between group"
                        >
                            <h3 className="text-2xl sm:text-4xl text-slate-500 font-light tracking-tight mb-2 md:mb-0 group-hover:text-slate-300 transition-colors">
                                {record.title}
                            </h3>

                            <div className="flex flex-col md:items-end text-left md:text-right">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter">
                                        {record.value}
                                    </span>
                                    <span className="text-2xl sm:text-4xl text-slate-600 font-bold tracking-tight">
                                        {record.unit}
                                    </span>
                                </div>
                                <span className="text-indigo-500 font-mono text-sm tracking-widest mt-2 block">
                                    ACHIEVED ON: {record.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}