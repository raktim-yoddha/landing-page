// All page copy lives here. Edit text without touching components.

// ponytail: production URL guessed from the old site. Change when the new domain is live.
export const siteUrl = "https://raktimyoddha.vercel.app";

export const bookingUrl = "#book";

export const contact = {
  email: "raktimyoddha07@gmail.com",
  youtube: "https://www.youtube.com/@codingvibeslive",
  discord: "https://discord.gg/sT8Maq6Cxs",
  twitch: "https://www.twitch.tv/codingvibeslive",
  github: "https://github.com/raktim-yoddha",
};

export const meta = {
  title: "Raktim Yoddha | Websites, AI Chatbots & Automations That Win Customers",
  description:
    "Raktim Yoddha designs and builds websites, apps, AI chatbots and automations that bring in customers and handle the follow-up, plus local Google ranking and outreach. Based in Gujarat, India. Book a free 30-minute call.",
};

export const hero = {
  // Rendered as: "Win customers" + italic "while you sleep."
  lead: "Win customers",
  accent: "while you sleep.",
  sub: "I'm Raktim. I build the website that brings people in, plus the chatbots and automations that reply, book and follow up for you.",
  cta: "Book a free 30-min call",
  stats: [
    { value: 10, suffix: "+", label: "projects shipped" },
    { value: 1000, suffix: "+", label: "people watch me code on YouTube" },
    { value: 250, suffix: "+", label: "builders in my Discord" },
  ],
};

export const services = {
  lead: "Six ways I take work",
  accent: "off your plate",
  items: [
    {
      name: "Websites",
      outcome: "Fast sites that turn visitors into enquiries.",
      points: ["Custom design for every screen", "Built around one clear action", "Loads fast, ranks on Google", "Easy for you to update"],
    },
    {
      name: "Apps",
      outcome: "Web and mobile apps your customers keep using.",
      points: ["Web and mobile", "Secure logins", "Grows with your users", "Simple, clear screens"],
    },
    {
      name: "Automations",
      outcome: "Your apps do the repetitive work for you.",
      points: ["Connects the tools you use", "Updates your CRM instantly", "Alerts you if something breaks", "Custom integrations"],
    },
    {
      name: "AI chatbots",
      outcome: "Answers customers and books calls, day and night.",
      points: ["Trained on your business", "Replies to leads 24/7", "Books meetings for you", "Works on your site and chat apps"],
    },
    {
      name: "Local Google ranking",
      outcome: "Show up when people nearby search Google.",
      points: ["Google Business Profile setup", "Listings on local directories", "A page for each area you serve", "More reviews, answered fast"],
    },
    {
      name: "Finding new clients",
      outcome: "Cold emails and LinkedIn messages that get replies.",
      points: ["Email and LinkedIn campaigns", "Verified lead lists", "Lands in the inbox", "Copy tested and improved"],
    },
  ],
};

const workItems = [
  {
    name: "Glow with Nutrition",
    tags: ["Landing page"],
    body: "A landing page for a nutrition practice that sells evidence-based, personalised diet plans and consultations built around real-life health goals.",
    image: "/work/glowwithnutrition.png",
    size: [1906, 977],
    url: "https://www.glowwithnutrition.fit/",
    linkLabel: "Visit site",
  },
  {
    name: "Hiveory",
    tags: ["Landing page", "Desktop app"],
    body: "A local-first desktop workspace where autonomous AI agents, recursive split panes and local chat share one window.",
    image: "/work/hiveory.png",
    size: [1911, 977],
    url: "https://hiveory.vercel.app/",
    linkLabel: "Visit site",
  },
  {
    name: "TaskMaster",
    tags: ["Desktop app"],
    body: "A small floating productivity tool with goal widgets, focus timers and overlay states. The code is open on GitHub.",
    image: "/work/taskmaster.png",
    size: [1917, 1078],
    url: "https://github.com/raktim-yoddha/taskmaster",
    linkLabel: "View on GitHub",
  },
  {
    name: "Skillshare",
    tags: ["Web app", "AI platform"],
    body: "A platform where engineers share the editor rules, MCP configs and agent workflows they run in production.",
    image: "/work/skillshare.png",
    size: [1906, 958],
    url: "https://skillsharehq.vercel.app/",
    linkLabel: "Visit site",
  },
  {
    name: "Raktim Yoddha",
    tags: ["Portfolio site"],
    body: "My previous portfolio, with a full-screen portrait hero, service breakdowns, a project gallery and Cal.com booking.",
    image: "/work/portfolio.png",
    size: [1906, 977],
    url: "https://raktimyoddha.vercel.app/",
    linkLabel: "Visit site",
  },
];

