import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#EDEDED",
                "rich-black": "#050505",
                // THE GOLD STANDARD - Primary Gold: #FCD34D (Amber terang)
                gold: {
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    200: "#FDE68A",
                    300: "#FCD34D",
                    400: "#FCD34D",
                    500: "#FCD34D",
                    600: "#E5C558",
                    700: "#D4B866",
                    800: "#B8A045",
                    900: "#8B7A30",
                },
                "gold-accent": "#FCD34D",
                "gold-glow": "rgba(252, 211, 77, 0.5)",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "sans-serif"],
                mono: ["var(--font-geist-mono)", "monospace"],
                display: ["var(--font-outfit)", "var(--font-geist-sans)", "sans-serif"],
            },
            animation: {
                "fade-in-up": "fadeInUp 0.5s ease-out forwards",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "shimmer": "shimmer 3s infinite linear",
                "shimmer-subtle": "shimmer-subtle 4s infinite linear",
                "glow-pulse": "glow-pulse 3s infinite ease-in-out",
                "float": "float 3s infinite ease-in-out",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "shimmer-subtle": {
                    "0%": { backgroundPosition: "-100% 0" },
                    "100%": { backgroundPosition: "100% 0" },
                },
                "glow-pulse": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(252, 211, 77, 0.15), 0 0 40px rgba(252, 211, 77, 0.05)"
                    },
                    "50%": {
                        boxShadow: "0 0 30px rgba(252, 211, 77, 0.25), 0 0 60px rgba(252, 211, 77, 0.1)"
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-4px)" },
                },
            },
            backgroundImage: {
                "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
                "gold-shimmer": "linear-gradient(90deg, #E5C558 0%, #FDE68A 25%, #FCD34D 50%, #FDE68A 75%, #E5C558 100%)",
            },
            boxShadow: {
                "luxury": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.3), 0 16px 48px rgba(0, 0, 0, 0.4)",
                "luxury-gold": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 4px 12px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 40px -10px rgba(252, 211, 77, 0.15)",
                "gold-glow": "0 0 20px rgba(252, 211, 77, 0.3), 0 0 40px rgba(252, 211, 77, 0.15), 0 0 60px rgba(252, 211, 77, 0.05)",
            },
        },
    },
    plugins: [],
};
export default config;
