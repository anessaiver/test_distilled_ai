import type { Metadata } from "next";
import { Playground } from "@/components/Playground";

export const metadata: Metadata = {
  title: "Cognitive Bias Playground",
  description:
    "Run six clickable bias demos, collect the specimens, and catch the lab using gamification psychology on you.",
  alternates: {
    canonical: "/playground",
  },
  openGraph: {
    title: "The Cognitive Bias Playground | DistilledAI Lab",
    description:
      "Six interactive mini-experiments that trick you first, then cite the mechanism.",
    url: "/playground",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cognitive Bias Playground | DistilledAI Lab",
    description: "Six interactive mini-experiments that trick you first, then cite the mechanism.",
    images: ["/og-image.png"],
  },
};

export default function PlaygroundPage() {
  return <Playground />;
}
