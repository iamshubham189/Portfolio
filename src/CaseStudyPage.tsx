import { useEffect } from 'react';
import tapestoryImg from '@/imports/project_tapestory.jpg';
import clickCardImg from '@/imports/project_clickcard.jpg';
import brokrsHouseImg from '@/imports/project_brokrshouse.jpg';
import theBrokrsImg from '@/imports/project_thebrokrs.jpg';
import shyamJagatImg from '@/imports/project_shyamjagat.jpg';
import lifeOsImg from '@/imports/project_lifeos.jpg';
import shyamJagatDashboardImg from '@/imports/project_shyamjagat_dashboard.jpg';
import sahilHairExpertImg from '@/imports/project_sahilhairexpert.jpg';
import logoDesignImg from '@/imports/project_logodesign.jpg';

export interface ProjectHighlight {
  label: string;
  value: string;
  desc: string;
}

export interface ProjectCaseStudy {
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  projectType?: string;
  category: string;
  desc: string;
  tags: string[];
  img: string;
  accent: string;
  stageBg: string;
  liveUrl?: string;
  role: string;
  platform: string;
  tools: string[];
  snapshot?: { label: string; value: string }[];
  projectHighlights?: ProjectHighlight[];
  overview: string;
  problemHeading?: string;
  problem: string;
  designChallenge?: string;
  strategyHeading?: string;
  strategyPillars?: { num: string; title: string; desc: string }[];
  solution: string;
  highlights: { title: string; desc: string }[];
  outcome?: string;
  whatsNext?: { label: string; text: string }[];
}

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    slug: 'tapestory-admin',
    num: '01',
    title: 'Tapestory Admin Panel',
    subtitle: 'A central dashboard for staff to manage custom tailoring orders, workshop progress, and deliveries.',
    projectType: 'Marketplace Admin Dashboard · Product Design & Frontend · Live Web App',
    category: 'Custom Clothing Marketplace · Admin Dashboard',
    desc: 'An operations dashboard for the Tapestory team to track custom made-to-measure orders, review customer measurements, manage master tailors, and coordinate express city deliveries across 19 built-in screens.',
    tags: ['Admin Dashboard', 'Order Tracking', 'Operations Design', 'React & TypeScript'],
    img: tapestoryImg,
    accent: '#B69A68',
    stageBg: '#172B24',
    liveUrl: 'https://tapestory-azure.vercel.app',
    role: 'Product Designer & Frontend Developer',
    platform: 'Desktop Web Application',
    tools: ['Figma', 'React 19', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    snapshot: [
      { label: 'Platform Scope', value: '19 Built-in Admin Pages — Orders, Tailors, Measurements & Delivery' },
      { label: 'Main Workflow', value: 'Measurements Checked → Tailor Workshop → Quality Check → Express Delivery → Payment' },
      { label: 'Design System', value: 'Warm Ivory, Deep Forest Green, Muted Gold & Clean Inter Typography' },
      { label: 'Live Website', value: 'Interactive web app at tapestory-azure.vercel.app' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '5 Flows',
        desc: 'Staff login, custom fit review, workshop tracking, express delivery, and tailor payouts.',
      },
      {
        label: 'Screens Designed',
        value: '19 Screens',
        desc: '19 built-in admin screens including orders, tailor management, courier tracking, and payouts.',
      },
      {
        label: 'Pain Points Identified',
        value: '4 Problems',
        desc: 'Measurements lost in spreadsheets, unknown tailoring delays, refund confusion, and manual delivery calls.',
      },
      {
        label: 'UX Improvements',
        value: '5 Improvements',
        desc: '1-click demo login, visual measurement cards, table & board views, OTP delivery tracking, and clear payout tables.',
      },
      {
        label: 'Design Coverage',
        value: '7 Staff Roles',
        desc: 'Custom permissions for Super Admin, Operations, Finance, Tailor Manager, Customer Support, Marketing, and Analytics.',
      },
    ],
    overview:
      'Tapestory connects customers with independent tailors across India for custom made-to-measure clothing. The Tapestory Admin Panel gives company staff a single place to review customer measurements, assign orders to workshops, track local deliveries, and handle tailor payouts.',
    problemHeading: 'Custom tailoring is difficult to track with standard e-commerce tools.',
    problem:
      'Unlike ready-made retail, every custom tailoring order needs exact body measurements, fabric checks, multi-day workshop progress, and fit guarantees. When staff track this through phone calls and spreadsheets, orders get delayed and customer measurements get mixed up.',
    designChallenge:
      'How can we make a complex 19-screen dashboard so simple that staff can track every custom garment from first measurement to doorstep delivery without confusion?',
    strategyHeading: 'Clear Orders · Visible Measurements · Fast Delivery',
    strategyPillars: [
      {
        num: '01',
        title: 'Calm & Structured Layout',
        desc: 'Clean tables, clear spacing, and easy-to-read text so staff can review high volumes of orders without feeling overwhelmed.',
      },
      {
        num: '02',
        title: 'Visual Fit & Progress Tracking',
        desc: 'Customer body measurements and workshop deadlines appear right inside the order card so errors are caught early.',
      },
      {
        num: '03',
        title: 'Connected Delivery & Payouts',
        desc: 'Delivery drivers, customer drop-off verification codes, and tailor payout calculations all connect in one clear flow.',
      },
    ],
    solution:
      'A 19-screen dashboard built for marketplace staff to track custom orders, body measurements, and local deliveries in real time.',
    highlights: [
      {
        title: 'Staff Login & Roles',
        desc: '1-click demo access with custom permissions for 7 staff roles.',
      },
      {
        title: 'Custom Order Board',
        desc: 'Kanban board tracking tailoring stages alongside customer measurements.',
      },
      {
        title: 'Local Delivery Dispatch',
        desc: 'Assign city couriers with two-way verification codes for safe handover.',
      },
      {
        title: 'Tailor Payouts & Sales',
        desc: 'Clear calculation tables showing tailor earnings and sales trends.',
      },
    ],
    outcome:
      'A fully functional, live admin dashboard (tapestory-azure.vercel.app) that makes managing complex custom tailoring simple, clear, and easy to run.',
    whatsNext: [
      { label: 'Tailor Mobile App', text: 'Create a simple mobile version for master tailors to upload progress photos from their workshop.' },
      { label: 'Measurement Alerts', text: 'Highlight unusual customer measurements automatically so tailors can double-check before cutting fabric.' },
      { label: 'Live Delivery Map', text: 'Add a live map view to watch courier riders on their way to customer doorsteps.' },
    ],
  },
  {
    slug: 'lifeos',
    num: '02',
    title: 'LifeOS',
    subtitle: 'A calmer way to organize your daily life.',
    category: 'Personal Organizer App · Mobile UI/UX Concept',
    desc: 'An AI-assisted personal organizer that brings your daily schedules, priority tasks, quick notes, and long-term goals together into one peaceful mobile experience.',
    tags: ['Mobile App Design', 'Daily Planning', 'Goal Tracking', 'Helpful AI'],
    img: lifeOsImg,
    accent: '#2E5A50',
    stageBg: '#0C281F',
    role: 'Product & UI/UX Designer',
    platform: 'iOS & Android Mobile App',
    projectType: 'UI/UX Product Design Concept · Mobile App',
    tools: ['Figma', 'Information Architecture', 'Design System', 'AI Interaction Design'],
    snapshot: [
      { label: 'Format', value: 'Mobile App for iOS & Android' },
      { label: 'Main Focus', value: 'Simple organization, connected goals, and user control' },
      { label: 'Core Sections', value: 'Today · Life · Quick Note · Calendar · Profile' },
      { label: 'Visual Style', value: 'Forest Green, Warm Off-White, and clean modern typography' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '6 Flows',
        desc: 'Onboarding setup, daily priority view, quick voice & text notes, goal tracking, AI weekly plan, and life areas.',
      },
      {
        label: 'Screens Designed',
        value: '30 Screens',
        desc: '30 mobile screens including onboarding steps, daily timeline, note review, goal roadmaps, and category dashboards.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Important details scattered across 12 apps, urgent tasks lost in noise, and AI tools acting without user permission.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: '"Needs Attention" top alert bar, review screen before saving notes, goal-linked tasks, and Accept / Edit / Dismiss buttons for AI.',
      },
      {
        label: 'Design Coverage',
        value: '8 Life Areas',
        desc: 'Organized into Money, Health, Work, Travel, Vehicle, Personal, Entertainment, and Documents across 5 main tabs.',
      },
    ],
    overview:
      'LifeOS is a mobile concept for personal organization. Instead of using separate apps for reminders, bills, travel tickets, and fitness goals, LifeOS organizes them into one simple, stress-free space.',
    problemHeading: 'Our daily lives are connected, but our apps keep everything separated.',
    problem:
      'An upcoming doctor visit, health reports, and prescription reminders all belong to the same topic, yet live in three different apps. People end up stressed switching between calendars, notes, and task lists, often missing urgent bills or renewals.',
    designChallenge:
      'How can one simple mobile app help people manage daily tasks and future goals without feeling overwhelmed or losing control?',
    strategyHeading: 'Urgent First · Connected Context · User in Control',
    strategyPillars: [
      {
        num: '01',
        title: 'Show Urgent Items First',
        desc: 'Highlight urgent tasks and bills right at the top of the Today screen before the general timeline.',
      },
      {
        num: '02',
        title: 'Connect Tasks to Real Goals',
        desc: 'Group tasks, files, and reminders under clear goals like "Half Marathon" or "Family Trip" instead of isolated checklists.',
      },
      {
        num: '03',
        title: 'AI That Suggests, Never Dictates',
        desc: 'Always let users review, edit, or dismiss AI suggestions with clear buttons before anything is saved.',
      },
    ],
    solution:
      'A calm 30-screen mobile system that unites daily schedules, quick note capture, and goal tracking in one place.',
    highlights: [
      {
        title: 'Today Priority View',
        desc: 'Highlights urgent bills and appointments first, followed by the daily schedule.',
      },
      {
        title: 'Quick Note Capture',
        desc: 'Type or speak naturally; review extracted details before anything is saved.',
      },
      {
        title: 'Goals & Life Areas',
        desc: 'Keeps related tasks, notes, and files grouped under 8 everyday categories.',
      },
      {
        title: 'Reviewable AI Plans',
        desc: 'AI suggests weekly schedules with clear Accept, Edit, and Dismiss buttons.',
      },
    ],
    outcome:
      'A mobile design that takes the mental stress out of daily planning, giving people one calm place for their priorities while keeping them fully in charge.',
    whatsNext: [
      { label: 'User Testing', text: 'Test how quickly new users find items across categories and threads.' },
      { label: 'Voice Note Accuracy', text: 'Test how well voice notes handle mixed languages and everyday phrasing.' },
      { label: 'Notification Settings', text: 'Give users simple controls to choose which reminders they want to receive.' },
    ],
  },
  {
    slug: 'brokrs-house',
    num: '03',
    title: 'Brokrs House',
    subtitle: 'A connected workspace for real estate brokers.',
    category: 'Real Estate Platform · Mobile Product Design',
    desc: 'A mobile app that helps real estate brokers find verified builder properties, protect their buyer leads, and track commission earnings from start to payout.',
    tags: ['Real Estate App', 'Lead Management', 'Commission Tracking', 'Broker Tools'],
    img: brokrsHouseImg,
    accent: '#C9A84C',
    stageBg: '#FEFDF9',
    role: 'Product & Brand Designer',
    platform: 'iOS & Android Mobile App',
    projectType: 'Brand Identity & Mobile App Design',
    tools: ['Figma', 'Brand Identity', 'Design System', 'Prototyping'],
    snapshot: [
      { label: 'Platform Scope', value: 'Mobile workspace for brokers with builder and buyer connections' },
      { label: 'Core Steps', value: 'Sign Up → Find Property → Register Buyer → Hold Unit → Get Paid' },
      { label: 'Key Features', value: 'Verified listings, 48-hr unit hold, 7-day lead lock & payout tracker' },
      { label: 'Visual Style', value: 'Navy Blue, Warm Gold & crisp, scannable cards' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '5 Flows',
        desc: 'Broker sign-up & RERA verification, property search, unit & commission check, lead tracking, and unit hold to payout.',
      },
      {
        label: 'Screens Designed',
        value: '22 Screens',
        desc: '22 screens covering onboarding, property search, live unit availability, lead stages, and payment history.',
      },
      {
        label: 'Pain Points Identified',
        value: '4 Problems',
        desc: 'Scattered builder project PDFs, forgotten buyer follow-ups, hidden commission rates, and brokers losing credit for their leads.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: 'Commission percentage tags on every card, live tower unit availability, 48-hour unit hold timer, and 7-day buyer claim protection.',
      },
      {
        label: 'Design Coverage',
        value: '3 Platform Roles',
        desc: 'Focused on Brokers as the primary user, with connected workflows for Builders/Developers and Buyers.',
      },
    ],
    overview:
      'Brokrs House is a mobile app created for real estate brokers in India. It brings together verified builder projects, client lead tracking, unit booking holds, and commission payouts into one easy-to-use mobile workspace.',
    problemHeading: 'Brokers lose deals and commissions because information is scattered.',
    problem:
      'Brokers usually juggle project brochures on WhatsApp, keep client notes in diaries, and struggle to know which apartment units are actually available. Worst of all, they often worry whether builders will honor their buyer registration and pay commissions on time.',
    designChallenge:
      'How might we give brokers a single tool to discover properties, protect their registered buyers, and see their exact commission payouts with total confidence?',
    strategyHeading: 'Find Easily · Protect Leads · Track Payouts',
    strategyPillars: [
      {
        num: '01',
        title: 'Property Details in One Glance',
        desc: 'Show price ranges, tower unit availability, and exact broker commission percentages right on the property card.',
      },
      {
        num: '02',
        title: 'Simple Buyer Pipeline',
        desc: 'Organize buyer leads by stage (interested, site visit scheduled, negotiating) with quick follow-up reminders.',
      },
      {
        num: '03',
        title: 'Deal Protection & Payout Records',
        desc: 'Lock in registered buyers for 7 days, hold units for 48 hours, and track builder payouts directly to the bank.',
      },
    ],
    solution:
      'A 22-screen broker workspace connecting property search, buyer lead protection, and payout tracking.',
    highlights: [
      {
        title: 'Broker Sign-Up & Search',
        desc: 'Fast license verification with property filters and clear commission tags.',
      },
      {
        title: 'Live Tower Inventory',
        desc: 'Real-time flat availability and upfront commission percentage on each unit.',
      },
      {
        title: '7-Day Lead Protection',
        desc: 'Protects registered buyer leads so brokers never lose credit for their deals.',
      },
      {
        title: '48-Hour Unit Hold',
        desc: 'Holds selected flats for serious buyers and tracks approved builder payouts.',
      },
    ],
    outcome:
      'A clear, dependable mobile workspace that saves brokers hours of phone calls and gives them complete confidence in their earnings.',
    whatsNext: [
      { label: 'Broker Feedback', text: 'Interview active brokers to test how smoothly the license check works during sign-up.' },
      { label: 'Inventory Sync', text: 'Ensure tower unit availability updates instantaneously when a builder locks a flat.' },
      { label: 'Commission Reminders', text: 'Add instant push notifications when a builder approves a milestone payout.' },
    ],
  },
  {
    slug: 'shyam-jagat',
    num: '04',
    title: 'Shyam Jagat',
    subtitle: 'Connecting devotion, temples, and seva in one simple place.',
    category: 'Community & Devotion Website · UI/UX Design',
    desc: 'A community web platform that helps devotees discover verified temples across India, find devotional singers and musicians, make verified donations, and join community activities.',
    tags: ['Web Design', 'Community Platform', 'Temple Directory', 'Easy Donations'],
    img: shyamJagatImg,
    accent: '#D95B16',
    stageBg: '#F4EDE2',
    liveUrl: 'https://ssj-three.vercel.app/',
    role: 'UI/UX & Product Designer',
    platform: 'Desktop & Responsive Web',
    tools: ['Figma', 'UI/UX Design', 'Design System'],
    snapshot: [
      { label: 'Website Type', value: 'Responsive web platform for desktop and mobile' },
      { label: 'Audience', value: 'Devotees, devotional artists, temple committees & volunteers' },
      { label: 'Main Journey', value: 'Find Temples → Watch & Listen → Donate to Seva → Join Community' },
      { label: 'Live Link', value: 'ssj-three.vercel.app' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '3 Flows',
        desc: 'Temple & artist discovery, guided Seva donation, and community role registration.',
      },
      {
        label: 'Screens Designed',
        value: '8 Web Views',
        desc: '8 responsive website pages including home, temple search, artist listings, donation desk, and registration.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Inaccurate temple timings on the internet, difficulty finding genuine bhajan artists, and no transparent donation options.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: 'State and deity search filters, verified community badges, preset UPI donation amounts, and simple role sign-up cards.',
      },
      {
        label: 'Design Coverage',
        value: '6 Community Roles',
        desc: 'Devotees, Bhajan Singers, Folk Dancers, Musicians, Temples, and Pilgrim Guest Houses (Dharmashalas).',
      },
    ],
    overview:
      'Shree Shyam Jagat is a socio-spiritual website that brings devotees together with verified temples across India, devotional artists, charitable causes (Seva), and community sign-ups.',
    problemHeading: 'Devotees struggle to find verified temple details and trustworthy causes.',
    problem:
      'When planning a temple visit or family prayer gathering, devotees often find outdated timings and contact numbers online. At the same time, people want to support meaningful charity like feeding the needy or temple maintenance, but worry about donation transparency.',
    designChallenge:
      'How can we create a welcoming, easy-to-use website that helps anyone find verified temples, book devotional artists, and donate with complete confidence?',
    strategyHeading: 'Discover · Contribute · Belong',
    strategyPillars: [
      {
        num: '01',
        title: 'Fast Temple & Artist Search',
        desc: 'Simple filters by state, city, and deity so families can quickly find verified temples and devotional performers.',
      },
      {
        num: '02',
        title: 'Clear & Trustworthy Giving',
        desc: 'Preset donation amounts, clear descriptions of charitable causes, and instant UPI payment receipts.',
      },
      {
        num: '03',
        title: 'Welcoming Community Roles',
        desc: 'Easy sign-up cards allowing singers, temples, and guest houses to list their services and get verified.',
      },
    ],
    solution:
      'A warm, culturally rooted website connecting verified temples, devotional artists, and charitable seva.',
    highlights: [
      {
        title: 'Verified Temple Directory',
        desc: 'Search temples by state and deity with confirmed darshan timings.',
      },
      {
        title: 'Devotional Artists',
        desc: 'Find bhajan singers and musicians with ratings and direct contact info.',
      },
      {
        title: 'Guided Seva Donations',
        desc: 'Preset donation amounts for verified causes with instant UPI receipts.',
      },
      {
        title: 'Community Sign-Up',
        desc: 'Simple onboarding cards for temples, artists, and guest houses to join.',
      },
    ],
    outcome:
      'A warm, trustworthy website (ssj-three.vercel.app) that makes spiritual discovery and charitable giving accessible and clear for people of all age groups.',
    whatsNext: [
      { label: 'Audio Previews', text: 'Add a compact audio player so visitors can listen to devotional bhajans directly on artist cards.' },
      { label: 'Festival Calendar', text: 'Create an interactive calendar showing upcoming auspicious dates and temple kirtans.' },
      { label: 'Direct Messaging', text: 'Let event organizers message verified artists directly for family satsang bookings.' },
    ],
  },
  {
    slug: 'the-brokrs',
    num: '05',
    title: 'The Brokrs',
    subtitle: 'Investments, everyday services, and rewards in one connected app.',
    category: 'Multi-Service Investment App · Mobile UI/UX Design',
    desc: 'A mobile application that unites project investments, daily household services, partner deals, and digital wallet rewards into one straightforward experience.',
    tags: ['Mobile App Design', 'Investments', 'Services Marketplace', 'Wallet & Rewards'],
    img: theBrokrsImg,
    accent: '#E09214',
    stageBg: '#FEFDF9',
    role: 'UI/UX & Product Designer',
    platform: 'iOS & Android Mobile App',
    tools: ['Figma', 'Experience Mapping', 'Mobile UI Design'],
    snapshot: [
      { label: 'Platform Scope', value: 'Mobile app for iOS and Android' },
      { label: 'Key Areas', value: 'Real Estate, Technology, Farming & Daily Services' },
      { label: 'Main Journey', value: 'Browse Projects → Review Details → Secure Checkout → Track Progress' },
      { label: 'Visual Style', value: 'Navy Blue, Amber Gold & clean data cards' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '5 Flows',
        desc: 'Account sign-in, project & service discovery, checkout & payment retry, partner discounts, and wallet with KYC.',
      },
      {
        label: 'Screens Designed',
        value: '24 Screens',
        desc: '24 screens including home feed, service marketplace, project roadmaps, payment flows, rewards, and KYC status.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Investments and everyday services separated across apps, confusing payment failure screens, and mixed-up cash vs. reward balances.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: '5-step visual project roadmap, transparent tax and fee breakdown before paying, simple retry screen for failed bank payments, and separate wallet cash vs reward point cards.',
      },
      {
        label: 'Design Coverage',
        value: '4 Service Sectors',
        desc: 'Real Estate, Technology Projects, Hybrid Farming, and Everyday Services like Insurance, Loans, and Travel.',
      },
    ],
    overview:
      'THE BROKRS is a mobile platform that brings together modern investment opportunities (in real estate, tech projects, and hybrid farming) alongside everyday services like insurance, loans, and partner discounts.',
    problemHeading: 'Managing investments and services across separate apps creates confusion.',
    problem:
      'Users often have to use one app to invest, another to pay for services, and a third to track rewards. When payments fail or fees are hidden, users lose trust and abandon their transactions.',
    designChallenge:
      'How can we combine multiple investment sectors and daily services in one mobile app while keeping every financial detail simple, clear, and reassuring?',
    strategyHeading: 'Clear Choices · Honest Numbers · Easy Tracking',
    strategyPillars: [
      {
        num: '01',
        title: 'Transparent Project Roadmaps',
        desc: 'Show real project milestones, expected timelines, and clear earnings estimates before anyone invests.',
      },
      {
        num: '02',
        title: 'Friction-Free Checkout & Recovery',
        desc: 'Show exact taxes and fees upfront, and provide friendly, one-tap retry options if a bank payment fails.',
      },
      {
        num: '03',
        title: 'Separate Cash & Reward Points',
        desc: 'Clearly distinguish available wallet cash from earned reward points to prevent withdrawal confusion.',
      },
    ],
    solution:
      'A 24-screen mobile app combining project investments, everyday household services, and digital wallet rewards.',
    highlights: [
      {
        title: 'Marketplace Hub',
        desc: 'Browse Real Estate, Tech, and Farming projects with clear funding bars.',
      },
      {
        title: 'Project Roadmaps',
        desc: 'Visual timelines showing project milestones and estimated returns.',
      },
      {
        title: 'Clear Checkout & Retry',
        desc: 'Upfront fee breakdown with a friendly 1-tap retry if payments fail.',
      },
      {
        title: 'Partner Perks & Wallet',
        desc: 'Claim discount vouchers and convert reward points into bank cashback.',
      },
    ],
    outcome:
      'A reliable, straightforward mobile experience that makes exploring diverse investments and daily services feel clear, accessible, and stress-free.',
    whatsNext: [
      { label: 'Payment Success Testing', text: 'Test how easily users recover from bank network timeouts during UPI checkout.' },
      { label: 'Savings Calculator', text: 'Add an interactive tool to let users see projected returns before investing.' },
      { label: 'Referral Rewards', text: 'Design a simple invite-a-friend card that rewards both users with bonus points.' },
    ],
  },
  {
    slug: 'clickcard',
    num: '06',
    title: 'ClickCard',
    subtitle: 'One single link for your entire digital identity.',
    category: 'Digital Business Card · Web Product Design',
    desc: 'A modern web platform that lets professionals, creators, and students combine their social profiles, portfolio work, resumes, and contact info into a single shareable card.',
    tags: ['Product Design', 'Digital Business Card', 'Link in Bio', 'Instant Sharing'],
    img: clickCardImg,
    accent: '#009E88',
    stageBg: '#FDFEF9',
    liveUrl: 'https://clickcard-2.vercel.app/',
    role: 'UI/UX Designer',
    platform: 'Responsive Web Application',
    tools: ['Figma', 'UI Design', 'Prototyping'],
    snapshot: [
      { label: 'Platform Scope', value: 'Responsive web application for desktop and mobile' },
      { label: 'Target Audience', value: 'Working professionals, freelancers, students & small businesses' },
      { label: 'Core Steps', value: 'Create Profile → Pick Design → Share Link or QR → View Stats' },
      { label: 'Live Link', value: 'clickcard-2.vercel.app' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '4 Flows',
        desc: 'Sign up, profile & social link setup, card template styling, and QR code sharing with view tracking.',
      },
      {
        label: 'Screens Designed',
        value: '12 Screens',
        desc: '12 screens across landing page, feature preview, Card Studio editor, mobile card views, QR modal, and analytics.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Sharing multiple separate links for LinkedIn and portfolios, paper cards getting lost or outdated, and zero insight into profile views.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: 'All personal links in one place, ready-to-use Card Studio card designs, instant QR code sharing, and simple view & click counter badges.',
      },
      {
        label: 'Design Coverage',
        value: '4 User Types',
        desc: 'Tailored options for Students, Working Professionals, Content Creators, and Small Business Owners.',
      },
    ],
    overview:
      'ClickCard is a digital business card platform that brings your resume, portfolio links, social media profiles, and contact details together into one clean link and QR code, replacing paper cards that get thrown away.',
    problemHeading: 'Paper business cards get lost, and sharing multiple web links is frustrating.',
    problem:
      'Whenever you meet someone new, sharing separate links for your LinkedIn, portfolio, GitHub, and phone number is clumsy. Paper cards quickly become outdated whenever your number or job title changes.',
    designChallenge:
      'How might we create a digital card that anyone can set up in under 3 minutes, customize to match their personal style, and share with a single tap?',
    strategyHeading: 'Create · Customize · Share · Measure',
    strategyPillars: [
      {
        num: '01',
        title: '3-Minute Setup',
        desc: 'Add your photo, job title, and social links with simple form fields and real-time live preview.',
      },
      {
        num: '02',
        title: 'Instant QR & Link Sharing',
        desc: 'Share your card instantly using a custom short link, a scannable QR code, or an NFC card tap.',
      },
      {
        num: '03',
        title: 'Simple Visit Tracking',
        desc: 'See how many people viewed your card and clicked your links with easy-to-read counters.',
      },
    ],
    solution:
      'A clean 12-screen web application to create, customize, and share digital cards in under 3 minutes.',
    highlights: [
      {
        title: 'All-in-One Profile',
        desc: 'Combines your resume, portfolio work, social links, and contact info on one link.',
      },
      {
        title: 'Card Studio Templates',
        desc: 'Ready-to-use themes and font styles that look great on any device.',
      },
      {
        title: 'Instant QR Sharing',
        desc: 'Share via custom web link, scannable QR code, or NFC tap.',
      },
      {
        title: 'Visitor View Counters',
        desc: 'Simple counters showing profile views and top link clicks.',
      },
    ],
    outcome:
      'A clean, modern platform (clickcard-2.vercel.app) that makes sharing your professional identity fast, memorable, and environmentally friendly.',
    whatsNext: [
      { label: 'Company Team Cards', text: 'Allow small businesses to create branded digital cards for their entire team with central control.' },
      { label: 'Direct Contact Save (.vcf)', text: 'Add a 1-tap button allowing recipients to save your details directly into their phone contacts.' },
      { label: 'Custom Domain Links', text: 'Let users connect their personal domain name to their ClickCard page.' },
    ],
  },
  {
    slug: 'shyam-jagat-admin',
    num: '07',
    title: 'Shyam Jagat Admin Panel',
    subtitle: 'A clear operations dashboard for managing the community.',
    category: 'Community Admin Portal · Dashboard UI/UX Design',
    desc: 'An operations dashboard that helps platform administrators manage temples, devotional artists, community events, seva donations, and member verifications in one place.',
    tags: ['Dashboard UX', 'Admin Console', 'Table Design', 'Document Verification'],
    img: shyamJagatDashboardImg,
    accent: '#C85D2A',
    stageBg: '#F3E6D8',
    role: 'UI/UX & Product Designer',
    platform: 'Desktop Web Admin Portal',
    tools: ['Figma', 'Dashboard UX', 'Design System'],
    snapshot: [
      { label: 'Platform Scope', value: 'Desktop web portal for administrative staff' },
      { label: 'Users', value: 'Platform administrators, content managers & verification reviewers' },
      { label: 'Key Tasks', value: 'Monitor Platform → Publish Content → Verify Applications → Audit Donations' },
      { label: 'Design System', value: 'Deep Burgundy, Warm Parchment & structured data tables' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '4 Flows',
        desc: 'Dashboard overview check, blog & seva event publishing, donation audit with 80G tax receipts, and registration approvals.',
      },
      {
        label: 'Screens Designed',
        value: '5 Admin Views',
        desc: '5 high-density screens including platform summary, event publishing table, content manager, donation ledger, and approval modal.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Managing 16 community sections manually, slow checking of applicant ID documents, and messy donation spreadsheets.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: '12 live summary cards on the home screen, consistent search and filters on every table, one-click 80G receipt status, and a pop-up document reviewer.',
      },
      {
        label: 'Design Coverage',
        value: '16 Admin Modules',
        desc: 'Temples, Artists, Guest Houses (Dharmashalas), Organizations, Communities, Donations, Events, Blogs, Users, and Verifications.',
      },
    ],
    overview:
      'The Shyam Jagat Admin Panel is the management workspace behind the Shyam Jagat community platform. It allows staff to approve new temple listings, review artist profiles, verify ID documents, publish events, and audit seva donations.',
    problemHeading: 'Managing hundreds of temples, artists, and donations across spreadsheets causes errors.',
    problem:
      'With more than 1,200 temples and 800 artists joining the platform, staff were overwhelmed trying to verify identity documents, track donor receipts, and coordinate community events through manual spreadsheets.',
    designChallenge:
      'How can we organize 16 different community sections into one simple dashboard so staff can verify listings and audit donations in seconds?',
    strategyHeading: 'Overview First · Familiar Tables · Fast Review',
    strategyPillars: [
      {
        num: '01',
        title: 'Instant Platform Overview',
        desc: 'Show 12 key numbers right on the home screen so staff immediately know what needs attention.',
      },
      {
        num: '02',
        title: 'Consistent Table Layouts',
        desc: 'Use the same familiar search, filter, and action buttons across all tables so staff never feel lost.',
      },
      {
        num: '03',
        title: 'Side-by-Side Document Review',
        desc: 'View submitted ID proofs and certificates directly inside an approval pop-up without downloading files.',
      },
    ],
    solution:
      'A structured 5-screen admin console for staff to manage community listings, publish events, and audit seva donations.',
    highlights: [
      {
        title: 'Summary Dashboard',
        desc: '12 live counters showing temples, artists, donations, and pending reviews.',
      },
      {
        title: 'Publishing Tables',
        desc: 'Manage blog articles, temple timings, and community seva events.',
      },
      {
        title: 'Donation Audit Ledger',
        desc: 'Full payment records with UPI status and instant 80G tax receipt tracking.',
      },
      {
        title: 'Document Review Pop-Up',
        desc: 'Inspect applicant ID documents side-by-side for quick approvals.',
      },
    ],
    outcome:
      'A structured, calm admin dashboard that reduced verification backlogs and gave staff full visibility over daily community operations.',
    whatsNext: [
      { label: 'Bulk Document Approval', text: 'Allow reviewers to approve multiple verified temple renewal documents at once.' },
      { label: 'Automated 80G Receipts', text: 'Generate and email official 80G tax receipts to donors automatically upon payment.' },
      { label: 'Staff Activity Log', text: 'Track which admin approved or edited each listing for better team accountability.' },
    ],
  },
  {
    slug: 'sahil-hair-expert',
    num: '08',
    title: 'Sahil Hair Expert',
    subtitle: 'A smooth 3-step online booking desk for a luxury salon.',
    category: 'Salon Booking Website · Live Web Product',
    desc: 'A luxury hair and grooming salon booking website where clients can explore treatments, see clear prices and session times, bundle multiple services, and reserve their visit online.',
    tags: ['Salon Booking', 'Transparent Pricing', '3-Step Flow', 'Mobile Web'],
    img: sahilHairExpertImg,
    accent: '#C59B27',
    stageBg: '#0B0B0B',
    liveUrl: 'https://www.sahilhairexpert.com/',
    role: 'UI/UX Designer',
    platform: 'Responsive Web Application',
    projectType: 'Luxury Salon Booking Website · Live Web Product',
    tools: ['Figma', 'Booking Flow UX', 'Visual Identity', 'Responsive Web'],
    snapshot: [
      { label: 'Website Type', value: 'Responsive booking website for mobile and desktop' },
      { label: 'Salon Brand', value: 'Sahil Hair Expert · Luxury Hairstyling & Grooming Studio' },
      { label: 'Booking Flow', value: '1. Select Services → 2. Choose Time Slot → 3. Enter Your Details' },
      { label: 'Live Website', value: 'sahilhairexpert.com' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '3 Flows',
        desc: '1. Pick services and treatments, 2. Select appointment date and time slot, 3. Enter contact info and confirm.',
      },
      {
        label: 'Screens Designed',
        value: '6 Web Views',
        desc: '6 responsive views including salon hero with live status, 3-step booking desk, category filters, live total bar, gallery, and concierge.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Clients having to call to ask for service prices, hidden treatment durations, and difficulty bundling multiple services.',
      },
      {
        label: 'UX Improvements',
        value: '4 Improvements',
        desc: 'Live "Open / Closed" badge at the top, exact price and duration on every card, 1-tap "+ Add Service" bundling, and a live running total price bar.',
      },
      {
        label: 'Design Coverage',
        value: '4 Service Categories',
        desc: 'Men\'s Grooming, Women\'s Styling, Hair & Scalp Treatments, and Individual Grooming Packages.',
      },
    ],
    overview:
      'Sahil Hair Expert is a live salon booking website that makes scheduling luxury hair styling and grooming appointments effortless. Clients can explore services, see exact prices and durations upfront, and book appointments in three quick steps.',
    problemHeading: 'Booking salon appointments over phone calls is slow and unclear.',
    problem:
      'Most salon websites only show vague price lists with no treatment times, forcing clients to call or message to find out how long a service takes, how much it costs, and when slots are available.',
    designChallenge:
      'How can we create a self-service booking experience that shows upfront prices and durations, lets clients bundle services easily, and reflects the salon\'s luxury brand?',
    strategyHeading: 'Upfront Pricing · Clear Timing · 3 Simple Steps',
    strategyPillars: [
      {
        num: '01',
        title: 'Live Studio Status & Trust',
        desc: 'Display clear opening hours (Open · Closes 9:30 PM) and studio photos right at the top of the page.',
      },
      {
        num: '02',
        title: 'Transparent Prices & Minutes',
        desc: 'Show exact prices (₹250 to ₹12,000) and service duration (45 min to 300 min) with a 1-tap "+ Add Service" button.',
      },
      {
        num: '03',
        title: 'Guided 3-Step Reservation',
        desc: 'Guide clients step-by-step with a running total price bar and a direct WhatsApp concierge button for special requests.',
      },
    ],
    solution:
      'A luxury booking website featuring transparent service prices, treatment bundling, and an easy 3-step checkout.',
    highlights: [
      {
        title: 'Live Studio Status',
        desc: 'Real-time indicator showing today\'s hours, open/closed status, and location.',
      },
      {
        title: '3-Step Booking Desk',
        desc: 'Smooth progression: 1. Select Services, 2. Choose Time Slot, 3. Confirm.',
      },
      {
        title: 'Multi-Service Bundling',
        desc: 'Bundle treatments with exact prices and session durations on every card.',
      },
      {
        title: 'Running Total Bar',
        desc: 'Live price estimator bar with direct 1-tap WhatsApp concierge support.',
      },
    ],
    outcome:
      'A live, high-converting booking website (sahilhairexpert.com) that eliminated phone-tag, made pricing completely transparent, and increased direct online reservations.',
    whatsNext: [
      { label: 'Stylist Selection', text: 'Allow clients to pick their preferred master stylist and preview their portfolio photos.' },
      { label: 'Multiple Studio Branches', text: 'Add a branch selector as the upcoming Delhi studio opens its doors.' },
      { label: 'SMS Appointment Reminders', text: 'Send clients automated calendar invites and SMS reminders 2 hours before their appointment.' },
    ],
  },
  {
    slug: 'logo-design',
    num: '09',
    title: 'Logo Design',
    subtitle: 'Strategic logo concepts and brand identity systems.',
    category: 'Brand Identity & Logo Design Collection',
    desc: 'A collection of 5 custom brand logos and rationale boards showing how simple geometric shapes, purposeful colors, and clear metaphors create memorable brand identities.',
    tags: ['Logo Design', 'Brand Identity', 'Symbol Design', 'Color Systems'],
    img: logoDesignImg,
    accent: '#C48F45',
    stageBg: '#18130E',
    role: 'Brand & Visual Identity Designer',
    platform: 'Digital, Print & Brand Systems',
    projectType: 'Logo Concept & Brand Rationale Collection (5 Brands)',
    tools: ['Adobe Illustrator', 'Figma', 'Grid Systems', 'Typography'],
    snapshot: [
      { label: 'Collection Scope', value: '5 Brand Identities — Brokrs House, ClickCard, Shyam Jagat, ABAS & Nova Grid' },
      { label: 'Deliverables', value: 'Symbol breakdown, grid construction, color palettes & typography' },
      { label: 'Industry Sectors', value: 'Real Estate, Digital Identity, Spiritual Devotion & Heritage' },
      { label: 'Design Approach', value: 'Meaningful visual symbols paired with clean, scalable marks' },
    ],
    projectHighlights: [
      {
        label: 'User Flows',
        value: '5 Brand Stories',
        desc: '5 visual brand narratives explaining how each identity mark was conceived, constructed, and used.',
      },
      {
        label: 'Screens Designed',
        value: '5 Identity Boards',
        desc: '5 detailed presentation boards created for Brokrs House, ClickCard, Shyam Jagat, ABAS, and Nova Grid.',
      },
      {
        label: 'Pain Points Identified',
        value: '3 Problems',
        desc: 'Generic logos that lack meaning, logos that don\'t scale well from app icons to print, and brands without clear color rules.',
      },
      {
        label: 'UX Improvements',
        value: '4 Visual Improvements',
        desc: 'Simple geometric symbol equations (e.g., House + People = Connected Broker), strict color palettes with hex codes, clear minimum size guidelines, and readable typography pairings.',
      },
      {
        label: 'Design Coverage',
        value: '5 Industry Sectors',
        desc: 'Real Estate, Digital Identity, Spiritual Devotion, Cultural Heritage, and Land Development.',
      },
    ],
    overview:
      'A showcase of five logo designs and brand identity boards. Each project breaks down how simple geometric shapes, cultural symbols, and color palettes were chosen to give each brand an unforgettable, trustworthy identity.',
    problemHeading: 'A memorable brand needs real meaning, not just decoration.',
    problem:
      'Many brands use generic template logos that fail to tell a story or explain what the company does. Without clear rules for colors, spacing, and minimum sizes, logos look messy when printed on business cards or resized into small mobile app icons.',
    designChallenge:
      'How might we distill each brand\'s core purpose into a simple, iconic symbol backed by clear colors and typography that looks sharp anywhere?',
    strategyHeading: 'Symbolism · Geometry · Color Purpose',
    strategyPillars: [
      {
        num: '01',
        title: 'Meaningful Visual Equations',
        desc: 'Build every logo from simple symbolic ideas, like Square (Homes) + Circle (People) for Brokrs House, or Layered Cards + Arrow for ClickCard.',
      },
      {
        num: '02',
        title: 'Purposeful Color Palettes',
        desc: 'Select colors that communicate trust and emotion, from Trust Blue and Digital Teal to Devotional Saffron and Heritage Gold.',
      },
      {
        num: '03',
        title: 'Scalable Vector Marks',
        desc: 'Ensure every mark remains crisp and legible whether displayed as a 24px favicon or printed on a large billboard.',
      },
    ],
    solution:
      'Curated Brand Rationale boards detailing the geometry, symbolism, and color systems behind 5 custom identities.',
    highlights: [
      {
        title: 'Brokrs House & Nova Grid',
        desc: 'Real estate marks uniting homes, people, and land gridlines in trust blue and gold.',
      },
      {
        title: 'ClickCard Mark',
        desc: 'Layered cards with a forward arrow in digital teal representing quick connections.',
      },
      {
        title: 'Shyam Jagat Mark',
        desc: 'Sacred aura, divine flame, and blessing hand in saffron orange and temple maroon.',
      },
      {
        title: 'ABAS Heritage Mark',
        desc: 'Tree of togetherness with connected community nodes in royal maroon and gold.',
      },
    ],
    outcome:
      'Five distinct, rationale-backed brand identity marks where every line, shape, and color serves a clear and purposeful story.',
    whatsNext: [
      { label: 'Brand Asset Files', text: 'Package high-resolution SVG, PNG, and vector PDF files formatted for light and dark backgrounds.' },
      { label: 'Logo Reveal Animation', text: 'Design simple, smooth motion graphics showing how the geometric shapes build into each logo mark.' },
      { label: 'Brand Guidelines Document', text: 'Create one-page PDF cheat sheets detailing clear space rules, prohibited uses, and official typography.' },
    ],
  },
];

