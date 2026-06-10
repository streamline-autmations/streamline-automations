/**
 * One-off: screencast the hero intro on a true cold load.
 * CDP pushes compositor frames asynchronously, so shader-compile stalls
 * can't blank the capture the way page.screenshot() requests do.
 * Usage: node scripts/capture-intro.mjs [url]
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const URL = process.argv[2] ?? 'http://localhost:5176/';
const OUT = path.resolve('lab-screens/intro');
fs.mkdirSync(OUT, { recursive: true });
// clear previous cast frames
for (const f of fs.readdirSync(OUT)) if (f.startsWith('cast-')) fs.unlinkSync(path.join(OUT, f));

let browser;
for (const channel of ['chrome', 'msedge']) {
  try {
    browser = await chromium.launch({ channel, headless: false });
    console.log('launched', channel);
    break;
  } catch (e) {
    console.log(channel, 'unavailable:', e.message.split('\n')[0]);
  }
}
if (!browser) process.exit(1);

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// warm vite's dep cache so the cold-load capture isn't dominated by dev-server transform time
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.goto('about:blank');

const cdp = await ctx.newCDPSession(page);
const frames = [];
cdp.on('Page.screencastFrame', (ev) => {
  frames.push({ data: ev.data, t: Date.now() });
  cdp.send('Page.screencastFrameAck', { sessionId: ev.sessionId }).catch(() => {});
});
await cdp.send('Page.enable');
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 70, everyNthFrame: 1 });

const t0 = Date.now();
await page.goto(URL, { waitUntil: 'commit' });
await page.waitForTimeout(4500);
await cdp.send('Page.stopScreencast');

console.log(`collected ${frames.length} frames over ${Date.now() - t0}ms`);
// save up to 20 frames evenly spread across the capture
const step = Math.max(1, Math.floor(frames.length / 20));
let n = 0;
for (let i = 0; i < frames.length; i += step) {
  const ms = Math.max(0, frames[i].t - t0);
  const file = path.join(OUT, `cast-${String(n).padStart(2, '0')}-${String(ms).padStart(4, '0')}ms.jpg`);
  fs.writeFileSync(file, Buffer.from(frames[i].data, 'base64'));
  n++;
}
console.log(`saved ${n} frames to ${OUT}`);
await browser.close();
