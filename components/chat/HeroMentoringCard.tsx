"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Check, ArrowRight, Sparkles } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS - THE GOLD STANDARD
// ════════════════════════════════════════════════════════════════════════════
const GOLD = '#FCD34D';

interface HeroMentoringCardProps {
    originalPrice: string;
    currentPrice: string;
    onCtaClick: () => void;
}

export function HeroMentoringCard({
    originalPrice,
    currentPrice,
    onCtaClick,
}: HeroMentoringCardProps) {
    const benefits = [
        "Private Zoom Audit",
        "Akses Notion System Lengkap",
        "Garansi Sampai Pecah Telor",
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-[92%]"
        >
            {/* THE HERO CARD - Premium Gold Style */}
            <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, rgba(30, 27, 20, 0.98) 0%, rgba(20, 18, 15, 0.98) 100%)',
                    border: `2px solid ${GOLD}40`,
                    boxShadow: `
                        0 0 40px rgba(252, 211, 77, 0.15),
                        0 20px 60px rgba(0, 0, 0, 0.5),
                        inset 0 1px 0 rgba(252, 211, 77, 0.2)
                    `,
                }}
            >
                {/* Animated Gold Glow Border */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)`,
                        backgroundSize: '200% 100%',
                    }}
                    animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />

                {/* Inner Content */}
                <div className="relative p-5">
                    {/* Top Badge: FAST TRACK */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center mb-5"
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: `linear-gradient(135deg, ${GOLD}25 0%, ${GOLD}15 100%)`,
                                border: `1px solid ${GOLD}60`,
                                boxShadow: `0 0 20px ${GOLD}20`,
                            }}
                        >
                            <Trophy size={16} style={{ color: GOLD }} />
                            <span
                                className="text-sm font-bold tracking-wider"
                                style={{ color: GOLD }}
                            >
                                FAST TRACK (DIBIMBING)
                            </span>
                        </div>
                    </motion.div>

                    {/* Price Section */}
                    <div className="text-center mb-5">
                        <p
                            className="text-lg line-through mb-1"
                            style={{ color: '#666' }}
                        >
                            {originalPrice}
                        </p>
                        <motion.p
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                            className="text-4xl font-bold"
                            style={{
                                background: `linear-gradient(135deg, ${GOLD} 0%, #E5C558 50%, ${GOLD} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                textShadow: `0 0 40px ${GOLD}50`,
                            }}
                        >
                            {currentPrice}
                        </motion.p>
                    </div>

                    {/* Benefit Highlights */}
                    <div className="space-y-3 mb-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${GOLD}30 0%, ${GOLD}15 100%)`,
                                        border: `1px solid ${GOLD}40`,
                                    }}
                                >
                                    <Check size={14} strokeWidth={3} style={{ color: GOLD }} />
                                </div>
                                <span
                                    className="text-[15px] font-medium"
                                    style={{ color: '#E5E5E5' }}
                                >
                                    {benefit}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Button - Gold Glow */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onCtaClick}
                        className="relative group w-full px-6 py-4 rounded-xl overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD} 0%, #E5C558 50%, ${GOLD} 100%)`,
                            boxShadow: `
                                0 0 30px ${GOLD}40,
                                0 8px 32px ${GOLD}30,
                                inset 0 1px 0 rgba(255,255,255,0.3)
                            `,
                        }}
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                            }}
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                repeatDelay: 1,
                            }}
                        />

                        {/* Top rim light */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                        <span
                            className="relative z-10 flex items-center justify-center gap-2 font-bold text-base"
                            style={{ color: '#0A0A0A' }}
                        >
                            <Sparkles size={18} />
                            AMANKAN SLOT MENTORING
                            <ArrowRight size={18} />
                        </span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default HeroMentoringCard;
