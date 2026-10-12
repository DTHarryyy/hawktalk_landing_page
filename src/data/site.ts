/**
 * All landing-page copy and links live here so they're easy to edit.
 */

export const APP_URL = 'https://hawktalk.pages.dev';
/** Google Play listing — replace '#' once the app is published. */
export const PLAY_STORE_URL = '#';
export const LOGO_SRC = '/hawktalk_logo.png';

export const brand = {
  name: 'HawkTalk',
  tagline: 'Smart Campus-Enabled Student Support System',
  descriptor: 'Your AI-powered campus assistant designed to make student life easier.',
  badge: 'Student Support • AI • Smart Campus',
  institution: 'Cagayan State University',
  institutionShort: 'CSU',
};

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'AI Demo', to: '/demo' },
  { label: 'Features', to: '/#features' },
  { label: 'FAQ', to: '/#faq' },
];

export const legalLinks = [
  // These point to the app for now.
  { label: 'Privacy Policy', href: APP_URL },
  { label: 'Terms & Conditions', href: APP_URL },
  { label: 'Community Standards', href: APP_URL },
];

export const hero = {
  headline: 'Ask anything about campus.',
  value:
    'Instant, trustworthy answers from Cagayan State University’s official documents — and a real person when the AI isn’t sure.',
  primaryCta: 'Try HawkTalk',
  secondaryCta: 'See the AI in action',
  platforms: 'Available on the web and Android',
  previewHeadline: 'How can HawkTalk help you today?',
  previewSub: 'Ask about academics, admissions, scholarships, campus services, and more.',
};

export const seo = {
  home: {
    title: 'HawkTalk — Smart Campus-Enabled Student Support System | CSU',
    description:
      'HawkTalk is Cagayan State University’s AI-powered campus assistant. Ask about the student manual, policies, offices, and campus places — answers come from official documents, with sources.',
  },
  demo: {
    title: 'HawkTalk AI Demo — Interactive Chat Simulator',
    description:
      'Try a scripted simulation of HawkTalk: watch the AI understand typos, follow up, check every condition, show campus maps, cite sources, and hand off to a human.',
  },
};

export const benefits = [
  {
    icon: 'library',
    title: 'Accessible, organized information',
    text: 'The student manual, policies, regulations, and announcements — searchable in plain language, in one place.',
  },
  {
    icon: 'zap',
    title: 'Fast answers to common questions',
    text: 'No more waiting in line or scrolling through PDFs for the questions every student asks.',
  },
  {
    icon: 'map',
    title: 'Find offices and resources easily',
    text: 'Ask where something is and get a pinned location on the campus map, with photos.',
  },
  {
    icon: 'inbox',
    title: 'One channel for student inquiries',
    text: 'If the AI can’t answer, your question is routed to the right office and a real person replies.',
  },
] as const;

export type Capability = { key: string; icon: string; title: string; text: string; example?: string };

export const capabilities: Capability[] = [
  {
    key: 'A',
    icon: 'book-check',
    title: 'Grounded in official documents',
    text: 'Answers come only from the university’s approved documents, with source chips so you can verify them. It doesn’t make things up.',
    example: 'Student Manual · p. 32',
  },
  {
    key: 'B',
    icon: 'spell-check',
    title: 'Understands what you meant',
    text: 'Silently fixes typos and shorthand.',
    example: '“dea’s lisr” → Dean’s List',
  },
  {
    key: 'C',
    icon: 'languages',
    title: 'Speaks your language',
    text: 'Ask in English, Filipino, or Taglish — it replies the same way.',
    example: '“Paano mag-apply ng scholarship?”',
  },
  {
    key: 'D',
    icon: 'history',
    title: 'Remembers the conversation',
    text: 'Follow-ups just work, without repeating yourself.',
    example: '“what about for undergrad?”',
  },
  {
    key: 'E',
    icon: 'hash',
    title: 'Precise with numbers and rules',
    text: 'Quotes figures exactly and keeps conditions attached.',
    example: '“94–96” is not “at least 94”',
  },
  {
    key: 'F',
    icon: 'list-checks',
    title: 'Checks every condition',
    text: 'It never over-promises “you qualify.”',
    example: '“Within range, but you also need…”',
  },
  {
    key: 'G',
    icon: 'git-branch',
    title: 'Reasons about context',
    text: 'Undergrad vs. graduate, honor tiers, the specific rule over the general one. Different scopes aren’t mistaken for contradictions.',
  },
  {
    key: 'H',
    icon: 'map-pin',
    title: 'Knows the campus',
    text: 'Answers location questions on an interactive map with photos, and asks which place you mean when the question is vague.',
  },
  {
    key: 'I',
    icon: 'globe',
    title: 'Checks the official website',
    text: 'When documents don’t cover it, it searches only the university’s official site and cites the exact page.',
  },
  {
    key: 'J',
    icon: 'text',
    title: 'Clear answers that stream live',
    text: 'Direct answer first, bold key values, steps and tables.',
  },
  {
    key: 'K',
    icon: 'mic',
    title: 'Multimodal',
    text: 'Type, speak, or attach a picture or file.',
  },
  {
    key: 'L',
    icon: 'user-round-check',
    title: 'Hands off to humans',
    text: '“Ask a campus admin” routes your question to the right department automatically; the reply arrives as a notification.',
  },
  {
    key: 'M',
    icon: 'shield-check',
    title: 'Privacy and safety',
    text: 'Questions are anonymized for FAQ trend reports, and it resists manipulation.',
  },
];

