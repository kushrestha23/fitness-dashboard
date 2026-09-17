'use client';
import { motion } from 'framer-motion';

export default function StoryCorrelation() {
    return (
        <section className="min-h-screen bg-black py-32 px-6 flex flex-col items-center justify-center">
            <div className="max-w-5xl w-full space-y-24">

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.8 }} className="text-center">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
                        DID WALKING CHANGE MY WEIGHT?
                    </h2>
                    <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
                        I compared my weekly average steps against my recorded weight timeline.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="bg-slate-950/50 border border-slate-800 p-8 sm:p-12 rounded-3xl">
                        <h3 className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-4">What I Can See</h3>
                        <p className="text-lg text-slate-300 font-light leading-relaxed mb-8">
                            When my weekly steps were higher, my weight change generally tended to move downward. My data
                            mathematically shows a moderate negative correlation between my steps and my body mass.
                        </p>
                        <div className="space-y-4 border-t border-slate-800 pt-8">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">My Highest Week</span>
                                <span className="text-white font-mono text-xl">190,966 STEPS</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Lowest Recorded Weight</span>
                                <span className="text-white font-mono text-xl">104.45 KG</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-slate-950/50 border border-slate-800 p-8 sm:p-12 rounded-3xl">
                        <h3 className="text-xs font-mono text-indigo-500 tracking-widest uppercase mb-4">What I Can't Say From
                            This Data</h3>
                        <p className="text-lg text-slate-300 font-light leading-relaxed">
                            This doesn't prove that walking alone caused the weight change. My WHOOP data shows fluctuating
                            strain and recovery, and metabolism factors varied. The data shows they moved together, but it
                            cannot tell me exactly why.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}