export function TapestoryVisualShowcase() {
  const swatches = [
    {
      name: 'Warm Ivory',
      hex: '#F5F0E7',
      token: 'background/ivory',
      bg: '#F5F0E7',
      text: '#29251F',
      sub: '#5E5750',
      border: '#D6CCBC',
    },
    {
      name: 'Deep Forest Green',
      hex: '#172B24',
      token: 'brand/primary',
      bg: '#172B24',
      text: '#F5F0E7',
      sub: 'rgba(245,240,231,0.78)',
      border: '#172B24',
    },
    {
      name: 'Muted Gold',
      hex: '#B69A68',
      token: 'brand/accent',
      bg: '#B69A68',
      text: '#29251F',
      sub: 'rgba(41,37,31,0.82)',
      border: '#A68A58',
    },
    {
      name: 'Charcoal',
      hex: '#29251F',
      token: 'text/primary',
      bg: '#29251F',
      text: '#F5F0E7',
      sub: 'rgba(245,240,231,0.78)',
      border: '#29251F',
    },
    {
      name: 'White',
      hex: '#FFFFFF',
      token: 'surface/white',
      bg: '#FFFFFF',
      text: '#29251F',
      sub: '#5E5750',
      border: '#DDD4C6',
    },
    {
      name: 'Soft Beige',
      hex: '#E9E0D3',
      token: 'surface/beige',
      bg: '#E9E0D3',
      text: '#29251F',
      sub: '#5E5750',
      border: '#D2C7B7',
    },
  ];

  const screens = [
    {
      tag: '01 / EXECUTIVE COMMAND CENTER',
      title: 'Marketplace Revenue, SLA Attention Queue & 30-Day Telemetry',
      route: '/admin',
      src: '/case-studies/strips/ts_screen_dashboard.png',
      alt: 'Tapestory Admin Panel — Executive Marketplace Dashboard (2880px Retina)',
    },
    {
      tag: '02 / BESPOKE ORDER ORCHESTRATION',
      title: 'Orders Ledger, Status Pipeline & Multi-Vendor Filtering',
      route: '/admin/orders',
      src: '/case-studies/strips/ts_screen_orders.png',
      alt: 'Tapestory Admin Panel — Orders & Bespoke Fulfillment Pipeline (2880px Retina)',
    },
    {
      tag: '03 / HYPERLOCAL CITY LOGISTICS',
      title: 'Same-City Express Courier Dispatch, Pickup OTP & Live Rider ETA',
      route: '/admin/logistics',
      src: '/case-studies/strips/ts_screen_logistics.png',
      alt: 'Tapestory Admin Panel — City Logistics & Deliveries (2880px Retina)',
    },
  ];

  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#F5F0E7', borderColor: 'var(--border)' }}
    >
      {/* ── Top Hero Screen: Staff Authentication Portal (2880x1800 Retina PNG) ── */}
      <div className="w-full overflow-hidden border-b" style={{ borderColor: 'rgba(41,37,31,0.1)' }}>
        <img
          src="/case-studies/strips/ts_screen_login.png"
          alt="Tapestory Admin Portal — Staff Authentication & Quick Demo Access (2880px Retina)"
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      </div>

      {/* ── Vector-Crisp Design System Foundations (Zero Pixelation, 100% Aligned Grid) ── */}
      <div
        className="px-6 sm:px-10 md:px-14 py-10 sm:py-14 border-b"
        style={{ background: '#F5F0E7', borderColor: 'rgba(41,37,31,0.1)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <h3
              className="font-serif text-2xl sm:text-3xl md:text-[38px] font-normal tracking-tight leading-tight"
              style={{ color: '#29251F' }}
            >
              Tapestory — UI Components
            </h3>
            <p className="text-xs sm:text-sm mt-2" style={{ color: '#5E5750' }}>
              An inclusive made-to-measure system. Native components · Editable properties · Visual states only · 8px foundation
            </p>
          </div>
          <span
            className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border self-start sm:self-auto shrink-0"
            style={{ color: '#172B24', borderColor: 'rgba(23,43,36,0.2)', background: 'rgba(23,43,36,0.05)' }}
          >
            Design System v1.0
          </span>
        </div>

        {/* 00 / FOUNDATIONS — Perfectly Aligned 6-Column Swatch Grid */}
        <div className="mb-10">
          <div
            className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.08em] mb-4"
            style={{ color: '#29251F' }}
          >
            00 / FOUNDATIONS
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {swatches.map(s => (
              <div
                key={s.name}
                className="rounded-lg p-4 sm:p-5 flex flex-col justify-end min-h-[124px] sm:min-h-[138px] transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  boxShadow: '0 2px 8px rgba(41,37,31,0.04)',
                }}
              >
                <div className="text-xs sm:text-[13px] font-semibold leading-snug" style={{ color: s.text }}>
                  {s.name}
                </div>
                <div className="text-[11px] font-mono mt-0.5" style={{ color: s.sub }}>
                  {s.hex}
                </div>
                <div className="text-[11px] font-mono opacity-85" style={{ color: s.sub }}>
                  {s.token}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Scale + Layout Tokens */}
        <div
          className="pt-8 border-t grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          style={{ borderColor: 'rgba(41,37,31,0.1)' }}
        >
          <div className="lg:col-span-8 space-y-3.5">
            <div
              className="text-xs sm:text-[13px] font-medium tracking-wide mb-2"
              style={{ color: '#4A433B' }}
            >
              Typography / Playfair Display + Inter
            </div>
            <div
              className="font-serif text-2xl sm:text-4xl md:text-[44px] leading-[1.15] tracking-tight"
              style={{ color: '#29251F' }}
            >
              Display / Custom Clothing Made for Everyone
            </div>
            <div
              className="font-serif text-lg sm:text-2xl md:text-[26px] leading-snug"
              style={{ color: '#29251F' }}
            >
              Heading / Your style. Your story.
            </div>
            <div
              className="font-serif italic text-base sm:text-xl"
              style={{ color: '#4A433B' }}
            >
              Editorial accent / Made for you
            </div>
            <div className="text-xs sm:text-sm pt-1" style={{ color: '#29251F' }}>
              Body / Beautifully personal, perfectly yours.
            </div>
            <div
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: '#5E5750' }}
            >
              Label / PREMIUM FABRICS
            </div>
          </div>

          <div
            className="lg:col-span-4 rounded-xl p-5 space-y-3.5 border"
            style={{ background: '#EFE8DC', borderColor: '#DCD2C2' }}
          >
            <div className="text-[11px] font-mono uppercase tracking-widest font-bold" style={{ color: '#172B24' }}>
              Spatial &amp; Grid Tokens
            </div>
            <div className="text-xs leading-relaxed" style={{ color: '#29251F' }}>
              <span className="font-semibold block mb-0.5">Spacing Scale (8px Base)</span>
              <span className="font-mono text-[11px]" style={{ color: '#5E5750' }}>
                0 · 8 · 16 · 24 · 32 · 40 · 48 · 56 · 64 · 72 · 80 · 96 · 120
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 border-t" style={{ borderColor: 'rgba(41,37,31,0.1)' }}>
              <div className="text-xs" style={{ color: '#29251F' }}>
                <span className="font-semibold block mb-0.5">Radius</span>
                <span className="font-mono text-[11px]" style={{ color: '#5E5750' }}>0 · 2 · 4 · 8 · 12px</span>
              </div>
              <div className="text-xs" style={{ color: '#29251F' }}>
                <span className="font-semibold block mb-0.5">Iconography</span>
                <span className="font-mono text-[11px]" style={{ color: '#5E5750' }}>12 · 16 · 20 · 24 · 32px</span>
              </div>
            </div>
            <div className="text-xs pt-2 border-t" style={{ color: '#29251F', borderColor: 'rgba(41,37,31,0.1)' }}>
              <span className="font-semibold block mb-0.5">Desktop Grid Architecture</span>
              <span className="font-mono text-[11px]" style={{ color: '#5E5750' }}>
                1440px frame · 256px sidebar · 12 columns · 24px gutters
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── High-Resolution 2x Retina Production Screens (2880px Wide) ── */}
      <div className="px-6 sm:px-10 md:px-14 py-10 sm:py-14 space-y-12" style={{ background: '#F5F0E7' }}>
        {screens.map(s => (
          <div key={s.route} className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest" style={{ color: '#172B24' }}>
                  {s.tag}
                </div>
                <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-bold mt-0.5" style={{ color: '#29251F' }}>
                  {s.title}
                </h4>
              </div>
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded border"
                style={{ background: '#EFE8DC', borderColor: '#D6CCBC', color: '#4A433B' }}
              >
                {s.route}
              </span>
            </div>
            <div
              className="rounded-2xl overflow-hidden border shadow-md"
              style={{ borderColor: 'rgba(41,37,31,0.12)', background: '#FFFFFF' }}
            >
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-auto block m-0 p-0 select-none"
                decoding="sync"
                loading="eager"
              />
            </div>
          </div>
        ))}

        {/* Side-by-Side Atelier Onboarding & Commission Settlement Screens */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest" style={{ color: '#172B24' }}>
                04 / ATELIER ONBOARDING &amp; ESCROW SETTLEMENTS
              </div>
              <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-bold mt-0.5" style={{ color: '#29251F' }}>
                Vendor KYC Verification Queue &amp; Automated Commission Disbursements
              </h4>
            </div>
            <span
              className="text-[11px] font-mono px-2.5 py-1 rounded border"
              style={{ background: '#EFE8DC', borderColor: '#D6CCBC', color: '#4A433B' }}
            >
              /admin/vendors · /admin/commissions
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="rounded-2xl overflow-hidden border shadow-md"
              style={{ borderColor: 'rgba(41,37,31,0.12)', background: '#FFFFFF' }}
            >
              <img
                src="/case-studies/strips/ts_screen_vendors.png"
                alt="Tapestory Admin Panel — Vendor Ateliers & Application Queue (2880px Retina)"
                className="w-full h-auto block m-0 p-0 select-none"
                decoding="sync"
                loading="lazy"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden border shadow-md"
              style={{ borderColor: 'rgba(41,37,31,0.12)', background: '#FFFFFF' }}
            >
              <img
                src="/case-studies/strips/ts_screen_commissions.png"
                alt="Tapestory Admin Panel — Commissions & Escrow Payouts (2880px Retina)"
                className="w-full h-auto block m-0 p-0 select-none"
                decoding="sync"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShyamJagatVisualShowcase() {
  const mainStrips = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#F8F5EF', borderColor: 'var(--border)' }}
    >
      {mainStrips.map(n => (
        <img
          key={`sj-strip-${n}`}
          src={`/case-studies/strips/sj_strip_${n}.png`}
          alt={`Shyam Jagat Case Study UI — Part ${n}`}
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      ))}
    </div>
  );
}

