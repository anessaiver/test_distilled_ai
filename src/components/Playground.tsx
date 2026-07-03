"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  ClipboardText,
  Coins,
  Eye,
  Flask,
  Gauge,
  LockKey,
  Scales,
  ShareNetwork,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { citationLinks, classicCitations } from "@/lib/site";

type BiasId =
  | "anchoring"
  | "confirmation"
  | "loss"
  | "framing"
  | "availability"
  | "dunning";

type Outcome = {
  resisted: boolean;
  detail: string;
};

type StoredLab = {
  collected: BiasId[];
  metaSeen: boolean;
  outcomes: Partial<Record<BiasId, Outcome>>;
};

type DemoProps = {
  completed: boolean;
  onCollect: (id: BiasId, outcome: Outcome) => void;
};

type Demo = {
  id: BiasId;
  label: string;
  title: string;
  short: string;
  accent: "truth" | "gotcha" | "violet" | "amber";
};

const demos: Demo[] = [
  {
    id: "anchoring",
    label: "A-001",
    title: "Anchoring",
    short: "A random number sneaks into an estimate.",
    accent: "truth",
  },
  {
    id: "confirmation",
    label: "C-002",
    title: "Confirmation bias",
    short: "The famous 2-4-6 trap with a very rude rule.",
    accent: "gotcha",
  },
  {
    id: "loss",
    label: "L-003",
    title: "Loss aversion",
    short: "A profitable coin flip that still feels suspicious.",
    accent: "violet",
  },
  {
    id: "framing",
    label: "F-004",
    title: "Framing effect",
    short: "Same statistic, different emotional costume.",
    accent: "amber",
  },
  {
    id: "availability",
    label: "V-005",
    title: "Availability heuristic",
    short: "Vivid causes feel bigger than boring causes.",
    accent: "truth",
  },
  {
    id: "dunning",
    label: "D-006",
    title: "Dunning-Kruger",
    short: "Predict the score before the score predicts you.",
    accent: "gotcha",
  },
];

const storageKey = "distilledai.bias-playground.v1";

const accentClass = {
  truth: "border-truth/34 bg-truth/10 text-truth",
  gotcha: "border-gotcha/36 bg-gotcha/10 text-gotcha",
  violet: "border-violet/36 bg-violet/10 text-violet",
  amber: "border-amber/36 bg-amber/10 text-amber",
};

const progressTotal = 8;

