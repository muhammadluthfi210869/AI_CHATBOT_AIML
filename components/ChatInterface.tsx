"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gem, Rocket, Crown, Zap, HeartCrack, Eye, Target, Sparkles, Lock, ArrowRight } from "lucide-react";
import { ChatBubble } from "./chat/ChatBubble";
import { TypingIndicator } from "./chat/TypingIndicator";
import { OptionButtons } from "./chat/OptionButtons";
import { ActionButton } from "./chat/ActionButton";
import { Carousel } from "./chat/Carousel";
import { TestimonialCarousel } from "./chat/TestimonialCarousel";
import { ValueStack } from "./chat/ValueStack";
import { PricingCard } from "./chat/PricingCard";

// Links
const TELEGRAM_LINK = "https://t.me/+3xm_72adFXc5NWRl";
const BAGIBON_LINK = "https://app.midtrans.com/payment-links/1765019170772";

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS - THE GOLD STANDARD (Imported from ChatBubble for consistency)
// ════════════════════════════════════════════════════════════════════════════
const GOLD = '#FCD34D';  // Primary Gold - Same across ALL elements

// Message Types
type MessageType =
    | { type: "bot"; content: React.ReactNode; typingDuration?: number; delay?: number; isGold?: boolean }
    | { type: "options"; options: { id: string; label: string; icon?: React.ReactNode; sublabel?: string }[] }
    | { type: "action"; label: string; nextPhase?: number; variant?: "gold" | "payment" }
    | { type: "carousel"; slides: { id: string; image?: string; caption?: string; content?: React.ReactNode }[] }
    | { type: "testimonialCarousel" }
    | { type: "valueStack" }
    | { type: "pricingCard" };

interface DisplayedMessage {
    id: string;
    element: React.ReactNode;
}

