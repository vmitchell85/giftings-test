// Post-build step: renders Open Graph images and static share pages into dist/.
//
// Link-preview crawlers don't run JavaScript, so each possible "top 3 gifts" result
// gets its own static page at /r/<slug>/ whose <meta> tags point at a pre-rendered
// image. The page then redirects real visitors into the app.
//
//   dist/og/default.png          site-wide preview image
//   dist/og/<slug>.png           one per combination of 3 gifts (19 choose 3 = 969)
//   dist/r/<slug>/index.html     share landing page with OG tags

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'
import { GIFTS } from '../src/data/gifts.ts'
import { SITE_URL, joinGiftNames, shareSlug } from '../src/data/share.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const require = createRequire(import.meta.url)

const fontFiles = ['400Regular/Inter_400Regular.ttf', '600SemiBold/Inter_600SemiBold.ttf'].map(f =>
  require.resolve(`@expo-google-fonts/inter/${f}`),
)

const W = 1200
const H = 630
const PAD = 80

const C = {
  bg: '#fafaf9', // stone-50
  ink: '#18181b', // zinc-900
  muted: '#71717a', // zinc-500
  faint: '#a1a1aa', // zinc-400
  accent: '#0284c7', // sky-600
  accentSoft: '#e0f2fe', // sky-100
  rule: '#e4e4e7', // zinc-200
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Four-point star in a soft circle, matching the ✦ badge on the welcome screen.
function badge(cx: number, cy: number, r: number) {
  const s = r * 0.55
  const k = s * 0.22
  const star = `M${cx},${cy - s} Q${cx + k},${cy - k} ${cx + s},${cy} Q${cx + k},${cy + k} ${cx},${cy + s} Q${cx - k},${cy + k} ${cx - s},${cy} Q${cx - k},${cy - k} ${cx},${cy - s}Z`
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.accentSoft}"/><path d="${star}" fill="${C.accent}"/>`
}

function frame(body: string, footer = `<tspan fill="${C.muted}">19 spiritual gifts · 133 questions</tspan>`) {
  const domain = SITE_URL.replace(/^https?:\/\//, '')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="10" fill="${C.accent}"/>
  ${badge(PAD + 26, PAD + 26, 26)}
  <text x="${PAD + 70}" y="${PAD + 36}" font-family="Inter" font-weight="600" font-size="28" fill="${C.ink}">Spiritual Gifts Assessment</text>
  ${body}
  <line x1="${PAD}" y1="${H - PAD - 44}" x2="${W - PAD}" y2="${H - PAD - 44}" stroke="${C.rule}" stroke-width="2"/>
  <text x="${PAD}" y="${H - PAD}" font-family="Inter" font-weight="400" font-size="26">${footer}</text>
  <text x="${W - PAD}" y="${H - PAD}" text-anchor="end" font-family="Inter" font-weight="600" font-size="26" fill="${C.accent}">${esc(domain)}</text>
</svg>`
}

function defaultSvg() {
  return frame(`
  <text x="${PAD}" y="300" font-family="Inter" font-weight="600" font-size="84" letter-spacing="-2" fill="${C.ink}">Discover Your</text>
  <text x="${PAD}" y="398" font-family="Inter" font-weight="600" font-size="84" letter-spacing="-2" fill="${C.ink}">Spiritual Gifts</text>`)
}

function resultSvg(giftIndices: number[]) {
  const lines = giftIndices
    .map((g, i) => {
      const y = 290 + i * 84
      return `<circle cx="${PAD + 10}" cy="${y - 22}" r="10" fill="${C.accent}"/>
  <text x="${PAD + 40}" y="${y}" font-family="Inter" font-weight="600" font-size="66" letter-spacing="-1.5" fill="${C.ink}">${esc(GIFTS[g].name)}</text>`
    })
    .join('\n  ')
  return frame(`
  <text x="${PAD}" y="196" font-family="Inter" font-weight="400" font-size="34" fill="${C.muted}">My top spiritual gifts</text>
  ${lines}`,
    `<tspan fill="${C.muted}">What are yours? </tspan><tspan font-weight="600" fill="${C.ink}">Take the free assessment →</tspan>`)
}

async function renderPng(svg: string): Promise<Buffer> {
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' },
    fitTo: { mode: 'original' },
  })
    .render()
    .asPng()
  // The cards use only a handful of flat colors, so a palette PNG is visually
  // identical and ~60% smaller than resvg's truecolor output.
  return sharp(png).png({ palette: true, colors: 64, effort: 10 }).toBuffer()
}

function sharePage(slug: string, giftIndices: number[]) {
  const names = joinGiftNames(giftIndices)
  const title = `My top spiritual gifts: ${names}`
  const description = 'Take the free 133-question assessment and discover the spiritual gifts God has placed in your life.'
  const pageUrl = `${SITE_URL}/r/${slug}/`
  const image = `${SITE_URL}/og/${slug}.png`
  const target = `/?shared=${slug}`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Spiritual Gifts Assessment">
<meta property="og:url" content="${pageUrl}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="${W}">
<meta property="og:image:height" content="${H}">
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
</head>
<body><p><a href="${target}">Discover your spiritual gifts →</a></p></body>
</html>
`
}

function* combinations(n: number, k: number, start = 0, acc: number[] = []): Generator<number[]> {
  if (acc.length === k) return yield [...acc]
  for (let i = start; i < n; i++) yield* combinations(n, k, i + 1, [...acc, i])
}

// Sanity check: the build must have produced the app.
readFileSync(join(dist, 'index.html'))

mkdirSync(join(dist, 'og'), { recursive: true })
writeFileSync(join(dist, 'og', 'default.png'), await renderPng(defaultSvg()))

let count = 0
let bytes = 0
for (const combo of combinations(GIFTS.length, 3)) {
  const slug = shareSlug(combo)
  const png = await renderPng(resultSvg(combo))
  writeFileSync(join(dist, 'og', `${slug}.png`), png)
  mkdirSync(join(dist, 'r', slug), { recursive: true })
  writeFileSync(join(dist, 'r', slug, 'index.html'), sharePage(slug, combo))
  count++
  bytes += png.length
}

console.log(`share pages: ${count} pages + images (${(bytes / 1024 / 1024).toFixed(1)} MB of PNG)`)
