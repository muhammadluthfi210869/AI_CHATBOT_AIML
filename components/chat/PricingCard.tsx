"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

interface PricingCardProps {
    originalPrice: string;
    currentPrice: string;
    onCtaClick: () => void;
    onGhostClick: () => void;
    ctaLabel?: string;
    ghostLabel?: string;
}

export function PricingCard({
    originalPrice,
    currentPrice,
    onCtaClick,
    onGhostClick,
    ctaLabel = "AMANKAN SLOT SAYA",
    ghostLabel = "Masih ragu? Masuk Komunitas Gratis dulu biar gak salah arah.",
}: PricingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-[90%] rounded-2xl overflow-hidden"
        >
            {/* Main Card */}
            <div className="relative bg-zinc-900/80 backdrop-blur-lg border border-white/[0.08] rounded-2xl p-6">
                {/* Top rim light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Gold ambient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none rounded-2xl" />

                {/* Guarantee Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-600/20 to-gold-500/20 border border-gold-500/30">
                        <Shield size={14} className="text-gold-400" />
                        <span className="text-xs font-semibold text-gold-300 tracking-wide">
                            30-DAY MONEY BACK GUARANTEE
                        </span>
                    </div>
                </motion.div>

                {/* Pricing */}
                <div className="text-center mb-6">
                    <p className="text-zinc-500 line-through text-lg mb-1">
                        {originalPrice}
                    </p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                        {currentPrice}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">
                        Beta Launch Price • Limited Slots
                    </p>
                </div>

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCtaClick}
                    className="
                        relative group w-full
                        px-6 py-4 rounded-xl mb-4
                        bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600
                        text-zinc-900 font-bold text-base
                        shadow-[0_8px_32px_rgba(212,175,55,0.3)]
                        hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)]
                        transition-all duration-300
                        overflow-hidden
                    "
                >
                    {/* Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {ctaLabel}
                        <ArrowRight size={18} />
                    </span>
                </motion.button>

                {/* Ghost Link */}
                <button
                    onClick={onGhostClick}
                    className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors"
                >
                    {ghostLabel}
                </button>
            </div>
        </motion.div>
    );
}

export default PricingCard;
