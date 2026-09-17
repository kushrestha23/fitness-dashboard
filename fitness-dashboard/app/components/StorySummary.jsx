'use client';
import { motion } from 'framer-motion';

export default function StorySummary() {
    return (
        <section className="min-h-screen bg-black py-32 px-6 flex flex-col justify-center border-t border-slate-900">
            <div className="max-w-4xl mx-auto w-full space-y-16">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm font-mono text-slate-500 tracking-widest uppercase mb-6">
                        Chapter 07 // Epilogue
                    </h2>
                    <h3 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white">
                        THE STORY SO FAR.
                    </h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="space-y-8 text-xl sm:text-2xl text-slate-300 font-light leading-relaxed"
                >
                    <p>
                        I started tracking my journey in May 2026 at a baseline weight of <strong className="text-white font-normal">110.85 kg</strong> and an average daily movement of around 12,437 steps.
                    </p>
                    <p>
                        Since then, my activity escalated dramatically—pushing past my peak walking day on <strong className="text-white font-normal">July 18</strong> with <strong className="text-white font-normal">37,618 steps</strong> in a single day, and logging massive volume weeks exceeding 190,000 steps.
                    </p>
                    <p>
                        Along the way, my weight shifted downward to a low of <strong className="text-white font-normal">104.45 kg</strong>, while my WHOOP metrics tracked the physical toll, balancing high strain against recoveries peaking at <strong className="text-white font-normal">92%</strong>.
                    </p>
                    <p className="text-slate-500 text-lg pt-6 border-t border-slate-900 font-mono">
                        The data shows clear patterns in my activity and weight, but it is simply a reflection of what happened—a digital mirror of my movement, recovery, and progress.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}