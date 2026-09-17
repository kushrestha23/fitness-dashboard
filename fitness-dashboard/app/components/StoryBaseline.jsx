'use client';
import { motion } from 'framer-motion';

export default function StoryBaseline() {
    return (
        <section className="min-h-[80vh] flex flex-col items-center justify-center bg-black py-24 px-6 relative border-t border-slate-900">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-3xl w-full"
            >
                <h2 className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-16">
                    Chapter 01 // Where I Started
                </h2>

                <div className="space-y-16">
                    {/* Weight Reveal */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-slate-900 pb-8">
                        <span className="text-3xl sm:text-4xl text-slate-400 font-light mb-2 md:mb-0">MAY 2026</span>
                        <div className="text-right">
                            <span className="text-6xl sm:text-8xl font-extrabold text-white tracking-tighter">110.85</span>
                            <span className="text-2xl text-slate-500 font-mono ml-4">KG</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: 60 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-[1px] bg-slate-800 mx-auto"
                    />

                    {/* Activity Reveal */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-slate-900 pb-8">
                        <span className="text-3xl sm:text-4xl text-slate-400 font-light mb-2 md:mb-0">I WALKED</span>
                        <div className="text-right">
                            <span className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter">12,437</span>
                            <span className="text-xl text-slate-500 font-mono ml-4 block sm:inline">STEPS / DAY</span>
                        </div>
                    </div>

                    {/* Distance Reveal */}
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between border-b border-slate-900 pb-8">
                        <span className="text-xl sm:text-2xl text-slate-500 font-light mb-2 md:mb-0">WHICH WAS ABOUT</span>
                        <div className="text-right">
                            <span className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter">7.1</span>
                            <span className="text-xl text-slate-500 font-mono ml-4">KM / DAY</span>
                        </div>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-lg text-slate-400 font-light mt-12 leading-relaxed"
                >
                    That is how much I moved on an average day when I began this phase of my journey. I logged my starting weight, strapped on my devices, and let the data run.
                </motion.p>
            </motion.div>
        </section>
    );
}