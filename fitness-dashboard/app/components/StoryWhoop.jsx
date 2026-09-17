'use client';
import { motion } from 'framer-motion';

export default function StoryWhoop() {
    return (
        <section className="min-h-screen bg-slate-950 py-32 px-6 flex flex-col items-center justify-center border-t border-slate-900">
            <div className="max-w-4xl w-full">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white mb-6">
                        WHAT WAS HAPPENING BEHIND THE STEPS?
                    </h2>
                    <p className="text-xl text-slate-400 font-light">
                        My WHOOP data measured the physical toll. During my journey, my recovery fluctuated from a peak of <strong className="text-emerald-400 font-bold">92%</strong> down to just <strong className="text-red-400 font-bold">7%</strong> on my hardest days.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-black border border-slate-800 p-8 rounded-3xl"
                    >
                        <h3 className="text-slate-500 font-mono text-sm tracking-widest mb-4">STRAIN</h3>
                        <p className="text-white text-lg font-light leading-relaxed">
                            How much physical load WHOOP estimated I experienced. By early September, my average weekly strain climbed to nearly 16.0 as my walking peaked.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-black border border-slate-800 p-8 rounded-3xl"
                    >
                        <h3 className="text-slate-500 font-mono text-sm tracking-widest mb-4">RECOVERY</h3>
                        <p className="text-white text-lg font-light leading-relaxed">
                            How ready WHOOP estimated me to be for physical strain. My average recovery hovered around 43%, reflecting the consistent daily load I was carrying.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}