// Conversation Flow Data
const PHASE_MESSAGES: Record<number, MessageType[]> = {
    // PHASE 1: THE FILTER
    1: [
        {
            type: "bot",
            content: <>Gue <strong style={{ color: GOLD, fontWeight: 600 }}>Luthfi</strong>. Mahasiswa Teknik & Atlet Silat.</>,
            typingDuration: 800,
            delay: 1000,
        },
        {
            type: "bot",
            content: <>Tips lengkap dari <strong style={{ color: GOLD, fontWeight: 600 }}>video gue</strong> yang lo cari udah gue siapin di ujung chat ini, aman.</>,
            typingDuration: 1200,
            delay: 1000,
        },
        {
            type: "bot",
            content: <>Tapi sistem ini power-nya gede. Gue cuma mau kasih ke yang serius. Lo mau <em>'Coba-coba'</em> atau mau bangun <strong style={{ color: GOLD, fontWeight: 600 }}>'Income Utama'</strong> serius?</>,
            typingDuration: 1500,
            delay: 1000,
        },
        {
            type: "options",
            options: [
                { id: "downsell", label: "Cuma Mau Liat-Liat", sublabel: "Akses Free Channel", icon: <Eye size={18} strokeWidth={2} /> },
                { id: "serious", label: "Serius Mau Income", sublabel: "Lanjut ke Private Mentoring", icon: <Target size={18} strokeWidth={2} /> },
            ],
        },
    ],

    // PHASE 2: THE DIAGNOSIS (Two Problems)
    2: [
        {
            type: "bot",
            content: <>Oke. Biasanya orang gagal dapet duit karena <strong style={{ color: GOLD, fontWeight: 600 }}>2 penyakit ini</strong>. Lo yang mana?</>,
            typingDuration: 1000,
            delay: 500,
        },
        {
            type: "options",
            options: [
                { id: "skill-no-money", label: "Punya Skill, Rekening Hampa", icon: <Zap size={16} strokeWidth={2} />, sublabel: "Bisa teknis tapi gak tau cara jual" },
                { id: "wrong-business", label: "Salah Jurusan Bisnis/Kerja", icon: <HeartCrack size={16} strokeWidth={2} />, sublabel: "Bisnis/kerja gak cocok sama passion" },
            ],
        },
    ],

    // PHASE 2 RESPONSE - Skill Dewa
    21: [
        {
            type: "bot",
            content: <>Lo bisa teknis, tapi <strong style={{ color: GOLD, fontWeight: 600 }}>GAK TAU CARA JUAL</strong> keahlian lo. Akibatnya? Klien nawar sadis, atau malah sepi job.</>,
            typingDuration: 1200,
            delay: 800,
            isGold: true,
        },
    ],

    // PHASE 2 RESPONSE - Wrong Business
    22: [
        {
            type: "bot",
            content: <>Lo paksain bisnis/kerja yang gak cocok sama jiwa lo. Dapet uang, tapi <strong style={{ color: GOLD, fontWeight: 600 }}>stress-nya selangit</strong>. Lo capek.</>,
            typingDuration: 1200,
            delay: 800,
            isGold: true,
        },
    ],

    // PHASE 3: THE LOGIC & AUTHORITY
    3: [
        {
            type: "bot",
            content: <>Okey, lu datang di tempat yang tepat. Banyak yang ragu, <em>'Anak 19 tahun tau apa soal bisnis?'</em> Logis. Tapi di era ini, <strong style={{ color: GOLD, fontWeight: 600 }}>Kecepatan {'>'} Pengalaman</strong>.</>,
            typingDuration: 1500,
            delay: 800,
        },
        {
            type: "bot",
            content: <>Di umur 19, gue bisa handle 4 peran sekaligus (Atlet, Kuliah, <strong style={{ color: GOLD, fontWeight: 600 }}>Kerja di 2 Perusahaan Tech, Owner Agency</strong>). Bukan karena gue jenius, tapi karena gue pake <strong style={{ color: GOLD, fontWeight: 600 }}>Sistem AI</strong>.</>,
            typingDuration: 2500,
            delay: 1000,
        },
        {
            type: "bot",
            content: <>Di <strong style={{ color: GOLD, fontWeight: 600 }}>Private Mentoring</strong> ini, gue install sistem itu ke otak lo. Siap tahu isinya?</>,
            typingDuration: 1000,
            delay: 0,
        },
        {
            type: "action",
            label: "Bedah Dapurmu Sekarang",
            nextPhase: 4,
        },
    ],

    // PHASE 4: THE SOLUTION (3 PILLARS)
    4: [
        {
            type: "bot",
            content: <>Kita fokus install <strong style={{ color: GOLD, fontWeight: 600 }}>3 hal</strong> yang bikin lo menghasilkan, tanpa <em>burnout</em>:</>,
            typingDuration: 1000,
            delay: 3000,
        },
        {
            type: "bot",
            content: (
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(252, 211, 77, 0.15)', border: '1px solid rgba(252, 211, 77, 0.3)' }}>
                        <Gem size={16} strokeWidth={2} style={{ color: GOLD }} />
                    </div>
                    <div>
                        <strong style={{ color: GOLD, fontSize: '15px', fontWeight: 600 }}>1. Hidden Gold Mining</strong>
                        <p className="mt-1" style={{ color: '#E5E5E5', fontSize: '14px', lineHeight: '1.6' }}>Kita gali <strong style={{ color: '#E5E5E5' }}>skill unik yang lo anggap remeh</strong>, padahal di pasar MAHAL. Kita kembangkan sampai lo kuasain niche itu.</p>
                    </div>
                </div>
            ),
            typingDuration: 1800,
            delay: 3000,
            isGold: true,
        },
        {
            type: "bot",
            content: (
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(252, 211, 77, 0.15)', border: '1px solid rgba(252, 211, 77, 0.3)' }}>
                        <Rocket size={16} strokeWidth={2} style={{ color: GOLD }} />
                    </div>
                    <div>
                        <strong style={{ color: GOLD, fontSize: '15px', fontWeight: 600 }}>2. Passion-Fit Business</strong>
                        <p className="mt-1" style={{ color: '#E5E5E5', fontSize: '14px', lineHeight: '1.6' }}>Kita bedah background dan passion lo. Kita cari 1 bisnis yang bikin lo <strong style={{ color: '#E5E5E5' }}>excited tiap pagi</strong>. Bisnis yang <em>'Lo Banget'</em>.</p>
                    </div>
                </div>
            ),
            typingDuration: 2000,
            delay: 3000,
            isGold: true,
        },
        {
            type: "bot",
            content: (
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(252, 211, 77, 0.15)', border: '1px solid rgba(252, 211, 77, 0.3)' }}>
                        <Crown size={16} strokeWidth={2} style={{ color: GOLD }} />
                    </div>
                    <div>
                        <strong style={{ color: GOLD, fontSize: '15px', fontWeight: 600 }}>3. The Godfather Offer</strong>
                        <p className="mt-1" style={{ color: '#E5E5E5', fontSize: '14px', lineHeight: '1.6' }}>Kita racik penawaran dari <em>Gold</em> dan <em>Passion</em> lo tadi. Tujuannya: Bikin calon klien merasa <strong style={{ color: '#E5E5E5' }}>BODOH</strong> dan <strong style={{ color: '#E5E5E5' }}>RUGI</strong> kalau nolak jasa lo.</p>
                    </div>
                </div>
            ),
            typingDuration: 2200,
            delay: 3000,
            isGold: true,
        },
    ],

    // PHASE 5: SOCIAL PROOF
    5: [
        {
            type: "bot",
            content: <>Metode ini bukan teori. Gue udah training <strong style={{ color: GOLD, fontWeight: 600 }}>ratusan orang</strong> lewat Zoom pake metode ini.</>,
            typingDuration: 1200,
            delay: 500,
        },
        {
            type: "testimonialCarousel",
        },
        {
            type: "bot",
            content: <>Sistem ini <strong style={{ color: GOLD, fontWeight: 600 }}>works</strong>. Gue udah nunjukin buktinya. Sekarang, tinggal lo yang tentuin.</>,
            typingDuration: 1000,
            delay: 0,
        },
        {
            type: "action",
            label: "Deal. Berapa Investasinya?",
            nextPhase: 6,
            variant: "payment",
        },
    ],

    // PHASE 6: THE OFFER
    6: [
        {
            type: "bot",
            content: <>Pilihan bagus. <strong style={{ color: GOLD, fontWeight: 600 }}>Investasi bukan biaya, tapi komitmen</strong>. Ini Value Stack yang lo dapet kalau join sekarang:</>,
            typingDuration: 1500,
            delay: 500,
        },
        { type: "valueStack" },
        {
            type: "bot",
            content: <>Normalnya, akses mentoring sedalam ini biayanya jutaan. Tapi karena ini <strong style={{ color: GOLD, fontWeight: 600 }}>Beta Launch</strong>...</>,
            typingDuration: 1200,
            delay: 1000,
        },
        { type: "pricingCard" },
    ],
};

