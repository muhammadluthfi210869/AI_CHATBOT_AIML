"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

interface ValueItem {
    label: string;
    value: string;
}

interface ValueStackProps {
    items: ValueItem[];
    totalValue: string;
}

export function ValueStack({ items, totalValue }: ValueStackProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[90%]"
        >
            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-gold-500/20">
                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

                {/* Gold Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="relative p-5 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-gold-400" />
                        <h3 className="font-bold text-lg text-gold-200">
                            What You Get
                        </h3>
                    </div>
                </div>

                {/* Items */}
                <div className="relative p-5 space-y-4">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center mt-0.5">
                                <Check size={12} className="text-gold-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-zinc-100 text-[15px] font-medium">
                                    {item.label}
                                </p>
                                <p className="text-xs text-zinc-500 mt-0.5">
                                    Value: {item.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer - Total Value */}
                <div className="relative p-5 pt-4 border-t border-white/[0.06] bg-black/30">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Total Value:</span>
                        <span className="text-lg font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                            {totalValue}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ValueStack;
