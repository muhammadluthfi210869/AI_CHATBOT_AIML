"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { ChatInterface } from "./ChatInterface";

/*
 * ╔══════════════════════════════════════════════════════════════════════════════════════╗
 * ║                       VISUAL UNITY LAYOUT SYSTEM V2                                   ║
 * ╠══════════════════════════════════════════════════════════════════════════════════════╣
 * ║  DESIGN PHILOSOPHY: "Luxury First Impression"                                         ║
 * ║                                                                                        ║
 * ║  UPDATES:                                                                              ║
 * ║  1. Chat scroll starts BELOW video vignette (no overlap issue)                        ║
 * ║  2. Premium entrance animations for cinematic first impression                        ║
 * ║  3. Staggered reveal for luxury feel                                                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════╝
 */

// Unity Layout Constants
const UNITY = {
    VIDEO_HEIGHT: '45dvh',           // 45vh video
    OVERLAP_ZONE: '40px',            // Reduced overlap - chat starts below vignette
    GRADIENT_HEIGHT: '35%',          // Video fade transition
    AMBIENT_GLOW_HEIGHT: '60px',     // Subtle ambient glow
} as const;

// Luxurious spring physics
const unityTransition = {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    mass: 1.5,
};

// Smooth fade for exits
const fadeOutTransition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
};

