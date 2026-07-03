"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flask, LockKey, Sparkle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { experimentCards } from "@/lib/site";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function HomeLab() {
  const reduce = useReducedMotion();

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/assets/lab-background.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(24,212,208,0.24),transparent_31%),radial-gradient(circle_at_80%_8%,rgba(247,37,133,0.18),transparent_32%),linear-gradient(180deg,rgba(11,16,32,0.38),#0B1020_72%)]" />
      </div>

      <header className="relative mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="DistilledAI home">
          <span className="flex size-10 items-center justify-center rounded-2xl border border-truth/35 bg-truth/10 text-truth transition group-hover:border-truth/70">
            <Flask size={20} weight="duotone" />
          </span>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white">
            DistilledAI
          </span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-white/72">
          <Link className="hidden rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white sm:block" href="/prompt">
            Prompt
          </Link>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-truth px-4 py-2 font-semibold text-[#061017] transition hover:bg-white"
            href="/playground"
          >
            Playground
            <ArrowRight size={16} weight="bold" />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid min-h-[calc(100dvh-72px)] w-full max-w-7xl items-center gap-8 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          variants={reveal}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-5 inline-flex rounded-full border border-white/16 bg-white/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-truth">
            The Lab
          </p>
          <h1 className="text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            DistilledAI runs public experiments on thinking.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
            Science communication meets AI experiments. Built in public, cited obsessively, and designed to trick your brain first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playground"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-truth px-6 font-bold text-[#061017] transition hover:bg-white active:translate-y-px"
            >
              Enter the playground
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/prompt"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 px-6 font-semibold text-white transition hover:border-gotcha/70 hover:bg-gotcha/12 active:translate-y-px"
            >
              Read the prompt
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: 1.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lab-panel relative overflow-hidden rounded-[28px] p-4 sm:p-6"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-truth to-transparent" />
          <div className="scanline absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-truth/0 via-truth/14 to-truth/0" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="specimen-jar sm:min-h-[310px]">
              <div className="relative z-10 flex h-full min-h-[210px] flex-col justify-end p-5 sm:min-h-[310px]">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-truth">Specimen A-001</p>
                <p className="mt-2 text-2xl font-black text-white">Anchoring</p>
                <p className="mt-2 text-sm leading-6 text-white/68">The random number already has its little boots on your estimate.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="specimen-jar min-h-[145px]">
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-gotcha">Gotcha reagent</p>
                  <p className="mt-2 text-xl font-black text-white">Confirmation</p>
                </div>
              </div>
              <div className="specimen-jar min-h-[145px]">
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet">Shelf status</p>
                  <p className="mt-2 text-xl font-black text-white">1 of 8 collected</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">Experiments</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
            Each specimen starts as a trick, ends with a citation, and leaves a trace on the shelf.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {experimentCards.map((experiment, index) => {
            const isLive = experiment.status === "live";
            return (
              <motion.article
                key={experiment.id}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`specimen-jar ${isLive ? "min-h-[360px] lg:row-span-2" : "min-h-[250px] opacity-[0.82]"}`}
              >
                <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-truth">{experiment.label}</span>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${isLive ? "border-truth/40 bg-truth/12 text-truth" : "border-white/14 bg-white/8 text-white/58"}`}>
                      {isLive ? "Live" : "Classified"}
                    </span>
                  </div>
                  <div>
                    <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/14 bg-white/8 text-white">
                      {isLive ? <Sparkle size={25} weight="duotone" /> : <LockKey size={25} weight="duotone" />}
                    </div>
                    <h3 className={`${isLive ? "text-4xl sm:text-5xl" : "text-2xl"} font-black tracking-tight text-white`}>
                      {experiment.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/68">{experiment.description}</p>
                    {isLive ? (
                      <Link
                        href="/playground"
                        className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-truth px-5 font-bold text-[#061017] transition hover:bg-white active:translate-y-px"
                      >
                        Run experiment
                        <ArrowRight size={17} weight="bold" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <footer className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <Link
          href="/prompt"
          className="lab-panel flex flex-col justify-between gap-4 rounded-[24px] p-5 text-white transition hover:border-truth/45 sm:flex-row sm:items-center"
        >
          <span className="max-w-2xl text-sm leading-6 text-white/74">
            This entire site was built from a single prompt to Claude. Read the prompt →
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-truth">
            cite or it did not happen
          </span>
        </Link>
      </footer>
    </main>
  );
}
