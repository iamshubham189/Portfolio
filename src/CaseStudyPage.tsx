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
    subtitle: 'Tailored for your story — Marketplace Operations & Bespoke Production Suite.',
    projectType: 'Marketplace Admin Ecosystem · UI/UX Design & Frontend · Live Web App',
    category: 'Bespoke Fashion Marketplace · Admin Portal',
    desc: 'An end-to-end administration and operations console for Tapestory — managing bespoke tailoring orders, master ateliers, anatomical fit profiles, escrow settlements, and same-city express courier dispatch across 19+ integrated modules.',
    tags: ['Admin Dashboard UX', 'Design System', 'Bespoke Operations', 'React & TypeScript'],
    img: tapestoryImg,
    accent: '#B69A68',
    stageBg: '#172B24',
    liveUrl: 'https://tapestory-azure.vercel.app',
    role: 'Product Designer & Frontend Developer',
    platform: 'Desktop & Responsive Web Application',
    tools: ['Figma', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Recharts'],
    snapshot: [
      { label: 'Scope', value: '19+ Marketplace Modules — Orders, Ateliers, Fit Profiles, Escrow & Logistics' },
      { label: 'Core Workflow', value: 'Measurement Verified → Workshop Tailoring → QC → Same-City Dispatch → Settlement' },
      { label: 'Design System', value: 'Playfair Display + Inter · Deep Forest (#172B24) · Sartorial Gold (#B69A68) · Warm Ivory (#F5F0E7)' },
      { label: 'Live Build', value: 'Interactive React 19 + TypeScript SPA (tapestory-azure.vercel.app)' },
    ],
    overview:
      'Tapestory ("Clothing that tells your story") is a made-to-measure bespoke clothing marketplace connecting patrons with independent tailoring workshops and master ateliers across India. The Tapestory Admin Panel serves as the operational nerve center for marketplace staff — uniting bespoke order orchestration, vendor onboarding, anatomical fit profiles, commission escrow, dispute mediation, and same-city rider logistics in one cohesive workspace.',
    problemHeading: 'Bespoke tailoring doesn\'t fit inside a standard e-commerce dashboard.',
    problem:
      'Unlike off-the-rack retail, every made-to-measure order involves custom body measurements, fabric lot verification, multi-stage workshop tailoring SLAs, fit-alteration mediation, and milestone-based atelier payouts. Managing these workflows across disconnected spreadsheets and generic admin tools creates SLA blind spots, fit disputes, and delayed settlements.',
    designChallenge:
      'How might we bring sartorial calm and operational precision to a 19-module marketplace admin console — so staff can track every garment from measurement capture to doorstep handover without drowning in table clutter?',
    strategyHeading: 'Sartorial Identity · Operational Precision · Trust by Design',
    strategyPillars: [
      {
        num: '01',
        title: 'Editorial Meets Operational',
        desc: 'Pair Tapestory\'s luxury atelier identity (Deep Forest #172B24, Sartorial Gold #B69A68, Warm Ivory #F5F0E7, Playfair Display) with high-density Inter data tables, 8px spacing foundations, and zero-friction drawers.',
      },
      {
        num: '02',
        title: 'Make Custom Fit & SLAs Visible',
        desc: 'Surface anatomical measurement tolerances (±0.5 in), fabric swatches, and workshop SLA countdowns directly inside order drawers and Kanban production boards.',
      },
      {
        num: '03',
        title: 'Close the Loop from Escrow to Handover',
        desc: 'Connect 3DS payment capture, tiered atelier commissions, fit-dispute escrow holds, and dual-OTP same-city express courier dispatch into one auditable flow.',
      },
    ],
    solution:
      'Designed and built a 19-module React + TypeScript administration suite starting from an atelier-inspired Super Admin login portal with 1-click demo access and 2FA, leading into an executive GMV dashboard, Table/Kanban bespoke production pipelines, anatomical fit visualizers, same-city courier dispatch, and SHA-256 security audit trails.',
    highlights: [
      {
        title: 'Atelier Staff Login & RBAC Security (/admin/login & /admin/roles)',
        desc: 'Editorial dress-form backdrop with a stitched forest-green pennant badge, 1-click Super Admin credential autofill, hardware-key/2FA flow, and a 7-role × 24-capability RBAC permission matrix.',
      },
      {
        title: 'Bespoke Orders Kanban & Anatomical Fit Drawer (/admin/orders)',
        desc: 'Dual Table/Kanban production views tracking Measurement Verified, In Workshop Tailoring, and Ready for Pickup stages — paired with an Anatomical Fit Visualizer (Bust, Waist, Shoulder tolerances) and branded QR packaging slips.',
      },
      {
        title: 'Same-City Express Logistics & Dual-OTP Handover (/admin/logistics)',
        desc: 'Hyperlocal intra-city courier dispatch for delicate bespoke garments featuring live trip telemetry, rider assignment cards, tamper-proof garment bag seals, and dual pickup/delivery OTP verification.',
      },
      {
        title: 'Escrow Commissions, Fit Disputes & Executive Analytics',
        desc: '3DS gateway ledger, tiered atelier payout settlements, measurement-variance dispute mediation with reverse logistics, omnichannel WhatsApp/Email broadcasts, and Recharts GMV/LTV cohort reporting.',
      },
    ],
    outcome:
      'Delivered a live, production-grade marketplace operations suite (tapestory-azure.vercel.app) that proves enterprise back-office software can feel as refined and intentional as the luxury bespoke brand it powers.',
    whatsNext: [
      { label: 'Atelier Partner Portal', text: 'Extend the design system into a dedicated workshop-facing app for master tailors to upload WIP fitting photos and update stage milestones.' },
      { label: 'AI Fit-Variance Alerts', text: 'Flag anomalous patron measurements before fabric cutting begins by comparing submitted profiles against historical garment fit indices.' },
      { label: 'Live Backend & Webhook Sync', text: 'Connect the deterministic client-side state layer to real-time payment gateway webhooks and courier GPS streams.' },
    ],
  },
  {
    slug: 'lifeos',
    num: '02',
    title: 'LifeOS',
    subtitle: 'Your life, brought together.',
    category: 'UI/UX Product Design Concept · Mobile App',
    desc: 'A calmer way to hold the everyday — an AI-assisted personal life organizer connecting schedules, priorities, daily captures, and longer-term responsibilities in one place.',
    tags: ['Product Thinking', 'Interface Design', 'Connected Journeys', 'AI-Assisted UX'],
    img: lifeOsImg,
    accent: '#2E5A50',
    stageBg: '#0C281F',
    role: 'Product & UI/UX Designer',
    platform: 'iOS & Android Mobile App',
    projectType: 'UI/UX Product Design Concept · Mobile App',
    tools: ['Figma', 'Product Architecture', 'Design System', 'AI Interaction Design'],
    snapshot: [
      { label: 'Format', value: 'Mobile Product Concept (iOS & Android)' },
      { label: 'Design Focus', value: 'Information hierarchy, connected flows, human control.' },
      { label: 'Experience', value: 'Today · Life · Capture · Calendar · Profile' },
      { label: 'Visual System', value: 'Instrument Sans · Forest Green (#2E5A50) · Warm Off-White (#FAF9F5)' },
    ],
    overview:
      'LifeOS is an AI-assisted personal life organizer that turns scattered information into context, and context into a reviewable next step — exploring a single, calm home for schedules, priorities, daily captures, and longer-term responsibilities.',
    problemHeading: 'Life is connected. Our tools rarely are.',
    problem:
      'An appointment, a document, and a reminder may belong to the same responsibility yet live apart across 12 different apps — while urgent admin and meaningful goals compete for attention in the same day.',
    designChallenge:
      'How might one space make life feel less fragmented — without taking control away?',
    solution:
      'Designed a 5-pillar mobile system (Today, Life, Capture, Calendar, Profile) that prioritizes urgent items first, groups goals into context-rich Life Threads, and keeps every AI suggestion explicitly reviewable.',
    strategyHeading: 'Clarity · Continuity · Agency',
    strategyPillars: [
      { num: '01', title: 'Show What Matters Now', desc: 'Separate time-sensitive responsibilities ("3 Things Need Your Attention") from the rest of the day\'s timeline.' },
      { num: '02', title: 'Keep the Context Together', desc: 'Connect goals to tasks, documents, and schedules through Life Threads and 8 Life Categories rather than separate apps.' },
      { num: '03', title: 'Assist, Then Ask', desc: 'Make AI output reviewable with visible Confirm, Edit, and Dismiss controls — AI that helps, never takes over.' },
    ],
    highlights: [
      { title: 'Today Dashboard & Priority Attention', desc: 'Surfaces urgent bills and renewals before the day\'s timeline, paired with optional LifeOS Assist suggestions.' },
      { title: 'Natural-Language Capture & Confirmation', desc: 'Accepts everyday voice or text (including Hinglish like "Mummy ka doctor appointment next Wednesday hai") and previews structured fields before saving.' },
      { title: 'Life Threads & 8 Life Categories', desc: 'Connects big goals (MBA Application, Half Marathon, Mumbai Trip) and 8 life areas (Money, Health, Work, Travel, Vehicle, Personal, Entertainment, Documents) with tasks and files.' },
      { title: 'Conversational AI & Smart Planning', desc: 'Answers questions about upcoming bills (₹53,449 due), proposes weekend plans, and turns task lists into reviewable weekly schedules.' },
    ],
    outcome:
      'Less to hold in your head, more room for life — bringing together a focused Today view, context-rich Life Threads, natural-language capture, and reviewable AI assistance while keeping the person in charge.',
    whatsNext: [
      { label: 'Findability', text: 'Validate whether people can predict if an item belongs in a Category, a Life Thread, or the Calendar.' },
      { label: 'Interpretation & Recovery', text: 'Test how clearly multilingual captures communicate uncertainty and how easily users edit a mistaken event.' },
      { label: 'Attention & Trust', text: 'Evaluate which prompts feel helpful rather than intrusive and verify that permission and data controls are clear.' },
    ],
  },
  {
    slug: 'brokrs-house',
    num: '03',
    title: 'Brokrs House',
    subtitle: 'A premium alliance. A connected broker workspace.',
    category: 'Brand Identity + Mobile Product Design',
    desc: 'A premium real-estate platform connecting builders/developers, brokers, and buyers — bringing property discovery, pipeline visibility, deal protection, and payout tracking into a connected broker workspace.',
    tags: ['Brand Identity', 'Mobile Product Design', 'Real Estate Ecosystem', 'Broker Workspace'],
    img: brokrsHouseImg,
    accent: '#C9A84C',
    stageBg: '#FEFDF9',
    role: 'Product & Brand Designer',
    platform: 'iOS & Android Mobile App',
    projectType: 'Brand Identity + Mobile Product Design · Selected Broker Experience',
    tools: ['Figma', 'Brand Identity', 'Design System', 'Prototyping'],
    snapshot: [
      { label: 'Objective', value: 'Connect property discovery, lead ownership, and commission visibility in one broker workspace.' },
      { label: 'Ecosystem', value: 'Builder / Developer · Broker (Case-Study Focus) · Buyer.' },
      { label: 'Core Flow', value: 'Enter → Discover → Manage → Protect → Earn.' },
      { label: 'Scope', value: 'Mobile Product Design + Brand Identity (#0A1628 Navy, #C9A84C Gold).' },
    ],
    overview:
      'BROKRS HOUSE is a premium real-estate platform connecting builders/developers, brokers, and buyers — bringing property discovery, pipeline visibility, deal protection, and payout tracking into a connected broker workspace.',
    problemHeading: 'The deal moves forward. The context should too.',
    problem:
      'Fragmented project information, scattered follow-ups, unclear commission structures, and uncertain lead ownership create friction across a broker\'s working day.',
    designChallenge:
      'How might we make each next action clearer across discovery, lead registration, deal protection, and payouts without losing the commercial context of the deal?',
    solution:
      'Designed an end-to-end broker experience — from RERA-verified onboarding and live unit/commission discovery to smart buyer matching, 48-hour unit holds, 7-day buyer claim protection, and transparent builder payout tracking.',
    strategyHeading: 'Discover · Protect · Earn',
    strategyPillars: [
      { num: '01', title: 'Discover with Context', desc: 'Bring projects, live unit inventory, and tiered commission terms into the same decision.' },
      { num: '02', title: 'Keep the Pipeline Visible', desc: 'Connect registered leads with pipeline stages, client requirements, and scheduled follow-ups.' },
      { num: '03', title: 'Make Ownership Explicit', desc: 'Surface buyer claims, 48-hour unit holds, deal protection rules, and direct builder payout tracking.' },
    ],
    highlights: [
      { title: 'RERA Onboarding & Property Discovery', desc: 'Role-aware onboarding with RERA verification and commission-tagged project browsing (3.0%–4.5% Comm).' },
      { title: 'Unit Inventory & Commission Tiers', desc: 'Real-time tower/unit availability (Available, Hold, Booked) paired with volume incentive tiers.' },
      { title: 'Lead CRM, Smart Matches & Deal Protection', desc: 'AI-driven Smart Matches, 48-hr unit holds, and 7-day buyer claim locks with duplicate-claim blocking.' },
      { title: 'Alliance Earnings & Payout Records', desc: 'Separates Total Realized Commission (₹12,45,000), Pending Verification, Approved Payouts, and Paid to Bank dispatches.' },
    ],
    outcome:
      'Clarity is the intention — connecting project context, client progress, deal ownership, and commission payouts into one continuous broker journey.',
    whatsNext: [
      { label: 'Onboarding Clarity', text: 'Validate OTP entry, role selection, and RERA verification flow with brokers.' },
      { label: 'Decision Confidence', text: 'Test how quickly brokers interpret unit availability and tiered commission terms.' },
      { label: 'Workflow Continuity', text: 'Evaluate lead registration, buyer claim protection, and payout status comprehension.' },
    ],
  },
  {
    slug: 'shyam-jagat',
    num: '04',
    title: 'Shyam Jagat',
    subtitle: 'Connecting devotion, community, and seva in one place.',
    projectType: 'Socio-Spiritual Platform · UI/UX Design · Web Experience',
    category: 'Socio-Spiritual Web Platform · UI/UX Case Study',
    desc: 'A socio-spiritual web platform uniting temple discovery, devotional artists, transparent seva contributions, and role-based community registration.',
    tags: ['UI/UX Design', 'Web Platform', 'Information Architecture', 'Design System'],
    img: shyamJagatImg,
    accent: '#D95B16',
    stageBg: '#F4EDE2',
    liveUrl: 'https://ssj-three.vercel.app/',
    role: 'UI/UX & Product Designer',
    platform: 'Desktop & Responsive Web',
    tools: ['Figma', 'UI/UX Design', 'Design System'],
    snapshot: [
      { label: 'Objective', value: 'Unite temple discovery, devotional artists, seva, and community roles.' },
      { label: 'Audience', value: 'Devotees, Artists, Temples, Dharmashalas & Volunteers.' },
      { label: 'Core Flow', value: 'Discover → Participate → Contribute.' },
      { label: 'Role', value: 'End-to-end UI/UX & Visual Design.' },
    ],
    overview:
      'Shree Shyam Jagat is a socio-spiritual platform inspired by Baba Shyam (`सहयोग · सेवा · समर्पण`) that connects devotees with verified temples across India, devotional artists, charitable seva drives, and community registration.',
    problemHeading: 'Many needs. One journey.',
    problem:
      'Devotees looking for temples, darshan timings, devotional artists, and ways to contribute to seva often face scattered, unverified information with no clear starting point.',
    designChallenge:
      'How might we connect temple discovery, role-based joining, and charitable seva without making participation feel complicated?',
    strategyHeading: 'Discover · Contribute · Belong',
    strategyPillars: [
      {
        num: '01',
        title: 'Discover',
        desc: 'Search verified temples and devotional artists by state, deity, and category.',
      },
      {
        num: '02',
        title: 'Contribute (Seva)',
        desc: 'Turn intention into seva with preset offerings, clear causes, and UPI/80G support.',
      },
      {
        num: '03',
        title: 'Participate',
        desc: 'Join the ecosystem through role-based registration for Artists, Temples, and Dharmashalas.',
      },
    ],
    solution:
      'Designed a warm, culturally rooted web interface with searchable temple and artist directories, a guided donation flow, and role-based onboarding.',
    highlights: [
      { title: 'Temple & Artist Directories', desc: 'Location and deity filters with verified ratings for temples and bhajan artists.' },
      { title: 'Guided Seva Offering', desc: 'Preset amounts (₹501–₹11,000), 8 seva causes (Annadan, Education, Medical), and UPI checkout.' },
      { title: 'Role-Based Registration', desc: 'Dedicated onboarding cards for Artist, Dancer, Musician, Temple, Dharmashala, and Products.' },
      { title: 'Cultural Visual Language', desc: 'Sacred saffron (#D95B16), temple maroon (#5B1914), and warm parchment surfaces.' },
    ],
    outcome:
      'Shyam Jagat brings discovery, participation, and charitable giving into a connected digital space that honors devotional tradition.',
  },
  {
    slug: 'the-brokrs',
    num: '05',
    title: 'The Brokrs',
    subtitle: 'Investing, services & benefits. One connected experience.',
    projectType: 'Product Experience · Mobile App · India',
    category: 'Multi-Industry Investment & Services App',
    desc: 'THE BROKRS brings investment discovery, everyday services, member offers, and wallet management into a single mobile experience.',
    tags: ['Mobile App Design', 'Marketplace UX', 'Fintech & Wallet', 'Design System'],
    img: theBrokrsImg,
    accent: '#E09214',
    stageBg: '#FEFDF9',
    role: 'UI/UX & Product Designer',
    platform: 'iOS & Android Mobile App',
    tools: ['Figma', 'Experience Mapping', 'Mobile UI'],
    snapshot: [
      { label: 'Explore', value: 'Real estate, technology, hybrid farming & everyday services.' },
      { label: 'Participate', value: 'Service detail, investment selection & payment confirmation.' },
      { label: 'Manage', value: 'Project roadmaps, wallet balances, rewards & KYC status.' },
      { label: 'Role', value: 'Product Experience & Mobile UI Design.' },
    ],
    overview:
      'THE BROKRS brings investment discovery (Real Estate, Technology, Hybrid Farming), everyday services (Insurance, Loans, Travel, Grocery), partner benefits, and wallet management into one connected mobile app.',
    problemHeading: 'Many opportunities. Too many disconnected decisions.',
    problem:
      'When investment discovery, everyday services, member rewards, and money management live apart, users have to piece together what is available, what they own, and what needs attention.',
    designChallenge:
      'How might we connect investment discovery, partner benefits, and portfolio tracking in one app while keeping every financial decision clear and distinct?',
    strategyHeading: 'Orient · Reveal · Track',
    strategyPillars: [
      {
        num: '01',
        title: 'Orient Before Asking',
        desc: 'Introduce investment scope and member value before moving into mobile OTP or email sign-in.',
      },
      {
        num: '02',
        title: 'Reveal Useful Context',
        desc: 'Pair service marketplace filters with verified provider info, funding progress, and cultivation roadmaps.',
      },
      {
        num: '03',
        title: 'Make Status Visible',
        desc: 'Clearly separate processing, confirmation, and recovery states across payments, rewards, and KYC.',
      },
    ],
    solution:
      'Anchored the experience around a shared Home hub that connects the Service Marketplace, Running Projects, Checkout & Recovery, Partner Offers, Rewards Redemption, and My Wallet.',
    highlights: [
      { title: 'Home Hub & Service Marketplace', desc: 'Unified access to Real Estate, IT, Hybrid Farming, and Insurance with category filters and funding bars.' },
      { title: 'Project Detail & Cultivation Roadmap', desc: 'Pairs financial returns (₹25,000 invested → ₹27,500 value) with a 5-stage Saffron Cultivation roadmap.' },
      { title: 'Checkout & Failure Recovery', desc: 'Transparent GST/fee breakdown, processing guidance, reward points, and bank-decline retry flows.' },
      { title: 'Partner Perks, Rewards & Wallet/KYC', desc: 'Time-bound partner codes, points-to-cashback bank transfers, ₹1.25L wallet view, and document-level KYC.' },
    ],
    outcome:
      'By pairing consistent navy-and-amber hierarchy with explicit state communication, THE BROKRS makes complex multi-sector investing and member benefits easy to navigate.',
    whatsNext: [
      { label: 'Findability', text: 'Test how quickly members locate specific services and explain the next step.' },
      { label: 'Payment Clarity', text: 'Validate user comprehension across processing, success, and retry states.' },
      { label: 'Balance & KYC Continuity', text: 'Verify clarity between portfolio value, available cash, reward points, and pending KYC items.' },
    ],
  },
  {
    slug: 'clickcard',
    num: '06',
    title: 'ClickCard',
    subtitle: 'One link. Your entire identity.',
    projectType: 'Digital Identity Platform · UI/UX Design · Web Product',
    category: 'Digital Identity Platform · Web Product',
    desc: 'ClickCard brings professional profiles, social links, contact details, and portfolios into one shareable destination.',
    tags: ['Product Design', 'Web Design', 'Responsive UX', 'Visual Design'],
    img: clickCardImg,
    accent: '#009E88',
    stageBg: '#FDFEF9',
    liveUrl: 'https://clickcard-2.vercel.app/',
    role: 'UI/UX Designer',
    platform: 'Web (Responsive)',
    tools: ['Figma', 'UI Design', 'Prototyping'],
    snapshot: [
      { label: 'Objective', value: 'Make digital identity easy to create, share, and track.' },
      { label: 'Audience', value: 'Students, professionals, creators & businesses.' },
      { label: 'Core Flow', value: 'Create → Customize → Share → Track.' },
      { label: 'Role', value: 'UI/UX & Product Design.' },
    ],
    overview:
      'ClickCard is a digital identity platform that brings professional profiles, social links, portfolios, and contact details together into one shareable destination — replacing scattered links and printed business cards.',
    problemHeading: 'Fragmented digital identity',
    problem:
      'People maintain separate links across LinkedIn, portfolios, resumes, and social platforms, creating friction when sharing their identity quickly and keeping details updated.',
    designChallenge:
      'How might we make digital identity easier to create, share, and manage through one simple experience?',
    strategyHeading: 'Create · Share · Grow',
    strategyPillars: [
      {
        num: '01',
        title: 'Create',
        desc: 'Build a personalized digital business card and profile in minutes.',
      },
      {
        num: '02',
        title: 'Share',
        desc: 'Connect instantly via a single custom link, QR code, or NFC tap.',
      },
      {
        num: '03',
        title: 'Track',
        desc: 'Measure profile visits, link clicks, and QR scans with clear analytics.',
      },
    ],
    solution:
      'Designed a clean, identity-first web experience centered around three actions — Create, Share, and Track — uniting profile setup, Card Studio templates, and engagement analytics.',
    highlights: [
      { title: 'Unified Digital Profile', desc: 'Social links, portfolio work, resume, and contact details in one shareable link.' },
      { title: 'Card Studio Templates', desc: 'Customizable branded cards and resumes that stay synced with profile data.' },
      { title: 'Instant QR & Link Sharing', desc: 'Frictionless sharing across mobile, desktop, QR codes, and NFC cards.' },
      { title: 'Engagement Analytics', desc: 'At-a-glance insights into profile views, link taps, and audience reach.' },
    ],
    outcome:
      'ClickCard brings digital identity, sharing, and engagement tracking into one cohesive product experience.',
    whatsNext: [
      { label: 'Personalization', text: 'Create a more tailored experience for students, creators, and businesses.' },
      { label: 'Feature Discovery', text: 'Make key customization and studio features easier to discover.' },
      { label: 'Seamless Onboarding', text: 'Simplify handle claiming and publishing for first-time users.' },
    ],
  },
  {
    slug: 'shyam-jagat-admin',
    num: '07',
    title: 'Shyam Jagat Admin Panel',
    subtitle: 'Devotion, with a clear direction.',
    projectType: 'Admin Ecosystem · Product Design · Web Dashboard',
    category: 'Admin Ecosystem & Operations Dashboard',
    desc: 'One administration platform for the people, places, and everyday operations of the Shyam Jagat devotional ecosystem.',
    tags: ['Dashboard Design', 'Admin Panel', 'Design System', 'Operations UX'],
    img: shyamJagatDashboardImg,
    accent: '#C85D2A',
    stageBg: '#F3E6D8',
    role: 'UI/UX & Product Designer',
    platform: 'Desktop Web Admin Portal',
    tools: ['Figma', 'Dashboard UX', 'Design System'],
    snapshot: [
      { label: 'Objective', value: 'Manage 16+ devotional ecosystem modules from one clear workspace.' },
      { label: 'Users', value: 'Platform Admins, Content Editors & Verification Reviewers.' },
      { label: 'Core Flow', value: 'Overview KPIs → Publish & Coordinate → Audit & Verify.' },
      { label: 'Role', value: 'Product Design & Admin UI System.' },
    ],
    overview:
      'The Shyam Jagat Admin Panel is the operational hub behind the platform — managing temples, artists, dharmashalas, organisations, and communities alongside blog posts, events, donations, and registration approvals.',
    problemHeading: 'Many responsibilities. One place to begin.',
    problem:
      'Overseeing 16+ community modules — from temple listings and seva donations to artist verifications — makes daily priorities, ownership, and next actions hard to track without a unified system.',
    designChallenge:
      'How might we keep the wider ecosystem visible while giving each administrative task a clear, familiar place to happen?',
    strategyHeading: 'Overview · Coordinate · Verify',
    strategyPillars: [
      {
        num: '01',
        title: 'Overview First',
        desc: '12 real-time ecosystem KPIs, 12-month donation trends, and a live activity log on one screen.',
      },
      {
        num: '02',
        title: 'Familiar Structure',
        desc: 'Persistent 16-module maroon sidebar paired with consistent search, filter, and table patterns.',
      },
      {
        num: '03',
        title: 'Review with Context',
        desc: 'In-place registration approval modals with applicant details, Aadhaar/accreditation PDFs, and notes.',
      },
    ],
    solution:
      'Built a structured admin command center uniting ecosystem KPIs, Sacred Knowledge & Event publishing tables, a Dharmik Donations & Seva Audit ledger, and contextual registration review.',
    highlights: [
      { title: 'Devotional Ecosystem Overview', desc: 'Tracks 1,248 temples, 842 artists, ₹12.45L donations, 54,230 users, and 31 pending verifications.' },
      { title: 'Publish & Coordinate Tables', desc: 'Side-by-side management for Blog & Sacred Knowledge posts and Devotional Seva Events.' },
      { title: 'Dharmik Donations & Seva Audit', desc: 'Full ledger visibility into donor amounts, UPI/Bank modes, seva purposes, and 80G receipt states.' },
      { title: 'Contextual Registration Modal', desc: 'Focused review modal to inspect documents and approve/reject artist and temple registrations.' },
    ],
    outcome:
      'Warm parchment neutrals, burgundy anchors, and saffron actions keep daily administration calm, structured, and rooted in the platform’s identity.',
  },
  {
    slug: 'sahil-hair-expert',
    num: '08',
    title: 'Sahil Hair Expert',
    subtitle: 'Elite Hairstyling & Treatments — Luxury Salon Booking Desk.',
    category: 'Luxury Salon Booking Website · Live Product',
    desc: 'Reserve your session instantly with a master artisan team — set services, bundle treatments, choose dates, and schedule confirmation in a dark-luxury booking experience.',
    tags: ['UI/UX Design', 'Booking Desk UX', 'Luxury Web Design', 'Live Product'],
    img: sahilHairExpertImg,
    accent: '#C59B27',
    stageBg: '#0B0B0B',
    liveUrl: 'https://www.sahilhairexpert.com/',
    role: 'UI/UX Designer',
    platform: 'Responsive Web Application',
    projectType: 'Luxury Salon Booking Website · Live Product',
    tools: ['Figma', 'Booking Flow UX', 'Visual Identity', 'Responsive Web'],
    snapshot: [
      { label: 'Brand', value: 'Sahil Hair Expert · Luxury Hairstyling & Grooming Studio' },
      { label: 'Core Flow', value: '1. Select Luxury Services → 2. Time Slot → 3. Your Info' },
      { label: 'Service Categories', value: 'Men · Women · Hair Treatments · Individual Grooming' },
      { label: 'Visual Language', value: 'Obsidian Dark (#0B0B0B) · Champagne Gold (#D4AF37) · Editorial Serif' },
    ],
    overview:
      'Sahil Hair Expert is a live luxury salon booking website — enabling clients to explore grooming and hair treatments, bundle multiple services with transparent pricing and duration, and reserve appointments online.',
    problemHeading: 'Luxury grooming shouldn\'t rely on phone-tag or unclear pricing.',
    problem:
      'Salon clients often face scattered service menus, hidden treatment durations, and back-and-forth calls or messages just to bundle multiple services and check studio availability.',
    designChallenge:
      'How might we turn a multi-service salon appointment into an effortless, transparent 3-step self-serve booking desk that reflects the studio\'s luxury craft?',
    solution:
      'Designed an interactive Booking Desk that pairs live studio status with a 3-step reservation flow (Services → Time Slot → Your Info), category filters, and real-time estimated totals.',
    strategyHeading: 'Trust · Transparency · Effortless Booking',
    strategyPillars: [
      { num: '01', title: 'Establish Instant Studio Trust', desc: 'Surface the studio identity card and live Today Status (Open · Closes 9:30 PM) right above the booking desk.' },
      { num: '02', title: 'Make Pricing & Duration Explicit', desc: 'Display exact price (₹250–₹12,000) and session duration (45 min–300 min) on every card with one-tap "+ Add Service" bundling.' },
      { num: '03', title: 'Guide the Reservation in 3 Steps', desc: 'Keep the user anchored with a clear step bar, live selected counter, running Estimated Total, and direct WhatsApp concierge support.' },
    ],
    highlights: [
      { title: 'Live Studio Status & Identity Card', desc: 'Displays real-time operating status (Open • Closes 9:30 PM IST), social links, and studio overview above the fold.' },
      { title: 'Guided 3-Step Booking Desk', desc: 'Structured progression from 1. Services to 2. Time Slot and 3. Your Info with a persistent Selected counter.' },
      { title: 'Multi-Category Service Bundling', desc: 'Instant filtering across Men, Women, Hair Treatments, and Individual Grooming with clear duration and ₹ pricing.' },
      { title: 'Live Estimated Total & WhatsApp Concierge', desc: 'Calculates total cost and selected service count in real time before advancing to date/time selection.' },
    ],
    outcome:
      'Delivered a live, conversion-focused luxury booking desk (sahilhairexpert.com) that elevates the studio\'s digital brand while making multi-service appointment scheduling fast and transparent.',
    whatsNext: [
      { label: 'Specialist Selection', text: 'Allow clients to preview stylist portfolios when picking their preferred master artisan.' },
      { label: 'Delhi Studio Expansion', text: 'Scale the booking desk to support multi-branch switching as the upcoming Delhi studio launches.' },
      { label: 'Shop & Academy Integration', text: 'Connect the Shop and Academy inquiries into the same unified client profile.' },
    ],
  },
  {
    slug: 'logo-design',
    num: '09',
    title: 'Logo Design',
    subtitle: 'Logo Concept & Brand Rationale Collection.',
    category: 'Logo Design & Brand Identity Systems',
    desc: 'A curated collection of custom logo marks and brand rationale systems — breaking down geometry, symbolism, typography, and color palettes across Brokrs House, ClickCard, Shyam Jagat, ABAS, and Nova Grid.',
    tags: ['Logo Design', 'Brand Identity', 'Symbol Breakdown', 'Color Systems'],
    img: logoDesignImg,
    accent: '#C48F45',
    stageBg: '#18130E',
    role: 'Brand & Visual Identity Designer',
    platform: 'Digital, Print & Brand Systems',
    projectType: 'Logo Concept & Brand Rationale Collection (5 Brands)',
    tools: ['Adobe Illustrator', 'Figma', 'Grid Systems', 'Typography'],
    snapshot: [
      { label: 'Collection', value: '5 Brand Identity Systems — Brokrs House · ClickCard · Shyam Jagat · ABAS · Nova Grid' },
      { label: 'Deliverables', value: 'Symbol Breakdown · Anatomical Callouts · Color Palette · Brand Essence' },
      { label: 'Sectors', value: 'Real Estate · Digital Networking · Spiritual Devotion · Community Heritage' },
      { label: 'Approach', value: 'Concept-driven symbolism paired with timeless typography and scalable vector marks.' },
    ],
    overview:
      'A collection of five logo concept and brand rationale boards demonstrating how strategic visual metaphors, geometric construction, and purposeful color systems translate core brand values into memorable identity marks.',
    problemHeading: 'A strong mark needs meaning, not just decoration.',
    problem:
      'Brands across real estate, technology, spirituality, and community organizations each speak to very different audiences — requiring symbols that communicate trust and purpose at a single glance.',
    designChallenge:
      'How might we distill each brand\'s story into a clear geometric or cultural symbol, backed by an explicit color system and typography that scales across digital and physical touchpoints?',
    solution:
      'Developed structured Brand Rationale boards for every identity — breaking down the core symbol equation, anatomical design callouts, psychological color roles, and brand essence.',
    strategyHeading: 'Symbolism · Structure · Brand Essence',
    strategyPillars: [
      { num: '01', title: 'Deconstruct the Visual Metaphor', desc: 'Build each mark from clear symbolic primitives — such as Square (Homes) + Circle (People) for Brokrs House or Layered Cards + Forward Arrow for ClickCard.' },
      { num: '02', title: 'Pair Form with Purposeful Color', desc: 'Anchor every identity in a defined palette — from Trust Blue (#0A8FDC) and Digital Teal (#35B5A6) to Devotional Saffron, Heritage Gold, and Champagne Gold.' },
      { num: '03', title: 'Articulate the Brand Essence', desc: 'Connect visual choices directly to each brand\'s voice so stakeholders and users immediately understand what the mark stands for.' },
    ],
    highlights: [
      { title: 'Brokrs House & Nova Grid (Real Estate)', desc: 'Brokrs House unites Squares (Homes) + Circles (People) in #0A8FDC/#023C7A ("People. Properties. Possibilities."); Nova Grid pairs structured land-parcel lines with a spark star in Champagne Gold & Deep Espresso ("Built on vision. Designed for growth.").' },
      { title: 'ClickCard (Digital Business Card)', desc: 'Overlapping rounded squares (Layered Cards) + an up-right Forward Arrow in Teal (#35B5A6) and Charcoal (#2E2E2E) — connecting people in one click.' },
      { title: 'Shyam Jagat (Spiritual & Devotional)', desc: 'Combines a Circular Aura, Divine Flame, Graceful Script, and Protective Hand in Saffron Orange, Deep Maroon, and Soft Ivory ("Rooted in devotion. Guided by grace.").' },
      { title: 'ABAS — Akhil Bhartiya Aggarwal Samaj', desc: 'Integrates the Tree of Togetherness, Lotus Elements, People Network root nodes, and Laurel wreath in Maroon, Gold, Navy, and Ivory ("Rooted in Heritage. United for a Brighter Tomorrow.").' },
    ],
    outcome:
      'Created five distinct, rationale-backed brand identity systems where every line, curve, and swatch serves a clear narrative and functional purpose.',
    whatsNext: [
      { label: 'Cross-Media Application', text: 'Extend each identity across app icons, signage, stationery, and social templates.' },
      { label: 'Motion & Micro-Branding', text: 'Translate the modular symbol breakdowns into smooth logo reveal animations for digital products.' },
      { label: 'Brand Guideline Playbooks', text: 'Package spacing rules, minimum sizes, and color contrast ratios for engineering and print teams.' },
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
              { id: 'cs-overview', label: 'Overview & Problem' },
              { id: 'cs-ux-approach', label: 'UX Approach' },
              { id: 'cs-ui-solution', label: 'UI Solution' },
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

          {/* 03. UX Approach & Information Architecture Pillars */}
          {project.strategyPillars && project.strategyPillars.length > 0 && (
            <div id="cs-ux-approach" className="space-y-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                  03 · UX Approach &amp; Architecture
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: '#111' }}>
                  {project.strategyHeading || 'User Flows & Design Strategy'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.strategyPillars.map(pil => (
                  <div
                    key={pil.num}
                    className="p-5 rounded-2xl border"
                    style={{ background: '#1A1917', borderColor: 'rgba(255,255,255,0.08)', color: '#FAF8F3' }}
                  >
                    <div className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--orange)' }}>
                      {pil.num} — {pil.title}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#D6D1C7' }}>
                      {pil.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 04. UI Solution & Key Interface Highlights */}
          <div id="cs-ui-solution" className="space-y-4">
            <div
              className="p-5 sm:p-6 rounded-2xl border"
              style={{ background: '#fff', borderColor: 'var(--border)' }}
            >
              <div className="text-[11px] font-mono uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--orange)' }}>
                04 · UI Solution
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2" style={{ color: '#111' }}>
                Interface Architecture &amp; Key Screens
              </h2>
              <p className="text-sm sm:text-[15px] leading-relaxed mb-5" style={{ color: '#4A4540' }}>
                {project.solution}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                {project.highlights.map((h, i) => (
                  <div
                    key={h.title}
                    className="p-4 sm:p-5 rounded-xl border"
                    style={{ background: '#FAF8F3', borderColor: 'var(--border)' }}
                  >
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--orange)' }}>
                      Screen Focus 0{i + 1}
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold mb-1" style={{ color: '#111' }}>
                      {h.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#5E5750' }}>
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