export function ShyamJagatAdminVisualShowcase() {
  const strips = [1, 2, 3, 4, 5, 6];
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#F7F3EB', borderColor: 'var(--border)' }}
    >
      {strips.map(n => (
        <img
          key={`sja-strip-${n}`}
          src={`/case-studies/strips/sja_strip_${n}.png`}
          alt={`Shyam Jagat Admin Panel UI — Part ${n}`}
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      ))}
    </div>
  );
}

export function TheBrokrsVisualShowcase() {
  const strips = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#F7F6F1', borderColor: 'var(--border)' }}
    >
      {strips.map(n => (
        <img
          key={`tb-strip-${n}`}
          src={`/case-studies/strips/tb_strip_${n}.png`}
          alt={`The Brokrs Mobile App UI Case Study — Part ${n}`}
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      ))}
    </div>
  );
}

export function BrokrsHouseVisualShowcase() {
  const strips = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#F8FAFC', borderColor: 'var(--border)' }}
    >
      {strips.map(n => (
        <img
          key={`bh-strip-${n}`}
          src={`/case-studies/strips/bh_strip_${n}.png`}
          alt={`Brokrs House Case Study UI — Part ${n}`}
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      ))}
    </div>
  );
}

export function LifeOSVisualShowcase() {
  const strips = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#FAF9F5', borderColor: 'var(--border)' }}
    >
      {strips.map(n => (
        <img
          key={`lo-strip-${n}`}
          src={`/case-studies/strips/lo_strip_${n}.png`}
          alt={`LifeOS Mobile App UI Case Study — Part ${n}`}
          className="w-full h-auto block m-0 p-0 select-none"
          decoding="sync"
          loading="eager"
        />
      ))}
    </div>
  );
}

