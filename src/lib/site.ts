export const siteUrl = "https://test.distilledai.org";

export const siteTitle = "DistilledAI Lab";

export const siteDescription =
  "The public AI experiment lab of Distilled Science. Evidence-based myth-busting, built in public, cited obsessively.";

export type ExperimentCard = {
  id: string;
  label: string;
  title: string;
  status: "live" | "locked";
  description: string;
};

export const experimentCards: ExperimentCard[] = [
  {
    id: "001",
    label: "Experiment #001",
    title: "The Cognitive Bias Playground",
    status: "live",
    description:
      "A jar-by-jar collection of tricks your brain will probably fall for before the lab confesses.",
  },
  {
    id: "002",
    label: "Experiment #002",
    title: "[REDACTED]",
    status: "locked",
    description: "Specimen jar sealed. The notes are classified until the next public build.",
  },
  {
    id: "003",
    label: "Experiment #003",
    title: "[REDACTED]",
    status: "locked",
    description: "Something is fogging up the glass. For now, all we can read is the warning label.",
  },
  {
    id: "004",
    label: "Experiment #004",
    title: "[REDACTED]",
    status: "locked",
    description: "Specimen not yet captured. The net is bigger than it looks.",
  },
];

export const classicCitations = {
  anchoring:
    "Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. Science, 185(4157), 1124-1131.",
  wason:
    "Wason, P. C. (1960). On the failure to eliminate hypotheses in a conceptual task. Quarterly Journal of Experimental Psychology, 12(3), 129-140.",
  prospect:
    "Kahneman, D., & Tversky, A. (1979). Prospect theory: An analysis of decision under risk. Econometrica, 47(2), 263-291.",
  dunning:
    "Kruger, J., & Dunning, D. (1999). Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments. Journal of Personality and Social Psychology, 77(6), 1121-1134.",
};

export const citationLinks = {
  anchoring: "https://www.science.org/doi/10.1126/science.185.4157.1124",
  wason: "https://doi.org/10.1080/17470216008416717",
  prospect: "https://www.jstor.org/stable/1914185",
  dunning: "https://pubmed.ncbi.nlm.nih.gov/10626367/",
  cdcFastStats: "https://www.cdc.gov/nchs/fastats/leading-causes-of-death.htm",
};
