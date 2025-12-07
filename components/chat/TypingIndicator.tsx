"use client";

import React from "react";
import { motion } from "framer-motion";

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="
                flex items-center gap-1.5 px-4 py-3 
                max-w-[80px]
                rounded-2xl rounded-bl-md
                bg-zinc-900/70 backdrop-blur-md
                border border-white/[0.06]
            "
        >
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-gold-500/70"
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </motion.div>
    );
}

export default TypingIndicator;
