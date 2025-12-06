"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ChatInterface from "./ChatInterface";
import { Volume2, VolumeX, Play } from "lucide-react";

// Spring physics config - optimized for low-end devices
const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 0.5,
};

export default function HeroSplit() {
    const [isCompact, setIsCompact] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [showPlayIcon, setShowPlayIcon] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Hide play icon after video starts
    useEffect(() => {
        const timer = setTimeout(() => setShowPlayIcon(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Ensure video plays on mount (iOS workaround)
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked
            });
        }
    }, []);

    const handleMuteToggle = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        if (videoRef.current) {
            videoRef.current.muted = newMuted;
        }
    };

    // Conditional animation based on reduced motion preference
    const motionProps = prefersReducedMotion
        ? {}
        : {
            layoutId: "hero-video",
            layout: true,
            transition: springTransition,
        };

    return (
        <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-[#0A0A0A] overflow-hidden font-sans text-zinc-100">
            {/* Skip to content for accessibility */}
            <a
                href="#chat-interface"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg"
            >
                Skip to chat
            </a>

            {/* VIDEO PANE */}
            <motion.div
                {...motionProps}
                className={`
                    flex-shrink-0 relative overflow-hidden
                    ${isCompact
                        ? "fixed w-14 h-14 rounded-full z-50 md:static md:w-[30%] md:h-full md:rounded-none"
                        : "relative w-full h-[40%] md:w-1/2 md:h-full"
                    }
                `}
                style={{
                    ...(isCompact ? {
                        top: 16,
                        right: 16,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.5), 0 0 0 2px #BF953F",
                    } : {}),
                }}
                aria-hidden="true"
            >
                {/* Low-res placeholder poster until video loads */}
                {!isVideoLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-0" />
                )}

                {/* Background Video - Lazy loaded */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore - webkit-playsinline for older iOS
                    webkit-playsinline="true"
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${isVideoLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ objectPosition: "center 30%" }}
                    onCanPlay={() => setIsVideoLoaded(true)}
                    poster="/video-poster.jpg"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>

                {/* LIGHTENED Gradient Scrim - more video visible */}
                <div
                    className={`absolute inset-0 z-10 pointer-events-none ${isCompact ? "opacity-40" : ""}`}
                    style={{
                        background: isCompact
                            ? "rgba(0,0,0,0.3)"
                            : `linear-gradient(
                  to bottom,
                  rgba(10, 10, 10, 0.6) 0%,
                  rgba(10, 10, 10, 0.3) 25%,
                  rgba(10, 10, 10, 0.1) 50%,
                  rgba(10, 10, 10, 0.2) 75%,
                  rgba(10, 10, 10, 0.5) 100%
                )`,
                    }}
                />

                {/* SUBTLE Vignette Effect - reduced opacity */}
                {!isCompact && (
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background: `radial-gradient(
                ellipse 85% 85% at 50% 50%,
                transparent 50%,
                rgba(10, 10, 10, 0.3) 75%,
                rgba(10, 10, 10, 0.5) 100%
              )`,
                        }}
                    />
                )}

                {/* Subtle Scanlines */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.2) 50%)`,
                        backgroundSize: "100% 2px",
                    }}
                />

                {/* Play Icon Overlay - fades after 1.5s */}
                {showPlayIcon && !isCompact && (
                    <motion.div
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                            <Play size={28} className="text-white ml-1" fill="white" />
                        </div>
                    </motion.div>
                )}

                {/* Mute Button - ALWAYS VISIBLE including compact mode */}
                <motion.button
                    animate={
                        prefersReducedMotion
                            ? {}
                            : { opacity: isCompact ? 0 : 1, scale: isCompact ? 0.8 : 1 }
                    }
                    transition={{ duration: 0.3 }}
                    onClick={handleMuteToggle}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className={`
                        absolute top-4 left-4 z-40 p-2.5 rounded-full 
                        bg-black/70 backdrop-blur-sm border border-white/20
                        text-white hover:border-[#BF953F]/60 hover:text-[#FCF6BA] 
                        transition-all duration-300
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF953F] focus-visible:ring-offset-2 focus-visible:ring-offset-black
                        ${isCompact ? "pointer-events-none md:pointer-events-auto md:opacity-100" : ""}
                    `}
                    style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>
            </motion.div>

            {/* CHAT PANE */}
            <motion.div
                layout={!prefersReducedMotion}
                transition={prefersReducedMotion ? {} : springTransition}
                className={`
          flex-1 flex flex-col bg-[#0A0A0A] relative z-0
          ${isCompact ? "h-full md:h-full" : "h-[60%] md:h-full"}
        `}
                id="chat-interface"
            >
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center px-5 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-[#BF953F] animate-pulse" />
                        <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                            System Active
                        </span>
                    </div>
                </div>

                {/* Chat Interface */}
                <div className="flex-1 overflow-hidden relative">
                    <ChatInterface
                        onInteract={() => setIsCompact(true)}
                        onRestart={() => {
                            setIsCompact(false);
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
