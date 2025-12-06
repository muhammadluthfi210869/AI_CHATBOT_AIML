"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, Zap, Target, ArrowRight, ExternalLink, RotateCcw, MessageCircle, HelpCircle } from "lucide-react";

// ==================== STATE MACHINE ====================
type ChatStep =
    | "PHASE_1_HOOK"
    | "PHASE_1_OPTIONS"
    | "PHASE_2A_QUICKWIN"
    | "PHASE_2A_CARD"
    | "PHASE_2B_MINDSET_TRAP"
    | "PHASE_2B_MINDSET_OPTIONS"
    | "PHASE_2B_REALIZATION"
    | "PHASE_2B_INTERRUPTION"
    | "PHASE_2B_SOLUTION"
    | "PHASE_2B_OFFER"
    | "PHASE_3_DOWNSELL"
    | "PHASE_3_CARD"
    | "CHECKOUT";

// Progress mapping
const STEP_PROGRESS: Record<ChatStep, number> = {
    PHASE_1_HOOK: 1,
    PHASE_1_OPTIONS: 1,
    PHASE_2A_QUICKWIN: 2,
    PHASE_2A_CARD: 2,
    PHASE_2B_MINDSET_TRAP: 2,
    PHASE_2B_MINDSET_OPTIONS: 2,
    PHASE_2B_REALIZATION: 3,
    PHASE_2B_INTERRUPTION: 3,
    PHASE_2B_SOLUTION: 4,
    PHASE_2B_OFFER: 4,
    PHASE_3_DOWNSELL: 5,
    PHASE_3_CARD: 5,
    CHECKOUT: 5,
};
const TOTAL_STEPS = 5;

interface ChatInterfaceProps {
    onInteract: () => void;
    onRestart?: () => void;
}

interface Message {
    id: string;
    sender: "bot" | "user";
    text: React.ReactNode;
}

// Links
const TELEGRAM_COMMUNITY = "https://t.me/+3xm_72adFXc5NWRl";
const CHECKOUT_LINK = "https://app.midtrans.com/payment-links/1765019170772";

