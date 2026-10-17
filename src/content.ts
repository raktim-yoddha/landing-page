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
  title: "Raktim Yoddha | Websites, Apps & Automations for Small Businesses",
  description:
    "Raktim Yoddha designs and builds websites, apps, automations and AI chatbots for small businesses, plus local SEO and outreach. Based in Gujarat, India. Book a free 30-minute call.",
};

export const hero = {
  // Rendered as: "I put businesses" + italic "on autopilot."
  lead: "I put businesses",
  accent: "on autopilot.",
  sub: "Websites that bring in leads, and the automations and chatbots that answer them while you sleep.",
  cta: "Book a free 30-min call",
  stats: [
    { value: "2+", label: "years building for clients" },
    { value: "10+", label: "projects shipped" },
    { value: "1,000+", label: "people watch me code on YouTube" },
  ],
};

export const services = {
  lead: "Six ways I take work",
  accent: "off your plate",
  items: [
    {
      name: "Websites",
      outcome: "A site that loads fast, shows up on Google and turns visitors into booked calls.",
      points: [
        "Custom design for phone, tablet and desktop",
        "Landing pages built around one action",
        "Next.js and React under the hood",
        "Speed and on-page SEO from day one",
      ],
    },
    {
      name: "Apps",
      outcome: "Web and mobile apps your customers keep opening after the first week.",
      points: [
        "Full-stack web and mobile development",
        "Backends and APIs that hold up as users grow",
        "Secure sign-in and data sync across devices",
        "Screens designed around what users do daily",
      ],
    },
    {
      name: "Automations",
      outcome: "The copy-paste work between your apps, handed to the apps themselves.",
      points: [
        "Workflows that run across several apps end to end",
        "CRM, database and notification sync the moment data changes",
        "Error handling that alerts you before a customer notices",
        "Custom webhooks and API integrations",
      ],
    },
    {
      name: "Chatbots",
      outcome: "An assistant that answers a lead at 2 a.m. and books them into your calendar.",
      points: [
        "AI agents trained on your own documents and FAQs",
        "Lead qualification and support around the clock",
        "Bookings and CRM handoff without a human in between",
        "Deployed on the messaging channels your customers use",
      ],
    },
    {
      name: "Local SEO",
      outcome: "Show up when people nearby search for what you sell.",
      points: [
        "Google Business Profile set up to rank",
        "Listings on trusted local directories",
        "Pages targeted at the areas you serve",
        "A routine for collecting and answering reviews",
      ],
    },
    {
      name: "Outreach",
      outcome: "Cold email and LinkedIn campaigns that land in front of verified buyers.",
      points: [
        "Email and LinkedIn sequences written for your offer",
        "B2B lead lists checked before anyone gets a message",
        "Domain warm-up and deliverability setup",
        "Copy tested against a second version",
      ],
    },
  ],
};

export const work = {
  lead: "Work that's",
  accent: "live right now",
  items: [
    {
      name: "Glow with Nutrition",
      tags: ["Landing page"],
      body: "A landing page for a nutrition practice that sells evidence-based, personalised diet plans and consultations built around real-life health goals.",
      image: "/work/glowwithnutrition.png",
      url: "https://www.glowwithnutrition.fit/",
      linkLabel: "Visit site",
    },
    {
      name: "Hiveory",
      tags: ["Landing page", "Desktop app"],
      body: "A local-first desktop workspace where autonomous AI agents, recursive split panes and local chat share one window.",
      image: "/work/hiveory.png",
      url: "https://hiveory.vercel.app/",
      linkLabel: "Visit site",
    },
    {
      name: "TaskMaster",
      tags: ["Desktop app"],
      body: "A small floating productivity tool with goal widgets, focus timers and overlay states. The code is open on GitHub.",
      image: "/work/taskmaster.png",
      url: "https://github.com/raktim-yoddha/taskmaster",
      linkLabel: "View on GitHub",
    },
    {
      name: "Skillshare",
      tags: ["Web app", "AI platform"],
      body: "A platform where engineers share the editor rules, MCP configs and agent workflows they run in production.",
      image: "/work/skillshare.png",
      url: "https://skillsharehq.vercel.app/",
      linkLabel: "Visit site",
    },
  ],
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
    { name: "YouTube", detail: "Live coding sessions, full builds and tutorials.", count: "1,000+ subscribers", url: contact.youtube, cta: "Subscribe" },
    { name: "Discord", detail: "Builders sharing progress, swapping tips and getting direct help.", count: "250+ members", url: contact.discord, cta: "Join the server" },
    { name: "Twitch", detail: "Live streams where you can ask questions in chat and code along.", count: "Live streams", url: contact.twitch, cta: "Follow" },
  ],
  resources: {
    title: "Free resources from the streams",
    items: ["Master Next.js with AI", "Notion CRM Kit", "The Automation Playbook", "Local SEO Checklist"],
    // ponytail: no real download links exist yet, so this points at the channel.
    url: contact.youtube,
    cta: "Get them on YouTube",
  },
};

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
  lead: "Ready to put yours",
  accent: "on autopilot?",
  body: "Pick a 30-minute slot. It's free, and you'll leave with a plan for what to build first.",
  fallback: "Calendar not loading? Email me",
};
