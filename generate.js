const fs = require('fs');

// =====================================================================
// 1. YOUR API KEY
// =====================================================================
const API_KEY = 'Bearer TwYgYwnDfea74kSGhJjd5Q=='; // <-- REPLACE THIS WITH YOUR HIVE API KEY

// =====================================================================
// 2. THE MASTER RULES (The 15-Section AI Contract)
// =====================================================================
const MASTER_RULES = String.raw`
=====================================================================
SECTION 1 — ROLE
=====================================================================
You are a senior front-end developer and conversion-focused web designer
building a single-page static marketing site for the client in CLIENT DATA.
You are the client's in-house designer, not an agency.
Never use: "digital solutions", "synergy", "we build websites", "agency",
"cutting-edge", "unlock", "elevate your", "in today's world".
All copy, imagery, and tone must read as if written by someone who works
inside the client's industry.

=====================================================================
SECTION 2 — OUTPUT CONTRACT (HARD)
=====================================================================
- Output ONLY raw HTML. No markdown fences. No preamble. No trailing notes.
- First characters: <!DOCTYPE html>   Last characters: </html>
- No HTML comments anywhere in the output.
- Never emit <style> blocks, style="" attributes, or <script> for behaviour.
- The only permitted <script> is the single JSON-LD block in SECTION 7.
- Emit the document in one pass, complete, with no placeholders like
  "<!-- rest of sections -->" and no truncation. Every section in
  SECTION 12 must be fully written out.

=====================================================================
SECTION 3 — TAILWIND BUILD CONTRACT
=====================================================================
The stylesheet is ALREADY COMPILED by the client's Tailwind CLI build.
- Link it with exactly: <link rel="stylesheet" href="src/output.css">
- Never use the Tailwind CDN. Never reference any other .css file.
- Your HTML is the Tailwind content source. Class names must appear as
  complete literal strings so the scanner can find them.
- Brand colours must use arbitrary-value syntax with the exact hex codes
  from CLIENT DATA, e.g. bg-[#F5EFE6] text-[#1A1A1A] border-[#C6A664].
- Do not assume custom theme tokens, custom plugins, or a config extension.
- Mobile-first. Use only sm: md: lg: breakpoints.
- Use CSS-only interaction: transition, duration-300, hover:, focus-visible:.

=====================================================================
SECTION 4 — DOCUMENT SHELL
=====================================================================
- <html lang="en" dir="ltr">
- <head> must contain, in this order:
  charset, viewport, title, meta description, meta robots, canonical,
  theme-color, the Google Fonts links, the src/output.css link,
  Open Graph block, Twitter block, JSON-LD block.
- theme-color: the client's primary hex.
- Fonts: Inter for body plus one display font matching the vibe.
  Use preconnect and a single stylesheet link ending in &display=swap.

=====================================================================
SECTION 5 — SEO: TECHNICAL / SERP
=====================================================================
- <title>: 50-60 characters. Pattern: "<Primary Keyword> in <City> | <Brand>".
- Meta description: 140-155 characters, one sentence + soft CTA.
- <link rel="canonical" href="<CANONICAL_URL>"> with a trailing slash.
- Open Graph: og:type=website, og:title, og:description, og:url, og:image (1200x630 placehold.co).
- Twitter: twitter:card=summary_large_image, etc.

=====================================================================
SECTION 6 — SEO: ON-PAGE / SEMANTICS
=====================================================================
- Landmarks: <a href="#main"> skip link, <header>, <main id="main">, <footer>.
- Heading hierarchy: exactly ONE <h1>, then <h2> per section, <h3> inside cards.
- The <h1> must contain the primary keyword and read as a human sentence.
- Use <address> in the footer for the visible NAP block.
- Add <nav aria-label="Primary"> and <nav aria-label="Footer">.

=====================================================================
SECTION 7 — SEO: STRUCTURED DATA
=====================================================================
Emit exactly one JSON-LD block in <head>:
<script type="application/ld+json"> ... </script>
Use an @graph array containing LocalBusiness, WebSite, and WebPage nodes.
No trailing commas. No comments. No invented reviews or ratings.

=====================================================================
SECTION 8 — ACCESSIBILITY (WCAG 2.1 AA)
=====================================================================
- Contrast: body text >= 4.5:1.
- Skip link: first focusable element, visible on focus.
- Every <img> has an alt. Decorative: alt="".
- Every inline SVG: role="img" + <title>, or aria-hidden="true".
- Focus states: focus-visible:ring-2 on every interactive element.
- No <button> for navigation. Use <a> tags.

=====================================================================
SECTION 9 — PERFORMANCE (CORE WEB VITALS)
=====================================================================
- LCP: hero image must not be lazy-loaded. Use fetchpriority="high".
- CLS: every <img> carries explicit width and height attributes.
- INP: zero JavaScript. All hover and focus behaviour is CSS.
- Target a 100/100 Lighthouse score.

=====================================================================
SECTION 10 — DESIGN SYSTEM
=====================================================================
- One display font for h1/h2, Inter for everything else.
- Section padding py-20 md:py-28, container mx-auto max-w-6xl px-6.
- Buttons: one primary style and one secondary (outline) style.
- No emojis. No icon fonts.

=====================================================================
SECTION 11 — IMAGES
=====================================================================
- ALL images use placehold.co.
- Format: https://placehold.co/WIDTHxHEIGHT/BG_HEX/TEXT_HEX?text=Label
- Navbar logo: <img src="https://placehold.co/100x100/1F2937/FFFFFF?text=LOGO" width="40" height="40" alt="Logo" class="h-10 w-10 rounded-full object-cover">

=====================================================================
SECTION 12 — PAGE ARCHITECTURE (all required)
=====================================================================
1. SKIP LINK
2. HEADER / STICKY NAV
3. HERO
4. SERVICES (3 cards)
5. ABOUT
6. REVIEWS (Only if provided in CLIENT DATA, otherwise OMIT)
7. CONNECT WITH US (NO form, just socials and address)
8. FOOTER

=====================================================================
SECTION 13 — COPY RULES
=====================================================================
- Hero <h1>: 5-11 words. Hero sub: 18-30 words.
- Write in second person. Concrete nouns over adjectives.
- No invented prices, awards, or years in business.

=====================================================================
SECTION 14 — SOCIAL ICONS
=====================================================================
Include exactly four icons: Facebook, Messenger, Instagram, TikTok. 
Raw inline SVG, Simple Icons paths, viewBox="0 0 24 24".

=====================================================================
SECTION 15 — SELF-CHECK BEFORE YOU EMIT
=====================================================================
Silently verify every item. If any fails, fix it before output.
[ ] Starts with <!DOCTYPE html>, ends with </html>, no fences, no comments
[ ] href="src/output.css" present; no CDN
[ ] Exactly one <h1>
[ ] Exactly one JSON-LD block, valid JSON
[ ] Every <img> has width, height, and alt
[ ] All class names are literal strings Tailwind can scan
[ ] All grammar must resemble a human copywriter, not an AI who just graduate with a Masters degree in ENglish Literature.
[ ] Maintain a Gen Z / Millennial-friendly tone, but avoid slang, emojis, and abbreviations like "u" or "r".
`;

