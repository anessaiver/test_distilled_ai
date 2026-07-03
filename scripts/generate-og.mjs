import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const backgroundPath = join(root, "public", "assets", "lab-background.png");
const outputPath = join(root, "public", "og-image.png");

const background = await readFile(backgroundPath);

const overlay = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0B1020" stop-opacity="0.96"/>
      <stop offset="0.52" stop-color="#0B1020" stop-opacity="0.72"/>
      <stop offset="1" stop-color="#0B1020" stop-opacity="0.44"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" x2="1">
      <stop offset="0" stop-color="#18D4D0"/>
      <stop offset="0.55" stop-color="#F72585"/>
      <stop offset="1" stop-color="#8E4DFF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="66" y="66" width="1068" height="498" rx="34" fill="none" stroke="rgba(244,251,255,.18)" stroke-width="2"/>
  <rect x="88" y="92" width="206" height="38" rx="19" fill="rgba(24,212,208,.12)" stroke="rgba(24,212,208,.48)"/>
  <text x="106" y="117" fill="#18D4D0" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="4">THE LAB</text>
  <text x="88" y="238" fill="#F4FBFF" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="900" letter-spacing="-3">DistilledAI</text>
  <text x="88" y="319" fill="#F4FBFF" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="900" letter-spacing="-3">Experiment Lab</text>
  <text x="92" y="384" fill="rgba(244,251,255,.78)" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500">Science communication meets AI. Everything cited.</text>
  <rect x="90" y="466" width="440" height="12" rx="6" fill="url(#accent)"/>
  <text x="90" y="520" fill="#18D4D0" font-family="Courier New, monospace" font-size="23" font-weight="700">test.distilledai.org/playground</text>
</svg>`);

await sharp(background)
  .resize(1200, 630, { fit: "cover" })
  .composite([{ input: overlay, blend: "over" }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

await writeFile(join(root, "public", "apple-touch-icon.png"), await sharp(outputPath).resize(180, 180).png().toBuffer());
