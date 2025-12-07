"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Lock } from "lucide-react";

/*
 * ════════════════════════════════════════════════════════════════════════════
 * PREMIUM ACTION BUTTONS - V3 (THE GOLD STANDARD)
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * DESIGN TOKENS - THE GOLD STANDARD:
 * - Primary Gold: #FCD34D (Amber terang) - CONSISTENT across ALL elements
 * - Icon Stroke Width: 2px (consistent with all icons)
 * 
 * Three distinct variants:
 * 1. GOLD (default) - Standard CTA for progression
 * 2. GHOST - Subtle text link style
 * 3. PAYMENT - Premium, high-impact CTA for payment/conversion
 */

// Design Tokens - Single Source of Truth
const GOLD = '#FCD34D';

interface ActionButtonProps {
    label: string;
    onClick: () => void;
    variant?: "gold" | "ghost" | "payment";
    icon?: React.ReactNode;
}

export function ActionButton({ label, onClick, variant = "gold", icon }: ActionButtonProps) {
    // GHOST VARIANT - Subtle text link
    if (variant === "ghost") {
        return (
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className="
                    text-zinc-500 hover:text-zinc-300
                    text-sm underline underline-offset-4
                    transition-colors duration-300
                "
            >
                {label}
            </motion.button>
        );
    }

    // PAYMENT VARIANT - Premium CTA for conversion
    if (variant === "payment") {
        return (
            <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClick}
                className="relative group w-full max-w-[90%] rounded-2xl overflow-hidden"
                style={{
                    padding: '18px 28px',
                }}
            >
                {/* Animated border glow - PULSING */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${GOLD} 0%, #FFD700 25%, ${GOLD} 50%, #E5C558 75%, ${GOLD} 100%)`,
                        backgroundSize: '300% 300%',
                    }}
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Inner content container */}
                <div
                    className="relative z-10 rounded-xl"
                    style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
                        padding: '16px 24px',
                        border: `1px solid rgba(252, 211, 77, 0.3)`,
                    }}
                >
                    {/* Shimmer sweep effect - STRONGER */}
                    <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(90deg, transparent 0%, rgba(252, 211, 77, 0.4) 50%, transparent 100%)`,
                                width: '200%',
                            }}
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* Top rim light */}
                    <div
                        className="absolute inset-x-0 top-0 h-[1px] rounded-t-xl pointer-events-none"
                        style={{
                            background: `linear-gradient(90deg, transparent 0%, rgba(252, 211, 77, 0.5) 30%, rgba(255, 215, 0, 0.7) 50%, rgba(252, 211, 77, 0.5) 70%, transparent 100%)`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-20 flex items-center justify-center gap-3">
                        {/* Lock icon to signify "unlock" */}
                        <motion.div
                            animate={{
                                rotate: [0, -10, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                        >
                            <Lock size={18} strokeWidth={2} style={{ color: GOLD }} />
                        </motion.div>

                        <span
                            className="font-bold tracking-wide"
                            style={{
                                color: GOLD,
                                fontSize: '16px',
                                textShadow: `0 0 20px rgba(252, 211, 77, 0.5)`,
                            }}
                        >
                            {label}
                        </span>

                        <motion.div
                            animate={{
                                x: [0, 4, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <ArrowRight size={18} strokeWidth={2} style={{ color: GOLD }} />
                        </motion.div>
                    </div>
                </div>

                {/* Outer glow effect */}
                <motion.div
                    className="absolute inset-[-2px] rounded-2xl pointer-events-none -z-10"
                    style={{
                        background: 'transparent',
                        boxShadow: `0 0 30px rgba(252, 211, 77, 0.4), 0 0 60px rgba(252, 211, 77, 0.2)`,
                    }}
                    animate={{
                        boxShadow: [
                            `0 0 30px rgba(252, 211, 77, 0.4), 0 0 60px rgba(252, 211, 77, 0.2)`,
                            `0 0 40px rgba(252, 211, 77, 0.6), 0 0 80px rgba(252, 211, 77, 0.3)`,
                            `0 0 30px rgba(252, 211, 77, 0.4), 0 0 60px rgba(252, 211, 77, 0.2)`,
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.button>
        );
    }

    // GOLD VARIANT (default) - Standard progression CTA
    return (
        <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className="relative group w-full max-w-[90%] rounded-xl overflow-hidden cursor-pointer"
            style={{
                padding: '16px 24px',
                background: `linear-gradient(135deg, ${GOLD} 0%, #E5C558 50%, ${GOLD} 100%)`,
                boxShadow: `0 8px 32px rgba(252, 211, 77, 0.25)`,
            }}
        >
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                    transition: 'transform 0.7s ease',
                }}
            />

            {/* Top shine */}
            <div
                className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                }}
            />

            <span
                className="relative z-10 flex items-center justify-center gap-2 font-semibold"
                style={{
                    color: '#0a0a0a',
                    fontSize: '15px',
                }}
            >
                {icon || <Sparkles size={16} strokeWidth={2} style={{ color: '#0a0a0a' }} />}
                {label}
            </span>
        </motion.button>
    );
}

export default ActionButton;
