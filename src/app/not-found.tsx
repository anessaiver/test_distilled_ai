import Link from "next/link";
import { Brain } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center bg-background px-4 text-center text-foreground">
      <section className="lab-panel max-w-xl rounded-[28px] p-8">
        <div className="mx-auto flex size-16 items-center justify-center rounded-3xl border border-gotcha/35 bg-gotcha/10 text-gotcha">
          <Brain size={30} weight="duotone" />
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-gotcha">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">This page is a false memory.</h1>
        <p className="mt-4 text-sm leading-6 text-white/68">
          Your brain is sure it saw a route here. The lab notebook disagrees.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-truth px-5 font-bold text-[#061017] transition hover:bg-white active:translate-y-px"
        >
          Return to the lab
        </Link>
      </section>
    </main>
  );
}