export const work = {
  lead: "Work that's",
  accent: "live right now",
  more: { label: "See all projects", url: "/work" },
  items: workItems,
  // New projects go here: they appear on /work only, not in the homepage slider.
  // Same shape as `items` (name, tags, body, image in /public/work, size [w, h], url, linkLabel).
  archive: [] as Array<(typeof workItems)[number]>,
};

// DUMMY reviews for layout only. The section renders in `npm run dev` and is hidden in
// production builds until `placeholder` is removed and real, permitted quotes go in.
export const reviews = {
  placeholder: true,
  lead: "What clients",
  accent: "say",
  items: [
    { name: "Client name", role: "Business, city", quote: "Placeholder quote. Replace with a real client's words, with their permission." },
    { name: "Client name", role: "Business, city", quote: "Placeholder quote. One or two sentences about the result they got works best." },
  ],
};

export const community = {
  lead: "Watch me build",
  accent: "in public",
  body: "I stream full builds on YouTube and Twitch, so you can see how I work before we ever talk.",
  channels: [
    {
      name: "Watch on YouTube",
      detail: "Live coding sessions, full builds and tutorials. Subscribe and follow along as projects ship.",
      count: "1,000+ subscribers",
      url: contact.youtube,
      cta: "Subscribe on YouTube",
      brand: "youtube",
    },
    {
      name: "Join the Discord",
      detail: "Hang out with other builders, share your progress, swap tips and get direct support.",
      count: "250+ members",
      url: contact.discord,
      cta: "Join the server",
      brand: "discord",
    },
    {
      name: "Follow on Twitch",
      detail: "Catch the live streams, ask questions in chat and code along in real time.",
      count: "Live streams",
      url: contact.twitch,
      cta: "Follow on Twitch",
      brand: "twitch",
    },
  ],
  resources: {
    title: "Grab the free resources",
    body: "Templates, playbooks and workshops from my streams. All free.",
    url: "/resources",
    cta: "Open free resources",
  },
} as const;

// Answers marked CONFIRM state business policy Raktim should check before launch.
export const faq = {
  lead: "Questions before",
  accent: "you book",
  items: [
    {
      q: "What happens on the free call?",
      a: "Thirty minutes on video. You tell me what's slowing the business down, and I tell you what I'd build first and roughly what it would cost. You leave with a plan whether we work together or not.",
    },
    {
      q: "How much does a project cost?",
      // CONFIRM
      a: "It depends on scope. After the call you get a written quote with a fixed price and a delivery date, before any work starts.",
    },
    {
      q: "How long does it take?",
      // CONFIRM
      a: "A landing page usually takes one to two weeks. Apps and larger automations take longer, and your quote gives you the date.",
    },
    {
      q: "Do you work with businesses outside India?",
      a: "Yes. I'm based in Gujarat and work remotely. The booking calendar shows slots in your own time zone.",
    },
    {
      q: "Can I start with just one thing, like a chatbot?",
      a: "Yes. Start with the piece that hurts most and add the rest later. Everything I build is made to connect with what comes next.",
    },
    {
      q: "Will I own the code and the accounts?",
      // CONFIRM
      a: "Yes. Code, domains and tool accounts are set up in your name and handed over at launch.",
    },
    {
      q: "What do you need from me?",
      a: "Access to the tools you already use, your logo and brand files if you have them, and one person who can answer questions within a day.",
    },
  ],
};

export const booking = {
  lead: "Tell me what's",
  accent: "slowing you down",
  body: "Pick a 30-minute slot. It's free, and you'll leave with a plan for what to build first.",
  fallback: "Calendar not loading? Email me",
};

// Hidden page: reachable only from the community section.
export const resourcesPage = {
  title: "Free resources",
  lead: "Free",
  accent: "resources",
  body: "Workshops, templates and playbooks I share with the community. All free.",
  // ponytail: no download files exist yet, so each card emails a request.
  items: [
    { name: "Master Next.js with AI", poster: "Master Next.js", kind: "Live workshop", tagline: "with AI", detail: "Oct 7, 2026 · 8:30 PM IST", motif: "hex", tone: "orange" },
    { name: "Notion CRM Kit", kind: "Free template", tagline: "track every client", detail: "100% free", motif: "windows", tone: "ink" },
    { name: "The Automation Playbook", poster: "Automation Playbook", kind: "E-book", tagline: "work less, ship more", detail: "42 pages", motif: "circuit", tone: "rust" },
    { name: "Local SEO Checklist", kind: "Cheat sheet", tagline: "get found nearby", detail: "25 checks", motif: "pin", tone: "beige" },
  ],
  cta: { lead: "Ready to grow your", accent: "business?", body: "Websites, apps, automations, chatbots, local Google ranking and outreach, built to bring you more customers. Tell me where you want to grow on a free call." },
} as const;
