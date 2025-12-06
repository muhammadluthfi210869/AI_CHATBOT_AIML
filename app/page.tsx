import type { Metadata } from "next";
import HeroSplit from "@/components/HeroSplit";

export const metadata: Metadata = {
    title: "Silent Luxury | AI Money Lab",
    description: "Refined Authority. Build Assets, Not Just Cashflow.",
};

export default function Home() {
    return (
        <main className="min-h-screen bg-rich-black text-foreground">
            <HeroSplit />
        </main>
    );
}