export default function ChatInterface({ onInteract, onRestart }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [step, setStep] = useState<ChatStep>("PHASE_1_HOOK");
    const [isTyping, setIsTyping] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        if (bottomRef.current) {
            // Use requestAnimationFrame for smoother scrolling
            requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "end" });
            });
        }
    }, [prefersReducedMotion]);

    // Aggressive scroll on ANY state change
    useEffect(() => {
        // Immediate scroll
        scrollToBottom();
        // Delayed scroll to catch late renders
        const t1 = setTimeout(scrollToBottom, 100);
        const t2 = setTimeout(scrollToBottom, 300);
        const t3 = setTimeout(scrollToBottom, 500);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [messages, isTyping, showOptions, showCard, step, scrollToBottom]);

    useEffect(() => {
        if (step === "PHASE_1_HOOK") {
            runPhase1();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ==================== RESTART ====================
    const handleRestart = () => {
        setMessages([]);
        setStep("PHASE_1_HOOK");
        setShowOptions(false);
        setShowCard(false);
        setIsTyping(false);
        onRestart?.();
        setTimeout(() => runPhase1(), 300);
    };

    // ==================== MESSAGE UTILITY ====================
    const addBotMessage = (
        text: React.ReactNode,
        typingMs: number,
        readingMs: number = 0
    ): Promise<void> => {
        return new Promise((resolve) => {
            setIsTyping(true);
            scrollToBottom(); // Scroll when typing starts
            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    { id: `msg-${Date.now()}-${Math.random()}`, sender: "bot", text },
                ]);
                // Scroll after message appears
                requestAnimationFrame(scrollToBottom);
                setTimeout(() => {
                    scrollToBottom();
                    resolve();
                }, readingMs);
            }, typingMs);
        });
    };

    const addUserMessage = (text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: `msg-${Date.now()}-${Math.random()}`, sender: "user", text },
        ]);
    };

    // ==================== 🟢 PHASE 1: THE AUTHORITY FILTER ====================
    const runPhase1 = async () => {
        // Bubble 1 (Intro) - Dingin, misterius, berwibawa
        await addBotMessage(
            "Halo. Gue Luthfi. Mahasiswa Teknik, Atlet Silat, dan pemilik 3 Sumber Income Digital.",
            1200,
            1000 // Auto continue after 1s
        );

        // Bubble 2 (Filter) - Dark, direct
        await addBotMessage(
            "Waktu gue dan lo sama-sama mahal. Jadi kita skip basa-basi. Posisi lo sekarang dimana?",
            1500,
            0 // Buttons appear immediately
        );

        setStep("PHASE_1_OPTIONS");
        setShowOptions(true);
    };

    // ==================== 🟠 PHASE 2A: THE QUICK WIN ====================
    const runPhase2A = async () => {
        // Bubble 1 (Validation)
        await addBotMessage(
            "Oke, realistis. Lo butuh cashflow buat nafas dulu.",
            1000,
            500
        );

        // Bubble 2 (Solution)
        await addBotMessage(
            "Gue ada sistem Notion buat manage project 'receh' jadi duit. Pake ini dulu buat pondasi.",
            1500,
            0
        );

        setStep("PHASE_2A_CARD");
        // Card appears after short delay
        setTimeout(() => setShowCard(true), 500);
    };

    // ==================== 🔵 PHASE 2B Part 1: THE MINDSET TRAP ====================
    const runPhase2B_Part1 = async () => {
        // Bubble 1 (Validation)
        await addBotMessage(
            "Pilihan cerdas. Tapi gue mau tes mindset lo dulu.",
            1000,
            800
        );

        // Bubble 2 (The Question)
        await addBotMessage(
            <span>
                Menurut lo, kenapa 90% orang yang belajar AI hari ini tetep{" "}
                <span className="font-bold text-red-400">GAGAL</span> dapet duit? Apa penyebab utamanya?
            </span>,
            2000,
            0
        );

        setStep("PHASE_2B_MINDSET_OPTIONS");
        setShowOptions(true);
    };

    // ==================== 🔵 PHASE 2B Part 2: THE REALIZATION ====================
    const runPhase2B_Part2 = async () => {
        // Bubble 3 (The Shock) - Fast!
        await addBotMessage(
            <span className="text-lg font-bold text-red-400">SALAH BESAR.</span>,
            600,
            500
        );

        // Bubble 4 (The Reveal)
        await addBotMessage(
            <span>
                Masalahnya bukan teknis. Masalahnya itu{" "}
                <span className="font-bold text-[#FCF6BA]">MONETIZATION GAP.</span>
            </span>,
            1200,
            500
        );

        // Bubble 5 (The Pain)
        await addBotMessage(
            <span>
                Mereka punya &apos;Skill Mahal&apos;, tapi{" "}
                <span className="font-bold text-white">GAK BISA JUALAN</span>. Akhirnya? Pinter doang, tapi saldo kosong.
            </span>,
            1800,
            0 // Stop here, force user interaction
        );

        setStep("PHASE_2B_INTERRUPTION");
        setShowOptions(true);
    };

    // ==================== 🔵 PHASE 2B Part 3: THE SOLUTION & OFFER ====================
    const runPhase2B_Part3 = async () => {
        // Bubble 1 (Intro)
        await addBotMessage(
            "Di Incubator, kita fokus bedah 3 hal:",
            1200,
            1000
        );

        // Bubble 2 (Poin 1)
        await addBotMessage(
            "🥇 1. Bedah Potensi: Kita pilih jalur bisnis yang pas buat background dan passion lu.",
            1200,
            1500
        );

        // Bubble 3 (Poin 2 & 3)
        await addBotMessage(
            <span>
                🥈 2. Praktek: Langsung cari income, bukan teori.
                <br /><br />
                🥉 3. System Audit: Tiap minggu progress lo gue evaluasi. Lo &apos;dipaksa&apos; berhasil.
            </span>,
            1800,
            1000
        );

        // Bubble 8 (Price Anchor)
        await addBotMessage(
            "Normalnya gue charge mahal buat monitoring ini. Tapi karena ini Beta Launch...",
            1500,
            1500
        );

        // Delay before showing price for dramatic effect (3 seconds total)
        await new Promise(r => setTimeout(r, 3000));

        // Set step to show inline price card with buttons
        setStep("PHASE_2B_OFFER");
        scrollToBottom();
    };

    // ==================== 🟣 PHASE 3: THE HONEST DOWNSELL ====================
    const runPhase3 = async () => {
        // Bubble 1 (Empathy)
        await addBotMessage(
            "Gue paham. Lo ngerasa ini worth it, tapi mungkin budget lagi mepet atau takut boncos. It's normal.",
            1500,
            800
        );

        // Bubble 2 (Reverse Psychology)
        await addBotMessage(
            "Saran gue: Jangan dipaksa. Kalau lo join dengan perasaan cemas soal duit makan besok, lo gak akan bisa belajar tenang.",
            2000,
            800
        );

        // Bubble 3 (The Gift)
        await addBotMessage(
            <span>
                Ambil jalan tengah. Masuk ke{" "}
                <span className="font-bold text-[#FCF6BA]">AIMoneyLab HQ</span>{" "}
                (Free Community) gue dulu. Di sana gue sering bagi studi kasus tipis-tipis.
            </span>,
            1800,
            500
        );

        // Bubble 4 (The Loop)
        await addBotMessage(
            "Kumpulin modal dari ilmu gratisan di sana. Kalau udah siap main liga utama, baru balik lagi ke sini buat Incubator.",
            2000,
            0
        );

        setStep("PHASE_3_CARD");
        setShowCard(true);
    };

    // ==================== CHECKOUT SUCCESS ====================
    const runCheckout = async () => {
        await addBotMessage(
            <div className="space-y-3">
                <p>
                    <span className="font-bold text-[#FCF6BA]">Respect.</span> Lo baru aja ambil keputusan yang 90% orang takut ambil.
                </p>
                <p>Amankan slot Beta lo sekarang. Sampai ketemu di dalam.</p>
            </div>,
            1500,
            0
        );
        setStep("CHECKOUT");
        setShowCard(true);
    };

    // ==================== CLICK HANDLERS ====================
    const handlePhase1Option = async (option: "A" | "B") => {
        onInteract();
        setShowOptions(false);
        if (option === "A") {
            addUserMessage("[Pemula] Cari Uang Jajan");
            await runPhase2A();
        } else {
            addUserMessage("[Serius] Bangun Income Utama");
            await runPhase2B_Part1();
        }
    };

    const handleMindsetOption = async (option: "A" | "B") => {
        setShowOptions(false);
        addUserMessage(option === "A" ? "Kurang Jago Coding/Teknis" : "Gak Punya Modal");
        await runPhase2B_Part2();
    };

    const handleInterruption = async () => {
        setShowOptions(false);
        addUserMessage("Terus Solusinya Gimana?");
        await runPhase2B_Part3();
    };

    const handleOfferOption = async (option: "buy" | "hesitant") => {
        setShowCard(false);
        if (option === "buy") {
            addUserMessage("Gas! Ambil Slot");
            await runCheckout();
        } else {
            addUserMessage("Sebenarnya Minat, Tapi...");
            await runPhase3();
        }
    };

    // ==================== RENDER ====================
    const messageVariants = prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0 },
        };

    return (
        <div
            ref={scrollContainerRef}
            className="flex flex-col h-full relative z-10 overflow-y-auto scroll-smooth"
            role="log"
            aria-label="Chat conversation"
            aria-live="polite"
        >
            {/* Messages */}
            <div className="flex-1 px-4 pb-4 pt-4 space-y-3">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            {...messageVariants}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`
                  max-w-[88%] md:max-w-[75%] px-4 py-3 rounded-2xl text-[14px] md:text-[15px] leading-relaxed
                  ${msg.sender === "user"
                                        ? "bg-zinc-800/90 border border-zinc-700/50 text-zinc-200"
                                        : "bg-[#141414] border border-zinc-800/80 text-zinc-100 shadow-lg shadow-black/30"
                                    }
                `}
                            >
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            key="typing"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex justify-start"
                        >
                            <div className="bg-[#141414] border border-zinc-800/80 px-4 py-3 rounded-2xl flex items-center gap-1.5">
                                {[0, 0.12, 0.24].map((delay, i) => (
                                    <motion.span
                                        key={i}
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 0.6, repeat: Infinity, delay }}
                                        className="w-2 h-2 rounded-full bg-[#BF953F]"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* PHASE 2B OFFER: INLINE PRICE CARD WITH BUTTONS - Part of chat flow */}
                <AnimatePresence>
                    {step === "PHASE_2B_OFFER" && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            className="flex justify-start mt-3"
                        >
                            <div className="max-w-[92%] md:max-w-[80%]">
                                <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
                                    <div className="p-5 bg-[#0f0f0f] rounded-[10px] relative">
                                        {/* Badge */}
                                        <div className="absolute -top-2.5 right-3 text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-green-500 text-white">
                                            30-Day Money Back
                                        </div>

                                        {/* Price */}
                                        <div className="text-center mb-5 mt-2">
                                            <p className="text-zinc-500 line-through text-sm mb-1">Rp 2.000.000</p>
                                            <p className="text-3xl font-bold text-[#FCF6BA]">Rp 750.000</p>
                                            <p className="text-zinc-500 text-xs mt-1">50 Slot Only</p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-2">
                                            <a
                                                href={CHECKOUT_LINK}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3.5 flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                                            >
                                                Gas! Ambil Slot <ArrowRight size={16} className="ml-2" />
                                            </a>
                                            <button
                                                onClick={() => handleOfferOption("hesitant")}
                                                className="w-full py-2.5 flex items-center justify-center text-zinc-400 text-sm hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg transition-all bg-zinc-900/30 hover:bg-zinc-800/50"
                                            >
                                                Sebenarnya Minat, Tapi...
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={bottomRef} className="h-4" />
            </div>

            {/* Options & Cards Area */}
            <div
                className="sticky bottom-0 px-4 pt-3 pb-6 md:pb-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent"
                style={{ paddingBottom: "max(env(safe-area-inset-bottom, 24px), 24px)" }}
            >
                <AnimatePresence mode="wait">
                    {/* PHASE 1 OPTIONS */}
                    {step === "PHASE_1_OPTIONS" && showOptions && (
                        <OptionsContainer>
                            <OptionButton onClick={() => handlePhase1Option("A")} icon={<Zap size={16} />}>
                                [Pemula] Cari Uang Jajan
                            </OptionButton>
                            <OptionButton onClick={() => handlePhase1Option("B")} icon={<Target size={16} />} highlight>
                                [Serius] Bangun Income Utama
                            </OptionButton>
                        </OptionsContainer>
                    )}

                    {/* PHASE 2A CARD: FREE NOTION SYSTEM */}
                    {step === "PHASE_2A_CARD" && showCard && (
                        <OptionsContainer>
                            <SystemCard
                                title="FREE ACCESS: Notion Life System"
                                buttonText="Ambil di Telegram"
                                href={TELEGRAM_COMMUNITY}
                                icon={<Send size={16} />}
                            />
                        </OptionsContainer>
                    )}

                    {/* PHASE 2B MINDSET OPTIONS */}
                    {step === "PHASE_2B_MINDSET_OPTIONS" && showOptions && (
                        <OptionsContainer>
                            <OptionButton onClick={() => handleMindsetOption("A")}>
                                Kurang Jago Coding/Teknis
                            </OptionButton>
                            <OptionButton onClick={() => handleMindsetOption("B")}>
                                Gak Punya Modal
                            </OptionButton>
                        </OptionsContainer>
                    )}

                    {/* PHASE 2B INTERRUPTION BUTTON */}
                    {step === "PHASE_2B_INTERRUPTION" && showOptions && (
                        <OptionsContainer>
                            <OptionButton onClick={handleInterruption} icon={<HelpCircle size={16} />} highlight>
                                Terus Solusinya Gimana?
                            </OptionButton>
                        </OptionsContainer>
                    )}

                    {/* PHASE 3 CARD: COMMUNITY */}
                    {step === "PHASE_3_CARD" && showCard && (
                        <OptionsContainer>
                            <CommunityCard href={TELEGRAM_COMMUNITY} />
                        </OptionsContainer>
                    )}

                    {/* CHECKOUT CARD */}
                    {step === "CHECKOUT" && showCard && (
                        <OptionsContainer>
                            <CheckoutCard href={CHECKOUT_LINK} />
                        </OptionsContainer>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ==================== MEMOIZED COMPONENTS ====================

const OptionsContainer = memo(function OptionsContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="grid grid-cols-1 gap-2.5"
        >
            {children}
        </motion.div>
    );
});

const OptionButton = memo(function OptionButton({
    children,
    onClick,
    icon,
    highlight = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    icon?: React.ReactNode;
    highlight?: boolean;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            className="group relative w-full p-[1px] rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF953F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            style={{
                background: highlight
                    ? "linear-gradient(135deg, #BF953F 0%, #FCF6BA 50%, #B38728 100%)"
                    : "#333",
            }}
        >
            <div className="w-full p-3.5 bg-[#0A0A0A] rounded-[11px] text-left transition-all duration-200 group-hover:bg-[#111]">
                <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${highlight ? "text-zinc-100" : "text-zinc-300"} group-hover:text-white`}>
                        {children}
                    </span>
                    <span className={`${highlight ? "text-[#FCF6BA]" : "text-zinc-600"} group-hover:text-zinc-300`}>
                        {icon || <ArrowRight size={16} />}
                    </span>
                </div>
            </div>
        </motion.button>
    );
});

const SystemCard = memo(function SystemCard({
    title,
    buttonText,
    href,
    icon,
}: {
    title: string;
    buttonText: string;
    href: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="p-[1px] rounded-xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
            <div className="p-4 bg-[#0A0A0A] rounded-[11px] text-center">
                <p className="text-[#FCF6BA] font-semibold mb-3">{title}</p>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                >
                    {buttonText} <span className="ml-2">{icon}</span>
                </a>
            </div>
        </div>
    );
});

const PriceCard = memo(function PriceCard({
    onBuy,
    onHesitant,
}: {
    onBuy: () => void;
    onHesitant: () => void;
}) {
    return (
        <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
            <div className="p-5 bg-[#0A0A0A] rounded-[10px] relative">
                {/* Badge */}
                <div className="absolute -top-2.5 right-3 text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-green-500 text-white">
                    30-Day Money Back
                </div>

                {/* Price */}
                <div className="text-center mb-4 mt-2">
                    <p className="text-zinc-500 line-through text-sm mb-1">Rp 2.000.000</p>
                    <p className="text-3xl font-bold text-[#FCF6BA]">Rp 750.000</p>
                    <p className="text-zinc-500 text-xs mt-1">50 Slot Only</p>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onBuy}
                        className="w-full py-3.5 flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                    >
                        Gas! Ambil Slot <ArrowRight size={16} className="ml-2" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={onHesitant}
                        className="w-full py-3 flex items-center justify-center text-zinc-400 text-sm hover:text-white border border-zinc-700 hover:border-zinc-500 rounded-lg transition-all bg-zinc-900/50 hover:bg-zinc-800/50"
                    >
                        <span>Sebenarnya Minat, Tapi...</span>
                    </motion.button>
                </div>
            </div>
        </div>
    );
});

const CommunityCard = memo(function CommunityCard({ href }: { href: string }) {
    return (
        <div className="p-[1px] rounded-xl bg-zinc-700">
            <div className="p-5 bg-[#0A0A0A] rounded-[11px]">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                        <MessageCircle size={20} className="text-[#FCF6BA]" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">AIMoneyLab Headquarters</p>
                        <p className="text-xs text-zinc-500">Free Access • Case Studies • Networking</p>
                    </div>
                </div>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg border border-zinc-700 transition-all"
                >
                    Join Komunitas (Gratis) <ExternalLink size={16} className="ml-2" />
                </a>
            </div>
        </div>
    );
});

const CheckoutCard = memo(function CheckoutCard({ href }: { href: string }) {
    return (
        <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728]">
            <div className="p-4 bg-[#0A0A0A] rounded-[10px] text-center">
                <p className="text-sm text-zinc-400 mb-3">Slot Beta Incubator</p>
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 flex items-center justify-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all"
                >
                    Secure Slot (Rp 750.000) <ArrowRight size={16} className="ml-2" />
                </a>
            </div>
        </div>
    );
});