// Value Stack Data
const VALUE_ITEMS = [
    { label: "Personal Audit & Roadmap", value: "Rp 2.000.000" },
    { label: "Full Notion System", value: "Rp 500.000" },
    { label: "Weekly Live Mentoring", value: "Rp 3.000.000" },
    { label: "VIP Community Access", value: "Priceless" },
];

interface ChatInterfaceProps {
    onInteraction?: () => void;
}

export function ChatInterface({ onInteraction }: ChatInterfaceProps) {
    const [currentPhase, setCurrentPhase] = useState(1);
    const [messageQueue, setMessageQueue] = useState<MessageType[]>([]);
    const [displayedMessages, setDisplayedMessages] = useState<DisplayedMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [processingIndex, setProcessingIndex] = useState(0);
    const [userResponse, setUserResponse] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const messageIdRef = useRef(0);

    // Initialize with Phase 1
    useEffect(() => {
        setMessageQueue(PHASE_MESSAGES[1] || []);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [displayedMessages, isTyping]);

    // Process message queue
    useEffect(() => {
        if (processingIndex >= messageQueue.length) return;

        const currentMessage = messageQueue[processingIndex];

        // Handle bot messages with typing
        if (currentMessage.type === "bot") {
            setIsTyping(true);
            const typingTimer = setTimeout(() => {
                setIsTyping(false);
                const id = `msg-${messageIdRef.current++}`;
                setDisplayedMessages((prev) => [
                    ...prev,
                    {
                        id,
                        element: (
                            <ChatBubble key={id} isGold={currentMessage.isGold}>
                                {currentMessage.content}
                            </ChatBubble>
                        ),
                    },
                ]);

                // Schedule next message
                const delayTimer = setTimeout(() => {
                    setProcessingIndex((prev) => prev + 1);
                }, currentMessage.delay || 300);

                return () => clearTimeout(delayTimer);
            }, currentMessage.typingDuration || 800);

            return () => clearTimeout(typingTimer);
        }

        // Handle options (no typing)
        if (currentMessage.type === "options") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: (
                        <OptionButtons
                            key={id}
                            options={currentMessage.options}
                            onSelect={handleOptionSelect}
                        />
                    ),
                },
            ]);
        }

        // Handle action button
        if (currentMessage.type === "action") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: (
                        <ActionButton
                            key={id}
                            label={currentMessage.label}
                            onClick={() => handleActionClick(currentMessage.nextPhase)}
                            variant={currentMessage.variant || "gold"}
                        />
                    ),
                },
            ]);
        }

        // Handle carousel
        if (currentMessage.type === "carousel") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: <Carousel key={id} slides={currentMessage.slides} />,
                },
            ]);
            setTimeout(() => setProcessingIndex((prev) => prev + 1), 500);
        }

        // Handle testimonial carousel
        if (currentMessage.type === "testimonialCarousel") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: <TestimonialCarousel key={id} />,
                },
            ]);
            setTimeout(() => setProcessingIndex((prev) => prev + 1), 500);
        }

        // Handle value stack
        if (currentMessage.type === "valueStack") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: (
                        <ValueStack
                            key={id}
                            items={VALUE_ITEMS}
                            totalValue="Rp 5.500.000+"
                        />
                    ),
                },
            ]);
            setTimeout(() => setProcessingIndex((prev) => prev + 1), 800);
        }

        // Handle pricing card
        if (currentMessage.type === "pricingCard") {
            const id = `msg-${messageIdRef.current++}`;
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id,
                    element: (
                        <PricingCard
                            key={id}
                            originalPrice="Rp 5.000.000"
                            currentPrice="Rp 750.000"
                            onCtaClick={handleCtaClick}
                            onGhostClick={handleGhostClick}
                        />
                    ),
                },
            ]);
        }
    }, [processingIndex, messageQueue]);

    // Handle option selection
    const handleOptionSelect = useCallback((optionId: string) => {
        // Add user response bubble
        const responseId = `msg-${messageIdRef.current++}`;
        const option = messageQueue
            .filter((m) => m.type === "options")
            .flatMap((m) => (m as { type: "options"; options: { id: string; label: string }[] }).options)
            .find((o) => o.id === optionId);

        if (option) {
            setDisplayedMessages((prev) => [
                ...prev,
                {
                    id: responseId,
                    element: (
                        <motion.div
                            key={responseId}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="self-end max-w-[75%] px-4 py-2 rounded-2xl rounded-br-md"
                            style={{
                                background: 'rgba(252, 211, 77, 0.2)',
                                border: '1px solid rgba(252, 211, 77, 0.3)',
                                color: GOLD,
                                fontSize: '15px',
                            }}
                        >
                            {option.label}
                        </motion.div>
                    ),
                },
            ]);
        }

        setUserResponse(optionId);

        // Trigger video collapse on first interaction
        if (onInteraction) {
            onInteraction();
        }

        // Route based on option
        setTimeout(() => {
            if (optionId === "downsell") {
                window.open(TELEGRAM_LINK, "_blank");
            } else if (optionId === "serious") {
                transitionToPhase(2);
            } else if (optionId === "skill-no-money") {
                loadPhaseMessages(21, () => transitionToPhase(3));
            } else if (optionId === "wrong-business") {
                loadPhaseMessages(22, () => transitionToPhase(3));
            }
        }, 500);
    }, [messageQueue, onInteraction]);

    // Load messages and optionally chain to next phase
    const loadPhaseMessages = (phase: number, onComplete?: () => void) => {
        const messages = PHASE_MESSAGES[phase] || [];
        setMessageQueue(messages);
        setProcessingIndex(0);

        if (onComplete) {
            const totalDuration = messages.reduce((acc, msg) => {
                if (msg.type === "bot") {
                    return acc + (msg.typingDuration || 800) + (msg.delay || 300);
                }
                return acc + 500;
            }, 0);
            setTimeout(onComplete, totalDuration + 500);
        }
    };

    // Transition to new phase
    const transitionToPhase = (phase: number) => {
        setCurrentPhase(phase);
        const messages = PHASE_MESSAGES[phase] || [];
        setMessageQueue(messages);
        setProcessingIndex(0);
    };

    // Handle action button click
    const handleActionClick = (nextPhase?: number) => {
        if (nextPhase) {
            transitionToPhase(nextPhase);

            // Chain Phase 4 -> 5 only
            if (nextPhase === 4) {
                const phase4Duration = PHASE_MESSAGES[4].reduce((acc, msg) => {
                    if (msg.type === "bot") return acc + (msg.typingDuration || 800) + (msg.delay || 300);
                    return acc + 500;
                }, 0);

                setTimeout(() => {
                    setMessageQueue((prev) => [...prev, ...PHASE_MESSAGES[5]]);
                }, phase4Duration + 500);
            }
        }
    };

    // Handle CTA click
    const handleCtaClick = () => {
        window.open(BAGIBON_LINK, "_blank");
    };

    // Handle ghost link click
    const handleGhostClick = () => {
        window.open(TELEGRAM_LINK, "_blank");
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Messages Container */}
            {/* Messages Container with proper spacing */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 pt-2 pb-6 no-scrollbar"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    // MARGIN ANTAR BUBBLE - 12px as per Gold Standard specs
                    gap: '12px',
                }}
            >
                <AnimatePresence mode="popLayout">
                    {displayedMessages.map((msg) => (
                        <div key={msg.id} className="flex flex-col items-start">
                            {msg.element}
                        </div>
                    ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <TypingIndicator />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default ChatInterface;