// =====================================================================
// 3. CLIENT DATA (Change this for the target business)
// =====================================================================
// =====================================================================
// 4. CLIENT DATA — THE LOUNGE CAFE
// =====================================================================
const CLIENT_DATA = String.raw`
--- CLIENT DATA ---
Business Name: The Lounge Café at the Granary
Industry: Cafe / Restaurant
Primary Keyword: Cafe in Bacolor
City: Bacolor, Pampanga
CANONICAL_URL: https://theloungecafebacolor.com/
Brand Primary Hex: #C6A664
Brand Background Hex: #F5EFE6
Brand Accent Hex: #2E4A2E
Brand Text Hex: #1A1A1A
Key Services: Specialty Coffee, Chef-Crafted Meals, Pet-Friendly Outdoor Seating
Contact Number: 0994 192 8638
Street Address: Bacolor River Control Road, Cabetican, Bacolor, Philippines, 2001
Facebook Link: https://www.facebook.com/theloungecafeatthegranaryprivatevillas
Messenger Link: https://m.me/theloungecafeatthegranaryprivatevillas
Instagram Link: https://www.instagram.com/theloungecafe.ph/
TikTok Link: 
LOGO_URL: 
HERO_IMAGE_URL: 
ABOUT_IMAGE_URL: 
Verbatim Reviews: 
`;

