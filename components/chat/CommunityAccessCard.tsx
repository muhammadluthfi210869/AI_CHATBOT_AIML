"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

interface CommunityAccessCardProps {
    onCtaClick: () => void;
}

export function CommunityAccessCard({ onCtaClick }: CommunityAccessCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-[90%]"
        >
            {/* Subdued Card for Slow Path */}
            <div
                className="relative rounded-xl overflow-hidden"
                style={{
                    background: 'rgba(25, 25, 25, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Users size={18} style={{ color: '#888' }} />
                        </div>
                        <div>
                            <p
                                className="text-sm font-semibold"
                                style={{ color: '#A3A3A3' }}
                            >
                                JALUR LAMBAT (GRATIS)
                            </p>
                            <p
                                className="text-xs"
                                style={{ color: '#666' }}
                            >
                                Ulik sendiri di komunitas
                            </p>
                        </div>
                    </div>

                    {/* Info Text */}
                    <p
                        className="text-sm mb-4"
                        style={{ color: '#666', lineHeight: 1.5 }}
                    >
                        Akses materi gratis di channel komunitas. Lo harus riset dan trial-error sendiri.
                    </p>

                    {/* CTA Button - Subdued */}
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onCtaClick}
                        className="w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#888',
                            fontSize: '14px',
                        }}
                    >
                        <span>Gabung Komunitas Gratis</span>
                        <ArrowRight size={16} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default CommunityAccessCard;
