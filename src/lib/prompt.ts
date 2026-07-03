export const ORIGINAL_PROMPT = `MISSION
Take me from this empty directory to a fully live website at 
https://test.distilledai.org. Work autonomously — do not stop or ask me anything 
until \`curl -sI https://test.distilledai.org\` returns HTTP 200 and the served HTML 
is the finished site, not a Vercel placeholder. Already done for you: the gh 
and vercel CLIs are authenticated, and distilledai.org is added to my Vercel 
account with nameservers on Vercel DNS. Everything else — code, repo, Vercel 
project, deployment — you create from scratch.

WHAT THE SITE IS
DistilledAI.org is the public AI experiment lab of Distilled Science, a 
1M-follower science communication brand built on evidence-based myth-busting. 
Two parts:

1. HOMEPAGE — "The Lab"
- Striking landing page: short manifesto (science communication × AI, 
  everything cited, built in public), then an Experiments grid.
- Experiment #001: The Cognitive Bias Playground — live, clickable, hero 
  placement.
- 2–3 future slots rendered as locked/classified specimen jars 
  ("Experiment #002: [REDACTED]") to create a curiosity gap.
- Footer badge: "This entire site was built from a single prompt to Claude. 
  Read the prompt →" linking to /prompt, a page displaying this exact prompt 
  verbatim.

2. THE COGNITIVE BIAS PLAYGROUND (/playground)
Concept: a whimsical mad-science specimen collection. Each cognitive bias is 
a specimen in a jar. Visitors run interactive mini-experiments that TRICK 
them first, then reveal the bias, explain the mechanism, and add the specimen 
to their shelf.

Build these 6 demos, fully polished (trick → gotcha reveal → 2-sentence 
mechanism → real citation → specimen collected with a satisfying flourish):
- Anchoring: rigged estimation game (Tversky & Kahneman, 1974)
- Confirmation bias: the Wason 2-4-6 rule-discovery task (Wason, 1960)
- Loss aversion: framed bet choices (Kahneman & Tversky, 1979)
- Framing effect: identical statistic framed positively vs negatively, 
  visitor randomly assigned one, then shown the other group's choice
- Availability heuristic: guess relative frequencies of causes of death, 
  then see real data
- Dunning–Kruger: 5-question quiz where the visitor predicts their score 
  before seeing results (Kruger & Dunning, 1999)
Plus 2+ locked jars ("Specimen not yet captured") for future demos.

GAMIFICATION LAYER — evidence-based, and deliberately META
The site uses gamification psychology ON the visitor and then confesses:
- Endowed progress: collection starts at 1/8 pre-filled — "Curiosity. 
  You're here, aren't you?" (Nunes & Drèze, 2006)
- Progress bar + specimen shelf using the goal-gradient effect
- Immediate feedback, free choice of demo order (self-determination theory: 
  competence + autonomy)
- Shareable end card: a "Bias Resistance Score" with a Wordle-style 
  emoji-grid copy-to-clipboard share text
- THE TWIST: after collecting all 6, a confession modal — "Meta alert: this 
  site just used 4 documented psychological techniques on YOU while teaching 
  you about them" — listing each mechanic with its citation. This is the 
  shareable payoff; make it land.

ACCURACY BAR: every bias explanation and citation must be real and correct. 
Use only the classic, verifiable citations listed above. Never fabricate a 
reference — this brand's motto is "cite or it didn't happen."

TONE: witty mad-science lab, never condescending. Microcopy matters: 
"Specimen acquired!", jars wobble when hovered, the 404 page says "This page 
is a false memory."

DESIGN BAR: 1M people will judge whether this looks like generic AI output. 
Art-direct it: dark #0B1020 background, teal #18D4D0 as the truth/success 
accent, magenta #F72585 for gotcha/tension moments, purple #8E4DFF secondary. 
Bold editorial typography, real motion (Framer Motion), custom favicon, and 
complete OG/meta tags per page including a proper OG image so shared links 
unfurl beautifully. MOBILE-FIRST — 90% of traffic arrives from Instagram and 
TikTok link taps.

STACK: Next.js App Router + Tailwind + Framer Motion. Static/SSG, no backend, 
no env vars. Progress persists in localStorage.

PIPELINE — verify each step before advancing:
1. Brief plan, then scaffold; production build must pass locally with zero 
   errors
2. Screenshot key pages at mobile (390px) and desktop widths, critique your 
   own design honestly, iterate at least twice on the playground
3. git init with meaningful commits throughout; create a public GitHub repo 
   with gh and push
4. Deploy to production with the Vercel CLI
5. Attach distilledai.org (plus www redirect) to the project and confirm it 
   resolves
6. Verify live: curl the domain, confirm the real content is served, fetch 
   and check the OG tags render
7. Final report: live URL, repo URL, elapsed time, and the one thing you'd 
   improve next`;
