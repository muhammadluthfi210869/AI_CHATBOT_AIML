"use client";

import React from "react";
import { motion } from "framer-motion";

/*
 * ════════════════════════════════════════════════════════════════════════════
 * PREMIUM OBSIDIAN GLASS CHAT BUBBLE - V3 (THE GOLD STANDARD)
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Design Philosophy: "Silent Luxury" - Barang mewah selalu memiliki whitespace
 * 
 * THE GOLD STANDARD SPECS:
 * 
 * 1. PALET WARNA:
 *    - Primary Gold: #FCD34D (Amber terang) - SATU kode untuk semua emas
 *    - Secondary Text: #E5E5E5 (Off-White) - Body copy
 *    - Muted Text: #A3A3A3 (Neutral Gray) - Deskripsi/subtext
 * 
 * 2. TIPOGRAFI:
 *    - Heading: 15px, Semi-Bold (600), #FCD34D
 *    - Body: 14px, Regular (400), #E5E5E5
 *    - Line-Height: 1.6 (ruang nafas antar baris)
 * 
 * 3. BUBBLE SHAPE:
 *    - Padding: 16px (atas/bawah) x 20px (kiri/kanan)
 *    - Margin antar bubble: 12px
 *    - Border Radius: 16px standar, 4px sudut kiri bawah
 * 
 * 4. OBSIDIAN GLASS EFFECT:
 *    - Background: rgba(20, 20, 20, 0.8)
 *    - Backdrop Filter: blur(12px)
 *    - Border: 1px solid rgba(255, 255, 255, 0.05)
 *    - Border Top (Rim Light): 1px solid rgba(255, 255, 255, 0.15)
 *    - Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5)
 */

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS - THE GOLD STANDARD (SINGLE SOURCE OF TRUTH)
// ════════════════════════════════════════════════════════════════════════════
export const DESIGN_TOKENS = {
    // PALET WARNA
    primaryGold: '#FCD34D',      // Primary Gold - Teks Highlight & Icon
    secondaryText: '#E5E5E5',    // Off-White - Body Copy
    mutedText: '#A3A3A3',        // Neutral Gray - Deskripsi/Subtext

    // TIPOGRAFI
    headingSize: '15px',         // ~1rem
    headingWeight: 600,          // Semi-Bold
    bodySize: '14px',            // ~0.875rem
    bodyWeight: 400,             // Regular
    lineHeight: '1.6',           // Ruang nafas

    // BUBBLE SHAPE
    paddingY: '16px',            // Atas/Bawah
    paddingX: '20px',            // Kiri/Kanan
    marginBubble: '12px',        // Antar bubble
    borderRadiusMain: '16px',    // Standar
    borderRadiusTail: '4px',     // Sudut kiri bawah (efek chat tail)

    // OBSIDIAN GLASS
    glassBg: 'rgba(20, 20, 20, 0.8)',
    glassBlur: 'blur(12px)',
    glassBorder: 'rgba(255, 255, 255, 0.05)',
    glassRimLight: 'rgba(255, 255, 255, 0.15)',
    glassShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
} as const;

interface ChatBubbleProps {
    children: React.ReactNode;
    className?: string;
    isGold?: boolean;
}

export function ChatBubble({ children, className = "", isGold = false }: ChatBubbleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className={`relative max-w-[85%] overflow-hidden ${className}`}
            style={{
                // ═══════════════════════════════════════════════════════════════
                // BUBBLE SHAPE - Border Radius 16px standar, 4px kiri bawah
                // ═══════════════════════════════════════════════════════════════
                borderRadius: `${DESIGN_TOKENS.borderRadiusMain} ${DESIGN_TOKENS.borderRadiusMain} ${DESIGN_TOKENS.borderRadiusMain} ${DESIGN_TOKENS.borderRadiusTail}`,

                // ═══════════════════════════════════════════════════════════════
                // OBSIDIAN GLASS EFFECT - The Glass Recipe
                // ═══════════════════════════════════════════════════════════════
                background: DESIGN_TOKENS.glassBg,
                backdropFilter: DESIGN_TOKENS.glassBlur,
                WebkitBackdropFilter: DESIGN_TOKENS.glassBlur,

                // ═══════════════════════════════════════════════════════════════
                // PADDING - 16px (atas/bawah) x 20px (kiri/kanan)
                // ═══════════════════════════════════════════════════════════════
                padding: `${DESIGN_TOKENS.paddingY} ${DESIGN_TOKENS.paddingX}`,

                // ═══════════════════════════════════════════════════════════════
                // SHADOW - Efek mengambang 3D
                // ═══════════════════════════════════════════════════════════════
                boxShadow: DESIGN_TOKENS.glassShadow,

                // BORDER - subtle frame
                border: isGold
                    ? `1px solid ${DESIGN_TOKENS.primaryGold}40`  // 25% opacity gold
                    : `1px solid ${DESIGN_TOKENS.glassBorder}`,

                // ═══════════════════════════════════════════════════════════════
                // RIM LIGHT (KUNCI MEWAH) - simulasi cahaya memantul di tepi kaca
                // ═══════════════════════════════════════════════════════════════
                borderTop: `1px solid ${DESIGN_TOKENS.glassRimLight}`,
            }}
        >
            {/* Rim Light Gradient - Enhanced top edge shine for extra depth */}
            <div
                className="absolute inset-x-0 top-0 h-[1px] pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, transparent 0%, ${DESIGN_TOKENS.glassRimLight} 25%, rgba(255,255,255,0.25) 50%, ${DESIGN_TOKENS.glassRimLight} 75%, transparent 100%)`,
                }}
            />

            {/* Gold glow overlay for emphasized bubbles */}
            {isGold && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, ${DESIGN_TOKENS.primaryGold}1A 0%, transparent 50%)`, // 10% opacity
                        borderRadius: 'inherit',
                    }}
                />
            )}

            {/* Content with premium typography */}
            <div
                className="relative z-10 chat-bubble-content"
                style={{
                    // ═══════════════════════════════════════════════════════════
                    // TYPOGRAPHY - Body Text
                    // ═══════════════════════════════════════════════════════════
                    fontSize: DESIGN_TOKENS.bodySize,
                    lineHeight: DESIGN_TOKENS.lineHeight,
                    color: DESIGN_TOKENS.secondaryText,
                    fontWeight: DESIGN_TOKENS.bodyWeight,
                    letterSpacing: '0.015em',
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}

export default ChatBubble;
