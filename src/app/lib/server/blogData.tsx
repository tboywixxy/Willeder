export const blogPosts = [
    {
      "id": "1",
      "slug": "designing-with-clarity",
      "title": "Designing with Clarity",
      "thumbnail": "https://picsum.photos/seed/clarity/1200/630",
      "tags": ["Design", "Branding"],
      "createdAt": "2025-08-01",
      "detail": {
        "t1": "Clarity begins with intent—every pixel should serve understanding.",
        "t2": "We reduce choices per screen and group content by meaning.",
        "t5": "Typography sets rhythm; spacing reinforces hierarchy.",
        "t6": "Accessible contrast and strong focus styles build trust.",
        "t7": "Empty states teach and guide the next action.",
        "t8": "Copy should state outcomes, not destinations.",
        "t11": "Design reviews focus on user outcomes, not decoration.",
        "t12a": "Document decisions so future changes stay aligned.",
        "t12c": "Tokens map Figma choices to CSS variables.",
        "t12d": "Consistency scales teams without slowing creativity.",
        "t15a": "Measure success via completion and errors avoided.",
        "t15b": "Ship small, learn quickly, refine deliberately.",
        "t15c": "Clarity is a habit formed by constraints and care.",
        "img1": {
          "src": "https://picsum.photos/seed/clarity-img1/800/450",
          "alt": "Type scale sample",
          "caption": "A modular scale keeps hierarchy predictable."
        },
        "img2": {
          "src": "https://picsum.photos/seed/clarity-img2/800/450",
          "alt": "Layout spacing grid",
          "caption": "Consistent spacing reduces cognitive load."
        },
        "img3": {
          "src": "https://picsum.photos/seed/clarity-img3/800/450",
          "alt": "Accessible color examples",
          "caption": "Contrast meets AA for body and UI text."
        },
        "callout": "Clarity is a team sport—codify choices and stick to them."
      }
    },
    {
      "id": "2",
      "slug": "nextjs-app-router-basics",
      "title": "Next.js App Router Basics",
      "thumbnail": "https://picsum.photos/seed/approuter/1200/630",
      "tags": ["Engineering", "Other"],
      "createdAt": "2025-08-02",
      "detail": {
        "t1": "Think in layouts and nested routes for fast transitions.",
        "t2": "Keep server work on the server and ship less JS to clients.",
        "t5": "Route handlers unify caching and validation.",
        "t6": "Stream primary content first; hydrate islands later.",
        "t7": "Use metadata and revalidation per page need.",
        "t8": "Co-locate data with UI for clear ownership.",
        "t11": "Prefer suspense where it aids orientation.",
        "t12a": "Measure field performance, not just lab.",
        "t12c": "Define cache boundaries that match content change.",
        "t12d": "Split bundles by route; avoid shared giants.",
        "t15a": "Automate guardrails in CI to catch regressions.",
        "t15b": "Pick boring, reliable patterns.",
        "t15c": "Small, clear code wins over cleverness.",
        "img1": {
          "src": "https://picsum.photos/seed/router1/800/450",
          "alt": "Layout tree",
          "caption": "Shared shells keep navigation instant."
        },
        "img2": {
          "src": "https://picsum.photos/seed/router2/800/450",
          "alt": "Revalidation flow",
          "caption": "Choose revalidate windows by content freshness."
        },
        "img3": {
          "src": "https://picsum.photos/seed/router3/800/450",
          "alt": "Streaming UI",
          "caption": "Stream deliberately; avoid layout thrash."
        },
        "callout": "Push complexity to the server, not the browser."
      }
    },
    {
      "id": "3",
      "slug": "performance-first",
      "title": "Performance First",
      "thumbnail": "https://picsum.photos/seed/perf/1200/630",
      "tags": ["Engineering", "Design"],
      "createdAt": "2025-08-03",
      "detail": {
        "t1": "Define a performance budget on day one.",
        "t2": "Every dependency must earn its bytes.",
        "t5": "Images matter most—serve the right size and ratio.",
        "t6": "Preload key fonts; use swap to avoid FOIT.",
        "t7": "Reserve space to prevent CLS.",
        "t8": "Prefer CSS over JS for simple effects.",
        "t11": "Audit third-party scripts regularly.",
        "t12a": "Use RUM to see real devices and networks.",
        "t12c": "Skeletons should match final layout.",
        "t12d": "Communicate delays with honest microcopy.",
        "t15a": "Delete code; it’s the best optimization.",
        "t15b": "Measure, iterate, repeat.",
        "t15c": "Fast feels trustworthy.",
        "img1": {
          "src": "https://picsum.photos/seed/perf1/800/450",
          "alt": "Lighthouse mobile report",
          "caption": "Mobile realities dictate your priorities."
        },
        "img2": {
          "src": "https://picsum.photos/seed/perf2/800/450",
          "alt": "Network waterfall",
          "caption": "Long tasks reveal main-thread pain."
        },
        "img3": {
          "src": "https://picsum.photos/seed/perf3/800/450",
          "alt": "Coverage tool",
          "caption": "Dead code is silent but costly."
        },
        "callout": "Speed is a product feature, not an afterthought."
      }
    },
    {
      "id": "4",
      "slug": "content-strategy-for-blogs",
      "title": "Content Strategy for Blogs",
      "thumbnail": "https://picsum.photos/seed/strategy/1200/630",
      "tags": ["Branding", "Other"],
      "createdAt": "2025-08-04",
      "detail": {
        "t1": "Treat the blog like a publication with goals.",
        "t2": "Define audience, themes, cadence, and owners.",
        "t5": "Balance evergreen guides with timely posts.",
        "t6": "Link related content to deepen engagement.",
        "t7": "Write summaries that set expectations.",
        "t8": "Add UTMs and measure outcomes monthly.",
        "t11": "Accessibility checks belong in the PR template.",
        "t12a": "Alt text should add context, not noise.",
        "t12c": "Headings must form a logical outline.",
        "t12d": "Contrast should meet AA at minimum.",
        "t15a": "Quality beats frequency.",
        "t15b": "Fewer, better posts win.",
        "t15c": "Consistency builds trust.",
        "img1": {
          "src": "https://picsum.photos/seed/strategy1/800/450",
          "alt": "Editorial board",
          "caption": "A simple calendar keeps teams aligned."
        },
        "img2": {
          "src": "https://picsum.photos/seed/strategy2/800/450",
          "alt": "Analytics charts",
          "caption": "Measure what drives real value."
        },
        "img3": {
          "src": "https://picsum.photos/seed/strategy3/800/450",
          "alt": "Content linking structure",
          "caption": "Related posts increase depth of reading."
        },
        "callout": "Editorial discipline compounds results."
      }
    },
    {
      "id": "5",
      "slug": "scaling-with-json-server",
      "title": "Scaling Local Dev with JSON Server",
      "thumbnail": "https://picsum.photos/seed/jsonserver/1200/630",
      "tags": ["IT Consulting", "Engineering"],
      "createdAt": "2025-08-05",
      "detail": {
        "t1": "Mocks unblock UI while APIs mature.",
        "t2": "Mirror production shapes to avoid churn.",
        "t5": "Use page, limit, tag, and q like prod.",
        "t6": "Simulate latency to test loading states.",
        "t7": "Capture edge cases: empty, error, partial.",
        "t8": "Keep fixtures versioned with UI changes.",
        "t11": "Proxy routes hide dev/prod differences.",
        "t12a": "Visual tests love deterministic data.",
        "t12c": "Parity prevents last-minute surprises.",
        "t12d": "Update mocks as contracts evolve.",
        "t15a": "One contract, many implementations.",
        "t15b": "Speed with safety.",
        "t15c": "Demo with confidence.",
        "img1": {
          "src": "https://picsum.photos/seed/js1/800/450",
          "alt": "Mocked endpoints",
          "caption": "Design the API once, reuse everywhere."
        },
        "img2": {
          "src": "https://picsum.photos/seed/js2/800/450",
          "alt": "Delay simulation",
          "caption": "Loading UI gets a real workout."
        },
        "img3": {
          "src": "https://picsum.photos/seed/js3/800/450",
          "alt": "Fixture table",
          "caption": "Determinism makes bugs reproducible."
        },
        "callout": "Mocks reduce risk by making assumptions explicit."
      }
    },
    {
      "id": "6",
      "slug": "nodemailer-on-vercel",
      "title": "Nodemailer on Vercel",
      "thumbnail": "https://picsum.photos/seed/nodemailer/1200/630",
      "tags": ["Engineering", "Other"],
      "createdAt": "2025-08-06",
      "detail": {
        "t1": "Use Node runtime and SMTP credentials via env.",
        "t2": "Validate input and handle errors clearly.",
        "t5": "Honeypot fields deter basic spam.",
        "t6": "Reply-To helps ops respond quickly.",
        "t7": "Announce status with aria-live.",
        "t8": "Keep success and failure copy human.",
        "t11": "Rate limit and cap field lengths.",
        "t12a": "Prefer Ethereal for local previews.",
        "t12c": "Log metadata, not secrets.",
        "t12d": "Document a small runbook for on-call.",
        "t15a": "Reliable forms build trust.",
        "t15b": "Small, robust handlers win.",
        "t15c": "Security is UX.",
        "img1": {
          "src": "https://picsum.photos/seed/mail1/800/450",
          "alt": "Transport config",
          "caption": "Keep secrets out of logs and code."
        },
        "img2": {
          "src": "https://picsum.photos/seed/mail2/800/450",
          "alt": "Form states",
          "caption": "Clear feedback prevents double submits."
        },
        "img3": {
          "src": "https://picsum.photos/seed/mail3/800/450",
          "alt": "Inbox preview",
          "caption": "Preview links speed up testing."
        },
        "callout": "Trust grows when communication is predictable."
      }
    },
    {
      "id": "7",
      "slug": "responsive-figma-to-css",
      "title": "Responsive Figma → CSS with clamp()",
      "thumbnail": "https://picsum.photos/seed/figmacss/1200/630",
      "tags": ["Design", "IT Consulting"],
      "createdAt": "2025-08-07",
      "detail": {
        "t1": "Fluid systems scale without media query soup.",
        "t2": "Clamp values bound extremes on tiny and huge screens.",
        "t5": "Fix small icons to px for crisp rendering.",
        "t6": "Set borders to 1px and mind contrast.",
        "t7": "Use container widths to keep readable line lengths.",
        "t8": "Document conversions in README.",
        "t11": "Verify on Safari and Firefox early.",
        "t12a": "Font metrics differ across engines.",
        "t12c": "Prefer system fonts unless brand requires.",
        "t12d": "Preload critical weights only.",
        "t15a": "Predictability beats cleverness.",
        "t15b": "Ship principles, not hacks.",
        "t15c": "Own the rhythm of your UI.",
        "img1": {
          "src": "https://picsum.photos/seed/clamp1/800/450",
          "alt": "Clamp formula",
          "caption": "min, preferred (vw), max—document the math."
        },
        "img2": {
          "src": "https://picsum.photos/seed/clamp2/800/450",
          "alt": "Responsive grid",
          "caption": "Consistent gaps keep layouts calm."
        },
        "img3": {
          "src": "https://picsum.photos/seed/clamp3/800/450",
          "alt": "Cross-browser test",
          "caption": "Safari keeps us honest."
        },
        "callout": "Write once, scale everywhere."
      }
    },
    {
      "id": "8",
      "slug": "accessibility-aa-checklist",
      "title": "Accessibility AA Checklist",
      "thumbnail": "https://picsum.photos/seed/a11y/1200/630",
      "tags": ["Design", "Other"],
      "createdAt": "2025-08-08",
      "detail": {
        "t1": "Accessibility is quality work, not an add-on.",
        "t2": "Use landmarks, ordered headings, and visible focus.",
        "t5": "Color is never the only signal.",
        "t6": "Labels must be clear and persistent.",
        "t7": "Keyboard users complete every flow.",
        "t8": "aria-live announces async updates.",
        "t11": "Provide transcripts and alt text with context.",
        "t12a": "Test with a screen reader weekly.",
        "t12c": "Check contrast against AA.",
        "t12d": "Avoid motion that harms vestibular comfort.",
        "t15a": "Inclusive by default scales best.",
        "t15b": "Make checks part of PRs.",
        "t15c": "Everyone benefits from accessible choices.",
        "img1": {
          "src": "https://picsum.photos/seed/a11y1/800/450",
          "alt": "Focus ring",
          "caption": "Focus visibility is non-negotiable."
        },
        "img2": {
          "src": "https://picsum.photos/seed/a11y2/800/450",
          "alt": "Contrast tool",
          "caption": "Contrast is a baseline, not an aspiration."
        },
        "img3": {
          "src": "https://picsum.photos/seed/a11y3/800/450",
          "alt": "Keyboard testing",
          "caption": "Tab order reveals structure quality."
        },
        "callout": "Habits, not heroics, make products accessible."
      }
    },
    {
      "id": "9",
      "slug": "lighthouse-scores-mobile",
      "title": "Hitting 90+ Lighthouse (Mobile)",
      "thumbnail": "https://picsum.photos/seed/lh/1200/630",
      "tags": ["Engineering", "Design"],
      "createdAt": "2025-08-09",
      "detail": {
        "t1": "Great scores follow good choices.",
        "t2": "Control the critical path and reduce JS.",
        "t5": "Serve modern formats and explicit sizes.",
        "t6": "Hydrate fewer components by default.",
        "t7": "Audit fonts and third-party scripts.",
        "t8": "Prefer route-level code splitting.",
        "t11": "Measure on a mid-tier phone.",
        "t12a": "Field data validates lab wins.",
        "t12c": "Avoid layout thrash; reserve space.",
        "t12d": "Skeletons should feel deliberate.",
        "t15a": "Guardrails in CI prevent regressions.",
        "t15b": "Performance is product strategy.",
        "t15c": "Fast feels trustworthy.",
        "img1": {
          "src": "https://picsum.photos/seed/lh1/800/450",
          "alt": "Vitals chart",
          "caption": "Optimize for user-centric metrics."
        },
        "img2": {
          "src": "https://picsum.photos/seed/lh2/800/450",
          "alt": "Network panel",
          "caption": "Fewer, smaller, later."
        },
        "img3": {
          "src": "https://picsum.photos/seed/lh3/800/450",
          "alt": "Bundle report",
          "caption": "Ship less by default."
        },
        "callout": "Set budgets early—then keep them."
      }
    },
    {
      "id": "10",
      "slug": "branding-systems-101",
      "title": "Branding Systems 101",
      "thumbnail": "https://picsum.photos/seed/branding/1200/630",
      "tags": ["Branding"],
      "createdAt": "2025-08-10",
      "detail": {
        "t1": "A brand is promises kept over time.",
        "t2": "Systems make consistency achievable.",
        "t5": "Templates lower cognitive load for creators.",
        "t6": "Guardrails, not cages, enable creativity.",
        "t7": "Voice, visuals, and velocity align.",
        "t8": "Measure clarity and conversion, not taste.",
        "t11": "Prune patterns that no longer serve.",
        "t12a": "Publish where people work—Figma, code, docs.",
        "t12c": "Show examples, not just rules.",
        "t12d": "Evolve the system with the product.",
        "t15a": "Coherence compounds trust.",
        "t15b": "Consistency beats novelty.",
        "t15c": "Make the right thing easy.",
        "img1": {
          "src": "https://picsum.photos/seed/branding1/800/450",
          "alt": "Brand moodboard",
          "caption": "Shared references speed alignment."
        },
        "img2": {
          "src": "https://picsum.photos/seed/branding2/800/450",
          "alt": "Component library",
          "caption": "Systems reduce decision fatigue."
        },
        "img3": {
          "src": "https://picsum.photos/seed/branding3/800/450",
          "alt": "Usage guidelines",
          "caption": "Rules only matter when findable."
        },
        "callout": "Consistency is a competitive advantage."
      }
    },
    {
      "id": "11",
      "slug": "design-ops-in-practice",
      "title": "Design Ops in Practice",
      "thumbnail": "https://picsum.photos/seed/dops/1200/630",
      "tags": ["Design", "IT Consulting"],
      "createdAt": "2025-08-11",
      "detail": {
        "t1": "Ops aligns people, process, and tools.",
        "t2": "Make intake clear; reduce DM archaeology.",
        "t5": "Status should be visible without meetings.",
        "t6": "Teach the system, not the file.",
        "t7": "Libraries and tokens pay compounding dividends.",
        "t8": "Prototype when unknowns are high.",
        "t11": "Define success criteria per initiative.",
        "t12a": "Pair quant with qualitative insight.",
        "t12c": "Review and prune quarterly.",
        "t12d": "Ops creates a runway for creativity.",
        "t15a": "Good ops feels invisible.",
        "t15b": "Friction down, throughput up.",
        "t15c": "Process serves outcomes.",
        "img1": {
          "src": "https://picsum.photos/seed/dops1/800/450",
          "alt": "Kanban board",
          "caption": "Clarity reduces context switching."
        },
        "img2": {
          "src": "https://picsum.photos/seed/dops2/800/450",
          "alt": "Metrics dashboard",
          "caption": "Track the work that matters."
        },
        "img3": {
          "src": "https://picsum.photos/seed/dops3/800/450",
          "alt": "Design library",
          "caption": "Reusable parts speed delivery."
        },
        "callout": "Make the best path the easiest path."
      }
    },
    {
      "id": "12",
      "slug": "frontend-architecture-choices",
      "title": "Frontend Architecture Choices",
      "thumbnail": "https://picsum.photos/seed/fa/1200/630",
      "tags": ["Engineering", "IT Consulting"],
      "createdAt": "2025-08-12",
      "detail": {
        "t1": "Architecture is a set of tradeoffs.",
        "t2": "Choose state tools based on scope.",
        "t5": "Keep presentational components pure.",
        "t6": "Move effects to the edges.",
        "t7": "Composition beats inheritance.",
        "t8": "Co-locate by feature for speed.",
        "t11": "Shared boundaries make refactors safe.",
        "t12a": "Establish budgets and splitting early.",
        "t12c": "Hydrate less by default.",
        "t12d": "Measure in the field continuously.",
        "t15a": "Boring is good when it scales.",
        "t15b": "Pick predictable over fashionable.",
        "t15c": "Small pieces, loosely coupled.",
        "img1": {
          "src": "https://picsum.photos/seed/fa1/800/450",
          "alt": "Component boundaries",
          "caption": "Small testable units survive change."
        },
        "img2": {
          "src": "https://picsum.photos/seed/fa2/800/450",
          "alt": "Perf budget sheet",
          "caption": "Guardrails keep entropy in check."
        },
        "img3": {
          "src": "https://picsum.photos/seed/fa3/800/450",
          "alt": "Module graph",
          "caption": "Feature folders reduce thrash."
        },
        "callout": "Architecture is what remains when features change."
      }
    },
    {
      "id": "13",
      "slug": "クラウド活用とデザインの融合で実現する次世代Webシステム",
      "title": "クラウド活用とデザインの融合で実現する次世代Webシステム",
      "thumbnail": "https://picsum.photos/seed/cs/1200/630",
      "tags": ["Branding", "Design"],
      "createdAt": "2025-08-13",
      "detail": {
        "t1": "We simplified navigation and clarified copy.",
        "t2": "Whitespace and structure improved comprehension.",
        "t5": "We reduced blocking scripts and heavy assets.",
        "t6": "Conversion events show value first.",
        "t7": "Forms became shorter and clearer.",
        "t8": "Internal linking improved discovery.",
        "t11": "Shared components kept look and feel consistent.",
        "t12a": "Image optimization drove LCP down.",
        "t12c": "Server rendering reduced TTFB variability.",
        "t12d": "Iterative releases avoided risky big-bangs.",
        "t15a": "Mobile KPIs lifted meaningfully.",
        "t15b": "Bounce rate fell after simplification.",
        "t15c": "The brand felt calmer, more confident.",
        "img1": {
          "src": "https://picsum.photos/seed/cs1/800/450",
          "alt": "Before/after hero",
          "caption": "Clear benefits above the fold."
        },
        "img2": {
          "src": "https://picsum.photos/seed/cs2/800/450",
          "alt": "Conversion chart",
          "caption": "Conversions rose post-cleanup."
        },
        "img3": {
          "src": "https://picsum.photos/seed/cs3/800/450",
          "alt": "Component snapshots",
          "caption": "Shared parts enabled velocity."
        },
        "callout": "Saying less, better, can be the biggest win."
      }
    },
    {
      "id": "14",
      "slug": "UI/UX改善で業務効率を高めるデザイン思考",
      "title": "UI/UX改善で業務効率を高めるデザイン思考",
      "thumbnail": "https://picsum.photos/seed/tokens/1200/630",
      "tags": ["Design", "Engineering"],
      "createdAt": "2025-08-14",
      "detail": {
        "t1": "Name tokens by intent, not value.",
        "t2": "Keep spacing steps limited and consistent.",
        "t5": "Automate exports to CSS variables.",
        "t6": "Version tokens like APIs.",
        "t7": "Update components with the tokens.",
        "t8": "Docs show purpose with examples.",
        "t11": "Build stories for states and sizes.",
        "t12a": "Write lint rules for spacing and color.",
        "t12c": "Encourage contributions with simple guides.",
        "t12d": "Evolution beats fossilization.",
        "t15a": "Tokens matter only when used.",
        "t15b": "Strong defaults free teams.",
        "t15c": "Production validates the system.",
        "img1": {
          "src": "https://picsum.photos/seed/tokens1/800/450",
          "alt": "Token table",
          "caption": "Small, useful sets beat sprawling ones."
        },
        "img2": {
          "src": "https://picsum.photos/seed/tokens2/800/450",
          "alt": "Storybook tokens",
          "caption": "Examples teach faster than text."
        },
        "img3": {
          "src": "https://picsum.photos/seed/tokens3/800/450",
          "alt": "Variables in code",
          "caption": "One source of truth across stacks."
        },
        "callout": "Tokens are a means, not an end."
      }
    },
    {
      "id": "15",
      "slug": "Figmaで始める！効率的なWebサイト設計のコツ",
      "title": "Figmaで始める！効率的なWebサイト設計のコツ",
      "thumbnail": "https://picsum.photos/seed/uicopy/1200/630",
      "tags": ["Branding", "Other"],
      "createdAt": "2025-08-15",
      "detail": {
        "t1": "Words are the smallest, strongest system.",
        "t2": "Buttons describe outcomes, not destinations.",
        "t5": "Confirmation copy explains what changed.",
        "t6": "Error messages tell how to fix the issue.",
        "t7": "Tone adapts to context and audience.",
        "t8": "Avoid idioms and culture-locked phrases.",
        "t11": "Short sentences improve scanning.",
        "t12a": "Specific nouns beat abstract ones.",
        "t12c": "Icons clarify; they don’t replace text.",
        "t12d": "Rewrite until meaning is obvious.",
        "t15a": "A small style guide prevents drift.",
        "t15b": "Clarity reduces hesitation.",
        "t15c": "Write for first-glance understanding.",
        "img1": {
          "src": "https://picsum.photos/seed/uicopy1/800/450",
          "alt": "Button label examples",
          "caption": "Outcome-based labels increase confidence."
        },
        "img2": {
          "src": "https://picsum.photos/seed/uicopy2/800/450",
          "alt": "Inline validation",
          "caption": "Helpful errors reduce abandonment."
        },
        "img3": {
          "src": "https://picsum.photos/seed/uicopy3/800/450",
          "alt": "Copy review doc",
          "caption": "Shared language builds consistency."
        },
        "callout": "Say it simply; say it once."
      }
    }
  ]

