// ============================================================================
// data.config.ts — single source of truth for the Rastaa homepage.
// Every component below reads from here. No component hardcodes copy.
// ============================================================================

export type MoodKey = "all" | "sunrise" | "quiet" | "gold" | "celebrate";

export type Mood = {
  key: MoodKey;
  index: string; // display index, e.g. "00"
  label: string;
};

export type Moment = {
  id: string;
  mood: Exclude<MoodKey, "all">;
  tag: string;
  quote: string;
  title: string;
  description: string;
  proof: string;
  size?: "lg" | "md"; // controls grid span in the moment grid
};

export type RouteTickerItem = {
  id: string;
  label: string;
};

export type Planner = {
  name: string;
  role: string;
  initial: string;
  statusText: string;
  note: string;
  phoneDisplay: string;
  phoneIntl: string; // digits only, used for wa.me links
};

export type FormFieldOption = string;

export type FormFieldConfig = {
  id: "name" | "city" | "mood" | "date" | "group";
  label: string;
  type: "text" | "select" | "date" | "number";
  placeholder?: string;
  options?: FormFieldOption[];
  required: boolean;
  errorText: string;
};

export type MemoryTile = {
  id: string;
  name: string;
  place: string;
  caption: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    tagline: string;
  };
  nav: NavLink[];
  hero: {
    eyebrow: string;
    headlineLines: string[]; // each rendered as its own animated line
    accentLineIndex: number; // which line (0-based) gets the accent color
    moodPrompt: string;
  };
  moods: Mood[];
  moments: Moment[];
  ticker: RouteTickerItem[];
  planner: Planner;
  formFields: FormFieldConfig[];
  memoryWall: {
    heading: string[];
    subtext: string;
    tiles: MemoryTile[];
    addTileText: string;
    addTileCta: string;
  };
  sections: {
    momentsHeading: string[];
    momentsSubtext: string;
    plannerHeading: string[];
    plannerSubtext: string;
  };
  footer: {
    areasServed: string[];
    copyright: string;
    tagline: string;
  };
  whatsapp: {
    defaultMessage: string;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    name: "Rastaa",
    tagline: "Trips built around a feeling",
  },

  nav: [
    { label: "Moments", href: "#moments" },
    { label: "Memory wall", href: "#wall" },
    { label: "Talk to a planner", href: "#plan" },
  ],

  hero: {
    eyebrow: "Not a package list — a feeling, mapped to a route",
    headlineLines: ["What do you", "want this trip", "to feel like?"],
    accentLineIndex: 2,
    moodPrompt: "Pick a feeling. We'll show you the moment built around it.",
  },

  moods: [
    { key: "all", index: "00", label: "Show me everything" },
    { key: "sunrise", index: "01", label: "Chase a sunrise" },
    { key: "quiet", index: "02", label: "Go quiet" },
    { key: "gold", index: "03", label: "Golden hour" },
    { key: "celebrate", index: "04", label: "Celebrate something" },
  ],

  moments: [
    {
      id: "agra-sunrise",
      mood: "sunrise",
      tag: "Same-day · Agra",
      quote:
        "We stood there as the light hit the marble — nobody spoke for a full minute.",
      title: "The sunrise you'll replay for years",
      description:
        "Dawn departure from Gurgaon, first light on the Taj, home before dinner.",
      proof: "6 travellers this week",
      size: "lg",
    },
    {
      id: "kasol-quiet",
      mood: "quiet",
      tag: "3–7 days · Kasol / Manali",
      quote: "First trip in years where my phone stayed in the bag.",
      title: "The mountain silence you haven't heard yet",
      description:
        "Slow-paced routes, altitude-aware stops, deliberately little on the itinerary.",
      proof: "4.9★ · quiet-trip riders",
    },
    {
      id: "jodhpur-gold",
      mood: "gold",
      tag: "2–5 days · Jodhpur / Jaisalmer",
      quote: "The fort walls turn amber right on cue — worth the whole drive.",
      title: "A fort at the hour it turns gold",
      description:
        "Timed arrivals for golden hour, heritage stays, desert nights included.",
      proof: "Best Oct–Mar",
    },
    {
      id: "jaipur-celebrate",
      mood: "celebrate",
      tag: "Weekend · Jaipur",
      quote:
        "We built the whole trip around the festival weekend — best call we made.",
      title: "A weekend built around the event",
      description:
        "Trips timed to festivals, full-moon nights, and seasonal windows near you.",
      proof: "Next window: check dates",
    },
    {
      id: "fatehpur-sunrise",
      mood: "sunrise",
      tag: "Add-on · Fatehpur Sikri",
      quote: "Almost skipped this — glad we didn't.",
      title: "The stop most people miss",
      description: "Twenty minutes off-route from Agra, empty most mornings.",
      proof: "Add for ₹500",
    },
    {
      id: "nainital-quiet",
      mood: "quiet",
      tag: "Weekend · Nainital",
      quote: "Sat by the lake with a book for two straight days. Perfect.",
      title: "A lake, and nothing on the schedule",
      description: "Minimal-plan weekend escape, deliberately under-booked.",
      proof: "Weekends only",
    },
  ],

  ticker: [
    { id: "t1", label: "Agra sunrise run" },
    { id: "t2", label: "Kasol silence · 5 days" },
    { id: "t3", label: "Jodhpur gold hour" },
    { id: "t4", label: "Manali slow travel" },
    { id: "t5", label: "Jaipur festival window" },
    { id: "t6", label: "Nainital lakeside quiet" },
  ],

  planner: {
    name: "Riya",
    role: "trip planner",
    initial: "R",
    statusText: "Usually replies in 12 min",
    note: "Send your feeling, dates, and group size. Riya maps the route, sends timing and stay options back on chat — no account, no call centre.",
    phoneDisplay: "+91 99999 99999",
    phoneIntl: "919999999999",
  },

  formFields: [
    {
      id: "name",
      label: "Full name",
      type: "text",
      placeholder: "Aditi Sharma",
      required: true,
      errorText: "Enter your name so Riya knows who to ask for.",
    },
    {
      id: "city",
      label: "Pickup city",
      type: "select",
      options: ["Delhi", "Gurgaon", "Noida", "Ghaziabad", "Faridabad"],
      required: true,
      errorText: "Pick where we should collect you from.",
    },
    {
      id: "mood",
      label: "The feeling you want",
      type: "select",
      options: [
        "Chase a sunrise",
        "Go quiet",
        "Golden hour",
        "Celebrate something",
      ],
      required: true,
      errorText: "Choose the moment you're chasing.",
    },
    {
      id: "date",
      label: "Travel date",
      type: "date",
      required: true,
      errorText: "A rough date helps Riya check availability.",
    },
    {
      id: "group",
      label: "Group size",
      type: "number",
      placeholder: "4",
      required: true,
      errorText: "Let us know how many are travelling.",
    },
  ],

  memoryWall: {
    heading: ["Real trips,", "not stock photos"],
    subtext:
      "One photo, sent back after the trip. This is the whole gallery — no stage-managed shoots.",
    tiles: [
      {
        id: "w1",
        name: "Aditi",
        place: "Agra",
        caption: "Worth the 5am alarm.",
      },
      {
        id: "w2",
        name: "Rohan",
        place: "Kasol",
        caption: "Best kind of nothing to do.",
      },
      {
        id: "w3",
        name: "Meher",
        place: "Jodhpur",
        caption: "That gold light was unreal.",
      },
      {
        id: "w4",
        name: "Kabir",
        place: "Nainital",
        caption: "Lake, book, done.",
      },
    ],
    addTileText: "Your trip could be next.",
    addTileCta: "Send us your one photo →",
  },

  sections: {
    momentsHeading: ["The moment,", "not the itinerary"],
    momentsSubtext:
      "Same driver, same permits, same doorstep pickup underneath — we just lead with the four minutes you'll actually remember.",
    plannerHeading: ["Tell a planner,", "not a form"],
    plannerSubtext:
      "This opens a real WhatsApp chat with the person who'll build your route.",
  },

  footer: {
    areasServed: ["Delhi", "Gurgaon", "Noida", "Ghaziabad", "Faridabad"],
    copyright: "© 2026 Rastaa Travels",
    tagline: "Built around the moment, not the map",
  },

  whatsapp: {
    defaultMessage: "Hi! I have a quick question.",
  },
};
