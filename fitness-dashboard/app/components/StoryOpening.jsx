'use client';
import { motion } from 'framer-motion';

export default function StoryOpening() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6">
            {/* Background subtle gradient that pulses */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-black pointer-events-none"
            />

            <div className="z-10 text-center max-w-4xl mx-auto space-y-6">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white"
                >
                    THIS IS MY DATA.
                </motion.h1>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-slate-500"
                >
                    THIS IS MY JOURNEY.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.8 }}
                    className="text-lg sm:text-xl text-slate-400 font-light mt-12 max-w-xl mx-auto"
                >
                    I started tracking my journey in May. Everything you see below is generated from my actual physical inputs.
                </motion.p>
            </div>

            {/* The Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                className="absolute bottom-12 flex flex-col items-center gap-3"
            >
                <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">Scroll to Discover</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent"
                />
            </motion.div>
        </section>
    );
}