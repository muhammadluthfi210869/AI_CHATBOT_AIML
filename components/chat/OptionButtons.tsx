"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/*
 * ════════════════════════════════════════════════════════════════════════════
 * PREMIUM TACTILE OPTION BUTTONS - V3 (THE GOLD STANDARD)
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * DESIGN TOKENS - THE GOLD STANDARD:
 * - Primary Gold: #FCD34D (Amber terang) - CONSISTENT across ALL elements
 * - Secondary Text: #E5E5E5 (Off-White) - Body copy
 * - Muted Text: #A3A3A3 (Neutral Gray) - Deskripsi/Subtext
 * - Icon Stroke Width: 2px (consistent with all icons)
 * 
 * FIXES APPLIED:
 * 1. AFFORDANCE → Background: #1E1E1E (lebih terang dari bubble)
 * 2. ACTIVE STATE → Border menyala emas (#FCD34D) saat ditekan
 * 3. ARROW ICON → strokeWidth: 2px consistent dengan icon lain
 * 4. VISUAL DISTINCTION → Padding 18px, berbeda dari bubble biasa
 */

// Design Tokens - Single Source of Truth
const GOLD = '#FCD34D';
const MUTED_TEXT = '#A3A3A3';

interface Option {
    id: string;
    label: string;
    sublabel?: string;
    icon?: React.ReactNode;
}

interface OptionButtonsProps {
    options: Option[];
    onSelect: (id: string) => void;
    variant?: "default" | "problem";
}

export function OptionButtons({ options, onSelect, variant = "default" }: OptionButtonsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    const handlePress = (id: string) => {
        setActiveId(id);
        // Reset after animation
        setTimeout(() => setActiveId(null), 300);
        onSelect(id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col w-full max-w-[90%]"
            style={{
                gap: '14px',
            }}
        >
            {options.map((option, index) => {
                const isActive = activeId === option.id;

                return (
                    <motion.button
                        key={option.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{
                            scale: 1.02,
                            x: 6,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{
                            scale: 0.97,
                            transition: { duration: 0.1 }
                        }}
                        onClick={() => handlePress(option.id)}
                        className="relative group w-full text-left rounded-xl overflow-hidden cursor-pointer"
                        style={{
                            // ═══════════════════════════════════════════════════════════
                            // AFFORDANCE: Background LEBIH TERANG dari bubble
                            // ═══════════════════════════════════════════════════════════
                            background: isActive ? '#2A2A2A' : '#1E1E1E',

                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',

                            // PADDING BERBEDA dari bubble - lebih spacious untuk button feel
                            padding: '18px 22px',

                            // ═══════════════════════════════════════════════════════════
                            // ACTIVE STATE: Border menyala emas (#FCD34D) saat ditekan
                            // ═══════════════════════════════════════════════════════════
                            border: isActive
                                ? `1.5px solid ${GOLD}`
                                : '1px solid rgba(255, 255, 255, 0.12)',

                            // RIM LIGHT di atas (consistent dengan glass recipe)
                            borderTop: isActive
                                ? `1.5px solid ${GOLD}`
                                : '1px solid rgba(255, 255, 255, 0.18)',

                            // BOX SHADOW - lifting effect + active glow
                            boxShadow: isActive
                                ? `
                                    0 0 25px -5px rgba(252, 211, 77, 0.4),
                                    0 8px 20px -4px rgba(0, 0, 0, 0.5),
                                    inset 0 1px 0 rgba(252, 211, 77, 0.2)
                                `
                                : `
                                    0 6px 16px -4px rgba(0, 0, 0, 0.45),
                                    0 3px 8px -2px rgba(0, 0, 0, 0.35),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                                `,

                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    >
                        {/* Hover glow effect */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                            style={{
                                background: `linear-gradient(135deg, rgba(252, 211, 77, 0.1) 0%, transparent 40%, rgba(252, 211, 77, 0.06) 100%)`,
                                transition: 'opacity 0.3s ease',
                            }}
                        />

                        {/* Top rim light gradient */}
                        <div
                            className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 75%, transparent 100%)',
                            }}
                        />

                        <div className="relative z-10 flex items-center gap-4">
                            {/* Gold Icon Container */}
                            {option.icon && (
                                <div
                                    className="flex-shrink-0 flex items-center justify-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'rgba(252, 211, 77, 0.15)',
                                        border: '1px solid rgba(252, 211, 77, 0.25)',
                                        color: GOLD,
                                        boxShadow: '0 2px 8px -2px rgba(252, 211, 77, 0.2)',
                                    }}
                                >
                                    {option.icon}
                                </div>
                            )}

                            <div className="flex-1 min-w-0 pr-10">
                                <p
                                    className="font-semibold"
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.95)',
                                        fontSize: '15px',
                                        lineHeight: '1.4',
                                        letterSpacing: '0.01em',
                                    }}
                                >
                                    {option.label}
                                </p>
                                {option.sublabel && (
                                    <p
                                        style={{
                                            fontSize: '13px',
                                            color: MUTED_TEXT,
                                            marginTop: '4px',
                                            lineHeight: '1.4',
                                        }}
                                    >
                                        {option.sublabel}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ═══════════════════════════════════════════════════════════
                            ARROW ICON - TEGAS, FILLED, CONSISTENT strokeWidth 2px
                        ═══════════════════════════════════════════════════════════ */}
                        <div
                            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center"
                            style={{
                                right: '18px',
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                background: 'rgba(252, 211, 77, 0.12)',
                                border: '1px solid rgba(252, 211, 77, 0.2)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <motion.div
                                animate={{
                                    x: [0, 3, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <ArrowRight
                                    size={16}
                                    strokeWidth={2}
                                    style={{ color: GOLD }}
                                />
                            </motion.div>
                        </div>
                    </motion.button>
                );
            })}
        </motion.div>
    );
}

export default OptionButtons;
