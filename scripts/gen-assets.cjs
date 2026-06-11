/**
 * One-time asset generator (run locally, output committed to /public).
 *   node scripts/gen-assets.cjs
 *
 * Rasterizes the favicon SVG into the PNG icon set and renders a branded
 * 1200×630 Open Graph card with the real DM Sans / Instrument Serif fonts.
 * Uses puppeteer (install with: npm install --no-save puppeteer).
 */
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const PUBLIC = path.join(__dirname, '..', 'public');
const faviconSvg = fs.readFileSync(path.join(PUBLIC, 'favicon.svg'), 'utf8');
const svgB64 = Buffer.from(faviconSvg).toString('base64');

const ICONS = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
];

const OG_HTML = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#FFFFFF;font-family:'DM Sans',sans-serif;
       position:relative;overflow:hidden;color:#0A0A0F}
  .mesh{position:absolute;inset:0;
        background:radial-gradient(900px 500px at 85% 0%,rgba(123,63,228,0.10),transparent 70%),
                   radial-gradient(700px 500px at 0% 100%,rgba(123,63,228,0.06),transparent 70%)}
  .wrap{position:absolute;inset:0;padding:88px 96px;display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:500;letter-spacing:0.18em;
           text-transform:uppercase;color:#7B3FE4}
  h1{font-size:88px;line-height:1.02;letter-spacing:-0.035em;font-weight:600;max-width:1000px}
  h1 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#7B3FE4}
  .foot{display:flex;align-items:center;gap:18px;font-size:24px;color:#3D3D47;font-weight:500}
  .dot{width:9px;height:9px;border-radius:50%;background:#7B3FE4}
  .mark{display:flex;align-items:center;gap:16px}
  .mark .name{font-size:30px;font-weight:700;letter-spacing:-0.02em}
  .mark .name b{color:#7B3FE4}
</style></head>
<body>
  <div class="mesh"></div>
  <div class="wrap">
    <div class="mark"><span class="name">Streamline Automations<b>.</b></span></div>
    <div>
      <div class="eyebrow">Web Design &amp; Automation · South Africa</div>
      <h1 style="margin-top:24px">Websites that <em>work</em>.<br>Systems that <em>scale</em>.</h1>
    </div>
    <div class="foot"><span class="dot"></span>streamline-automations.co.za · Vaal Triangle, Gauteng</div>
  </div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ deviceScaleFactor: 1, width: 600, height: 600 });

  for (const { file, size } of ICONS) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(
      `<!doctype html><html><body style="margin:0">
        <img id="i" src="data:image/svg+xml;base64,${svgB64}" width="${size}" height="${size}" style="display:block">
      </body></html>`,
      { waitUntil: 'load' },
    );
    await page.evaluate(() => document.getElementById('i').decode());
    const buf = await page.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
    fs.writeFileSync(path.join(PUBLIC, file), buf);
    console.log('wrote', file, `${size}x${size}`);
  }

  // OG card
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(OG_HTML, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 600));
  const og = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1200, height: 630 } });
  fs.writeFileSync(path.join(PUBLIC, 'og-image.png'), og);
  console.log('wrote og-image.png 1200x630');

  await browser.close();
})();