// =====================================================================
// 4. QA VALIDATOR FUNCTION
// =====================================================================
function validate(html) {
  const problems = [];
  const need = (re, msg) => { if (!re.test(html)) problems.push(msg); };
  const count = (re) => (html.match(re) || []).length;

  // structure
  if (!/^<!DOCTYPE html>/i.test(html)) problems.push('missing doctype');
  if (!/href=["']src\/output\.css["']/.test(html)) problems.push('missing src/output.css link');
  if (/cdn\.tailwindcss\.com/.test(html)) problems.push('Tailwind CDN present');
  if (/unsplash\.com/i.test(html)) problems.push('Unsplash used');
  if (/```/.test(html)) problems.push('markdown fences present');
  if (/<style[\s>]/i.test(html)) problems.push('<style> block present');
  if (/\sstyle=["']/i.test(html)) problems.push('inline style attribute present');

  // SEO
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
  if (!title) problems.push('missing <title>');
  else if (title.length < 40 || title.length > 65) problems.push(`<title> length ${title.length} (want 50-60)`);

  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] ?? '';
  if (!desc) problems.push('missing meta description');
  else if (desc.length < 130 || desc.length > 165) problems.push(`meta description length ${desc.length} (want 140-155)`);

  need(/rel=["']canonical["']/i, 'missing canonical link');
  need(/property=["']og:title["']/i, 'missing og:title');
  need(/property=["']og:image["']/i, 'missing og:image');
  need(/name=["']twitter:card["']/i, 'missing twitter:card');
  need(/application\/ld\+json/i, 'missing JSON-LD');
  need(/name=["']robots["']/i, 'missing meta robots');

  const h1 = count(/<h1[\s>]/gi);
  if (h1 !== 1) problems.push(`expected 1 <h1>, found ${h1}`);

  // a11y / perf
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  imgs.forEach((tag, i) => {
    if (!/\balt=/.test(tag)) problems.push(`img[${i}] missing alt`);
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) problems.push(`img[${i}] missing width/height`);
  });
  if (imgs[0] && /loading=["']lazy["']/.test(imgs[0])) problems.push('hero image is lazy-loaded');
  if (!/focus-visible:ring/.test(html)) problems.push('no focus-visible:ring utilities found');
  if (/<button[\s>]/i.test(html)) problems.push('<button> used (use <a> instead)');

  // JSON-LD must parse
  const ld = html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/i)?.[1];
  if (ld) {
    try {
      JSON.parse(ld);
    } catch {
      problems.push('JSON-LD is not valid JSON');
    }
  }

  return problems;
}

// =====================================================================
// 5. EXECUTION ENGINE
// =====================================================================
async function generateWebsite() {
  console.log('⏳ Sending request to Hive API...');

  if (!API_KEY || API_KEY.includes('*')) {
    console.log('❌ Missing HIVE_API_KEY. Set it in your environment before running this script.');
    return;
  }

  const finalPrompt = MASTER_RULES + '\n\n' + CLIENT_DATA;

  try {
    const response = await fetch('https://api.thehive.ai/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-v4.1-flash-1017',
        max_tokens: 40000,
        messages: [{ role: 'user', content: finalPrompt }],
      }),
    });

    const bodyText = await response.text();
    let data;

    try {
      data = JSON.parse(bodyText);
    } catch {
      throw new Error(`Invalid JSON response from API: ${bodyText.slice(0, 300)}`);
    }

    if (!response.ok) {
      console.log('❌ API ERROR:', JSON.stringify({ status: response.status, statusText: response.statusText, body: data }, null, 2));
      return;
    }

    const rawContent = data?.choices?.[0]?.message?.content;
    const htmlOutput = typeof rawContent === 'string'
      ? rawContent
      : Array.isArray(rawContent)
        ? rawContent.map((part) => typeof part === 'string' ? part : (part?.text || '')).join('')
        : '';

    if (!htmlOutput) {
      console.log('❌ API ERROR: Empty HTML response received.');
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    console.log('🧐 Running QA Validation...');
    const problems = validate(htmlOutput);

    if (problems.length > 0) {
      console.log('⚠️ QA FAILED. The AI missed some rules:');
      console.log(problems);
      console.log('\nSaving anyway to index.html so you can inspect it...');
    } else {
      console.log('✅ QA PASSED! Perfect execution.');
    }

    fs.writeFileSync('index.html', htmlOutput);
    console.log('✅ SUCCESS! Website saved as index.html');
    console.log('\nRun your Tailwind build now:  npx tailwindcss -i ./src/input.css -o ./src/output.css --minify');
    console.log('Then verify:                  npx serve .  →  Lighthouse (mobile, incognito)');
  } catch (error) {
    console.log('❌ CRASHED:', error.message);
  }
}

generateWebsite();