export const howItWorks = [
  { icon: 'message-circle', title: 'Ask', text: 'Type, speak, or attach a photo.' },
  {
    icon: 'search',
    title: 'HawkTalk searches',
    text: 'It looks through the university’s official documents (and the official website if needed).',
  },
  {
    icon: 'sparkles',
    title: 'Get a clear answer',
    text: 'With sources you can open — or a map if you asked about a place.',
  },
  {
    icon: 'user-round-check',
    title: 'Still stuck?',
    text: 'Send it to a campus admin, who will reply in the app.',
  },
];

/** Example question chips on the landing page — each opens /demo?q=… */
export const exampleQuestions = [
  'What average needed to be dea’s lisr',
  'I have a 95 GWA, do I qualify for Dean’s List?',
  'Paano mag-apply ng scholarship?',
  'Where is the registrar’s office?',
  'Where is the building?',
  'What’s the requirement for honors?',
  'Any announcements about the university foundation week?',
  'Can I get a refund for my dorm deposit?',
];

export const studentFeatures = [
  {
    icon: 'layout-grid',
    title: 'Quick topic shortcuts',
    text: 'Academics, Admissions, Scholarships, Campus Services, Technical Support — one tap to the common questions.',
  },
  {
    icon: 'history',
    title: 'Chat history',
    text: 'Conversations are saved across sessions. Rename, pin, and pick up where you left off.',
  },
  {
    icon: 'map',
    title: 'Interactive campus map',
    text: 'Pinned locations with photos and descriptions, plus live navigation.',
  },
  {
    icon: 'mic',
    title: 'Voice, images & files',
    text: 'Speak your question or attach a photo of a notice or a document.',
  },
  {
    icon: 'bell',
    title: 'Push notifications',
    text: 'Get notified the moment a campus admin answers your question.',
  },
  {
    icon: 'inbox',
    title: 'My Inquiries',
    text: 'Track every question you’ve sent to campus staff and its status.',
  },
  {
    icon: 'user-cog',
    title: 'Profile, settings & Help Center',
    text: 'Manage your account and find guides whenever you need them.',
  },
  {
    icon: 'user-round',
    title: 'Guest mode',
    text: 'Anyone can try a limited number of questions without signing in. Signed-in students get a higher limit.',
  },
  {
    icon: 'key-round',
    title: 'Account options',
    text: 'Student registration, account request, login, and password recovery.',
  },
];

export const university = {
  contributors: {
    title: 'Department contributors',
    subtitle: 'Office staff',
    items: [
      'Answer escalated student questions for their department',
      'Write reusable answers the AI can use from then on — visible to everyone (guests + students) or signed-in students only',
      'Upload documents for their department',
    ],
  },
  admins: {
    title: 'Administrators',
    subtitle: 'Full control of the system',
    items: [
      'Dashboard: active students, pending escalations, and AI health at a glance',
      'Knowledge base: upload official PDFs — the AI reads and transcribes each page (including tables) so it can search and cite them',
      'AI Insights: answer rate, response latency, failure reasons, request trends, guest vs. signed-in usage, and where answers came from (documents, office answers, university website)',
      'See why some questions couldn’t be answered — and where the knowledge base needs work',
      'Escalation management with department assignment',
      'Campus map editor: add pins, descriptions, and photos',
      'Student account management and contributor directory',
    ],
  },
};

export const faqs = [
  {
    q: 'Is HawkTalk free?',
    a: 'Yes. HawkTalk is free for Cagayan State University students and visitors.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Guests can try a limited number of questions without signing in. Signed-in students get a higher limit, saved chat history, and can send questions to campus offices.',
  },
  {
    q: 'Where do the answers come from?',
    a: 'From the university’s approved documents — the student manual, policies, regulations, announcements, and FAQs — plus answers written by campus offices. When those don’t cover it, HawkTalk checks only the official university website. Every answer shows its sources.',
  },
  {
    q: 'What if the AI doesn’t know the answer?',
    a: 'It tells you honestly instead of guessing, and offers an “Ask an admin this question” button. Your question is routed to the right campus office, and the reply comes back as a notification.',
  },
  {
    q: 'Does it understand Filipino or Taglish?',
    a: 'Yes. Ask in English, Filipino, or Taglish and HawkTalk replies in the same language.',
  },
  {
    q: 'What devices does it work on?',
    a: 'Any modern browser on phone, tablet, or computer at hawktalk.pages.dev, plus an Android app.',
  },
];

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  avatar?: string;
};

export const team: { program: string; members: TeamMember[] } = {
  program: 'BSIT, Major in Programming',
  members: [
    { name: 'Shammyr Kushley P. Torrejas', role: '', initials: 'ST', avatar: 'shamyrr.png' },
    { name: 'Maria Lyka Joyce M. Antonio', role: '', initials: 'MA', avatar: 'lyka.jpg' },
    { name: 'Mark Lemuel R. Orteza', role: '', initials: 'MO', avatar: 'ml.jpg' },
  ],
};

export const finalCta = {
  title: 'Your campus questions, answered.',
  text: 'Open HawkTalk in your browser — no download needed. Or try the interactive demo first.',
};
