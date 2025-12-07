"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
    id: string;
    image?: string;
    content?: React.ReactNode;
    caption?: string;
}

interface CarouselProps {
    slides: CarouselSlide[];
}

export function Carousel({ slides }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-[90%] overflow-hidden rounded-2xl"
        >
            {/* Carousel Container */}
            <div className="relative w-full aspect-[4/3] bg-zinc-900/60 backdrop-blur-md border border-white/[0.08] rounded-2xl overflow-hidden">
                {/* Top rim light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20" />

                {/* Slides */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center p-4"
                    >
                        {slides[currentIndex].image ? (
                            <img
                                src={slides[currentIndex].image}
                                alt={slides[currentIndex].caption || "Slide"}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500">
                                {slides[currentIndex].content || "Image placeholder"}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors"
                >
                    <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-black/70 transition-colors"
                >
                    <ChevronRight size={20} className="text-white" />
                </button>

                {/* Caption */}
                {slides[currentIndex].caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-sm text-zinc-300 text-center">
                            {slides[currentIndex].caption}
                        </p>
                    </div>
                )}
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-2 mt-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            w-2 h-2 rounded-full transition-all duration-300
                            ${index === currentIndex
                                ? 'bg-gold-500 w-6'
                                : 'bg-zinc-700 hover:bg-zinc-600'
                            }
                        `}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default Carousel;
