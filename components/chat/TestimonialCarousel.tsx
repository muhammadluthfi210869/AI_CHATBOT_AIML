"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

interface Testimonial {
    id: string;
    type: "testimonial" | "authority";
    name?: string;
    role?: string;
    image: string;
    text: string;
    highlight?: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: "1",
        type: "testimonial",
        name: "Ibu Santi Permata",
        role: "Owner Toko Online / Ibu Rumah Tangga",
        image: "/ibu_santi.png",
        highlight: "DIPANDU DARI NOL",
        text: "Mas, saya tuh gaptek banget, tapi liat video mas nekat daftar. Alhamdulillah beneran dipandu dari nol banget. Materinya urut dari basic. Sekarang saya udah nggak bingung lagi harus mulai dari mana. Solusi terbaik buat yang butuh struktur sebelum mikirin profit.",
    },
    {
        id: "2",
        type: "testimonial",
        name: "Dito Anugerah",
        role: "Mahasiswa Akhir",
        image: "/dito_anugerah.png",
        highlight: "BARU GABUNG & NYANGKUT JOB",
        text: "Baru juga gabung, iseng nyobain trik AI x Freelance yang diajarin. Eh beneran nyangkut satu job $5. Receh sih, tapi lumayan banget buat kerjaan yang modalnya cuma 'copas' AI hitungan menit. Ini bukti sistemnya valid. Asli ngebantu buat nambah uang jajan dan gue yakin sebentar lagi pecah telur di angka gede.",
    },
    {
        id: "3",
        type: "testimonial",
        name: "Rizky Wibowo",
        role: "Freelance Graphic Designer",
        image: "/rizki_wibowo.png",
        highlight: "PASSION & JALUR JELAS",
        text: "Gue udah capek otodidak dan burnout di jalur yang salah. Awalnya gambling. Tapi di Private Mentoring ini, gue dipaksa nemu bisnis yang gue banget. Jalurnya jelas, nggak acak-acakan kayak di YouTube. Sekarang gue nggak cuma dapet income, tapi juga excited tiap pagi. Ini yang gue cari, nggak cuma beli materi, tapi beli waktu.",
    },
    {
        id: "4",
        type: "authority",
        image: "/authority_proof.jpg",
        text: "Meskipun sekarang 100% online via Weekly Zoom, kualitas bimbingan yang lo dapet sama personalnya kayak sesi offline ini. Gue hadir 100% buat lo.",
    },
];

export function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    };

    const current = TESTIMONIALS[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[92%]"
        >
            {/* Main Container */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900/70 backdrop-blur-md border border-white/[0.08]">
                {/* Top rim light */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20" />

                {/* Gold ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-gold-500/5 pointer-events-none" />

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        {current.type === "testimonial" ? (
                            // Testimonial Card
                            <div className="p-5">
                                {/* Header: Profile + Name */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold-500/30">
                                            <img
                                                src={current.image}
                                                alt={current.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Online indicator */}
                                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-900" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-zinc-100 text-sm truncate">
                                            {current.name}
                                        </p>
                                        <p className="text-xs text-zinc-500 truncate">
                                            {current.role}
                                        </p>
                                    </div>
                                    <Quote size={20} className="text-gold-500/40 flex-shrink-0" />
                                </div>

                                {/* Highlight Tag */}
                                {current.highlight && (
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 mb-3">
                                        <Sparkles size={10} className="text-gold-400" />
                                        <span className="text-[10px] font-bold text-gold-300 tracking-wide uppercase">
                                            {current.highlight}
                                        </span>
                                    </div>
                                )}

                                {/* Testimonial Text */}
                                <p className="text-[13px] leading-relaxed text-zinc-300">
                                    "{current.text}"
                                </p>
                            </div>
                        ) : (
                            // Authority Proof Card
                            <div className="relative">
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={current.image}
                                        alt="Authority Proof"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                </div>

                                {/* Caption */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="flex items-start gap-2">
                                        <Sparkles size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-[12px] leading-relaxed text-zinc-200">
                                            {current.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                >
                    <ChevronLeft size={16} className="text-white" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                >
                    <ChevronRight size={16} className="text-white" />
                </button>
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center gap-2 mt-3">
                {TESTIMONIALS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`
                            h-1.5 rounded-full transition-all duration-300
                            ${index === currentIndex
                                ? 'bg-gold-500 w-6'
                                : 'bg-zinc-700 hover:bg-zinc-600 w-1.5'
                            }
                        `}
                    />
                ))}
            </div>

            {/* Counter */}
            <p className="text-center text-[10px] text-zinc-600 mt-2">
                {currentIndex + 1} / {TESTIMONIALS.length}
            </p>
        </motion.div>
    );
}

export default TestimonialCarousel;