// Premium entrance animations - INSTANT appearance
const videoEntranceAnimation = {
    initial: {
        opacity: 1, // Start visible
        scale: 1,
        y: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    transition: {
        duration: 0,
        delay: 0,
    }
};

const chatEntranceAnimation = {
    initial: {
        opacity: 1, // Start visible
        y: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    transition: {
        duration: 0,
        delay: 0,
    }
};

export default function HeroSplit() {
    const [isCompact, setIsCompact] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isPageReady, setIsPageReady] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Page ready state - instant
    useEffect(() => {
        setIsPageReady(true); // No delay - instant
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = true;

            const playVideo = async () => {
                try {
                    await video.play();
                    setIsVideoLoaded(true);
                } catch {
                    setIsVideoLoaded(true);
                }
            };

            playVideo();

            const fallbackTimer = setTimeout(() => {
                setIsVideoLoaded(true);
            }, 2000);

            return () => clearTimeout(fallbackTimer);
        }
    }, []);

    const handleMuteToggle = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (videoRef.current) {
            videoRef.current.muted = newMuted;
        }
    };

    const handleChatInteraction = () => {
        setIsCompact(true);
    };

    return (
        <div className="unified-canvas relative h-[100dvh] w-full overflow-hidden font-display text-zinc-100 selection:bg-gold-500/30">

            {/* ═══════════════════════════════════════════════════════════════════════════
                UNIFIED BACKGROUND CANVAS
                Creates the illusion of one seamless dark space
                ═══════════════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 150% 100% at 50% 0%, rgba(8,8,8,0) 0%, rgba(3,3,3,1) 70%),
                        linear-gradient(180deg, #0a0a0a 0%, #030303 40%, #020202 100%)
                    `
                }}
            />

            {/* Unified Noise Texture - Covers entire canvas for consistency */}
            <div className="absolute inset-0 z-[1] pointer-events-none noise-overlay opacity-[0.02]" />

            {/* Accessibility: Skip to chat */}
            <a
                href="#chat-interface"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] px-6 py-3 bg-white text-black font-bold rounded-full shadow-lg"
            >
                Skip to chat
            </a>

            {/* ═══════════════════════════════════════════════════════════════════════════
                VIDEO LAYER - Cinematic Backdrop (45vh)
                Premium entrance: Scale down + fade in from top
                ═══════════════════════════════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
                {!isCompact && isPageReady && (
                    <motion.div
                        initial={videoEntranceAnimation.initial}
                        animate={videoEntranceAnimation.animate}
                        exit={{
                            opacity: 0,
                            y: -30,
                            scale: 0.98,
                            transition: fadeOutTransition
                        }}
                        transition={videoEntranceAnimation.transition}
                        className="absolute top-0 left-0 right-0 z-[2]"
                        style={{
                            height: UNITY.VIDEO_HEIGHT,
                        }}
                        aria-label="Video backdrop"
                    >
                        {/* Video loading - no icon, just wait for video */}

                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className={`
                                absolute inset-0 w-full h-full
                                transition-all duration-[1200ms] ease-out
                                ${isVideoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}
                            `}
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center 25%',
                                filter: 'contrast(1.02) saturate(0.95) brightness(0.95)',
                            }}
                            onCanPlay={() => setIsVideoLoaded(true)}
                            onLoadedData={() => setIsVideoLoaded(true)}
                            onPlaying={() => setIsVideoLoaded(true)}
                        >
                            <source src="/video.mp4" type="video/mp4" />
                        </video>

                        {/* ═════════════════════════════════════════════════════════════════
                            SEAMLESS BLEND GRADIENT SYSTEM
                            Multiple layers create INVISIBLE transition to chat area
                            ═════════════════════════════════════════════════════════════════ */}

                        {/* Primary Blend: Bottom fade - STRONGER to prevent overlap visibility */}
                        <div
                            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                            style={{
                                height: '45%',
                                background: `linear-gradient(
                                    to top,
                                    rgba(2,2,2,1) 0%,
                                    rgba(2,2,2,0.98) 15%,
                                    rgba(3,3,3,0.9) 30%,
                                    rgba(3,3,3,0.6) 50%,
                                    rgba(3,3,3,0.2) 75%,
                                    transparent 100%
                                )`
                            }}
                        />

                        {/* Secondary: Subtle side vignettes only */}
                        <div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                                background: `
                                    linear-gradient(90deg, rgba(2,2,2,0.25) 0%, transparent 10%, transparent 90%, rgba(2,2,2,0.25) 100%),
                                    radial-gradient(ellipse 50% 30% at 0% 0%, rgba(3,3,3,0.4) 0%, transparent 60%),
                                    radial-gradient(ellipse 50% 30% at 100% 0%, rgba(3,3,3,0.4) 0%, transparent 60%)
                                `
                            }}
                        />

                        {/* Ambient Glow - Subtle warm connection point */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-5 pointer-events-none"
                            style={{
                                width: '150%',
                                height: UNITY.AMBIENT_GLOW_HEIGHT,
                                background: `radial-gradient(ellipse 60% 100% at 50% 0%, rgba(252,211,77,0.03) 0%, transparent 60%)`
                            }}
                        />

                        {/* Film grain texture */}
                        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.02] mix-blend-overlay noise-overlay" />

                        {/* ═════════════════════════════════════════════════════════════════
                            UI CONTROLS - Floating over video with staggered entrance
                            ═════════════════════════════════════════════════════════════════ */}

                        {/* Mute Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="absolute top-3 left-3 z-30 safe-pt"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleMuteToggle}
                                className="p-2.5 rounded-full bg-black/40 backdrop-blur-2xl border border-white/8 hover:bg-black/60 hover:border-white/15 transition-all duration-300 group shadow-2xl shadow-black/50"
                                aria-label={isMuted ? "Unmute video" : "Mute video"}
                            >
                                {isMuted ? (
                                    <VolumeX size={15} className="text-zinc-500 group-hover:text-white transition-colors duration-300" />
                                ) : (
                                    <Volume2 size={15} className="text-gold-400" />
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Brand Watermark - Subtle presence */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="absolute bottom-8 right-4 z-30 flex items-center gap-2"
                        >
                            <Sparkles size={10} className="text-gold-500/60" />
                            <span className="text-[8px] font-medium tracking-[0.3em] uppercase text-zinc-600">
                                AI Money Lab
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════════════════════════════
                CHAT LAYER - Floating Interface with Premium Entrance
                Positioned BELOW video vignette to prevent overlap issues
                ═══════════════════════════════════════════════════════════════════════════ */}
            <motion.div
                layout
                initial={!isCompact ? chatEntranceAnimation.initial : false}
                animate={chatEntranceAnimation.animate}
                transition={isCompact ? unityTransition : chatEntranceAnimation.transition}
                className="absolute left-0 right-0 bottom-0 z-[10] flex flex-col"
                style={{
                    top: !isCompact ? `calc(${UNITY.VIDEO_HEIGHT} - ${UNITY.OVERLAP_ZONE})` : 0,
                    background: 'transparent',
                }}
                role="main"
                aria-label="Chat interface"
            >
                {/* Solid background blocker - prevents bubbles from showing above scroll area */}
                {!isCompact && (
                    <div
                        className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
                        style={{
                            height: '60px',
                            background: `linear-gradient(
                                to bottom,
                                rgba(2,2,2,1) 0%,
                                rgba(2,2,2,0.95) 50%,
                                rgba(2,2,2,0.8) 80%,
                                transparent 100%
                            )`
                        }}
                    />
                )}

                {/* Content backdrop - Gradual fade for readability */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: !isCompact
                            ? `linear-gradient(180deg, rgba(2,2,2,0.98) 0%, rgba(2,2,2,0.95) 5%, rgba(2,2,2,0.9) 15%, #020202 40%)`
                            : `linear-gradient(180deg, #030303 0%, #020202 100%)`
                    }}
                />

                {/* Visual Handle - Ethereal, no hard edges */}
                {!isCompact && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
                    >
                        <div
                            className="w-10 h-[3px] rounded-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)'
                            }}
                        />
                    </motion.div>
                )}

                {/* Chat Interface Container */}
                <div
                    id="chat-interface"
                    className="relative z-10 flex-1 flex flex-col h-full w-full overflow-hidden"
                    style={{
                        paddingTop: !isCompact ? '50px' : '0', // More padding to start below overlap
                    }}
                >
                    <ChatInterface onInteraction={handleChatInteraction} />
                </div>
            </motion.div>
        </div>
    );
}