export function Playground() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<BiasId>("anchoring");
  const [collected, setCollected] = useState<BiasId[]>([]);
  const [outcomes, setOutcomes] = useState<Partial<Record<BiasId, Outcome>>>({});
  const [metaSeen, setMetaSeen] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as StoredLab;
          setCollected(parsed.collected ?? []);
          setOutcomes(parsed.outcomes ?? {});
          setMetaSeen(Boolean(parsed.metaSeen));
        } catch {
          window.localStorage.removeItem(storageKey);
        }
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const next: StoredLab = { collected, outcomes, metaSeen };
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }, [collected, hydrated, metaSeen, outcomes]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const allDemosCollected = demos.every((demo) => collected.includes(demo.id));
  const progressCount = 1 + collected.length + (metaSeen ? 1 : 0);
  const progressPercent = Math.min((progressCount / progressTotal) * 100, 100);

  function collect(id: BiasId, outcome: Outcome) {
    setOutcomes((current) => ({ ...current, [id]: outcome }));
    setCollected((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      setToast("Specimen acquired!");
      if (next.length === demos.length && !metaSeen) {
        window.setTimeout(() => setShowMeta(true), 650);
      }
      return next;
    });
  }

  function closeMeta() {
    setMetaSeen(true);
    setShowMeta(false);
    setToast("Meta specimen acquired!");
  }

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-background/82 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="DistilledAI home">
            <span className="flex size-10 items-center justify-center rounded-2xl border border-truth/35 bg-truth/10 text-truth">
              <Flask size={20} weight="duotone" />
            </span>
            <span className="hidden font-mono text-sm font-semibold uppercase tracking-[0.16em] text-white sm:inline">
              DistilledAI
            </span>
          </Link>
          <div className="min-w-0 flex-1 sm:max-w-md">
            <div className="mb-1 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              <span>Collection</span>
              <span>{progressCount}/8</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-truth via-gotcha to-violet"
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowMeta(true)}
            disabled={!allDemosCollected}
            className="hidden rounded-full border border-white/14 px-4 py-2 text-sm font-semibold text-white/70 transition enabled:hover:border-gotcha/60 enabled:hover:bg-gotcha/12 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-[0.42] sm:inline-flex"
          >
            Meta alert
          </button>
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="lab-panel rounded-[28px] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-truth">Cognitive Bias Playground</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-5xl">
              Trick first. Explain second. Jar forever.
            </h1>
            <p className="mt-4 text-sm leading-6 text-white/68">
              Pick any specimen. The lab gives immediate feedback, then admits exactly which paper it is standing on.
            </p>
          </div>

          <Shelf collected={collected} metaSeen={metaSeen} />
        </aside>

        <section className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {demos.map((demo) => {
              const active = activeId === demo.id;
              const done = collected.includes(demo.id);
              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setActiveId(demo.id)}
                  className={`group min-h-[142px] rounded-[22px] border p-4 text-left transition active:translate-y-px ${
                    active ? "border-truth/60 bg-truth/12" : "border-white/12 bg-white/5 hover:border-white/24 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${accentClass[demo.accent]}`}>
                      {demo.label}
                    </span>
                    {done ? <CheckCircle className="text-truth" size={22} weight="fill" /> : null}
                  </div>
                  <h2 className="mt-4 text-xl font-black tracking-tight text-white">{demo.title}</h2>
                  <p className="mt-2 text-sm leading-5 text-white/58">{demo.short}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActiveDemo id={activeId} completed={collected.includes(activeId)} onCollect={collect} />
            </motion.div>
          </AnimatePresence>

          <FutureCabinet />
          <ShareCard collected={collected} outcomes={outcomes} metaSeen={metaSeen} />
        </section>
      </section>

      <AnimatePresence>
        {toast ? (
          <motion.div
            role="status"
            className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-truth/40 bg-[#061017]/94 px-5 py-3 text-sm font-bold text-truth shadow-2xl shadow-truth/10"
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>{showMeta ? <MetaModal onClose={closeMeta} collected={collected} outcomes={outcomes} /> : null}</AnimatePresence>
    </main>
  );
}

function Shelf({ collected, metaSeen }: { collected: BiasId[]; metaSeen: boolean }) {
  const jars = [
    { id: "curiosity", title: "Curiosity", filled: true, label: "You're here, aren't you?" },
    ...demos.map((demo) => ({
      id: demo.id,
      title: demo.title,
      filled: collected.includes(demo.id),
      label: collected.includes(demo.id) ? "Captured" : "Uncaptured",
    })),
    { id: "meta", title: "Meta alert", filled: metaSeen, label: metaSeen ? "Confessed" : "Dormant" },
  ];

  return (
    <section className="lab-panel rounded-[28px] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white">Specimen shelf</h2>
          <p className="mt-1 text-xs leading-5 text-white/56">Endowed progress: 1/8 is already filled.</p>
        </div>
        <Gauge className="text-truth" size={28} weight="duotone" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {jars.map((jar) => (
          <div
            key={jar.id}
            className={`specimen-jar min-h-[126px] rounded-[18px] ${jar.filled ? "" : "grayscale"} ${jar.filled ? "opacity-100" : "opacity-[0.54]"}`}
          >
            <div className="relative z-10 flex h-full min-h-[126px] flex-col justify-end p-3">
              <p className="text-[11px] font-bold text-white">{jar.title}</p>
              <p className="mt-1 text-[10px] leading-4 text-white/58">{jar.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FutureCabinet() {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      {["Specimen not yet captured", "Specimen not yet captured"].map((title, index) => (
        <div key={index} className="specimen-jar min-h-[180px] rounded-[24px] opacity-[0.62]">
          <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/44">Future jar</span>
              <LockKey size={22} weight="duotone" className="text-white/46" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">Experiment #{String(index + 7).padStart(3, "0")}: [REDACTED]</h2>
              <p className="mt-2 text-sm text-white/56">{title}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function ActiveDemo({ id, completed, onCollect }: { id: BiasId; completed: boolean; onCollect: (id: BiasId, outcome: Outcome) => void }) {
  if (id === "anchoring") return <AnchoringDemo completed={completed} onCollect={onCollect} />;
  if (id === "confirmation") return <ConfirmationDemo completed={completed} onCollect={onCollect} />;
  if (id === "loss") return <LossDemo completed={completed} onCollect={onCollect} />;
  if (id === "framing") return <FramingDemo completed={completed} onCollect={onCollect} />;
  if (id === "availability") return <AvailabilityDemo completed={completed} onCollect={onCollect} />;
  return <DunningDemo completed={completed} onCollect={onCollect} />;
}

function DemoShell({
  title,
  icon,
  completed,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  completed: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="lab-panel overflow-hidden rounded-[28px]">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-truth">Active specimen</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
        </div>
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/14 bg-white/8 text-white">
          {icon}
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
      {completed ? (
        <div className="border-t border-truth/16 bg-truth/8 px-5 py-3 text-sm font-semibold text-truth sm:px-6">
          Specimen already on your shelf. Re-run it for science or stubbornness.
        </div>
      ) : null}
    </article>
  );
}

function AnchoringDemo({ completed, onCollect }: DemoProps) {
  const [anchor, setAnchor] = useState(17);
  const [estimate, setEstimate] = useState("");
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setAnchor(Math.random() > 0.5 ? 71 : 17), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const numeric = Number(estimate);
  const resisted = Number.isFinite(numeric) && Math.abs(numeric - 28) <= 12;

  function reveal() {
    if (!estimate) return;
    setRevealed(true);
    onCollect("anchoring", {
      resisted,
      detail: `Anchor ${anchor}, estimate ${estimate}%`,
    });
  }

  return (
    <DemoShell title="Anchoring" icon={<Brain size={28} weight="duotone" />} completed={completed}>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[22px] border border-truth/18 bg-truth/8 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-truth">Rigged calibration wheel</p>
          <p className="mt-4 text-5xl font-black text-white">{anchor}</p>
          <p className="mt-3 text-sm leading-6 text-white/68">
            Is the percentage of UN member states in Africa higher or lower than this number?
          </p>
        </div>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label className="block">
            <span className="text-sm font-semibold text-white">Now estimate the exact percentage.</span>
            <input
              inputMode="numeric"
              min="0"
              max="100"
              value={estimate}
              onChange={(event) => setEstimate(event.target.value)}
              className="mt-2 h-[52px] w-full rounded-2xl border border-white/14 bg-white/7 px-4 text-lg font-bold text-white outline-none transition placeholder:text-white/28 focus:border-truth/70"
              placeholder="Type a number from 0 to 100"
            />
          </label>
          <button
            type="button"
            disabled={!estimate}
            onClick={reveal}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-truth px-5 font-bold text-[#061017] transition hover:bg-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
          >
            Reveal the specimen
            <ArrowRight size={18} weight="bold" />
          </button>
        </form>
      </div>
      {revealed ? (
        <Reveal
          tone="gotcha"
          title="The number was bait."
          body={[
            "Anchoring happens when an initial value pulls later judgment, even when the value is arbitrary.",
            "The classic demonstration used a random wheel before an estimate, and estimates shifted toward the wheel's number.",
          ]}
          citation={classicCitations.anchoring}
          href={citationLinks.anchoring}
        />
      ) : null}
    </DemoShell>
  );
}

function ConfirmationDemo({ completed, onCollect }: DemoProps) {
  const [triple, setTriple] = useState("");
  const [tests, setTests] = useState<{ triple: string; fits: boolean }[]>([]);
  const [rule, setRule] = useState("");
  const [revealed, setRevealed] = useState(false);

  function parseTriple(value: string) {
    const parts = value
      .split(/[,\s]+/)
      .map((part) => Number(part.trim()))
      .filter((part) => Number.isFinite(part));
    if (parts.length !== 3) return null;
    return parts as [number, number, number];
  }

  function testTriple() {
    const parsed = parseTriple(triple);
    if (!parsed) return;
    const fits = parsed[0] < parsed[1] && parsed[1] < parsed[2];
    setTests((current) => [...current, { triple: parsed.join(", "), fits }]);
    setTriple("");
  }

  function revealRule() {
    if (!rule) return;
    const triedDisconfirmation = tests.some((test) => !test.fits);
    const namedRule = /ascend|increas|rising|small.*large|greater/i.test(rule);
    setRevealed(true);
    onCollect("confirmation", {
      resisted: triedDisconfirmation && namedRule,
      detail: `${tests.length} tests, final rule: ${rule}`,
    });
  }

  return (
    <DemoShell title="Confirmation bias" icon={<Flask size={28} weight="duotone" />} completed={completed}>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-4">
          <div className="rounded-[22px] border border-gotcha/26 bg-gotcha/10 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-gotcha">Starting clue</p>
            <p className="mt-3 text-4xl font-black text-white">2, 4, 6</p>
            <p className="mt-3 text-sm leading-6 text-white/68">
              This triple fits the rule. Test your own triples, then name the rule.
            </p>
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-white">Test a triple</span>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                value={triple}
                onChange={(event) => setTriple(event.target.value)}
                className="h-[52px] flex-1 rounded-2xl border border-white/14 bg-white/7 px-4 font-bold text-white outline-none transition placeholder:text-white/28 focus:border-gotcha/70"
                placeholder="Example: 8, 10, 12"
              />
              <button
                type="button"
                onClick={testTriple}
                className="min-h-12 rounded-full border border-white/18 px-5 font-bold text-white transition hover:bg-white/10 active:translate-y-px"
              >
                Test
              </button>
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-white">Your final rule</span>
            <input
              value={rule}
              onChange={(event) => setRule(event.target.value)}
              className="mt-2 h-[52px] w-full rounded-2xl border border-white/14 bg-white/7 px-4 font-bold text-white outline-none transition placeholder:text-white/28 focus:border-gotcha/70"
              placeholder="What rule generated 2, 4, 6?"
            />
          </label>
          <button
            type="button"
            onClick={revealRule}
            disabled={!rule}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gotcha px-5 font-bold text-white transition hover:bg-white hover:text-[#061017] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
          >
            Reveal the specimen
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
        <div className="rounded-[22px] border border-white/12 bg-white/5 p-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/48">Lab returns</p>
          <div className="mt-4 space-y-2">
            {tests.length ? (
              tests.map((test, index) => (
                <div key={`${test.triple}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-background/36 px-4 py-3 text-sm">
                  <span className="font-mono text-white">{test.triple}</span>
                  <span className={test.fits ? "font-semibold text-truth" : "font-semibold text-gotcha"}>
                    {test.fits ? "fits" : "does not fit"}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/14 p-4 text-sm leading-6 text-white/54">
                The trap is to test only examples that would confirm your favorite guess.
              </p>
            )}
          </div>
        </div>
      </div>
      {revealed ? (
        <Reveal
          tone="gotcha"
          title="The rule was simply: ascending numbers."
          body={[
            "Confirmation bias is the pull to seek evidence that fits a hypothesis instead of trying to break it.",
            "The Wason task exposed how often people test confirming triples, like more even numbers, while missing disconfirming tests.",
          ]}
          citation={classicCitations.wason}
          href={citationLinks.wason}
        />
      ) : null}
    </DemoShell>
  );
}

function LossDemo({ completed, onCollect }: DemoProps) {
  const [choice, setChoice] = useState<"accept" | "reject" | null>(null);
  const [revealed, setRevealed] = useState(false);

  function reveal() {
    if (!choice) return;
    setRevealed(true);
    onCollect("loss", {
      resisted: choice === "accept",
      detail: choice === "accept" ? "Accepted a positive expected value bet" : "Rejected a positive expected value bet",
    });
  }

  return (
    <DemoShell title="Loss aversion" icon={<Coins size={28} weight="duotone" />} completed={completed}>
      <div className="rounded-[24px] border border-violet/24 bg-violet/10 p-5">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet">Bet chamber</p>
        <h3 className="mt-3 text-3xl font-black tracking-tight text-white">Take this coin flip?</h3>
        <p className="mt-3 text-sm leading-6 text-white/68">
          Heads: you win $35. Tails: you lose $20. The expected value is positive, but the loss has teeth.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["accept", "Accept the bet"],
            ["reject", "Reject the bet"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setChoice(value as "accept" | "reject")}
              className={`min-h-24 rounded-[20px] border p-4 text-left text-lg font-black transition active:translate-y-px ${
                choice === value ? "border-violet/70 bg-violet/18 text-white" : "border-white/12 bg-background/38 text-white/76 hover:border-white/24"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={reveal}
          disabled={!choice}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet px-5 font-bold text-white transition hover:bg-white hover:text-[#061017] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
        >
          Reveal the specimen
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
      {revealed ? (
        <Reveal
          tone="violet"
          title={choice === "accept" ? "You stared down the loss frame." : "The loss did the loud talking."}
          body={[
            "Loss aversion is the tendency for losses to loom larger than similar-sized gains.",
            "Prospect theory models choices around gains and losses relative to a reference point, with the value curve steeper for losses.",
          ]}
          citation={classicCitations.prospect}
          href={citationLinks.prospect}
        />
      ) : null}
    </DemoShell>
  );
}

function FramingDemo({ completed, onCollect }: DemoProps) {
  const [frame, setFrame] = useState<"survival" | "mortality">("survival");
  const [choice, setChoice] = useState<"approve" | "reject" | null>(null);
  const [secondChoice, setSecondChoice] = useState<"same" | "shift" | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setFrame(Math.random() > 0.5 ? "survival" : "mortality"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const primaryText = frame === "survival" ? "This treatment has a 70% survival rate." : "This treatment has a 30% mortality rate.";
  const otherText = frame === "survival" ? "Other group card: this treatment has a 30% mortality rate." : "Other group card: this treatment has a 70% survival rate.";

  function reveal() {
    if (!choice || !secondChoice) return;
    setRevealed(true);
    onCollect("framing", {
      resisted: secondChoice === "same",
      detail: `${frame} frame, first choice ${choice}, second response ${secondChoice}`,
    });
  }

  return (
    <DemoShell title="Framing effect" icon={<Scales size={28} weight="duotone" />} completed={completed}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-amber/24 bg-amber/10 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-amber">Your assigned group</p>
          <h3 className="mt-4 text-3xl font-black text-white">{primaryText}</h3>
          <p className="mt-3 text-sm leading-6 text-white/68">Would you approve it for a public health trial?</p>
          <div className="mt-5 grid gap-3">
            {[
              ["approve", "Approve"],
              ["reject", "Reject"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setChoice(value as "approve" | "reject")}
                className={`rounded-2xl border px-4 py-3 text-left font-bold transition active:translate-y-px ${
                  choice === value ? "border-amber/70 bg-amber/16 text-white" : "border-white/12 bg-background/38 text-white/72 hover:border-white/24"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-[22px] border border-white/12 bg-white/5 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/48">Other group reveal</p>
          <h3 className="mt-4 text-2xl font-black text-white">{otherText}</h3>
          <p className="mt-3 text-sm leading-6 text-white/62">Same math. Different emotional handle. Would your decision stay put?</p>
          <div className="mt-5 grid gap-3">
            {[
              ["same", "Same decision"],
              ["shift", "I feel the tug"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setSecondChoice(value as "same" | "shift")}
                disabled={!choice}
                className={`rounded-2xl border px-4 py-3 text-left font-bold transition active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.42] ${
                  secondChoice === value ? "border-amber/70 bg-amber/16 text-white" : "border-white/12 bg-background/38 text-white/72 hover:border-white/24"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={reveal}
        disabled={!choice || !secondChoice}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber px-5 font-bold text-[#171006] transition hover:bg-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
      >
        Reveal the specimen
        <ArrowRight size={18} weight="bold" />
      </button>
      {revealed ? (
        <Reveal
          tone="amber"
          title="One statistic wore two lab coats."
          body={[
            "A frame changes which reference point feels salient, so equivalent outcomes can invite different choices.",
            "Prospect theory explains why gain and loss descriptions can move decisions even when the underlying outcome is unchanged.",
          ]}
          citation={classicCitations.prospect}
          href={citationLinks.prospect}
        />
      ) : null}
    </DemoShell>
  );
}

function AvailabilityDemo({ completed, onCollect }: DemoProps) {
  const pairs = [
    { prompt: "Which caused more U.S. deaths in the CDC table?", a: "Accidents", b: "Diabetes", correct: "Accidents" },
    { prompt: "Which caused more U.S. deaths in the CDC table?", a: "Diabetes", b: "Suicide", correct: "Diabetes" },
    { prompt: "Which caused more U.S. deaths in the CDC table?", a: "Heart disease", b: "Accidents", correct: "Heart disease" },
  ];
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const score = pairs.filter((pair, index) => answers[index] === pair.correct).length;

  function reveal() {
    if (Object.keys(answers).length !== pairs.length) return;
    setRevealed(true);
    onCollect("availability", {
      resisted: score >= 2,
      detail: `${score}/${pairs.length} frequency guesses correct`,
    });
  }

  return (
    <DemoShell title="Availability heuristic" icon={<Eye size={28} weight="duotone" />} completed={completed}>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <div key={index} className="rounded-[22px] border border-truth/18 bg-truth/8 p-4">
              <p className="text-sm font-semibold text-white">{pair.prompt}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[pair.a, pair.b].map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [index]: answer }))}
                    className={`rounded-2xl border px-4 py-3 text-left font-bold transition active:translate-y-px ${
                      answers[index] === answer ? "border-truth/70 bg-truth/16 text-white" : "border-white/12 bg-background/38 text-white/72 hover:border-white/24"
                    }`}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={reveal}
            disabled={Object.keys(answers).length !== pairs.length}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-truth px-5 font-bold text-[#061017] transition hover:bg-white active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
          >
            Reveal the specimen
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
        <div className="rounded-[22px] border border-white/12 bg-white/5 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/48">Data sealed until reveal</p>
          {revealed ? (
            <div className="mt-4 space-y-3">
              {[
                ["Heart disease", "683,491"],
                ["Accidents", "197,449"],
                ["Diabetes", "94,445"],
                ["Suicide", "48,824"],
              ].map(([cause, deaths]) => (
                <div key={cause} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-background/38 px-4 py-3">
                  <span className="text-sm font-semibold text-white">{cause}</span>
                  <span className="font-mono text-sm text-truth">{deaths}</span>
                </div>
              ))}
              <p className="text-xs leading-5 text-white/50">U.S. death counts from the CDC/NCHS FastStats leading causes table.</p>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/58">
              Dramatic causes are easy to imagine. Boring causes do not get the same mental spotlight.
            </p>
          )}
        </div>
      </div>
      {revealed ? (
        <Reveal
          tone="truth"
          title={`You scored ${score}/${pairs.length} on frequency sense.`}
          body={[
            "The availability heuristic makes judgments feel more likely when examples are easy to retrieve from memory.",
            "That shortcut is useful, but vivid coverage can make rare or dramatic outcomes feel larger than base rates support.",
          ]}
          citation={`${classicCitations.anchoring} Data source: CDC/NCHS FastStats, Leading Causes of Death.`}
          href={citationLinks.cdcFastStats}
        />
      ) : null}
    </DemoShell>
  );
}

function DunningDemo({ completed, onCollect }: DemoProps) {
  const questions = [
    {
      q: "A p-value of .04 most directly means:",
      options: ["The hypothesis is 96% likely true", "Data this extreme would be unlikely if the null model were true", "The result is important in the real world"],
      answer: 1,
    },
    {
      q: "Which test is better for a favorite explanation?",
      options: ["Seek only confirming cases", "Try to find a case that would disprove it", "Ask people who already agree"],
      answer: 1,
    },
    {
      q: "A larger sample usually reduces:",
      options: ["Random sampling noise", "All bias", "The need for a control group"],
      answer: 0,
    },
    {
      q: "Correlation by itself proves:",
      options: ["A direct cause", "Nothing about causation without more design evidence", "That the stronger variable came first"],
      answer: 1,
    },
    {
      q: "A control group helps estimate:",
      options: ["What might have happened without the treatment", "Whether the graph looks nicer", "The author's intent"],
      answer: 0,
    },
  ];
  const [prediction, setPrediction] = useState("3");
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState(false);
  const actual = questions.filter((question, index) => answers[index] === question.answer).length;
  const predicted = Number(prediction);

  function reveal() {
    if (Object.keys(answers).length !== questions.length) return;
    setRevealed(true);
    onCollect("dunning", {
      resisted: Math.abs(predicted - actual) <= 1,
      detail: `Predicted ${predicted}/5, scored ${actual}/5`,
    });
  }

  return (
    <DemoShell title="Dunning-Kruger" icon={<WarningCircle size={28} weight="duotone" />} completed={completed}>
      <div className="rounded-[22px] border border-gotcha/20 bg-gotcha/8 p-5">
        <label className="block">
          <span className="text-sm font-semibold text-white">Before answering, predict your score out of 5.</span>
          <input
            type="number"
            min="0"
            max="5"
            value={prediction}
            onChange={(event) => setPrediction(event.target.value)}
            className="mt-2 h-[52px] w-full max-w-[180px] rounded-2xl border border-white/14 bg-white/7 px-4 text-lg font-bold text-white outline-none transition focus:border-gotcha/70"
          />
        </label>
      </div>
      <div className="mt-4 space-y-3">
        {questions.map((question, index) => (
          <fieldset key={question.q} className="rounded-[22px] border border-white/12 bg-white/5 p-4">
            <legend className="text-sm font-bold text-white">{question.q}</legend>
            <div className="mt-3 grid gap-2">
              {question.options.map((option, optionIndex) => (
                <label
                  key={option}
                  className={`flex cursor-pointer gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                    answers[index] === optionIndex ? "border-gotcha/70 bg-gotcha/14 text-white" : "border-white/10 bg-background/28 text-white/70 hover:border-white/24"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    className="mt-1 accent-[#F72585]"
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <button
        type="button"
        onClick={reveal}
        disabled={Object.keys(answers).length !== questions.length}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gotcha px-5 font-bold text-white transition hover:bg-white hover:text-[#061017] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
      >
        Reveal the specimen
        <ArrowRight size={18} weight="bold" />
      </button>
      {revealed ? (
        <Reveal
          tone="gotcha"
          title={`You predicted ${predicted}/5 and scored ${actual}/5.`}
          body={[
            "The Dunning-Kruger effect describes how poor performers can lack the skill needed to recognize the gaps in their own performance.",
            "The original paper found inflated self-assessments across domains where the same competence was needed for doing the task and judging the task.",
          ]}
          citation={classicCitations.dunning}
          href={citationLinks.dunning}
        />
      ) : null}
    </DemoShell>
  );
}

function Reveal({
  title,
  body,
  citation,
  href,
  tone,
}: {
  title: string;
  body: string[];
  citation: string;
  href: string;
  tone: "truth" | "gotcha" | "violet" | "amber";
}) {
  const color = {
    truth: "border-truth/30 bg-truth/10 text-truth",
    gotcha: "border-gotcha/30 bg-gotcha/10 text-gotcha",
    violet: "border-violet/30 bg-violet/10 text-violet",
    amber: "border-amber/30 bg-amber/10 text-amber",
  }[tone];

  return (
    <motion.section
      className={`mt-5 rounded-[24px] border p-5 ${color}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em]">Gotcha reveal</p>
      <h3 className="mt-3 text-2xl font-black tracking-tight text-white">{title}</h3>
      <div className="mt-3 space-y-2 text-sm leading-6 text-white/74">
        {body.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block rounded-2xl border border-white/12 bg-background/30 p-4 text-xs leading-5 text-white/64 transition hover:border-white/24 hover:text-white"
      >
        Citation: {citation}
      </a>
    </motion.section>
  );
}

function ShareCard({
  collected,
  outcomes,
  metaSeen,
}: {
  collected: BiasId[];
  outcomes: Partial<Record<BiasId, Outcome>>;
  metaSeen: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const score = demos.filter((demo) => outcomes[demo.id]?.resisted).length;
  const grid = [
    demos.slice(0, 3).map((demo) => squareFor(demo.id, collected, outcomes)).join(""),
    demos.slice(3, 6).map((demo) => squareFor(demo.id, collected, outcomes)).join(""),
  ].join("\n");
  const shareText = `Bias Resistance Score ${score}/6\n${grid}\nDistilledAI Cognitive Bias Playground\nhttps://test.distilledai.org/playground`;

  async function copy() {
    await navigator.clipboard.writeText(shareText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="lab-panel rounded-[28px] p-5 sm:p-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet">Share card</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Bias Resistance Score</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/64">
            Complete all six specimens, then copy a Wordle-style grid that admits exactly how slippery your brain was.
          </p>
        </div>
        <div className="rounded-[22px] border border-white/12 bg-background/42 p-4 font-mono text-2xl leading-8 text-white">
          <p className="mb-2 text-sm text-white/56">{score}/6</p>
          <p>{grid}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        disabled={!metaSeen}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet px-5 font-bold text-white transition hover:bg-white hover:text-[#061017] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-[0.45] sm:w-auto"
      >
        {copied ? <CheckCircle size={18} weight="fill" /> : <ClipboardText size={18} weight="bold" />}
        {metaSeen ? (copied ? "Copied" : "Copy share text") : "Unlock after meta alert"}
      </button>
    </section>
  );
}

function squareFor(id: BiasId, collected: BiasId[], outcomes: Partial<Record<BiasId, Outcome>>) {
  if (!collected.includes(id)) return "⬛";
  return outcomes[id]?.resisted ? "🟩" : "🟨";
}

function MetaModal({
  onClose,
  collected,
  outcomes,
}: {
  onClose: () => void;
  collected: BiasId[];
  outcomes: Partial<Record<BiasId, Outcome>>;
}) {
  const allDone = demos.every((demo) => collected.includes(demo.id));
  const score = demos.filter((demo) => outcomes[demo.id]?.resisted).length;
  const shareGrid = [
    demos.slice(0, 3).map((demo) => squareFor(demo.id, collected, outcomes)).join(""),
    demos.slice(3, 6).map((demo) => squareFor(demo.id, collected, outcomes)).join(""),
  ].join("\n");

  return (
    <motion.div
      className="fixed inset-0 z-40 grid place-items-center bg-[#050814]/82 p-4 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.section
        className="lab-panel relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-[30px] p-5 sm:p-7"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/70 transition hover:bg-white/14 hover:text-white"
          aria-label="Close meta alert"
        >
          <X size={18} weight="bold" />
        </button>
        <div className="pr-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gotcha">Meta alert</p>
          <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl">
            This site just used 4 documented psychological techniques on YOU while teaching you about them.
          </h2>
          <p className="mt-5 text-sm leading-6 text-white/68">
            The confession is the payoff. The lab did not just explain persuasion mechanics; it made you feel them.
          </p>
        </div>

        {!allDone ? (
          <div className="mt-6 rounded-[22px] border border-amber/30 bg-amber/10 p-4 text-sm leading-6 text-amber">
            The modal is peeking early. Capture every live specimen to unlock the official share card.
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Endowed progress",
              body: "The shelf started at 1/8 so the task felt already underway.",
              cite: "Nunes, J. C., & Drèze, X. (2006). The endowed progress effect: How artificial advancement increases effort. Journal of Consumer Research, 32(4), 504-512.",
            },
            {
              title: "Goal gradient",
              body: "The progress bar and shelf made the next jar feel nearer as you advanced.",
              cite: "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The goal-gradient hypothesis resurrected: Purchase acceleration, illusionary goal progress, and customer retention. Journal of Marketing Research, 43(1), 39-58.",
            },
            {
              title: "Immediate feedback",
              body: "Every reveal, toast, and wobble told you the action landed.",
              cite: "Hattie, J., & Timperley, H. (2007). The power of feedback. Review of Educational Research, 77(1), 81-112.",
            },
            {
              title: "Autonomy plus competence",
              body: "You chose the order and built visible competence one specimen at a time.",
              cite: "Deci, E. L., & Ryan, R. M. (2000). The what and why of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227-268.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[22px] border border-white/12 bg-white/5 p-4">
              <h3 className="text-lg font-black text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/64">{item.body}</p>
              <p className="mt-3 text-[11px] leading-5 text-white/46">Citation: {item.cite}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-violet/28 bg-violet/10 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-violet">Shareable payoff</p>
              <h3 className="mt-2 text-2xl font-black text-white">Bias Resistance Score: {score}/6</h3>
            </div>
            <pre className="rounded-2xl border border-white/12 bg-background/42 p-4 font-mono text-2xl leading-8 text-white">
              {shareGrid}
            </pre>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-truth px-5 font-bold text-[#061017] transition hover:bg-white active:translate-y-px sm:w-auto"
          >
            Add meta specimen
            <ShareNetwork size={18} weight="bold" />
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}
