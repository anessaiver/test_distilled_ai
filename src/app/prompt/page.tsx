import type { Metadata } from "next";
import Link from "next/link";
import { ORIGINAL_PROMPT } from "@/lib/prompt";

export const metadata: Metadata = {
  title: "Original Prompt",
  description: "The exact prompt that generated the DistilledAI Lab website.",
  alternates: {
    canonical: "/prompt",
  },
  openGraph: {
    title: "Original Prompt | DistilledAI Lab",
    description: "The exact prompt that generated the DistilledAI Lab website.",
    url: "/prompt",
    images: ["/og-image.png"],
  },
};

export default function PromptPage() {
  return (
    <main className="min-h-[100dvh] bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.16em] text-truth">
            DistilledAI Lab
          </Link>
          <Link href="/playground" className="rounded-full border border-white/16 px-4 py-2 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white">
            Playground
          </Link>
        </nav>
        <section className="lab-panel overflow-hidden rounded-[28px]">
          <div className="border-b border-white/12 p-5 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gotcha">Build artifact</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">The original prompt</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">
              Verbatim, including every constraint, citation demand, and tiny threat aimed at generic AI output.
            </p>
          </div>
          <pre className="max-h-none overflow-x-auto whitespace-pre-wrap p-5 font-mono text-[12px] leading-6 text-white/78 sm:p-7 sm:text-sm">
            {ORIGINAL_PROMPT}
          </pre>
        </section>
      </div>
    </main>
  );
}