export function SahilHairExpertVisualShowcase() {
  return (
    <div
      className="rounded-3xl overflow-hidden border shadow-xl"
      style={{ background: '#0B0B0B', borderColor: 'var(--border)' }}
    >
      <img
        src="/case-studies/www.sahilhairexpert.com_.png"
        alt="Sahil Hair Expert — Full Uncompressed Website UI"
        className="w-full h-auto block m-0 p-0 select-none"
        decoding="sync"
        loading="eager"
      />
    </div>
  );
}

export function LogoDesignVisualShowcase() {
  const boards = [
    {
      src: '/case-studies/Brokrs House Brand Identity Board.png',
      alt: 'Brokrs House — Logo Concept & Brand Rationale',
    },
    {
      src: '/case-studies/ClickCard Brand Identity Guidelines.png',
      alt: 'ClickCard — Brand Identity & Symbol Breakdown',
    },
    {
      src: '/case-studies/Shyam Jagat Logo Rationale Board.png',
      alt: 'Shyam Jagat — Logo Concept & Brand Rationale',
    },
    {
      src: '/case-studies/ABAS Logo Concept & Brand Rationale.png',
      alt: 'ABAS (Akhil Bhartiya Aggarwal Samaj) — Logo Concept & Brand Rationale',
    },
    {
      src: '/case-studies/NOVA GRID Brand Rationale Board.png',
      alt: 'Nova Grid — Logo Concept & Brand Rationale',
    },
  ];

  return (
    <div className="space-y-6">
      {boards.map(board => (
        <div
          key={board.src}
          className="rounded-3xl overflow-hidden border shadow-xl"
          style={{ background: '#FAF8F3', borderColor: 'var(--border)' }}
        >
          <img
            src={board.src}
            alt={board.alt}
            className="w-full h-auto block m-0 p-0 select-none"
            decoding="sync"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}

export function CaseStudyPage({
  project,
  onBack,
  onSelectProject,
}: {
  project: ProjectCaseStudy;
  onBack: () => void;
  onSelectProject: (slug: string) => void;
}) {
  const idx = PROJECTS_DATA.findIndex(p => p.slug === project.slug);
  const prevProj = PROJECTS_DATA[(idx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProj = PROJECTS_DATA[(idx + 1) % PROJECTS_DATA.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--ivory)', color: '#111' }}>
      {/* ── Sticky Top Navigation Bar (Mobile-First) ── */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(250,248,243,0.92)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-black/5 shrink-0"
            style={{ color: '#111' }}
          >
            <span>←</span> <span>All Projects</span>
          </button>

          {/* Quick section jump pills on desktop */}
          <nav aria-label="Case study sections" className="hidden lg:flex items-center gap-1">
            {[
              { id: 'cs-highlights', label: 'Highlights' },
              { id: 'cs-overview', label: 'Overview' },
              { id: 'cs-ux-approach', label: 'UX Strategy' },
              { id: 'cs-ui-solution', label: 'Solutions' },
              { id: 'cs-screens', label: 'Screens' },
              { id: 'cs-outcome', label: 'Outcome' },
            ].map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className="text-xs font-medium px-3 py-1.5 rounded-md transition-colors hover:bg-black/5 cursor-pointer"
                style={{ color: '#5E5750' }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold border transition-colors hover:bg-black/5"
                style={{ borderColor: 'var(--border-strong)', color: '#111', background: '#fff' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Site</span> <span>↗</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => onSelectProject(nextProj.slug)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: '#111', color: '#FAF8F3' }}
            >
              <span className="hidden sm:inline">Next:</span>
              <span className="max-w-[110px] sm:max-w-none truncate">{nextProj.title}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Case Study Hero & Role Metadata ── */}
      <section className="pt-8 pb-8 sm:pt-12 sm:pb-12 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}
            >
              CASE STUDY {project.num} / {String(PROJECTS_DATA.length).padStart(2, '0')}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: project.accent }}>
              {project.category}
            </span>
          </div>

          <h1
            className="font-serif font-bold leading-[1.08] mb-2.5"
            style={{ fontSize: 'clamp(1.85rem, 4.2vw, 3.25rem)', color: '#111' }}
          >
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="font-serif text-base sm:text-xl md:text-2xl max-w-3xl leading-snug mb-5" style={{ color: '#3A3530' }}>
              {project.subtitle}
            </p>
          )}

          {/* Tags & Live Link Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tags.map(t => (
                <span
                  key={t}
                  className="text-[11px] sm:text-xs font-medium px-3 py-1 rounded-full border"
                  style={{ background: '#fff', borderColor: 'var(--border)', color: '#5E5750' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-colors hover:bg-black/5"
                style={{ background: '#fff', borderColor: 'var(--border-strong)', color: '#111' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Product: <span className="underline" style={{ color: 'var(--orange)' }}>{project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span> ↗
              </a>
            )}
          </div>

          {/* My Role, Platform & Tools Bar */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 sm:p-5 rounded-2xl border mb-4"
            style={{ background: '#fff', borderColor: 'var(--border)' }}
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--orange)' }}>
                My Role
              </div>
              <div className="text-sm font-semibold" style={{ color: '#111' }}>
                {project.role}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--orange)' }}>
                Platform & Format
              </div>
              <div className="text-sm font-semibold" style={{ color: '#111' }}>
                {project.platform}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--orange)' }}>
                Tools & Stack
              </div>
              <div className="text-sm font-semibold" style={{ color: '#111' }}>
                {project.tools.join(' · ')}
              </div>
            </div>
          </div>

          {/* ── 5 Key Project Highlights (Clean Minimal 5-Card Layout) ── */}
          {project.projectHighlights && project.projectHighlights.length > 0 && (
            <div id="cs-highlights" className="mb-4">
              <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded"
                    style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}
                  >
                    Project Highlights
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#111' }}>
                    5 Core Metrics
                  </span>
                </div>
                <span className="text-[11px] font-mono" style={{ color: '#7A7068' }}>
                  At a Glance
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
                {project.projectHighlights.map((hl, i) => (
                  <div
                    key={hl.label}
                    className="p-3.5 sm:p-4 rounded-2xl border flex flex-col justify-between transition-all hover:border-neutral-400 hover:shadow-sm"
                    style={{ background: '#fff', borderColor: 'var(--border)' }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1.5 min-h-[28px]">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold leading-snug" style={{ color: '#7A7068' }}>
                          {hl.label}
                        </span>
                        <span className="text-[10px] font-mono font-bold shrink-0 ml-1 mt-0.5" style={{ color: 'var(--orange)' }}>
                          0{i + 1}
                        </span>
                      </div>
                      <div className="font-serif text-lg sm:text-xl md:text-[22px] font-bold leading-tight mb-2" style={{ color: '#111' }}>
                        {hl.value}
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color: '#5E5750' }}>
                      {hl.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4-Column Project Snapshot Strip */}
          {project.snapshot && project.snapshot.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl border"
              style={{ background: '#F7F4EC', borderColor: 'var(--border)' }}
            >
              {project.snapshot.map(item => (
                <div key={item.label}>
                  <div className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-1" style={{ color: '#7A7068' }}>
                    {item.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium leading-snug" style={{ color: '#111' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Structured UX Case Study Breakdown (Overview, Problem, UX Approach, UI Solution) ── */}
      <section id="cs-overview" className="py-10 sm:py-14" style={{ background: '#F3EEE6' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10">
          {/* 01. Overview & 02. The Problem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div
              className="p-5 sm:p-6 rounded-2xl border"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--orange)' }}>
                01 · Overview
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold mb-2" style={{ color: '#111' }}>
                What is {project.title}?
              </h2>
              <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: '#4A4540' }}>
                {project.overview}
              </p>
            </div>

            <div
              className="p-5 sm:p-6 rounded-2xl border"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--orange)' }}>
                02 · The Problem
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold mb-2" style={{ color: '#111' }}>
                {project.problemHeading || 'User & Operational Friction'}
              </h2>
              <p className="text-sm sm:text-[15px] leading-relaxed" style={{ color: '#4A4540' }}>
                {project.problem}
              </p>
            </div>
          </div>

          {/* Design Challenge Callout */}
          {project.designChallenge && (
            <div
              className="p-5 sm:p-6 rounded-2xl border-l-4"
              style={{ background: '#fff', borderColor: 'var(--orange)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                Core UX Question
              </div>
              <p className="font-serif text-base sm:text-lg md:text-xl font-bold leading-snug" style={{ color: '#111' }}>
                &ldquo;{project.designChallenge}&rdquo;
              </p>
            </div>
          )}

          {/* 03. UX Strategy */}
          {project.strategyPillars && project.strategyPillars.length > 0 && (
            <div id="cs-ux-approach" className="space-y-3">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                  03 · UX Strategy
                </div>
                <h2 className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#111' }}>
                  {project.strategyHeading || 'Design Approach'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {project.strategyPillars.map(pil => (
                  <div
                    key={pil.num}
                    className="p-4 sm:p-5 rounded-2xl border"
                    style={{ background: '#1A1917', borderColor: 'rgba(255,255,255,0.08)', color: '#FAF8F3' }}
                  >
                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--orange)' }}>
                      {pil.num} — {pil.title}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#D6D1C7' }}>
                      {pil.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 04. Key Design Solutions */}
          <div id="cs-ui-solution" className="space-y-4">
            <div
              className="p-5 sm:p-6 rounded-2xl border"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                    04 · Design Solutions
                  </div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#111' }}>
                    Key Screens &amp; Features
                  </h2>
                </div>
                <p className="text-xs sm:text-sm max-w-md leading-relaxed" style={{ color: '#5E5750' }}>
                  {project.solution}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {project.highlights.map((h, i) => (
                  <div
                    key={h.title}
                    className="p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-all hover:border-neutral-400"
                    style={{ background: '#FAF8F3', borderColor: 'var(--border)' }}
                  >
                    <div>
                      <div className="text-[10px] font-mono font-bold mb-1" style={{ color: 'var(--orange)' }}>
                        0{i + 1}
                      </div>
                      <h3 className="font-serif text-sm sm:text-base font-bold mb-1" style={{ color: '#111' }}>
                        {h.title}
                      </h3>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#5E5750' }}>
                      {h.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visual Interface Showcase (High-Resolution Screens & Mockups) ── */}
      <section id="cs-screens" className="py-10 sm:py-14 border-t" style={{ background: 'var(--ivory)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                05 · Visual Showcase
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#111' }}>
                Final UI Screens &amp; System Breakdown
              </h2>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-black/5"
                style={{ background: '#fff', borderColor: 'var(--border-strong)', color: '#111' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Interact with Live Build ↗
              </a>
            )}
          </div>

          {project.slug === 'tapestory-admin' ? (
            <TapestoryVisualShowcase />
          ) : project.slug === 'shyam-jagat' ? (
            <ShyamJagatVisualShowcase />
          ) : project.slug === 'shyam-jagat-admin' ? (
            <ShyamJagatAdminVisualShowcase />
          ) : project.slug === 'the-brokrs' ? (
            <TheBrokrsVisualShowcase />
          ) : project.slug === 'brokrs-house' ? (
            <BrokrsHouseVisualShowcase />
          ) : project.slug === 'lifeos' ? (
            <LifeOSVisualShowcase />
          ) : project.slug === 'sahil-hair-expert' ? (
            <SahilHairExpertVisualShowcase />
          ) : project.slug === 'logo-design' ? (
            <LogoDesignVisualShowcase />
          ) : (
            <div
              className="rounded-3xl overflow-hidden border shadow-xl"
              style={{
                background: project.stageBg,
                borderColor: 'var(--border)',
              }}
            >
              <img
                src={project.slug === 'clickcard' ? '/case-studies/clickcard_cover.jpg' : project.img}
                alt={project.title}
                className="w-full h-auto block m-0 p-0 select-none"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 06. Outcome & What's Next ── */}
      {(project.outcome || (project.whatsNext && project.whatsNext.length > 0)) && (
        <section id="cs-outcome" className="py-10 sm:py-14 border-t" style={{ background: '#F3EEE6', borderColor: 'var(--border)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
            <div
              className="p-5 sm:p-7 rounded-2xl border space-y-6"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              {project.outcome && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1.5" style={{ color: 'var(--orange)' }}>
                    06 · Outcome &amp; Impact
                  </div>
                  <p className="text-sm sm:text-base font-medium leading-relaxed" style={{ color: '#111' }}>
                    {project.outcome}
                  </p>
                </div>
              )}

              {project.whatsNext && project.whatsNext.length > 0 && (
                <div className="pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--orange)' }}>
                    Validation &amp; Next Iterations
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.whatsNext.map(item => (
                      <div key={item.label} className="text-xs sm:text-sm leading-relaxed" style={{ color: '#5E5750' }}>
                        <strong className="font-semibold block mb-0.5" style={{ color: '#111' }}>
                          {item.label}
                        </strong>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Next / Previous Case Study Footer Navigation ── */}
      <section className="py-10 sm:py-12 border-t" style={{ background: 'var(--ivory)', borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onSelectProject(prevProj.slug)}
              className="p-5 sm:p-6 rounded-2xl border text-left cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: '#7A7068' }}>← Previous Project</div>
              <div className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#111' }}>
                {prevProj.title}
              </div>
              <div className="text-xs mt-1" style={{ color: prevProj.accent }}>{prevProj.category}</div>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProj.slug)}
              className="p-5 sm:p-6 rounded-2xl border text-left sm:text-right cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: '#7A7068' }}>Next Project →</div>
              <div className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#111' }}>
                {nextProj.title}
              </div>
              <div className="text-xs mt-1" style={{ color: nextProj.accent }}>{nextProj.category}</div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
