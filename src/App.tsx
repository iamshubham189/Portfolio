import { useState, useEffect, useRef, useCallback } from 'react';
import statueImg from '@/imports/Classical_portrait.png';
import designerImg from '@/imports/designer_about.png';
import { PROJECTS_DATA, CaseStudyPage } from './CaseStudyPage';

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = ['home','skills','portfolio','about','expertise','process','blog','contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return scrolled;
}

function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setPos({ x, y });
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return pos;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────

function Reveal({ children, className = '', delay = 0, dir = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; dir?: 'up'|'left'|'right'|'scale';
}) {
  const { ref, inView } = useInView(0.12);
  const cls = dir === 'left' ? 'reveal-left' : dir === 'right' ? 'reveal-right' : dir === 'scale' ? 'reveal-scale' : 'reveal';
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${cls} ${inView ? 'visible' : ''} delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Work Focus Donut ─────────────────────────────────────────────────────────

// Derived from the 8 projects listed in the Featured Projects section:
// - Web Platforms (4): Brokrs House, Shyam Jagat, ClickCard, Sahil Hair Expert
// - Mobile Apps (2): LifeOS, The Brokrs
// - Dashboards & Brand (2): Shyam Jagat Admin Panel, Logo Design
const donutData = [
  { label: 'Web Platforms',      shortLabel: 'Web\nPlatforms',      value: 4, color: '#C85D2A' },
  { label: 'Mobile Apps',        shortLabel: 'Mobile\nApps',        value: 2, color: '#2A6E6E' },
  { label: 'Dashboards & Brand', shortLabel: 'Dashboards\n& Brand', value: 2, color: '#E8A33D' },
];

function DonutChart({ animate }: { animate: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const size = 164, r = 60, c = size / 2, stroke = 28;
  const circ = 2 * Math.PI * r;
  const total = donutData.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const slices = donutData.map(d => {
    const len = (d.value / total) * circ;
    const rotate = (offset / circ) * 360 - 90;
    offset += len;
    return { ...d, len: Math.max(len - 3.5, 0), rotate };
  });

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        {/* Inner soft cream circle behind the center badge */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: 22,
            background: '#F4EFE7',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)',
          }}
        />
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="Projects by category: 4 web platforms, 2 mobile apps, 2 dashboards and brand systems"
          className="relative z-10"
        >
          {slices.map((s, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <circle
                key={s.label}
                cx={c}
                cy={c}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={isHovered ? stroke + 4 : stroke}
                strokeDasharray={`${animate ? s.len : 0} ${circ}`}
                transform={`rotate(${s.rotate} ${c} ${c})`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
                style={{
                  opacity: hoveredIdx !== null && !isHovered ? 0.65 : 1,
                  transition: `stroke-dasharray 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.18}s, stroke-width 0.25s ease, opacity 0.25s ease`,
                }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300"
            style={{
              background: '#FAF7F2',
              border: '1px solid rgba(17,17,17,0.06)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
              transform: hoveredIdx !== null ? 'scale(1.06)' : 'none',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
        </div>
      </div>
      <ul className="flex-1 w-full space-y-3.5 text-xs sm:text-[13px]">
        {donutData.map((d, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <li
              key={d.label}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex items-center gap-2.5 cursor-pointer transition-transform duration-200"
              style={{ transform: isHovered ? 'translateX(3px)' : 'none' }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200"
                style={{
                  background: d.color,
                  transform: isHovered ? 'scale(1.25)' : 'none',
                }}
              />
              <span
                className="leading-tight whitespace-pre-line font-medium"
                style={{ color: isHovered ? '#111' : '#3A3530' }}
              >
                {d.shortLabel}
              </span>
              <span className="ml-auto font-bold tabular-nums text-sm" style={{ color: '#111' }}>
                {d.value}<span className="font-normal text-xs" style={{ color: '#7A7068' }}> / {total}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ target, suffix, label, sub }: { target: number; suffix: string; label: string; sub?: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(target, inView);
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className="flex flex-col items-center md:items-start text-center md:text-left gap-1"
    >
      <div className="font-serif text-4xl font-bold" style={{ color: '#111' }}>
        {count}{suffix}
      </div>
      <div className="font-semibold text-sm tracking-wide uppercase" style={{ color: '#2A2A2A', fontFamily: 'Inter' }}>{label}</div>
      {sub && <div className="text-xs" style={{ color: '#7A7068' }}>{sub}</div>}
    </div>
  );
}

// ─── Contact & Social Links ───────────────────────────────────────────────────

const CONTACT_INFO = {
  email: 'iamshubham189@gmail.com',
  phoneDisplay: '+91 77038-27643',
  phoneHref: 'tel:+917703827643',
  linkedin: 'https://www.linkedin.com/in/shubham-sharma-390648165/',
  behance: 'https://www.behance.net/iamshubham5ed9',
  location: 'Gurugram, India',
};

function BrandIcon({ name, size = 20 }: { name: 'linkedin' | 'behance' | 'email' | 'phone'; size?: number }) {
  if (name === 'linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="24" height="24" rx="5" fill="#0A66C2" />
        <path d="M7.12 9.87H4.44V18.5H7.12V9.87ZM5.78 8.69C6.64 8.69 7.33 7.99 7.33 7.13C7.33 6.27 6.64 5.58 5.78 5.58C4.92 5.58 4.22 6.27 4.22 7.13C4.22 7.99 4.92 8.69 5.78 8.69ZM19.56 18.5H16.89V14.3C16.89 13.3 16.87 12.01 15.49 12.01C14.09 12.01 13.88 13.1 13.88 14.23V18.5H11.21V9.87H13.77V11.05H13.81C14.17 10.37 15.04 9.66 16.34 9.66C19.05 9.66 19.56 11.44 19.56 13.76V18.5Z" fill="#FFFFFF" />
      </svg>
    );
  }
  if (name === 'behance') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="24" height="24" rx="5" fill="#0057FF" />
        <path d="M10.15 11.39C10.74 11.09 11.09 10.55 11.09 9.77C11.09 8.43 10.09 7.8 8.48 7.8H4.5V16.2H8.67C10.42 16.2 11.45 15.36 11.45 13.82C11.45 12.66 10.92 11.75 10.15 11.39ZM6.48 9.24H8.15C8.87 9.24 9.28 9.53 9.28 10.11C9.28 10.72 8.85 11.02 8.15 11.02H6.48V9.24ZM8.36 14.74H6.48V12.44H8.38C9.2 12.44 9.66 12.81 9.66 13.6C9.66 14.39 9.16 14.74 8.36 14.74ZM18.08 9.15H14.55V8.15H18.08V9.15ZM19.5 13.36C19.5 11.17 18.23 9.75 16.33 9.75C14.36 9.75 13.06 11.16 13.06 13.09C13.06 15.11 14.35 16.39 16.41 16.39C17.93 16.39 19.01 15.65 19.38 14.34H17.68C17.45 14.84 16.97 15.08 16.4 15.08C15.39 15.08 14.81 14.49 14.77 13.51H19.49C19.5 13.46 19.5 13.41 19.5 13.36ZM14.8 12.4C14.91 11.55 15.46 11.03 16.31 11.03C17.13 11.03 17.68 11.55 17.75 12.4H14.8Z" fill="#FFFFFF" />
      </svg>
    );
  }
  if (name === 'email') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="24" height="24" rx="5" fill="#FFFFFF" />
        <path d="M4.5 7.5V16.5C4.5 17.33 5.17 18 6 18H7.5V10.8L12 14.18L16.5 10.8V18H18C18.83 18 19.5 17.33 19.5 16.5V7.5C19.5 6.12 17.92 5.33 16.8 6.15L12 9.75L7.2 6.15C6.08 5.33 4.5 6.12 4.5 7.5Z" fill="#EA4335" />
        <path d="M4.5 7.5V16.5C4.5 17.33 5.17 18 6 18H7.5V10.8L4.5 8.55V7.5Z" fill="#4285F4" />
        <path d="M19.5 7.5V16.5C19.5 17.33 18.83 18 18 18H16.5V10.8L19.5 8.55V7.5Z" fill="#34A853" />
        <path d="M16.5 10.8V6.38L16.8 6.15C17.92 5.33 19.5 6.12 19.5 7.5V8.55L16.5 10.8Z" fill="#FBBC05" />
        <path d="M7.5 10.8V6.38L7.2 6.15C6.08 5.33 4.5 6.12 4.5 7.5V8.55L7.5 10.8Z" fill="#C5221F" />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect width="24" height="24" rx="5" fill="#16A34A" />
      <path d="M17.48 14.86L15.27 14.61C14.74 14.55 14.22 14.73 13.85 15.11L12.26 16.7C9.81 15.45 7.8 13.45 6.55 10.99L8.15 9.39C8.53 9.01 8.71 8.49 8.65 7.96L8.39 5.77C8.29 4.9 7.56 4.25 6.68 4.25H5.19C4.21 4.25 3.4 5.06 3.46 6.04C3.92 13.44 9.82 19.33 17.21 19.79C18.19 19.85 19 19.04 19 18.06V16.57C19.01 15.7 18.35 14.96 17.48 14.86Z" fill="#FFFFFF" />
    </svg>
  );
}

// ─── Featured Projects Data ───────────────────────────────────────────────────

const projects = PROJECTS_DATA;

// ─── Expertise (What I Do) ────────────────────────────────────────────────────

// Content is grounded in Shubham's 8 real projects — distinct from Portfolio Overview & About.
const capabilities = [
  {
    id: 'uiux',
    title: 'End-to-End Product UX',
    tagline: 'From messy problem to shippable product',
    desc: 'Turning ambiguous product ideas into structured, intuitive journeys — balancing user psychology with clear business goals so people know exactly what to do on every screen.',
    deliverables: ['Product Strategy', 'Journey Mapping', 'Wireframes', 'High-Fidelity UI'],
    applied: ['LifeOS', 'ClickCard', 'Brokrs House'],
    Visual: FlowVisual,
  },
  {
    id: 'mobile',
    title: 'Mobile App Ecosystems',
    tagline: 'Thumb-friendly, habit-forming experiences',
    desc: 'Designing native-feeling iOS & Android apps built around daily habits, quick capture, and multi-role discovery — whether it is personal finance tracking or property search on the go.',
    deliverables: ['iOS & Android UI', 'Micro-interactions', 'Multi-Role Flows', 'Gesture Navigation'],
    applied: ['LifeOS', 'The Brokrs', 'Brokrs House'],
    Visual: MobileVisual,
  },
  {
    id: 'web',
    title: 'Web Platforms & Conversion',
    tagline: 'Story-driven websites that build trust',
    desc: 'Crafting high-converting web platforms, booking flows, and cultural portals that organize deep content libraries into fast, accessible desktop and mobile experiences.',
    deliverables: ['Conversion Funnels', 'Booking & E-Commerce', 'Content Architecture', 'Responsive Web'],
    applied: ['Shyam Jagat', 'Sahil Hair Expert', 'ClickCard'],
    Visual: WebVisual,
  },
  {
    id: 'dashboard',
    title: 'Admin Panels & Data UI',
    tagline: 'Clarity for high-density operations',
    desc: 'Building back-office command centers where operators manage thousands of listings, bookings, and analytics without feeling overwhelmed by tables and filters.',
    deliverables: ['Role-Based Dashboards', 'Data Visualization', 'CRM & Inventory Flows', 'Bulk Actions'],
    applied: ['Shyam Jagat Admin Panel', 'Brokrs House'],
    Visual: DashboardVisual,
  },
  {
    id: 'system',
    title: 'Brand & Design Systems',
    tagline: 'Visual identity meets scalable tokens',
    desc: 'Rooted in my graphic design background — creating distinctive brand marks, typography scales, and reusable Figma component libraries that keep products cohesive as they grow.',
    deliverables: ['Logo & Brand Identity', 'Design Tokens', 'Figma Component Kits', 'Style Guides'],
    applied: ['Logo Design', 'LifeOS', 'The Brokrs'],
    Visual: SystemVisual,
  },
  {
    id: 'proto',
    title: 'Code-Aware Prototyping',
    tagline: 'Designed with React & CSS in mind',
    desc: 'Because I have built production interfaces in React and Tailwind, I design interactive prototypes and edge-case states (loading, empty, error) that developers can implement without guesswork.',
    deliverables: ['Interactive Prototypes', 'Edge-Case States', 'Dev-Ready Specs', 'UI Build Review'],
    applied: ['LifeOS', 'ClickCard', 'Sahil Hair Expert'],
    Visual: PrototypeVisual,
  },
];

const expertiseSkills = [
  'Product Thinking', 'User Flows', 'Information Architecture', 'Wireframing', 'Interactive Prototyping',
  'Design Systems', 'Brand Identity', 'Dashboard UX', 'Mobile-First Design', 'React & Tailwind Fluency',
  'Usability Audits', 'Visual Hierarchy', 'Developer Handoff',
];

// ── Mini animated visuals (decorative UI illustrations) ──

const ink = { line: '#4A453F', soft: '#3A3631', tile: '#2A2724', text: '#E9E4DC', mute: '#A39C93' };

function FlowVisual() {
  const nodes = [
    { x: 16,  y: 104, label: 'Entry' },
    { x: 120, y: 40,  label: 'Browse' },
    { x: 120, y: 168, label: 'Search' },
    { x: 226, y: 104, label: 'Details', hl: true },
    { x: 328, y: 104, label: 'Done' },
  ];
  const paths = [
    'M76 120 C 98 120, 98 56, 120 56',
    'M76 120 C 98 120, 98 184, 120 184',
    'M180 56 C 204 56, 204 120, 226 120',
    'M180 184 C 204 184, 204 120, 226 120',
    'M286 120 L 328 120',
  ];
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full p-5" aria-hidden="true">
      {paths.map((d, i) => (
        <path
          key={i} d={d} fill="none" stroke="#C85D2A" strokeWidth="1.5" strokeDasharray="160"
          className="xp-anim" style={{ animation: `xpDraw 0.7s ease ${0.35 + i * 0.15}s both` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g
          key={n.label} className="xp-anim"
          style={{ animation: `xpPop 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both`, transformOrigin: `${n.x + 30}px ${n.y + 16}px` }}
        >
          {n.hl && (
            <rect x={n.x - 4} y={n.y - 4} width="68" height="40" rx="11" fill="none" stroke="#C85D2A" strokeOpacity="0.5" className="animate-pulse" />
          )}
          <rect x={n.x} y={n.y} width="60" height="32" rx="8" fill={n.hl ? '#C85D2A' : ink.tile} stroke={n.hl ? '#C85D2A' : ink.line} />
          <text x={n.x + 30} y={n.y + 20} textAnchor="middle" fontSize="10" fontFamily="Inter" fill={n.hl ? '#fff' : ink.text}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function MobileVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6" aria-hidden="true">
      <div className="relative w-[148px] h-[244px] rounded-[26px] p-2.5" style={{ background: '#0E0D0C', border: `1px solid ${ink.soft}` }}>
        <div className="w-12 h-1.5 rounded-full mx-auto mb-3" style={{ background: ink.tile }} />
        <div className="h-6 rounded-lg mb-2 flex items-center px-2 gap-1.5 xp-anim" style={{ background: ink.tile, animation: 'xpRise .5s ease .1s both' }}>
          <div className="w-2 h-2 rounded-full border" style={{ borderColor: '#7A7068' }} />
          <div className="h-1.5 w-14 rounded" style={{ background: ink.line }} />
        </div>
        <div className="flex gap-1 mb-2">
          {['Buy', 'Rent', 'Plots'].map((c, i) => (
            <span
              key={c} className="text-[8px] px-1.5 py-0.5 rounded-full xp-anim"
              style={{ background: i === 0 ? '#C85D2A' : ink.tile, color: i === 0 ? '#fff' : ink.mute, animation: `xpPop .4s ease ${0.25 + i * 0.08}s both` }}
            >
              {c}
            </span>
          ))}
        </div>
        {[0, 1, 2].map(i => (
          <div
            key={i} className="flex gap-2 p-1.5 rounded-lg mb-1.5 xp-anim"
            style={{
              background: i === 0 ? 'rgba(200,93,42,0.14)' : '#1A1917',
              border: `1px solid ${i === 0 ? 'rgba(200,93,42,0.5)' : ink.tile}`,
              animation: `xpRise .5s ease ${0.45 + i * 0.12}s both`,
            }}
          >
            <div className="w-9 h-9 rounded-md shrink-0" style={{ background: ['#8B5E3C', '#2A6E6E', '#5A544D'][i] }} />
            <div className="flex-1 pt-1 space-y-1.5">
              <div className="h-1.5 rounded w-4/5" style={{ background: '#5A544D' }} />
              <div className="h-1.5 rounded w-1/2" style={{ background: ink.soft }} />
            </div>
          </div>
        ))}
      </div>
      <div
        className="hidden sm:block w-[132px] p-3 rounded-xl xp-anim"
        style={{ background: ink.tile, border: `1px solid ${ink.soft}`, animation: 'xpRise .6s ease .8s both, xpFloat 4s ease-in-out 1.4s infinite' }}
      >
        <div className="text-[9px] uppercase tracking-wider mb-2.5" style={{ color: ink.mute }}>Filters</div>
        {['Budget', 'Location', 'Type'].map((f, i) => (
          <div key={f} className="flex items-center justify-between mb-2">
            <span className="text-[9px]" style={{ color: ink.text }}>{f}</span>
            <span className="w-3 h-3 rounded-sm" style={{ background: i < 2 ? '#C85D2A' : 'transparent', border: '1px solid #5A544D' }} />
          </div>
        ))}
        <div className="mt-3 h-5 rounded-md text-[8px] flex items-center justify-center" style={{ background: '#C85D2A', color: '#fff' }}>Apply</div>
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-3" aria-hidden="true">
      <div
        className="xp-anim flex-1 w-full rounded-lg overflow-hidden flex flex-col"
        style={{ background: '#F3EEE6', animation: 'xpResize 6s cubic-bezier(0.65,0,0.35,1) .6s infinite' }}
      >
        <div className="flex items-center gap-1 px-2 h-5 shrink-0" style={{ background: '#E2DBD0' }}>
          {['#E06C5A', '#E8A33D', '#6BB37A'].map(c => <span key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />)}
          <div className="ml-2 h-2 flex-1 max-w-[120px] rounded" style={{ background: '#F3EEE6' }} />
        </div>
        <div className="p-3 flex-1 flex flex-col gap-2.5 overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="h-2 w-10 rounded" style={{ background: '#111' }} />
            <div className="flex gap-1.5">{[0, 1, 2].map(i => <div key={i} className="h-1.5 w-6 rounded" style={{ background: '#B5ADA2' }} />)}</div>
          </div>
          <div className="rounded-md p-3 xp-anim" style={{ background: '#C85D2A', animation: 'xpRise .5s ease .2s both' }}>
            <div className="h-2.5 w-3/5 rounded mb-1.5" style={{ background: 'rgba(255,255,255,0.9)' }} />
            <div className="h-1.5 w-2/5 rounded" style={{ background: 'rgba(255,255,255,0.55)' }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i} className="flex-1 min-w-[70px] h-12 rounded-md p-1.5 xp-anim"
                style={{ background: '#fff', border: '1px solid #E2DBD0', animation: `xpRise .5s ease ${0.35 + i * 0.1}s both` }}
              >
                <div className="h-4 rounded mb-1" style={{ background: ['#2A6E6E', '#E8A33D', '#8B5E3C'][i], opacity: 0.85 }} />
                <div className="h-1 w-3/4 rounded" style={{ background: '#B5ADA2' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-widest" style={{ color: '#7A7068' }}>Desktop ⇄ Mobile</div>
    </div>
  );
}

function DashboardVisual() {
  const bars = [40, 65, 50, 80, 60, 92, 72, 55];
  return (
    <div className="absolute inset-0 p-5 flex gap-3" aria-hidden="true">
      <div className="w-10 rounded-lg flex flex-col items-center gap-2 py-3 xp-anim" style={{ background: ink.tile, animation: 'xpRise .4s ease both' }}>
        {[0, 1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded" style={{ background: i === 1 ? '#C85D2A' : ink.soft }} />)}
      </div>
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="grid grid-cols-3 gap-2">
          {['#C85D2A', '#2A6E6E', '#E8A33D'].map((c, i) => (
            <div key={c} className="rounded-lg p-2 xp-anim" style={{ background: ink.tile, animation: `xpPop .45s ease ${0.1 + i * 0.08}s both` }}>
              <div className="h-1.5 w-8 rounded mb-2" style={{ background: '#5A544D' }} />
              <div className="h-3 w-12 max-w-full rounded" style={{ background: c }} />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg p-3 flex items-end gap-1.5" style={{ background: ink.tile }}>
          {bars.map((h, i) => (
            <div
              key={i} className="flex-1 rounded-t-sm xp-anim"
              style={{ height: `${h}%`, background: i === 5 ? '#C85D2A' : ink.line, transformOrigin: 'bottom', animation: `xpGrow .7s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.06}s both` }}
            />
          ))}
        </div>
        <div className="rounded-lg p-2 space-y-1.5" style={{ background: ink.tile }}>
          {[0, 1].map(i => (
            <div key={i} className="flex items-center gap-2 xp-anim" style={{ animation: `xpRise .4s ease ${0.9 + i * 0.1}s both` }}>
              <div className="w-3 h-3 rounded-full" style={{ background: '#5A544D' }} />
              <div className="h-1.5 flex-1 rounded" style={{ background: ink.soft }} />
              <div
                className="h-3.5 px-2 rounded-full text-[7px] flex items-center"
                style={{ background: i ? 'rgba(42,110,110,0.3)' : 'rgba(200,93,42,0.25)', color: i ? '#7FC4C4' : '#F0A37E' }}
              >
                {i ? 'Active' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemVisual() {
  const tile = (delay: number): React.CSSProperties => ({
    background: ink.tile, border: `1px solid ${ink.soft}`, animation: `xpPop .5s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
  });
  const label = 'text-[9px] uppercase tracking-widest mb-3';
  return (
    <div className="absolute inset-0 p-5 grid grid-cols-2 gap-3" aria-hidden="true">
      <div className="rounded-lg p-3 xp-anim" style={tile(0)}>
        <div className={label} style={{ color: ink.mute }}>Color</div>
        <div className="flex gap-1.5">
          {['#C85D2A', '#E8A33D', '#2A6E6E', '#E9E4DC', '#111'].map((c, i) => (
            <span key={c} className="w-6 h-6 rounded-full xp-anim" style={{ background: c, border: '1px solid #4A453F', animation: `xpPop .4s ease ${0.2 + i * 0.07}s both` }} />
          ))}
        </div>
      </div>
      <div className="rounded-lg p-3 xp-anim" style={tile(0.1)}>
        <div className={label} style={{ color: ink.mute }}>Type</div>
        <div className="flex items-end gap-3">
          <span className="font-serif text-4xl leading-none" style={{ color: ink.text }}>Aa</span>
          <span className="font-sans text-xl leading-none" style={{ color: ink.mute }}>Aa</span>
          <span className="font-sans text-xs leading-none" style={{ color: '#7A7068' }}>Aa</span>
        </div>
      </div>
      <div className="rounded-lg p-3 xp-anim" style={tile(0.2)}>
        <div className={label} style={{ color: ink.mute }}>Buttons</div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] px-3 py-1.5 rounded-md" style={{ background: '#C85D2A', color: '#fff' }}>Primary</span>
          <span className="text-[10px] px-3 py-1.5 rounded-md" style={{ border: '1px solid #5A544D', color: ink.text }}>Secondary</span>
        </div>
      </div>
      <div className="rounded-lg p-3 xp-anim" style={tile(0.3)}>
        <div className={label} style={{ color: ink.mute }}>Controls</div>
        <div className="flex items-center gap-3 mb-2.5">
          <span className="w-9 h-5 rounded-full p-0.5 xp-anim" style={{ background: ink.soft, animation: 'xpToggleBg 3s ease-in-out 1s infinite' }}>
            <span className="block w-4 h-4 rounded-full xp-anim" style={{ background: '#fff', animation: 'xpToggle 3s ease-in-out 1s infinite' }} />
          </span>
          <span className="w-4 h-4 rounded flex items-center justify-center text-[9px]" style={{ background: '#C85D2A', color: '#fff' }}>✓</span>
        </div>
        <div className="h-5 rounded-md flex items-center px-2" style={{ border: '1px solid #5A544D' }}>
          <span className="w-px h-3 xp-anim" style={{ background: ink.text, animation: 'xpBlink 1s steps(1) infinite' }} />
        </div>
      </div>
    </div>
  );
}

function PrototypeVisual() {
  const screen = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: '#0E0D0C', border: `1px solid ${ink.soft}`, ...extra,
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative" style={{ width: 320, height: 220 }}>
        {/* Screen A */}
        <div className="absolute rounded-2xl p-3" style={{ left: 0, top: 10, width: 120, height: 200, ...screen() }}>
          <div className="h-16 rounded-lg mb-2" style={{ background: '#8B5E3C' }} />
          <div className="h-1.5 w-4/5 rounded mb-1.5" style={{ background: '#5A544D' }} />
          <div className="h-1.5 w-1/2 rounded" style={{ background: ink.soft }} />
          <div className="absolute rounded-md text-[8px] flex items-center justify-center" style={{ left: 12, right: 12, bottom: 16, height: 22, background: '#C85D2A', color: '#fff' }}>
            Continue
          </div>
        </div>
        {/* Screen B */}
        <div className="absolute rounded-2xl p-3 xp-anim" style={{ left: 200, top: 10, width: 120, height: 200, ...screen({ animation: 'xpScreen 4s ease-in-out infinite' }) }}>
          <div className="text-[8px] uppercase tracking-wider mb-2" style={{ color: ink.mute }}>Checkout</div>
          {[0, 1, 2].map(i => <div key={i} className="h-6 rounded-md mb-1.5" style={{ background: ink.tile }} />)}
          <div className="absolute rounded-md" style={{ left: 12, right: 12, bottom: 16, height: 22, background: '#2A6E6E' }} />
        </div>
        {/* Connector */}
        <svg className="absolute inset-0 overflow-visible" width="320" height="220">
          <path
            d="M108 183 C 150 183, 160 110, 200 110" fill="none" stroke="#C85D2A" strokeWidth="1.5" strokeDasharray="140"
            className="xp-anim" style={{ animation: 'xpDrawLoop 4s ease-in-out infinite' }}
          />
          <circle cx="200" cy="110" r="3" fill="#C85D2A" />
        </svg>
        {/* Click ripple */}
        <div className="absolute w-6 h-6 rounded-full xp-anim" style={{ left: 48, top: 171, border: '2px solid #F0A37E', opacity: 0, animation: 'xpRipple 4s ease-out infinite' }} />
        {/* Cursor */}
        <svg className="absolute left-0 top-0 xp-anim" width="18" height="18" viewBox="0 0 24 24" style={{ animation: 'xpCursor 4s ease-in-out infinite', transform: 'translate(56px,178px)' }}>
          <path d="M4 2l16 9-7 2-3 7z" fill="#fff" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Process steps ────────────────────────────────────────────────────────────

const processSteps = [
  {
    num: '01', label: 'Empathize', icon: 'users', color: '#8A8279',
    short: 'Talk to real users and audit where existing workflows break.',
    long: 'Before opening Figma, I study how people currently solve the problem — whether that is brokers juggling WhatsApp leads, devotees searching temple timings, or professionals tracking daily bills.',
    points: ['User & Stakeholder Interviews', 'Real-World Workflow Audit', 'Competitor & Gap Analysis'],
    tagline: ['Listen', 'Observe', 'Uncover'],
  },
  {
    num: '02', label: 'Define', icon: 'define', color: '#E8A33D',
    short: 'Distill research into a sharp problem statement & success metrics.',
    long: 'I narrow down the noise into a single core question: what is the #1 friction point we must eliminate, and how will we measure success for both the user and the business?',
    points: ['Core Problem Framing', 'Role & Persona Mapping', 'Success Metrics Definition'],
    tagline: ['Filter', 'Focus', 'Align'],
  },
  {
    num: '03', label: 'Ideate', icon: 'bulb', color: '#C85D2A',
    short: 'Map the information architecture and low-friction user journeys.',
    long: 'I sketch multiple structural directions and map out end-to-end flows — stripping away unnecessary steps so a first-time user can reach value in the fewest possible taps.',
    points: ['End-to-End User Flows', 'Information Architecture', 'Low-Fidelity Wireframes'],
    tagline: ['Sketch', 'Structure', 'Simplify'],
  },
  {
    num: '04', label: 'Design', icon: 'pen', color: '#C85D2A',
    short: 'Craft expressive visual UI backed by reusable design tokens.',
    long: 'Where graphic design craft meets product systems — pairing intentional typography, color psychology, and spacing with modular Figma components across light, dark, and responsive views.',
    points: ['High-Fidelity Visual UI', 'Tokenized Component Library', 'Empty, Loading & Error States'],
    tagline: ['Craft', 'Systemize', 'Polish'],
  },
  {
    num: '05', label: 'Test', icon: 'flask', color: '#2A6E6E',
    short: 'Put clickable prototypes in front of people and iterate fast.',
    long: 'I connect screens into realistic interactive prototypes to test where users hesitate, misclick, or get confused — refining copy, contrast, and hierarchy before a single line of code is written.',
    points: ['Interactive Figma Prototypes', 'Task-Based Usability Checks', 'Friction & Copy Refinement'],
    tagline: ['Simulate', 'Validate', 'Refine'],
  },
  {
    num: '06', label: 'Deliver', icon: 'box', color: '#C85D2A',
    short: 'Speak the developer’s language from handoff through launch QA.',
    long: 'Thanks to my frontend background in React and Tailwind, I hand off clean component specs, responsive breakpoints, and interaction notes — working alongside engineers until the live build feels right.',
    points: ['Developer-Ready Specs', 'React / CSS Feasibility Sync', 'Pre-Launch Visual QA'],
    tagline: ['Specify', 'Collaborate', 'Ship'],
  },
];

// ─── Blog posts ───────────────────────────────────────────────────────────────

const posts = [
  {
    tag: 'Perspective',
    date: 'Sep 2025',
    readTime: '4 min read',
    title: 'What Civil Services Preparation Taught Me About UX & Systems Thinking',
    desc: 'Three years of studying public policy, human behavior, and complex institutions trained me to never take a surface-level problem at face value when designing digital products.',
    fullText: [
      'Between 2021 and 2024, I spent my days immersed in Civil Services preparation — analyzing how large public systems work, why well-intended policies fail on the ground, and how diverse citizens interact with complex institutions.',
      'When I transitioned back into tech and product design, I realized those years were my strongest UX foundation. Good product design is not about trendy gradients; it is about reading between the lines of human behavior, synthesizing massive amounts of messy information into a clear structure, and designing for the person with the least patience or technical context.',
      'Whether I am structuring a multi-role B2B real estate marketplace like Brokrs House or a devotional ecosystem like Shyam Jagat for users of every age group, that habit of deep research and structured thinking guides every screen I draw.',
    ],
  },
  {
    tag: 'Design × Code',
    date: 'Aug 2025',
    readTime: '3 min read',
    title: 'Why Building in React Changed How I Design in Figma',
    desc: 'Working as a Frontend Developer taught me where designs usually break during handoff — and how thinking in components, flexbox, and real data states makes UI 10× stronger.',
    fullText: [
      'A lot of friction between designers and engineers happens because static mockups assume ideal data: two-line titles, perfect avatars, and happy-path screens.',
      'Having built production interfaces in React and Tailwind CSS, I now design with the DOM in mind. When I set up auto-layout in Figma, I am already thinking about flex-wrap, grid breakpoints, and reusable props. More importantly, I design the uncomfortable states upfront — what happens when a broker has zero leads yet, when a network call is loading, or when a user uploads a low-contrast logo.',
      'When developers open a file that already accounts for those realities, handoff stops being a translation exercise and becomes a genuine collaboration.',
    ],
  },
  {
    tag: 'Product Craft',
    date: 'Jul 2025',
    readTime: '5 min read',
    title: 'Designing for Two Worlds: Consumer Emotion vs. Admin Efficiency',
    desc: 'Lessons from designing both the public-facing experience and the back-office command center — why a temple portal and an operations dashboard need completely different rhythms.',
    fullText: [
      'Across my recent projects, I have had the chance to design both sides of the coin: serene, emotionally resonant consumer experiences (like LifeOS and the Shyam Jagat portal) and high-density operational tools (like the Shyam Jagat Admin Panel and Brokrs House broker workflows).',
      'Consumer interfaces succeed when they reduce cognitive load and evoke trust through generous whitespace, warm typography, and guided storytelling. Admin dashboards, on the other hand, succeed when they respect the operator’s muscle memory — surfacing status badges, bulk actions, and instant filters without forcing extra clicks.',
      'Understanding which mode a user is in — exploring vs. executing — is the difference between a product that merely looks good in a portfolio and one that people rely on every day.',
    ],
  },
];

// ─── Tools logos (simple SVG icon placeholders) ───────────────────────────────

const tools = [
  { name: 'Figma',     bg: '#F5E6FF', color: '#8A2BE2' },
  { name: 'Adobe XD',  bg: '#FFE4F0', color: '#FF0099' },
  { name: 'Photoshop', bg: '#E4F0FF', color: '#001E36' },
  { name: 'Illustrator',bg: '#FFF4E4', color: '#FF7C00' },
  { name: 'Sketch',    bg: '#FFF4E4', color: '#F7B500' },
  { name: 'VS Code',   bg: '#E4EEFF', color: '#007ACC' },
  { name: 'HTML5',     bg: '#FFE9E4', color: '#E34F26' },
  { name: 'CSS3',      bg: '#E4EFFF', color: '#1572B6' },
  { name: 'JavaScript',bg: '#FFFCE4', color: '#F7DF1E' },
  { name: 'GitHub',    bg: '#F0F0F0', color: '#111' },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

const navLinks = [
  { href: '#home',      label: 'Home' },
  { href: '#skills',    label: 'Skills' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about',     label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#process',   label: 'Process' },
  { href: '#blog',      label: 'Blog' },
  { href: '#contact',   label: 'Contact' },
];

function Navbar() {
  const scrolled = useScrolled();
  const active   = useActiveSection();
  const [open, setOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="lg:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: 'rgba(17,17,17,0.2)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled || open ? '#FAF8F3' : 'rgba(250,248,243,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled || open ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }} className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: '#EFE9DE',
                borderRadius: 9,
                border: '1.5px solid rgba(17,17,17,0.14)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              }}
            >
              <img
                src="/shubham_character_avatar.jpg"
                alt="Shubham Sharma logo"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-semibold text-sm leading-none" style={{ color: '#111' }}>Shubham Sharma</div>
              <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: 'var(--orange)', fontFamily: 'Inter' }}>UI/UX Designer</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href.slice(1)); }}
                className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('contact'); }}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 btn-arrow transition-all duration-200"
              style={{
                background: '#111',
                color: '#FAF8F3',
                borderRadius: 8,
              }}
            >
              Let&apos;s Connect <span className="arrow">→</span>
            </a>

            {/* Hamburger */}
            <button
              type="button"
              className={`ham lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer ${open ? 'open' : ''}`}
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`mobile-menu lg:hidden ${open ? 'open' : ''}`}
          style={{
            background: '#FAF8F3',
            borderBottom: '1px solid var(--border)',
            boxShadow: open ? '0 16px 32px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          <div className="px-5 py-4 flex flex-col gap-1">
            {navLinks.map((l, i) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={e => { e.preventDefault(); scrollTo(l.href.slice(1)); }}
                  className="mobile-nav-item py-3 px-4 text-sm font-medium rounded-lg flex items-center justify-between"
                  style={{
                    transitionDelay: open ? `${i * 30}ms` : '0ms',
                    color: isActive ? 'var(--orange)' : '#111',
                    background: isActive ? 'var(--orange-light)' : 'transparent',
                  }}
                >
                  <span>{l.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--orange)' }} />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('contact'); }}
              className="mobile-nav-item mt-2 text-center py-3 font-semibold text-sm rounded-lg btn-arrow"
              style={{
                transitionDelay: open ? `${navLinks.length * 30}ms` : '0ms',
                background: '#111',
                color: '#FAF8F3',
              }}
            >
              Let&apos;s Connect <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onOpenCaseStudy }: { onOpenCaseStudy?: (slug: string) => void }) {
  const parallax = useParallax();
  const [loaded, setLoaded] = useState(false);
  const [activeProcessIdx, setActiveProcessIdx] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<'lifeos' | 'brokrs' | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const processSteps = ['Research', 'Ideas', 'Design', 'Build', 'Test', 'Launch'];

  return (
    <section
      id="home"
      className="relative lg:min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--ivory)', paddingTop: 80 }}
    >
      {/* Interactive Right Process Rail (inspired by Ref Image 3) */}
      <div
        className="absolute right-5 xl:right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-stretch gap-3.5 z-20 select-none"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease 1.1s',
        }}
      >
        {/* Vertical track line + sliding orange dot */}
        <div className="relative flex flex-col items-center py-2">
          <div className="w-px h-full" style={{ background: '#DCD5CC' }} />
          <div
            className="absolute w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: 'var(--orange)',
              boxShadow: '0 0 0 4px rgba(232, 96, 28, 0.16)',
              top: `calc(${activeProcessIdx * 28}px + 7px)`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
        <div className="flex flex-col justify-between">
          {processSteps.map((t, i) => {
            const isActive = activeProcessIdx === i;
            return (
              <button
                key={t}
                type="button"
                onMouseEnter={() => setActiveProcessIdx(i)}
                onClick={() => scrollTo('process')}
                className="text-[10.5px] tracking-[0.2em] uppercase text-left transition-all duration-200 cursor-pointer"
                style={{
                  color: isActive ? 'var(--orange)' : '#7A7068',
                  fontFamily: 'Inter',
                  fontWeight: isActive ? 600 : 500,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  transform: isActive ? 'translateX(2px)' : 'none',
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Social sidebar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-3.5 items-center z-20">
        <div className="w-px h-14 bg-gray-300" />
        {[
          { href: CONTACT_INFO.linkedin, icon: 'linkedin' as const, label: 'LinkedIn', ext: true },
          { href: CONTACT_INFO.behance, icon: 'behance' as const, label: 'Behance', ext: true },
          { href: `mailto:${CONTACT_INFO.email}`, icon: 'email' as const, label: 'Email', ext: false },
          { href: CONTACT_INFO.phoneHref, icon: 'phone' as const, label: 'Phone', ext: false },
        ].map(s => (
          <a
            key={s.label}
            href={s.href}
            target={s.ext ? '_blank' : undefined}
            rel={s.ext ? 'noopener noreferrer' : undefined}
            aria-label={s.label}
            title={s.label}
            className="p-1.5 rounded-lg transition-transform duration-200 hover:scale-110"
          >
            <BrandIcon name={s.icon} size={20} />
          </a>
        ))}
        <div className="w-px h-14 bg-gray-300" />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center z-10 pt-5 pb-4 lg:py-0">
        {/* Left content */}
        <div className="lg:col-span-6 relative z-20">
          {/* Interactive Status Pill */}
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase mb-5 sm:mb-7 px-4 py-2 border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
            style={{
              borderColor: '#E2DDD5',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(8px)',
              color: '#2A2A2A',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s, box-shadow 0.25s ease',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>OPEN TO OPPORTUNITIES</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#555' }}>↗</span>
          </button>

          {/* Heading with hand-drawn orange accents */}
          <div
            className="relative mb-7"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.8s ease 0.35s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.35s',
            }}
          >
            <h1
              className="font-serif font-bold leading-[1.06] relative inline-block"
              style={{
                fontSize: 'clamp(2.5rem, 5.1vw, 4.25rem)',
                color: '#111',
              }}
            >
              <span className="relative inline-block">
                I design intuitive
                {/* Hand-drawn curved orange arrow near end of "intuitive" */}
                <svg
                  className="hidden sm:block absolute -top-4 -right-12 pointer-events-none"
                  width="46"
                  height="34"
                  viewBox="0 0 46 34"
                  fill="none"
                >
                  <path
                    d="M4 20 C 5 14, 8 11, 10 9"
                    stroke="#E8601C"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                  <path
                    d="M17 28 C 21 17, 29 11, 40 9"
                    stroke="#E8601C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33 4 L 41 8.5 L 35.5 16"
                    stroke="#E8601C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <br />
              <span className="relative inline-block mr-3" style={{ color: 'var(--orange)' }}>
                {/* Three hand-drawn starburst rays on top-left of "digital" */}
                <svg
                  className="absolute -left-6 -top-2 pointer-events-none"
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                >
                  <path d="M18 6 L12 1" stroke="#E8601C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14 12 L4 9" stroke="#E8601C" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13 18 L3 20" stroke="#E8601C" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                digital
                {/* Double hand-drawn orange underline beneath "digital" */}
                <svg
                  className="absolute left-0 -bottom-2.5 w-[108%] pointer-events-none"
                  height="14"
                  viewBox="0 0 210 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5 C 52 3.5, 138 3.5, 206 7.5"
                    stroke="#E8601C"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M68 12.5 C 115 9.5, 165 9, 202 10.5"
                    stroke="#E8601C"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span>experiences</span>
              <span style={{ color: 'var(--orange)' }}>.</span>
            </h1>
          </div>

          {/* Sub */}
          <p
            className="text-base leading-relaxed mb-6 sm:mb-8 max-w-md"
            style={{
              color: '#7A7068',
              fontFamily: 'Inter',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.5s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s',
            }}
          >
            I combine strategy, design, and user empathy to craft beautiful, functional and meaningful digital products that drive results.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-3.5 sm:gap-4 mb-6 sm:mb-10"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.65s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s',
            }}
          >
            <button
              onClick={() => scrollTo('portfolio')}
              className="flex items-center gap-2.5 px-6 py-3.5 font-semibold text-sm btn-arrow transition-all duration-200 hover:opacity-95 hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: 'var(--orange)',
                color: '#fff',
                borderRadius: 10,
                boxShadow: '0 10px 24px -6px rgba(232, 96, 28, 0.45)',
              }}
            >
              View My Work <span className="arrow">→</span>
            </button>
            <a
              href="/Shubham-Sharma-Resume.pdf"
              download
              className="flex items-center gap-2.5 px-6 py-3.5 font-semibold text-sm btn-arrow border transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
              style={{
                borderColor: '#D6D0C6',
                background: 'rgba(255,255,255,0.55)',
                color: '#111',
                borderRadius: 10,
              }}
            >
              Download Resume <span className="arrow">↓</span>
            </a>
          </div>

          {/* Tool icons row (with Notion added after HTML5) */}
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 0.8s',
            }}
          >
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: '#7A7068' }}>Tools I use</div>
            <div className="flex flex-wrap gap-2.5 max-w-lg">
              {[
                { name: 'Figma', icon: (
                  <svg width="14" height="14" viewBox="0 0 38 57" fill="none"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/></svg>
                )},
                { name: 'Sketch', icon: (
                  <svg width="14" height="14" viewBox="0 0 394 356" fill="none"><path d="M85.8 4.8L197 0l111.2 4.8L394 131.5 197 356 0 131.5z" fill="#FDB300"/><path d="M79.7 131.5L197 356 0 131.5z" fill="#EA6C00"/><path d="M314.3 131.5L197 356l197-224.5z" fill="#EA6C00"/><path d="M79.7 131.5h234.6L197 356z" fill="#FDAD00"/><path d="M197 0L85.8 4.8 79.7 131.5z" fill="#FDD231"/><path d="M197 0l111.2 4.8 5.1 126.7z" fill="#FDD231"/><path d="M394 131.5L308.2 4.8l6.1 126.7z" fill="#FDAD00"/><path d="M0 131.5L85.8 4.8l-6.1 126.7z" fill="#FDAD00"/><path d="M197 0L79.7 131.5h234.6z" fill="#FEEEB7"/></svg>
                )},
                { name: 'Adobe XD', icon: (
                  <svg width="14" height="14" viewBox="0 0 240 234" fill="none"><rect width="240" height="234" rx="42" fill="#470137"/><path d="M58 176l38.4-62.9L60.6 56h27.2l22.8 42.4c2.1 4 3.5 7 4.2 8.8h.3c1.6-3.7 3.1-6.7 4.5-9l24-42.2h25.2l-37.4 56.4L170.4 176h-26.8l-25.2-45.6c-1-1.8-2.1-4-3.2-6.4h-.4c-.8 2-1.9 4.1-3.1 6.4L85.8 176H58z" fill="#FF61F6"/><path d="M180.8 170.4v-82.8c0-1.6.5-2.4 2.2-2.4h10.4c1 0 1.8-.2 2 1.2l1.2 8.8c4.4-6 11-11.6 21.2-11.6 1.6 0 2.4.8 2.4 2.2v13c0 1.6-.8 2.2-2.2 2.2-12 0-18.4 5.6-21.6 12.2v57.2c0 1.6-.8 2.4-2.4 2.4H183c-1.4 0-2.2-.8-2.2-2.2z" fill="#FF61F6"/></svg>
                )},
                { name: 'Photoshop', icon: (
                  <svg width="14" height="14" viewBox="0 0 240 234" fill="none"><rect width="240" height="234" rx="42" fill="#001E36"/><path d="M54 164.1V68.2c0-.6.2-1 .8-1 1.2 0 2.4-.1 4.2-.2 1.8-.1 3.8-.2 6-.3 2.2-.1 4.6-.2 7.2-.2 2.6-.1 5-.1 7.4-.1 7 0 12.8.8 17.6 2.4 4.2 1.4 7.8 3.4 10.8 6.2 2.6 2.4 4.6 5.4 5.8 8.8 1.2 3.4 1.8 7 1.8 10.8 0 7.8-2.4 14-7.2 18.4-4.8 4.4-12.2 6.6-22.2 6.6-2.4 0-4.2 0-5.4-.1-1.2-.1-2.6-.1-4.2-.1v45.4c.1.7-.4 1.2-1 1.2H55.2c-.8 0-1.2-.4-1.2-1.2zm17.6-84v28.8c1.6.2 3.2.3 4.6.3h5.8c3.6 0 6.8-.4 9.4-1.4 2.4-.8 4.4-2.2 5.8-4 1.4-1.8 2-4.4 2-7.4 0-2.6-.6-5-1.6-7-1.2-2-3-3.6-5.4-4.6-2.6-1.2-6-1.8-10.2-1.8-2.4 0-4.4 0-5.8.1-1.8 0-3.2.2-4.6.4v-3.4zm84 84.8c-5.4 0-10.2-.8-14.4-2.6-4-1.6-7.2-4.2-9.6-7.6-2.2-3.2-3.4-7.4-3.4-12.2 0-5.2 1.4-9.4 4.2-12.8 2.8-3.4 6.6-6 11.4-7.6 4.8-1.8 10.4-2.6 16.6-2.6 2.6 0 5 .2 7.2.4 2.2.3 4.4.6 6.6 1.2v-3c0-5-1.4-8.8-4.2-11.4-2.8-2.6-7-4-12.6-4-3.8 0-7.2.5-10.2 1.4-3.4 1-6.4 2.4-9.2 4-.6.4-1 .4-1.4-.2l-4.4-8.2c-.4-.6-.2-1 .2-1.4 3.4-2.2 7.4-4 11.6-5.2 4.4-1.4 9-2 14-2 9.4 0 16.4 2.4 21 7 4.6 4.6 6.8 11.4 6.8 20.4v42.2c0 .8-.4 1.2-1.2 1.2h-11.4c-.6 0-1-.4-1.2-1l-.8-5.8c-3 2.4-6.6 4.4-10.6 5.8-4 1.4-8 2-12.2 2zm3.8-12c3 0 6-.6 8.8-1.6 2.8-1.2 5.4-2.8 7.6-5v-12.4c-1.8-.6-3.8-1-6-1.4-2.2-.3-4.4-.4-6.4-.4-5.2 0-9.4 1-12.4 3-3 2-4.4 4.8-4.4 8.6 0 3.4 1.2 6 3.4 7.6 2.4 1.8 5.6 2.6 9.4 2.6z" fill="#31A8FF"/></svg>
                )},
                { name: 'Illustrator', icon: (
                  <svg width="14" height="14" viewBox="0 0 240 234" fill="none"><rect width="240" height="234" rx="42" fill="#330000"/><path d="M116.4 164.2H75.8l-8.8 27.4c-.2.8-.8 1.2-1.6 1.2H50.8c-.8 0-1.2-.4-.8-1.4L88.2 68.2c.3-.8.6-1.8 1-3.2.4-2 .6-4 .6-5.8 0-.4.2-.8.8-.8h19.8c.6 0 .8.2 1 .6l42.4 133.4c.2.8 0 1.4-.8 1.4h-16.4c-.6 0-1-.4-1.2-1l-9.4-28h-9.6zm-34.2-17h27.8l-6.2-19.8c-1.8-5.6-3.8-12.4-5.8-20h-.4c-1.6 7-3.6 13.8-5.6 20l-6.4 19.8h-3.4zm82 22.6c0-5.2 3.6-8.8 8.4-8.8 5 0 8.4 3.6 8.4 8.8 0 5.2-3.4 8.8-8.6 8.8-4.8 0-8.2-3.6-8.2-8.8zm1.8-83.4V70c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v16.4c0 .6-.4 1.2-1 1.2h-14c-.6 0-1-.4-1-1.2zm0 78.4V94.4c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v70.4c0 .6-.4 1-1 1h-14c-.6 0-1-.4-1-1z" fill="#FF9A00"/></svg>
                )},
                { name: 'VS Code', icon: (
                  <svg width="14" height="14" viewBox="0 0 100 100" fill="none"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><path fillRule="evenodd" clipRule="evenodd" d="M70.9 99.3c1.6.7 3.5.5 5-.5l19.8-9.5c2.5-1.2 4.2-3.7 4.2-6.5V17.2c0-2.8-1.6-5.3-4.2-6.5L75.9 1.2c-2-.9-4.3-.7-6 .7L29 38.7 12 25.7c-1.5-1.1-3.5-1.2-5-.1L2.6 29.3c-1.8 1.4-1.8 4 0 5.4L17.6 50 2.6 65.3c-1.8 1.4-1.8 4 0 5.4L7 74.4c1.5 1.1 3.5 1 5-.1L29 61.3 69.9 98c.3.3.6.5 1 .7v.6zM75.1 27.2L45 50l30.1 22.8V27.2z" fill="#fff"/></mask><g mask="url(#a)"><path d="M95.9 10.7L75.9 1.2c-2-.9-4.3-.7-6 .7L2.6 65.3c-1.8 1.4-1.8 4 0 5.4L7 74.4c1.5 1.1 3.5 1 5-.1l82.4-63c2.6-2 6.5-.2 6.5 3v-.6c0-2.8-1.6-5.3-4.2-6.5l.8 3.5z" fill="#0065A9"/><g><path d="M95.9 89.3L75.9 98.8c-2 .9-4.3.7-6-.7L2.6 34.7c-1.8-1.4-1.8-4 0-5.4L7 25.6c1.5-1.1 3.5-1 5 .1l82.4 63c2.6 2 6.5.2 6.5-3v.6c0 2.8-1.6 5.3-4.2 6.5l.8-3.5z" fill="#007ACC"/></g><g><path d="M75.9 98.8c-2 .9-4.3.7-6-.7-.1-.1-.2-.2-.4-.3 2.2 1.7 5.5.2 5.5-2.6V4.8c0-2.8-3.3-4.3-5.5-2.6.1-.1.3-.2.4-.3L89.7 11c2.5 1.3 4.2 3.8 4.2 6.6v64.8c0 2.8-1.6 5.3-4.2 6.5L75.9 98.8z" fill="#1F9CF0"/></g></g></svg>
                )},
                { name: 'React', icon: (
                  <svg width="14" height="14" viewBox="-11.5 -10.232 23 20.463" fill="none"><circle r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
                )},
                { name: 'Tailwind', icon: (
                  <svg width="14" height="14" viewBox="0 0 54 33" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#06B6D4"/></svg>
                )},
                { name: 'HTML5', icon: (
                  <svg width="14" height="14" viewBox="0 0 452 520" fill="none"><path d="M41 460L0 0h451l-41 460-185 52" fill="#E34F26"/><path d="M226 472l149-41 35-394H226" fill="#EF652A"/><path d="M226 208h-75l-5-58h80V94H84l1 15 14 156h127zm-2 143l-1 0-63-17-4-45h-56l8 89 115 32 1 0z" fill="#EBEBEB"/><path d="M226 208v56h70l-7 76-63 17v58l116-32 2-17 13-149 2-15h-15zm0-114v56h133l1-12 3-29 1-15z" fill="#fff"/></svg>
                )},
                { name: 'Notion', icon: (
                  <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
                    <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" fill="#fff"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" fill="#111"/>
                  </svg>
                )},
              ].map(t => (
                <span
                  key={t.name}
                  className="inline-flex items-center gap-2 text-xs px-3.5 py-2 border font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm select-none"
                  style={{ borderColor: 'var(--border)', borderRadius: 8, color: '#2A2A2A', background: 'var(--ivory-dark)' }}
                >
                  {t.icon}
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Statue + Orbiting Arcs + Interactive Floating Project Cards */}
        <div className="lg:col-span-6 relative flex justify-center items-center sm:min-h-[480px] lg:min-h-[560px] mt-1 sm:mt-0">
          {/* Soft warm ambient glow behind statue */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: '78%',
              height: '78%',
              background: 'radial-gradient(circle, rgba(232,96,28,0.14) 0%, rgba(232,96,28,0.04) 48%, rgba(232,96,28,0) 72%)',
              filter: 'blur(20px)',
              zIndex: 1,
            }}
          />

          {/* Decorative Orbit Arcs, Nodes & Hand-drawn Directional Arrows (Ref Image 3) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none block"
            viewBox="0 0 620 600"
            fill="none"
            style={{
              zIndex: 5,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 1s ease 0.6s',
              transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.15}px)`,
            }}
          >
            {/* Upper-right orbit arc */}
            <path
              d="M 210 112 C 335 58, 465 98, 495 255"
              stroke="#E8601C"
              strokeWidth="0.9"
              strokeOpacity="0.45"
              fill="none"
            />
            {/* Top orbit orange node dot + hand-drawn ↗ arrow */}
            <circle cx="356" cy="83" r="3" fill="#E8601C" />
            <path d="M 358 81 L 378 55" stroke="#E8601C" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 369 55 L 379 54 L 377 64" stroke="#E8601C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Mid-right orbit node dot + hand-drawn ↗ arrow + subtle loop */}
            <circle cx="486" cy="252" r="3.2" fill="#E8601C" />
            <path d="M 486 252 L 502 204" stroke="#E8601C" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 494 207 L 503 202 L 505 212" stroke="#E8601C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M 486 252 C 548 228, 565 258, 515 335"
              stroke="#9E9489"
              strokeWidth="0.85"
              strokeOpacity="0.45"
              fill="none"
            />

            {/* Left diagonal tangent line & lower-left loop */}
            <path
              d="M 45 405 C 100 365, 165 330, 235 292"
              stroke="#E8601C"
              strokeWidth="0.9"
              strokeOpacity="0.5"
              fill="none"
            />
            <path
              d="M 118 355 C 52 405, 58 468, 128 452"
              stroke="#9E9489"
              strokeWidth="0.85"
              strokeOpacity="0.45"
              fill="none"
            />
          </svg>

          {/* Interactive Floating Card 1: Top-Left — LifeOS */}
          <button
            type="button"
            onClick={() => onOpenCaseStudy ? onOpenCaseStudy('lifeos') : scrollTo('portfolio')}
            onMouseEnter={() => setHoveredCard('lifeos')}
            onMouseLeave={() => setHoveredCard(null)}
            aria-label="Open LifeOS Case Study"
            className="block absolute text-left z-30 cursor-pointer focus:outline-none left-0 sm:left-[-2%] top-[2%] sm:top-[5%] w-[124px] sm:w-[clamp(160px,16.5vw,198px)] p-1.5 sm:p-[8px_8px_11px] rounded-xl sm:rounded-2xl"
            style={{
              background: '#FFFFFF',
              boxShadow: hoveredCard === 'lifeos'
                ? '0 26px 50px -12px rgba(20, 15, 10, 0.24), 0 0 0 1.5px rgba(232, 96, 28, 0.35)'
                : '0 18px 40px -10px rgba(20, 15, 10, 0.14), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: loaded
                ? `translate(${parallax.x * -0.55}px, ${parallax.y * -0.45}px) rotate(${hoveredCard === 'lifeos' ? '-3deg' : '-9.5deg'}) scale(${hoveredCard === 'lifeos' ? 1.06 : 1})`
                : 'translateY(24px) rotate(-9.5deg) scale(0.92)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, opacity 0.7s ease 0.55s',
            }}
          >
            <div
              className="w-full overflow-hidden mb-1.5 sm:mb-2 h-[62px] sm:h-[clamp(84px,8.8vw,104px)] rounded-lg sm:rounded-[10px]"
              style={{
                background: '#0F2E22',
              }}
            >
              <img
                src="/case-studies/lifeos_hero_thumb.jpg"
                alt="LifeOS — Personal Life Organizer"
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: hoveredCard === 'lifeos' ? 'scale(1.07)' : 'scale(1)',
                }}
              />
            </div>
            <div className="flex items-end justify-between px-0.5 sm:px-1">
              <div>
                <div className="text-[10.5px] sm:text-xs font-bold leading-tight" style={{ color: '#111', fontFamily: 'Inter' }}>
                  LifeOS
                </div>
                <div className="text-[8.5px] sm:text-[10px] leading-tight mt-0.5" style={{ color: '#7A7068', fontFamily: 'Inter' }}>
                  Personal Life Organizer
                </div>
              </div>
              <span
                className="text-[10px] sm:text-xs font-semibold transition-transform duration-300"
                style={{
                  color: hoveredCard === 'lifeos' ? 'var(--orange)' : '#222',
                  transform: hoveredCard === 'lifeos' ? 'translate(2px, -2px)' : 'none',
                }}
              >
                ↗
              </span>
            </div>
          </button>

          {/* Interactive Floating Card 2: Bottom-Right — Brokrs House */}
          <button
            type="button"
            onClick={() => onOpenCaseStudy ? onOpenCaseStudy('brokrs-house') : scrollTo('portfolio')}
            onMouseEnter={() => setHoveredCard('brokrs')}
            onMouseLeave={() => setHoveredCard(null)}
            aria-label="Open Brokrs House Case Study"
            className="block absolute text-left z-30 cursor-pointer focus:outline-none right-0 sm:right-[-2%] bottom-[6%] sm:bottom-[13%] w-[128px] sm:w-[clamp(164px,17vw,204px)] p-1.5 sm:p-[8px_8px_11px] rounded-xl sm:rounded-2xl"
            style={{
              background: '#FFFFFF',
              boxShadow: hoveredCard === 'brokrs'
                ? '0 26px 50px -12px rgba(20, 15, 10, 0.25), 0 0 0 1.5px rgba(232, 96, 28, 0.35)'
                : '0 18px 40px -10px rgba(20, 15, 10, 0.15), 0 0 0 1px rgba(0,0,0,0.04)',
              transform: loaded
                ? `translate(${parallax.x * 0.6}px, ${parallax.y * 0.5}px) rotate(${hoveredCard === 'brokrs' ? '3.5deg' : '10.5deg'}) scale(${hoveredCard === 'brokrs' ? 1.06 : 1})`
                : 'translateY(24px) rotate(10.5deg) scale(0.92)',
              opacity: loaded ? 1 : 0,
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, opacity 0.7s ease 0.7s',
            }}
          >
            <div
              className="w-full overflow-hidden mb-1.5 sm:mb-2 h-[64px] sm:h-[clamp(86px,9vw,106px)] rounded-lg sm:rounded-[10px]"
              style={{
                background: '#141517',
              }}
            >
              <img
                src="/case-studies/brokrshouse_hero_thumb.png"
                alt="Brokrs House — Real Estate Platform"
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: hoveredCard === 'brokrs' ? 'scale(1.07)' : 'scale(1)',
                }}
              />
            </div>
            <div className="flex items-end justify-between px-0.5 sm:px-1">
              <div>
                <div className="text-[10.5px] sm:text-xs font-bold leading-tight" style={{ color: '#111', fontFamily: 'Inter' }}>
                  Brokrs House
                </div>
                <div className="text-[8.5px] sm:text-[10px] leading-tight mt-0.5" style={{ color: '#7A7068', fontFamily: 'Inter' }}>
                  Real Estate Platform
                </div>
              </div>
              <span
                className="text-[10px] sm:text-xs font-semibold transition-transform duration-300"
                style={{
                  color: hoveredCard === 'brokrs' ? 'var(--orange)' : '#222',
                  transform: hoveredCard === 'brokrs' ? 'translate(2px, -2px)' : 'none',
                }}
              >
                ↗
              </span>
            </div>
          </button>

          {/* Handwritten "Design / Build / Iterate / Repeat" annotation with curved loop arrow */}
          <div
            className="absolute hidden md:block pointer-events-none z-20"
            style={{
              top: '44%',
              left: '1%',
              transform: `translate(${parallax.x * 0.35}px, ${parallax.y * 0.2}px)`,
              transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease 0.9s',
              opacity: loaded ? 0.9 : 0,
            }}
          >
            <svg width="115" height="92" viewBox="0 0 115 92" fill="none">
              <text x="8" y="18" fontFamily="Georgia, serif" fontSize="12.5" fill="#7A7068" fontStyle="italic">Design</text>
              <text x="15" y="34" fontFamily="Georgia, serif" fontSize="12.5" fill="#7A7068" fontStyle="italic">Build</text>
              <text x="6" y="50" fontFamily="Georgia, serif" fontSize="12.5" fill="#7A7068" fontStyle="italic">Iterate</text>
              <text x="4" y="66" fontFamily="Georgia, serif" fontSize="12.5" fill="#7A7068" fontStyle="italic">Repeat</text>
              <path
                d="M 52 24 C 66 36, 65 62, 43 76"
                stroke="#8C8278"
                strokeWidth="1.15"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 48 71 L 42 77 L 50 79"
                stroke="#8C8278"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 55 74 C 62 72, 65 67, 63 62"
                stroke="#8C8278"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeOpacity="0.6"
                fill="none"
              />
            </svg>
          </div>

          {/* Quote annotation (Top-Right of statue) */}
          <div
            className="absolute right-2 xl:right-6 top-12 hidden lg:block text-left max-w-[155px] z-20 pointer-events-none"
            style={{
              opacity: loaded ? 0.9 : 0,
              transition: 'opacity 0.8s ease 1s',
            }}
          >
            <div className="text-3xl font-serif font-bold -ml-3" style={{ color: 'var(--orange)', lineHeight: 0.7 }}>&ldquo;</div>
            <p className="text-[10.5px] leading-relaxed uppercase tracking-wider mt-1" style={{ color: '#5A524C', fontFamily: 'Inter', fontWeight: 600 }}>
              Good Design Solves<br />Real Problems.
            </p>
            <div className="text-3xl font-serif font-bold text-right mr-3 mt-0.5" style={{ color: 'var(--orange)', lineHeight: 0.7 }}>&rdquo;</div>
          </div>

          {/* Statue image with seamless bottom fade mask */}
          <div
            className="relative z-10"
            style={{
              transform: `translate(${parallax.x * 0.45}px, ${parallax.y * 0.35}px)`,
              transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease 0.3s',
              opacity: loaded ? 1 : 0,
            }}
          >
            <img
              src={statueImg}
              alt="Greek statue wearing sunglasses — artistic hero illustration"
              className="relative z-10 select-none"
              style={{
                width: 'clamp(300px, 41vw, 500px)',
                maxHeight: '75vh',
                objectFit: 'contain',
                objectPosition: 'center top',
                filter: 'drop-shadow(0 24px 44px rgba(0,0,0,0.14))',
                WebkitMaskImage: 'linear-gradient(to bottom, #000 78%, rgba(0,0,0,0.6) 90%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, #000 78%, rgba(0,0,0,0.6) 90%, transparent 100%)',
              }}
              onLoad={() => setLoaded(true)}
            />
          </div>

          {/* "Same Human / Different Tools" annotation with curved arrow (Bottom-Right) */}
          <div
            className="absolute bottom-3 right-2 hidden lg:block z-20 pointer-events-none"
            style={{
              opacity: loaded ? 0.85 : 0,
              transition: 'opacity 0.8s ease 1.15s',
            }}
          >
            <svg width="135" height="72" viewBox="0 0 135 72" fill="none">
              <text x="34" y="18" fontFamily="Georgia, serif" fontSize="12" fill="#7A7068" fontStyle="italic">Same Human</text>
              <text x="26" y="34" fontFamily="Georgia, serif" fontSize="12" fill="#7A7068" fontStyle="italic">Different Tools</text>
              <path
                d="M 62 42 C 52 55, 34 61, 14 58"
                stroke="#8C8278"
                strokeWidth="1.15"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 20 53 L 13 58 L 19 63"
                stroke="#8C8278"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio Overview ───────────────────────────────────────────────────────

// All figures below come from the resume (public/Shubham-Sharma-Resume.pdf)
// and the Featured Projects list — no invented metrics.

function LineIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function CountUp({ target, decimals = 0, suffix = '' }: { target: number; decimals?: number; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0, raf = 0;
    const dur = 1600;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      setVal((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  return <span ref={ref as React.Ref<HTMLSpanElement>}>{val.toFixed(decimals)}{suffix}</span>;
}

const overviewStats = [
  {
    target: 8, decimals: 0, suffix: '', label: 'Projects\nDesigned', color: '#C85D2A',
    actionId: 'portfolio',
    icon: <><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  },
  {
    target: 1.5, decimals: 1, suffix: '', label: 'Years in\nProduct Design', color: '#E8A33D',
    actionId: 'about',
    icon: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></>,
  },
  {
    target: 3, decimals: 0, suffix: '', label: 'Product\nTeams', color: '#2A6E6E',
    actionId: 'about',
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  },
  {
    target: 50, decimals: 0, suffix: '+', label: 'UI Bugs Fixed', color: '#C85D2A',
    actionId: 'expertise',
    icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  },
];

const career = [
  { years: '2020–2021', short: 'Graphic\nDesign',  role: 'Graphic Designer · 2020–2021',           h: 34 },
  { years: '2021–2024', short: 'Civil\nServices',  role: 'Civil Services Preparation · 2021–2024', h: 52 },
  { years: '2024–2025', short: 'Frontend',         role: 'Frontend Developer, Emiza · 2024–2025',  h: 72 },
  { years: '2025–Now',  short: 'UI/UX',            role: 'UI/UX Designer, Top Parent · 2025–present', h: 100, current: true },
];

function PortfolioOverview({ onOpenCaseStudy }: { onOpenCaseStudy?: (slug: string) => void }) {
  const { ref: chartRef, inView: chartInView } = useInView(0.3);
  const { ref: barsRef, inView: barsInView } = useInView(0.3);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const card: React.CSSProperties = {
    background: '#FBF8F3',
    border: '1px solid rgba(17,17,17,0.07)',
    borderRadius: 18,
    boxShadow: '0 8px 28px -12px rgba(25, 18, 12, 0.06)',
  };

  return (
    <section
      id="skills"
      className="relative py-12 md:py-24 overflow-hidden"
      style={{ background: '#F3EEE6', borderTop: '1px solid var(--border)' }}
    >
      {/* Decorative Background Orbit Arcs & Classical Accents (inspired by Ref Image 2) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 1440 820"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Top-right orbit arc + orange node */}
        <path
          d="M 1080 -10 C 1170 68, 1310 82, 1450 56"
          stroke="#C85D2A"
          strokeWidth="0.9"
          strokeOpacity="0.38"
        />
        <circle cx="1298" cy="70" r="4.5" fill="#C85D2A" />

        {/* Left edge orbit arc + orange node + 4-point star */}
        <path
          d="M -20 190 C 65 250, 95 450, 20 640"
          stroke="#C85D2A"
          strokeWidth="0.85"
          strokeOpacity="0.28"
        />
        <path
          d="M -10 595 L 185 785"
          stroke="#C85D2A"
          strokeWidth="0.9"
          strokeOpacity="0.4"
        />
        <circle cx="65" cy="667" r="4" fill="#C85D2A" />
        <path
          d="M 65 680 L 68 690 L 78 693 L 68 696 L 65 706 L 62 696 L 52 693 L 62 690 Z"
          fill="#1A1917"
          opacity="0.85"
        />

        {/* Bottom-right orbit arc + orange node */}
        <path
          d="M 790 830 C 930 725, 1155 725, 1315 825"
          stroke="#C85D2A"
          strokeWidth="0.9"
          strokeOpacity="0.35"
        />
        <circle cx="1348" cy="774" r="6" fill="#C85D2A" fillOpacity="0.85" />
      </svg>

      {/* Subtle left classical bust silhouette watermark */}
      <img
        src={statueImg}
        alt=""
        aria-hidden="true"
        className="hidden xl:block absolute -left-24 top-1/2 -translate-y-1/2 w-56 pointer-events-none select-none"
        style={{
          opacity: 0.14,
          filter: 'grayscale(100%) contrast(1.1)',
          WebkitMaskImage: 'radial-gradient(circle at left center, black 35%, transparent 75%)',
          maskImage: 'radial-gradient(circle at left center, black 35%, transparent 75%)',
        }}
      />

      {/* Subtle bottom-right classical numeral accent */}
      <div
        aria-hidden="true"
        className="hidden lg:flex flex-col items-end absolute right-12 bottom-5 pointer-events-none select-none font-serif"
        style={{ color: '#5A524A', opacity: 0.45 }}
      >
        <span className="text-xs tracking-[0.22em]">XXV</span>
        <span className="text-[9px] tracking-[0.25em] mt-0.5 mr-3">XX</span>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Header Row: Left Title + Subtitle | Right "Selected Work" Collage ── */}
        <Reveal className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left Title Block */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-semibold tracking-[0.22em] uppercase" style={{ color: '#8C8278' }}>
                  Portfolio
                </span>
                <span className="w-20 h-px" style={{ background: '#D5CEC4' }} />
                <span className="text-[11px] font-medium tracking-[0.18em]" style={{ color: '#9E9489' }}>
                  02
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
                <h2
                  className="font-serif font-bold uppercase tracking-tight"
                  style={{
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.35rem)',
                    lineHeight: 0.98,
                  }}
                >
                  <span className="block" style={{ color: '#111' }}>Portfolio</span>
                  <span className="block mt-1" style={{ color: 'var(--orange)' }}>Overview</span>
                </h2>

                {/* Vertical divider */}
                <div className="hidden sm:block w-px h-16 shrink-0" style={{ background: '#D6CFC5' }} />

                <p
                  className="text-sm sm:text-[15px] leading-relaxed max-w-[240px]"
                  style={{ color: '#6E655D', fontFamily: 'Inter' }}
                >
                  A snapshot of my work, experience, and the products I&apos;ve designed.
                </p>
              </div>
            </div>

            {/* Right: "Selected Work" Interactive Mini Collage + Orange ↗ Button */}
            <div className="hidden md:flex items-center gap-4 relative pr-2">
              {/* Handwritten "Selected Work" + curved arrow */}
              <div className="flex flex-col items-end mr-1 -mt-6 select-none pointer-events-none">
                <div
                  className="text-xs italic leading-tight text-center -rotate-12"
                  style={{ color: '#7A7068', fontFamily: 'Georgia, serif' }}
                >
                  Selected<br />Work
                </div>
                <svg width="46" height="32" viewBox="0 0 46 32" fill="none" className="mt-1">
                  <path
                    d="M 6 4 C 12 20, 24 24, 40 22"
                    stroke="#7A7068"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 35 17 L 41 22 L 35 27"
                    stroke="#7A7068"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Overlapping Mini Project Cards */}
              <div className="relative flex items-center h-28 w-[248px]">
                {/* Left light mini card (ClickCard) */}
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy ? onOpenCaseStudy('clickcard') : scrollTo('portfolio')}
                  className="group absolute left-0 top-1 w-[142px] h-[102px] rounded-xl p-2.5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:z-30 cursor-pointer"
                  style={{
                    background: '#FAF6EE',
                    border: '1px solid rgba(17,17,17,0.08)',
                    boxShadow: '0 14px 28px -8px rgba(20,15,10,0.14)',
                    transform: 'rotate(-6deg)',
                    zIndex: 10,
                  }}
                  title="Open ClickCard Case Study"
                >
                  <div className="flex items-center gap-1 mb-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#C85D2A' }} />
                    <span className="text-[8px] font-bold tracking-tight" style={{ color: '#222' }}>ClickCard</span>
                  </div>
                  <div className="font-serif font-bold text-[11px] leading-[1.15] mb-2" style={{ color: '#111' }}>
                    One link.<br />Your entire<br />identity.
                  </div>
                  <span
                    className="inline-block text-[7px] px-1.5 py-0.5 rounded border font-medium"
                    style={{ borderColor: '#E2C5B3', color: '#C85D2A', background: '#FDF9F5' }}
                  >
                    Case Study ↗
                  </span>
                </button>

                {/* Center phone screen mini preview (LifeOS) */}
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy ? onOpenCaseStudy('lifeos') : scrollTo('portfolio')}
                  className="group absolute left-[84px] top-3 w-[76px] h-[96px] rounded-t-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
                  style={{
                    background: '#111',
                    border: '2px solid #222',
                    borderBottom: 'none',
                    boxShadow: '0 14px 28px -6px rgba(0,0,0,0.28)',
                    zIndex: 20,
                  }}
                  title="Open LifeOS Case Study"
                >
                  <img
                    src="/case-studies/lifeos_hero_thumb.jpg"
                    alt="LifeOS preview"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Right dark mini card (Brokrs House / Analytics) */}
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy ? onOpenCaseStudy('brokrs-house') : scrollTo('portfolio')}
                  className="group absolute right-2 top-2 w-[115px] h-[94px] rounded-xl overflow-hidden p-2 text-left transition-all duration-300 hover:-translate-y-1.5 hover:z-30 cursor-pointer"
                  style={{
                    background: '#181715',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 14px 28px -8px rgba(0,0,0,0.25)',
                    transform: 'rotate(6deg)',
                    zIndex: 15,
                  }}
                  title="Open Brokrs House Case Study"
                >
                  <div className="flex items-center justify-between text-[7.5px] text-gray-300 mb-1">
                    <span className="font-semibold">Brokrs House</span>
                    <span className="text-amber-400 font-bold">+12.5%</span>
                  </div>
                  <img
                    src="/case-studies/brokrshouse_hero_thumb.png"
                    alt="Brokrs House preview"
                    className="w-full h-[62px] object-cover rounded-md opacity-90"
                  />
                </button>

                {/* Floating circular orange ↗ CTA button with starburst rays */}
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-30">
                  {/* Hand-drawn starburst rays */}
                  <svg
                    className="absolute -right-4 -top-4 pointer-events-none"
                    width="34"
                    height="46"
                    viewBox="0 0 34 46"
                    fill="none"
                  >
                    <path d="M 10 10 L 15 2" stroke="#8C6B58" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 18 16 L 27 11" stroke="#8C6B58" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 21 25 L 31 24" stroke="#8C6B58" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 18 34 L 26 39" stroke="#8C6B58" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <button
                    type="button"
                    onClick={() => scrollTo('portfolio')}
                    aria-label="Scroll to Featured Projects"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-transform duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      background: 'var(--orange)',
                      border: '2px solid #FAF7F2',
                      boxShadow: '0 8px 20px rgba(200, 93, 42, 0.45)',
                    }}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Main Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5 items-stretch">
          {/* ── 1. Dark Experience Card ── */}
          <Reveal delay={100} className="md:col-span-5 lg:col-span-3 h-full">
            <div
              className="h-full p-6 flex flex-col relative overflow-hidden"
              style={{
                background: 'linear-gradient(165deg, #211F1C 0%, #161513 100%)',
                borderRadius: 18,
                minHeight: 360,
                boxShadow: '0 18px 40px -14px rgba(15, 12, 10, 0.38)',
              }}
            >
              {/* Warm ambient glow behind the active UI/UX bar */}
              <div
                className="absolute right-0 bottom-14 w-36 h-36 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(232,140,45,0.22) 0%, rgba(232,140,45,0) 72%)',
                  filter: 'blur(12px)',
                }}
              />

              {/* Top Row: Title + Circular ↗ button */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="text-sm font-medium" style={{ color: '#EAE4DC' }}>Experience</div>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  aria-label="View About & Experience"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all duration-200 hover:bg-white/10 cursor-pointer"
                  style={{
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: '#EAE4DC',
                  }}
                >
                  ↗
                </button>
              </div>

              {/* 4+ Years */}
              <div className="flex items-baseline gap-2.5 relative z-10">
                <div className="font-serif font-bold leading-none" style={{ color: '#fff', fontSize: '3.15rem' }}>
                  <CountUp target={4} suffix="+" />
                </div>
                <span className="font-serif font-semibold text-lg" style={{ color: '#EAE4DC' }}>
                  Years
                </span>
              </div>

              <p className="text-xs sm:text-[13px] mt-3 leading-relaxed relative z-10" style={{ color: '#A7A097' }}>
                Years across graphic design, frontend development &amp; product design.
              </p>

              {/* Career progression bars + dotted trend curve */}
              <div
                ref={barsRef as React.Ref<HTMLDivElement>}
                className="mt-auto pt-8 relative z-10"
                role="img"
                aria-label="Career path from 2020 to present: Graphic Design, Civil Services, Frontend, UI/UX"
              >
                {/* Dotted trend curve SVG above the bars */}
                <svg
                  className="w-full h-14 -mb-6 pointer-events-none overflow-visible"
                  viewBox="0 0 240 60"
                  fill="none"
                >
                  <path
                    d="M 10 47 C 45 43, 85 34, 145 20 C 175 13, 198 7, 224 10"
                    stroke="#E8A33D"
                    strokeWidth="1"
                    strokeDasharray="2.5 2.5"
                    strokeOpacity={barsInView ? 0.75 : 0}
                    style={{ transition: 'stroke-opacity 0.9s ease 0.4s' }}
                  />
                  {/* Dots corresponding to the 4 bars */}
                  <circle cx="28" cy="44" r="2.5" fill="#fff" opacity={barsInView ? 0.9 : 0} style={{ transition: 'opacity 0.5s ease 0.3s' }} />
                  <circle cx="88" cy="34" r="2.5" fill="#fff" opacity={barsInView ? 0.9 : 0} style={{ transition: 'opacity 0.5s ease 0.45s' }} />
                  <circle cx="148" cy="20" r="2.5" fill="#fff" opacity={barsInView ? 0.9 : 0} style={{ transition: 'opacity 0.5s ease 0.6s' }} />
                  {/* Highlighted ring on the current UI/UX bar */}
                  <g opacity={barsInView ? 1 : 0} style={{ transition: 'opacity 0.6s ease 0.75s' }}>
                    <circle cx="208" cy="8" r="5.5" fill="#E8601C" stroke="#fff" strokeWidth="1.8" />
                  </g>
                </svg>

                <div className="flex items-end gap-2.5" style={{ height: 138 }}>
                  {career.map((c, i) => (
                    <div
                      key={c.years}
                      className="flex-1 flex flex-col items-center justify-end h-full"
                      title={c.role}
                    >
                      <div className="w-full flex items-end justify-center flex-1 pb-2">
                        <div
                          className="w-full max-w-[28px] rounded-t-[4px]"
                          style={{
                            height: barsInView ? `${c.h}%` : '0%',
                            background: c.current
                              ? 'linear-gradient(180deg, #E06D2B 0%, #E8A33D 100%)'
                              : 'linear-gradient(180deg, #6E675F 0%, #3F3B37 100%)',
                            boxShadow: c.current ? '0 0 18px rgba(232, 140, 45, 0.32)' : 'none',
                            transition: `height 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
                          }}
                        />
                      </div>
                      <div className="text-[8.5px] tabular-nums tracking-tight leading-tight text-center" style={{ color: c.current ? '#E8A33D' : '#8E877F' }}>
                        {c.years}
                      </div>
                      <div
                        className="text-[9.5px] font-medium leading-tight text-center mt-0.5 whitespace-pre-line min-h-[22px] flex items-start justify-center"
                        style={{ color: c.current ? '#E8A33D' : '#B5AEA6' }}
                      >
                        {c.short}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Status Pill */}
                <div
                  className="mt-4 px-3 py-1.5 rounded-full inline-flex items-center gap-2 text-[10.5px] w-full justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#D8D2C9',
                  }}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#E8601C' }} />
                  <span>Currently focused on UI/UX Design</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── 2. Middle Column: 4 Stat Cards + Quote Card ── */}
          <div className="md:col-span-7 lg:col-span-5 flex flex-col gap-4 lg:gap-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {overviewStats.map((s, i) => (
                <Reveal key={s.label} delay={i * 90 + 100} className="h-full">
                  <div
                    onClick={() => scrollTo(s.actionId)}
                    className="group h-full p-4 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                    style={card}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ background: s.color }}
                      >
                        <LineIcon>{s.icon}</LineIcon>
                      </div>
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] transition-colors duration-200 group-hover:bg-black/5"
                        style={{
                          border: '1px solid rgba(17,17,17,0.08)',
                          color: '#5A534A',
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    <div className="font-serif font-bold text-3xl leading-none mb-2" style={{ color: '#111' }}>
                      <CountUp target={s.target} decimals={s.decimals} suffix={s.suffix} />
                    </div>
                    <div
                      className="text-xs leading-snug whitespace-pre-line mt-auto"
                      style={{ color: '#3A3530' }}
                    >
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Design philosophy quote card with portrait avatar */}
            <Reveal delay={280} className="flex-1">
              <figure
                className="h-full p-6 flex flex-col justify-between relative"
                style={card}
              >
                {/* Orange opening double-quote */}
                <div
                  className="font-serif font-bold text-4xl leading-none mb-2 select-none"
                  style={{ color: 'var(--orange)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 flex-1">
                  <blockquote
                    className="text-xs sm:text-[13.5px] leading-relaxed flex-1"
                    style={{ color: '#2A2622' }}
                  >
                    I started in graphic design, so visual detail matters to me, and I&apos;ve built interfaces in React, so I design with a clear idea of what developers can build.
                  </blockquote>

                  {/* Vertical divider */}
                  <div
                    className="hidden sm:block w-px self-stretch my-1 shrink-0"
                    style={{ background: 'rgba(17,17,17,0.09)' }}
                  />

                  {/* Author Avatar + Name */}
                  <figcaption className="flex items-center gap-3 shrink-0">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                      style={{
                        border: '1.5px solid rgba(17,17,17,0.14)',
                        background: '#EFE9DE',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <img
                        src="/shubham_character_avatar.jpg"
                        alt="Shubham Sharma"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold leading-tight" style={{ color: '#111' }}>
                        Shubham Sharma
                      </div>
                      <div className="text-[11px] mt-0.5" style={{ color: '#7A7068' }}>
                        UI/UX Designer
                      </div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* ── 3. Right Card: My Work Focus ── */}
          <Reveal delay={300} dir="right" className="md:col-span-12 lg:col-span-4 h-full">
            <div className="h-full p-6 sm:p-7 flex flex-col" style={card}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif font-bold text-2xl" style={{ color: '#111' }}>
                  My Work Focus
                </h3>
                <button
                  type="button"
                  onClick={() => scrollTo('portfolio')}
                  aria-label="Explore projects"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors duration-200 hover:bg-black/5 cursor-pointer"
                  style={{
                    border: '1px solid rgba(17,17,17,0.08)',
                    color: '#3A3530',
                  }}
                >
                  ↗
                </button>
              </div>

              <div ref={chartRef as React.Ref<HTMLDivElement>} className="my-auto py-1">
                <DonutChart animate={chartInView} />
              </div>

              <div
                className="w-full h-px my-5"
                style={{ background: 'rgba(17,17,17,0.08)' }}
              />

              <p className="text-xs sm:text-[13px] leading-relaxed mb-4" style={{ color: '#3A3530' }}>
                I design web and mobile products from the first user flow and wireframe through to prototypes, design systems, and developer handoff.
              </p>

              <button
                type="button"
                onClick={() => scrollTo('portfolio')}
                className="group inline-flex items-center gap-3 text-xs font-semibold pb-1.5 self-start transition-opacity duration-200 hover:opacity-85 cursor-pointer"
                style={{
                  color: 'var(--orange)',
                  borderBottom: '1.5px solid var(--orange)',
                }}
              >
                <span>Explore projects</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Stat for dark background
function StatCountDark({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCounter(target, inView);
  return (
    <span ref={ref as React.Ref<HTMLSpanElement>}>
      {count}{suffix}
    </span>
  );
}

// ─── Featured Projects (Interactive Coverflow Carousel) ───────────────────────

function FeaturedProjects({ onOpenCaseStudy }: { onOpenCaseStudy: (slug: string) => void }) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const didDragRef = useRef(false);
  const wheelLockRef = useRef(false);
  const { ref: secRef, inView } = useInView(0.25);

  const go = useCallback((idx: number) => {
    setActive(((idx % n) + n) % n);
  }, [n]);

  const stepBy = useCallback((delta: number) => {
    setActive(a => ((a + delta) % n + n) % n);
  }, [n]);

  // Auto-advance when in viewport and not hovered/dragging
  useEffect(() => {
    if (!inView || paused || dragging) return;
    const timer = setInterval(() => {
      stepBy(1);
    }, 5200);
    return () => clearInterval(timer);
  }, [inView, paused, dragging, stepBy]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;
    startXRef.current = e.clientX;
    didDragRef.current = false;
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || startXRef.current === null) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 6) didDragRef.current = true;
    setDragX(dx);
  };

  const endDrag = () => {
    if (!dragging) return;
    if (Math.abs(dragX) > 38) {
      stepBy(dragX < 0 ? 1 : -1);
    }
    setDragging(false);
    setDragX(0);
    startXRef.current = null;
  };

  // Trackpad two-finger horizontal swipe
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      stepBy(e.deltaX > 0 ? 1 : -1);
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 600);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
  };

  const EASE_SMOOTH = 'cubic-bezier(0.22, 1, 0.36, 1)';

  return (
    <section
      id="portfolio"
      ref={secRef as React.Ref<HTMLElement>}
      className="py-24 overflow-hidden select-none"
      style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); endDrag(); }}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
      tabIndex={0}
      aria-label="Featured Projects Coverflow Carousel"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* ── Header ── */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2" style={{ color: '#111' }}>Featured Projects</h2>
          <p className="text-sm" style={{ color: '#7A7068', fontFamily: 'Inter' }}>
            Swipe, click a side card, or use the arrows below to explore selected case studies.
          </p>
        </Reveal>

        {/* ── Coverflow Stage ── */}
        <div
          className="relative mx-auto w-full h-[460px] sm:h-[440px] md:h-[380px] flex items-center justify-center"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: 'pan-y', cursor: dragging ? 'grabbing' : 'grab' }}
        >
          {projects.map((p, i) => {
            // Signed circular offset rel in [-3..+4] for n=8
            let rel = i - active;
            if (rel > n / 2) rel -= n;
            else if (rel < -n / 2) rel += n;

            const isCenter = rel === 0;
            const absRel = Math.abs(rel);
            const isVisibleSide = absRel === 1 || absRel === 2;
            const isHidden = absRel >= 3;

            // Compute horizontal offset (px) and explicit pixel dimensions so CSS interpolates smoothly
            let xOffset = 0;
            let cardW = 680;
            let cardH = 370;
            let imgW = 330;
            let zIdx = 30;
            let opacity = 1;

            if (rel === 0) {
              xOffset = dragging ? dragX * 0.35 : 0;
              cardW = 680;
              cardH = 370;
              imgW = 330;
              zIdx = 30;
              opacity = 1;
            } else if (absRel === 1) {
              xOffset = (rel < 0 ? -406 : 406) + (dragging ? dragX * 0.18 : 0);
              cardW = 96;
              cardH = 285;
              imgW = 96;
              zIdx = 20;
              opacity = 1;
            } else if (absRel === 2) {
              xOffset = (rel < 0 ? -506 : 506) + (dragging ? dragX * 0.1 : 0);
              cardW = 72;
              cardH = 210;
              imgW = 72;
              zIdx = 10;
              opacity = 0.85;
            } else {
              xOffset = rel < 0 ? -585 : 585;
              cardW = 56;
              cardH = 150;
              imgW = 56;
              zIdx = 1;
              opacity = 0;
            }

            return (
              <div
                key={p.slug}
                onClick={() => {
                  if (!didDragRef.current && !isCenter && isVisibleSide) {
                    go(i);
                  }
                }}
                className={`absolute left-1/2 top-1/2 ${
                  isCenter
                    ? 'max-md:!w-full max-md:!h-[450px]'
                    : 'hidden lg:block cursor-pointer'
                }`}
                style={{
                  width: cardW,
                  height: cardH,
                  transform: `translate3d(calc(-50% + ${xOffset}px), -50%, 0)`,
                  zIndex: zIdx,
                  opacity,
                  pointerEvents: isHidden ? 'none' : 'auto',
                  willChange: 'transform, width, height, opacity',
                  transition: dragging
                    ? 'none'
                    : `transform 0.65s ${EASE_SMOOTH}, width 0.65s ${EASE_SMOOTH}, height 0.65s ${EASE_SMOOTH}, opacity 0.5s ${EASE_SMOOTH}`,
                }}
              >
                <article
                  className="relative w-full h-full overflow-hidden flex flex-col md:flex-row"
                  style={{
                    background: '#fff',
                    borderRadius: isCenter ? 24 : 20,
                    border: isCenter ? '1px solid rgba(17,17,17,0.08)' : 'none',
                    boxShadow: isCenter
                      ? '0 24px 60px rgba(17,17,17,0.12)'
                      : '0 12px 28px rgba(17,17,17,0.10)',
                    transition: `border-radius 0.65s ${EASE_SMOOTH}, box-shadow 0.65s ${EASE_SMOOTH}`,
                  }}
                >
                  {/* ── Left Side (or Full Side Strip): Edge-to-Edge Image ── */}
                  <div
                    className="relative shrink-0 max-md:!w-full h-[200px] md:h-full overflow-hidden flex items-center justify-center"
                    style={{
                      width: imgW,
                      background: p.stageBg,
                      transition: dragging ? 'none' : `width 0.65s ${EASE_SMOOTH}`,
                    }}
                  >
                    <img
                      src={p.img}
                      alt={`${p.title} — ${p.category}`}
                      draggable={false}
                      className={`w-full h-full object-cover pointer-events-none transition-transform duration-500 ${
                        isCenter ? '' : 'hover:scale-105'
                      }`}
                    />
                    {/* Subtle dim overlay on outer side cards */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: '#000',
                        opacity: isCenter ? 0 : absRel === 2 ? 0.18 : 0.05,
                        transition: `opacity 0.5s ${EASE_SMOOTH}`,
                      }}
                    />
                  </div>

                  {/* ── Right Side: Persistent Text Panel (Fixed 350px width on desktop so text never reflows) ── */}
                  <div
                    className="w-full md:w-[350px] shrink-0 h-[250px] md:h-full p-5 md:p-6 flex flex-col justify-between"
                    style={{
                      opacity: isCenter ? 1 : 0,
                      transform: isCenter ? 'translate3d(0,0,0)' : 'translate3d(14px,0,0)',
                      pointerEvents: isCenter ? 'auto' : 'none',
                      transition: dragging
                        ? 'none'
                        : `opacity 0.45s ${EASE_SMOOTH} ${isCenter ? '0.12s' : '0s'}, transform 0.55s ${EASE_SMOOTH}`,
                    }}
                  >
                    <div>
                      <div
                        className="text-[11px] font-semibold tracking-wider uppercase mb-1.5"
                        style={{ color: p.accent }}
                      >
                        {p.category}
                      </div>

                      <h3
                        className="font-serif text-xl md:text-2xl font-bold leading-snug mb-2"
                        style={{ color: '#111' }}
                      >
                        {p.title}
                      </h3>

                      <p
                        className="text-xs md:text-[13px] leading-relaxed line-clamp-3 md:line-clamp-4"
                        style={{ color: '#5E5750' }}
                      >
                        {p.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {p.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                            style={{
                              background: 'var(--ivory)',
                              color: '#7A7068',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => {
                            if (didDragRef.current) e.preventDefault();
                            e.stopPropagation();
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold btn-arrow border transition-all duration-300 hover:bg-black/5"
                          style={{ borderColor: 'var(--border-strong)', color: '#111', background: '#fff' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Website <span className="arrow">↗</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          if (!didDragRef.current) onOpenCaseStudy(p.slug);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold btn-arrow cursor-pointer transition-all duration-300 hover:brightness-110 hover:shadow-md"
                        style={{ background: '#111', color: '#FAF8F3' }}
                      >
                        View Case Study <span className="arrow">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Controls: Backward Arrow + Dots + Forward Arrow ── */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => stepBy(-1)}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-black hover:-translate-x-0.5 active:scale-95"
            style={{ borderColor: 'var(--border-strong)', color: '#111', background: '#fff' }}
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {projects.map((p, i) => {
              const isOn = i === active;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Slide ${i + 1}: ${p.title}`}
                  className="h-2 rounded-full cursor-pointer"
                  style={{
                    width: isOn ? 28 : 8,
                    background: isOn ? 'var(--orange)' : 'rgba(17,17,17,0.18)',
                    transition: `all 0.45s ${EASE_SMOOTH}`,
                  }}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => stepBy(1)}
            aria-label="Next project"
            className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:translate-x-0.5 hover:shadow-lg active:scale-95"
            style={{ background: '#111', color: '#FAF8F3' }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

const designPrinciples = [
  {
    title: 'Clarity Over Decoration',
    desc: 'Every screen should answer "what do I do next?" in under 3 seconds.',
  },
  {
    title: 'Built for Real Code',
    desc: 'Components, states, and tokens structured the way React developers actually build.',
  },
  {
    title: 'Multi-Role Thinking',
    desc: 'Designing both the consumer experience and the admin/broker engine behind it.',
  },
  {
    title: 'Zero-Friction Flows',
    desc: 'Removing unnecessary taps for first-time, non-technical, and repeat users alike.',
  },
];

const journeyMilestones = [
  {
    period: '2020–2021',
    role: 'Graphic Design',
    tag: 'Visual Craft',
    color: '#E8A33D',
    summary: 'Brand identity, print layouts, and an obsession with typography, grid balance, and visual storytelling.',
  },
  {
    period: '2021–2024',
    role: 'Civil Services Prep',
    tag: 'Systems & Empathy',
    color: '#2A9D8F',
    summary: 'Deep research, analyzing complex public systems, and understanding diverse human behavior at scale.',
  },
  {
    period: '2024–2025',
    role: 'Frontend Developer',
    tag: 'Technical Fluency',
    color: '#61DAFB',
    summary: 'Building responsive React & Tailwind interfaces — learning how designs translate into production code.',
  },
  {
    period: '2025–Now',
    role: 'UI/UX Designer',
    tag: 'Product Ownership',
    color: '#E8601C',
    summary: 'Leading end-to-end product design across mobile apps, B2B marketplaces, and operational dashboards.',
  },
];

function About() {
  return (
    <section id="about" className="py-24" style={{ background: 'var(--dark-bg)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <Reveal>
              <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: 'var(--orange)' }}>About Me</div>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="font-serif font-bold mb-6 leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FAF8F3' }}
              >
                Design is how<br />
                I <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>think</em>, not just<br />
                what I do.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="space-y-3.5 mb-7 text-sm leading-relaxed" style={{ color: '#A7A097', fontFamily: 'Inter' }}>
                <p>
                  My path into product design wasn&apos;t a straight line — and that is my biggest advantage. I started in <strong className="text-white font-medium">Graphic Design</strong>, spent three disciplined years preparing for <strong className="text-white font-medium">Civil Services</strong> (where I learned to dissect complex systems and real human problems), and then worked as a <strong className="text-white font-medium">React Frontend Developer</strong> before moving full-time into <strong className="text-white font-medium">UI/UX Design</strong>.
                </p>
                <p>
                  Because I have sat on both the visual side and the engineering side, I don&apos;t design screens that only look good in Dribbble shots — I design products that are intuitive for everyday people and practical for developers to ship.
                </p>
              </div>
            </Reveal>

            {/* Core Design Principles (non-repetitive, grounded in how Shubham works) */}
            <Reveal delay={300}>
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase mb-4" style={{ color: '#7A7068' }}>Principles I Design By</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {designPrinciples.map(p => (
                    <div
                      key={p.title}
                      className="p-3.5 rounded-xl border transition-colors hover:border-white/15"
                      style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold mb-1" style={{ color: '#FAF8F3' }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--orange)' }} />
                        {p.title}
                      </div>
                      <p className="text-xs leading-relaxed pl-3.5" style={{ color: '#8E877F' }}>
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/Shubham-Sharma-Resume.pdf"
                  download
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border btn-arrow transition-colors hover:bg-white/10"
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FAF8F3', borderRadius: 8 }}
                >
                  Download Resume <span className="arrow">↓</span>
                </a>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold btn-arrow transition-colors hover:opacity-90"
                  style={{ background: 'var(--orange)', color: '#fff', borderRadius: 8 }}
                >
                  Let&apos;s Connect <span className="arrow">→</span>
                </a>
              </div>
            </Reveal>

            {/* Signature */}
            <Reveal delay={500}>
              <div className="mt-8">
                <svg width="180" height="50" viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 10 35 C 20 15, 35 10, 50 25 C 60 35, 55 45, 45 40 C 35 35, 40 20, 55 22 C 70 24, 80 38, 95 30 C 110 22, 115 15, 130 20 C 145 25, 150 38, 165 30"
                    stroke="#FAF8F3"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                    style={{ animation: 'drawDash 2s cubic-bezier(0.22,1,0.36,1) 0.5s forwards' }}
                  />
                </svg>
                <div className="text-sm italic" style={{ color: '#9A9A9A', fontFamily: 'Georgia, serif' }}>Shubham Sharma</div>
              </div>
            </Reveal>
          </div>

          {/* Right — Designer illustration + Career Journey Chapters (replaces duplicate Tools grid) */}
          <div className="relative">
            {/* Handwritten annotation */}
            <div
              className="absolute top-4 right-4 z-10 text-right hidden md:block"
              style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', lineHeight: 1.8 }}
            >
              Better<br />Designs<br />Brighter<br />Tomorrows
            </div>

            {/* Designer illustration */}
            <div className="relative mb-6 flex justify-center items-end" style={{ minHeight: 280 }}>
              {/* Soft orange glow behind the illustration */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: '62%',
                  aspectRatio: '1 / 1',
                  bottom: '8%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'radial-gradient(circle, rgba(200,93,42,0.55) 0%, rgba(200,93,42,0.18) 45%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
              <img
                src={designerImg}
                alt="Illustration of Shubham sitting cross-legged with a laptop, plant, design books and a coffee mug"
                className="relative animate-float"
                style={{
                  width: '100%',
                  maxWidth: 440,
                  maxHeight: 330,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))',
                }}
              />
            </div>

            {/* How My Journey Shapes My Work (replaces repetitive Skills & Tools box) */}
            <Reveal dir="right" delay={200}>
              <div className="p-6 border" style={{ borderColor: 'var(--dark-border)', borderRadius: 16, background: 'var(--dark-surface)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#A39C93' }}>
                    How My Journey Shapes My Work
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--orange)' }}>2020 → Now</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {journeyMilestones.map(m => (
                    <div
                      key={m.period}
                      className="p-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: m.color }}>
                          {m.period}
                        </span>
                        <span
                          className="text-[9.5px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'rgba(255,255,255,0.06)', color: '#D6D1C7' }}
                        >
                          {m.tag}
                        </span>
                      </div>
                      <div className="text-xs font-semibold mb-1" style={{ color: '#FAF8F3' }}>
                        {m.role}
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: '#8E877F' }}>
                        {m.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Expertise section ────────────────────────────────────────────────────────

const pad2 = (n: number) => String(n).padStart(2, '0');

function Expertise() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0.5, y: 0.5, on: false });
  const cap = capabilities[active];
  const Visual = cap.Visual;
  const next = () => setActive(a => (a + 1) % capabilities.length);

  const onPanelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, on: true });
  };

  return (
    <section id="expertise" className="relative py-24 overflow-hidden" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <Reveal className="flex items-end justify-between gap-6 mb-14">
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: 'var(--orange)' }}>Expertise</div>
            <h2 className="font-serif font-bold leading-[1.05] mb-4" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', color: '#111' }}>
              What I <em style={{ color: 'var(--orange)' }}>do</em>.
            </h2>
            <p className="text-sm max-w-md leading-relaxed" style={{ color: '#7A7068' }}>
              Six core areas where I help founders and product teams turn complex workflows into clean, high-converting digital products.
            </p>
          </div>
          {/* Big outlined index that follows the active item */}
          <div
            key={`idx-${active}`}
            aria-hidden="true"
            className="hidden md:block font-serif font-bold leading-none select-none xp-anim"
            style={{
              fontSize: 'clamp(6rem, 11vw, 9.5rem)',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(200,93,42,0.45)',
              animation: 'xpRise .7s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            {pad2(active + 1)}
          </div>
        </Reveal>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Capability list ── */}
          <div className="lg:col-span-6" role="tablist" aria-label="Areas of expertise" aria-orientation="vertical">
            {capabilities.map((c, i) => {
              const on = i === active;
              return (
                <div key={c.id} className="relative" style={{ borderTop: '1px solid var(--border)' }}>
                  {/* Auto-advance progress (drives the carousel) */}
                  {on && (
                    <div
                      key={`p-${active}`}
                      className="xp-progress absolute left-0 right-0 -top-px h-[2px] origin-left"
                      style={{ background: 'var(--orange)', animation: 'xpProgress 6s linear both', animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={next}
                    />
                  )}

                  <button
                    role="tab"
                    id={`xp-tab-${c.id}`}
                    aria-selected={on}
                    aria-controls="xp-panel"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="w-full text-left py-6 flex items-center gap-5 cursor-pointer"
                  >
                    <span className="font-mono text-xs w-6 shrink-0" style={{ color: on ? 'var(--orange)' : '#B5ADA2', transition: 'color .3s' }}>
                      {pad2(i + 1)}
                    </span>
                    <span
                      className="font-serif font-bold flex-1"
                      style={{
                        fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                        color: on ? '#111' : '#A39C93',
                        transform: on ? 'translateX(6px)' : 'none',
                        transition: 'color .35s, transform .5s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      {c.title}
                    </span>
                    <span className="hidden sm:block text-xs text-right" style={{ color: '#7A7068', opacity: on ? 1 : 0, transition: 'opacity .3s' }}>
                      {c.tagline}
                    </span>
                    <span
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-lg leading-none"
                      style={{
                        borderColor: on ? 'var(--orange)' : 'var(--border-strong)',
                        background: on ? 'var(--orange)' : 'transparent',
                        color: on ? '#fff' : '#7A7068',
                        transform: on ? 'rotate(45deg)' : 'none',
                        transition: 'all .45s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Expanding details */}
                  <div className="grid" style={{ gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows .55s cubic-bezier(0.22,1,0.36,1)' }}>
                    <div className="overflow-hidden">
                      <div className="pl-11 pb-7" style={{ opacity: on ? 1 : 0, transition: 'opacity .4s ease .1s' }}>
                        <p className="text-sm leading-relaxed max-w-lg" style={{ color: '#7A7068' }}>{c.desc}</p>
                        <div className="flex flex-wrap gap-2 pt-4">
                          {c.deliverables.map(d => (
                            <span
                              key={d}
                              className="text-[11px] font-medium px-3 py-1 rounded-full"
                              style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                        {/* Inline visual for small screens */}
                        {on && (
                          <div
                            className="lg:hidden relative h-[240px] rounded-xl overflow-hidden mt-5"
                            style={{ background: '#1E1C1A', backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                          >
                            <c.Visual />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>

          {/* ── Live preview panel (desktop) ── */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-24">
            <div
              id="xp-panel"
              role="tabpanel"
              aria-labelledby={`xp-tab-${cap.id}`}
              onMouseMove={onPanelMove}
              onMouseLeave={() => setTilt({ x: 0.5, y: 0.5, on: false })}
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: '#141312',
                boxShadow: '0 30px 80px rgba(17,17,17,0.18)',
                transform: `perspective(1200px) rotateX(${(0.5 - tilt.y) * 5}deg) rotateY(${(tilt.x - 0.5) * 7}deg)`,
                transition: tilt.on ? 'transform .12s linear' : 'transform .7s cubic-bezier(0.22,1,0.36,1)',
                willChange: 'transform',
              }}
            >
              {/* Cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(420px circle at ${tilt.x * 100}% ${tilt.y * 100}%, rgba(200,93,42,0.16), transparent 60%)`,
                  opacity: tilt.on ? 1 : 0,
                  transition: 'opacity .4s',
                }}
              />

              <div className="relative flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--orange)' }} />
                  <span key={`t-${active}`} className="text-sm font-semibold xp-anim" style={{ color: '#FAF8F3', animation: 'xpRise .4s ease both' }}>
                    {cap.title}
                  </span>
                </div>
                <span className="text-xs font-mono" style={{ color: '#7A7068' }}>
                  {pad2(active + 1)} / {pad2(capabilities.length)}
                </span>
              </div>

              <div
                key={`v-${active}`}
                className="relative h-[300px] rounded-xl overflow-hidden"
                style={{
                  background: '#1E1C1A',
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                  border: '1px solid #2A2724',
                }}
              >
                <Visual />
              </div>

              <div key={`f-${active}`} className="relative mt-5 flex flex-wrap items-center gap-2 xp-anim" style={{ animation: 'xpRise .5s ease .15s both' }}>
                <span className="text-[10px] uppercase tracking-widest mr-1" style={{ color: '#7A7068' }}>Applied in</span>
                {cap.applied.map(p => (
                  <span key={p} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#211F1D', color: '#E9E4DC', border: '1px solid #2F2C29' }}>
                    {p}
                  </span>
                ))}
              </div>

              <div className="relative mt-5 flex gap-1.5">
                {capabilities.map((c, i) => (
                  <button
                    key={c.id}
                    aria-label={`Show ${c.title}`}
                    onClick={() => setActive(i)}
                    className="h-1 rounded-full cursor-pointer"
                    style={{ width: i === active ? 28 : 8, background: i === active ? 'var(--orange)' : '#3A3631', transition: 'all .4s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className="group relative mt-20 overflow-hidden py-6" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
          {[...expertiseSkills, ...expertiseSkills].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 font-serif italic whitespace-nowrap"
              style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', color: i % 2 ? '#111' : '#B5ADA2' }}
            >
              {s}
              <span className="not-italic text-sm" style={{ color: 'var(--orange)' }}>✦</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24" style={{ background: 'linear-gradient(to right, var(--ivory), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24" style={{ background: 'linear-gradient(to left, var(--ivory), transparent)' }} />
      </div>
    </section>
  );
}

// ─── Design Process ───────────────────────────────────────────────────────────

const PROC_BG = '#F3EEE6';

function ProcIcon({ k, size = 24 }: { k: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    define: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><circle cx="11" cy="14" r="2.5" /><path d="m13 16 2 2" /></>,
    bulb: <><path d="M9 18h6" /><path d="M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></>,
    pen: <><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
    flask: <><path d="M9 2h6" /><path d="M10 2v6.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V2" /><path d="M7 15h10" /></>,
    box: <><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5" /><path d="M12 13v8" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[k]}
    </svg>
  );
}

// Description and bullet points for the selected step
function StepPanel({ s, id, labelledBy }: { s: typeof processSteps[0]; id: string; labelledBy: string }) {
  return (
    <div id={id} role="tabpanel" aria-labelledby={labelledBy}>
      <p className="text-sm leading-relaxed xp-anim" style={{ color: '#5E5750', animation: 'xpRise .45s ease .1s both' }}>
        {s.long}
      </p>
      <ul className="mt-4 space-y-2.5">
        {s.points.map((p, i) => (
          <li key={p} className="flex items-center gap-2.5 text-[13px] font-medium xp-anim" style={{ color: '#2A2A2A', animation: `xpRise .4s ease ${0.18 + i * 0.07}s both` }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Process() {
  const n = processSteps.length;
  const [active, setActive] = useState(2);
  const touchX = useRef<number | null>(null);
  const cur = processSteps[active];

  const step = (d: number) => setActive(a => (a + d + n) % n);
  const focusTab = (i: number) =>
    requestAnimationFrame(() => {
      ['d', 'm']
        .map(k => document.getElementById(`proc-tab-${k}-${i}`))
        .find(el => el && (el as HTMLElement).offsetParent !== null)
        ?.focus();
    });

  const onKey = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (active + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next !== null) { e.preventDefault(); setActive(next); focusTab(next); }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const GAP = 16;

  return (
    <section id="process" className="relative py-24 overflow-hidden" style={{ background: PROC_BG, borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* ── Header ── */}
        <Reveal className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-10 lg:mb-6">
          <div>
            <h2
              className="font-sans font-extrabold uppercase mb-2"
              style={{ color: '#111', fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              My <span style={{ color: 'var(--orange)' }}>Design</span> Process
            </h2>
            <p className="text-sm" style={{ color: '#7A7068' }}>How I take a product from an initial conversation to a live, production-ready release.</p>
            <div className="hidden lg:flex items-center gap-3 mt-10 text-xs" style={{ color: '#A39C93' }}>
              <span className="w-8 h-px" style={{ background: '#A39C93' }} /> Structured Research. Practical Execution.
            </div>
          </div>

          <div className="lg:max-w-sm lg:flex lg:flex-col lg:items-end">
            <p className="text-sm leading-relaxed" style={{ color: '#2A2A2A' }}>
              Every project has different constraints, but these six stages keep user needs, visual craft, and engineering reality aligned.
            </p>
            <div className="mt-5 flex items-center gap-4 lg:flex-col lg:items-end lg:gap-4">
              <span className="hidden lg:block text-[10px] uppercase tracking-widest" style={{ color: '#B5ADA2' }}>
                Click a step or use ← → to explore
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous step"
                  className="w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-black hover:-translate-x-0.5"
                  style={{ borderColor: 'var(--border-strong)', color: '#111', background: 'transparent' }}
                >
                  ←
                </button>
                <button
                  onClick={() => step(1)}
                  aria-label="Next step"
                  className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:translate-x-0.5 hover:shadow-lg"
                  style={{ background: '#111', color: '#fff' }}
                >
                  →
                </button>
              </div>
              <div className="flex items-center gap-1.5 ml-auto lg:ml-0">
                {processSteps.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setActive(i)}
                    aria-label={`Go to step ${i + 1}: ${s.label}`}
                    className="h-1.5 rounded-full cursor-pointer"
                    style={{ width: i === active ? 20 : 6, background: i === active ? 'var(--orange)' : 'rgba(17,17,17,0.18)', transition: 'all .4s cubic-bezier(0.22,1,0.36,1)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={onTouchEnd}
        >
          {/* ── Desktop: horizontal timeline, selected step expands into a card ── */}
          <Reveal delay={100} className="hidden lg:block">
            <div
              role="tablist"
              aria-label="Design process steps"
              onKeyDown={onKey}
              className="proc-grid grid items-center"
              style={{
                gridTemplateColumns: processSteps.map((_, i) => (i === active ? '1.9fr' : '1fr')).join(' '),
                columnGap: GAP,
                minHeight: 390,
                transition: 'grid-template-columns .75s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {processSteps.map((s, i) => {
                const on = i === active;
                const prevActive = i - 1 === active;
                const done = i < active; // connector segments left of the active step are "travelled"
                const line: React.CSSProperties = {
                  position: 'absolute', top: 56, height: 0,
                  borderTop: done ? '1.5px solid rgba(200,93,42,0.55)' : '1.5px dashed rgba(17,17,17,0.2)',
                };
                return (
                  <div key={s.label} className={`relative min-w-0 ${on ? '' : 'h-[176px]'}`}>
                    {!on && i > 0 && <span aria-hidden="true" style={{ ...line, left: prevActive ? -GAP : 0, right: 'calc(50% + 34px)' }} />}
                    {!on && i < n - 1 && <span aria-hidden="true" style={{ ...line, left: 'calc(50% + 34px)', right: -GAP }} />}

                    {on ? (
                      <div
                        className="relative rounded-[22px] p-6 xp-anim"
                        style={{
                          background: '#fff',
                          border: '1px solid rgba(17,17,17,0.06)',
                          boxShadow: '0 28px 70px rgba(17,17,17,0.13)',
                          animation: 'procCard .55s cubic-bezier(0.22,1,0.36,1) both',
                        }}
                      >
                        <button
                          role="tab"
                          id={`proc-tab-d-${i}`}
                          aria-selected
                          aria-controls="proc-panel-d"
                          tabIndex={0}
                          className="block w-full text-left cursor-default"
                        >
                          <span className="font-mono text-[11px] block mb-3" style={{ color: '#7A7068' }}>{s.num}</span>
                          <span
                            className="w-16 h-16 rounded-full border-[1.5px] flex items-center justify-center"
                            style={{ borderColor: s.color, color: s.color, background: 'rgba(200,93,42,0.04)' }}
                          >
                            <ProcIcon k={s.icon} size={26} />
                          </span>
                          <span className="block font-sans font-extrabold text-[1.7rem] leading-tight mt-4 mb-3" style={{ color: '#111' }}>{s.label}</span>
                        </button>
                        <StepPanel s={s} id="proc-panel-d" labelledBy={`proc-tab-d-${i}`} />
                      </div>
                    ) : (
                      <button
                        role="tab"
                        id={`proc-tab-d-${i}`}
                        aria-selected={false}
                        tabIndex={-1}
                        onClick={() => setActive(i)}
                        className="group relative w-full h-full flex flex-col items-center justify-start text-center cursor-pointer rounded-xl"
                      >
                        <span className="font-mono text-[11px] h-4 mb-3 shrink-0 transition-colors group-hover:text-black" style={{ color: '#A39C93' }}>{s.num}</span>
                        <span
                          className="w-14 h-14 rounded-full border-[1.5px] shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                          style={{ borderColor: s.color, color: s.color, background: PROC_BG }}
                        >
                          <ProcIcon k={s.icon} />
                        </span>
                        <span className="font-sans font-bold text-sm mt-3 shrink-0 transition-colors group-hover:text-[#C85D2A]" style={{ color: '#111' }}>{s.label}</span>
                        <span className="text-[11px] leading-snug mt-1.5 max-w-[150px]" style={{ color: '#A39C93' }}>{s.short}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* ── Mobile / tablet: vertical timeline with an expanding card ── */}
          <div className="lg:hidden relative" role="tablist" aria-label="Design process steps" aria-orientation="vertical" onKeyDown={onKey}>
            <div className="absolute left-7 top-7 bottom-7 w-px" style={{ background: 'rgba(17,17,17,0.14)' }} aria-hidden="true" />
            <div
              className="absolute left-7 top-7 w-px origin-top"
              aria-hidden="true"
              style={{ background: 'var(--orange)', height: `calc((100% - 56px) * ${active / (n - 1)})`, transition: 'height .6s cubic-bezier(0.22,1,0.36,1)' }}
            />
            {processSteps.map((s, i) => {
              const on = i === active;
              return (
                <div key={s.label} className="relative">
                  <button
                    role="tab"
                    id={`proc-tab-m-${i}`}
                    aria-selected={on}
                    aria-controls={on ? 'proc-panel-m' : undefined}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="w-full flex items-start gap-4 text-left py-3 cursor-pointer"
                  >
                    <span
                      className="relative z-10 w-14 h-14 rounded-full border-[1.5px] flex items-center justify-center shrink-0"
                      style={{
                        borderColor: s.color,
                        color: on ? '#fff' : s.color,
                        background: on ? s.color : PROC_BG,
                        transform: on ? 'scale(1.06)' : 'none',
                        transition: 'all .4s cubic-bezier(0.22,1,0.36,1)',
                      }}
                    >
                      <ProcIcon k={s.icon} />
                    </span>
                    <span className="flex-1 pt-1.5 min-w-0">
                      <span className="font-mono text-[11px] block" style={{ color: on ? 'var(--orange)' : '#A39C93' }}>{s.num}</span>
                      <span className="font-sans font-bold text-base block" style={{ color: on ? '#111' : '#5E5750' }}>{s.label}</span>
                      {!on && <span className="text-xs leading-snug block mt-0.5" style={{ color: '#A39C93' }}>{s.short}</span>}
                    </span>
                  </button>

                  <div className="grid" style={{ gridTemplateRows: on ? '1fr' : '0fr', transition: 'grid-template-rows .55s cubic-bezier(0.22,1,0.36,1)' }}>
                    <div className="overflow-hidden">
                      <div className="ml-[72px] mb-3 mt-1 p-5 rounded-2xl" style={{ background: '#fff', boxShadow: '0 16px 40px rgba(17,17,17,0.1)', border: '1px solid rgba(17,17,17,0.06)' }}>
                        {on && <StepPanel s={s} id="proc-panel-m" labelledBy={`proc-tab-m-${i}`} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Footer row ── */}
        <div className="mt-10 lg:mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <svg width="44" height="22" viewBox="0 0 44 22" fill="none" stroke="#C85D2A" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" className="hidden sm:block opacity-80">
              {[5, 11, 17].map(y => <path key={y} d={`M2 ${y}c5-5 8 5 13 0s8 5 13 0 8 5 13 0`} />)}
            </svg>
            <div
              key={`tag-${active}`}
              className="text-[11px] tracking-widest uppercase xp-anim"
              style={{ color: '#7A7068', animation: 'xpRise .45s ease both' }}
              aria-live="polite"
            >
              {cur.tagline.join(' → ')}
            </div>
          </div>
          <div className="text-xs font-mono" style={{ color: '#7A7068' }} aria-hidden="true">
            <span className="font-bold" style={{ color: '#111' }}>{pad2(active + 1)}</span> / {pad2(n)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

function Blog() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="blog" className="py-24" style={{ background: 'var(--ivory)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-3" style={{ color: 'var(--orange)' }}>
              Notes &amp; Reflections
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: '#111' }}>
              Thoughts &amp; Writing
            </h2>
          </div>
          <p className="text-sm max-w-md" style={{ color: '#7A7068' }}>
            Reflections on systems thinking, frontend-aware design, and lessons learned while shipping real products.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {posts.map((p, i) => {
            const isOpen = expandedIdx === i;
            return (
              <Reveal key={p.title} delay={i * 120} dir="up">
                <article
                  onClick={() => setExpandedIdx(isOpen ? null : i)}
                  className="group cursor-pointer h-full flex flex-col border p-6 transition-all duration-300 hover:shadow-lg"
                  style={{
                    borderColor: isOpen ? 'var(--orange)' : 'var(--border)',
                    borderRadius: 16,
                    background: '#fff',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}
                    >
                      {p.tag}
                    </span>
                    <span className="text-xs" style={{ color: '#7A7068' }}>
                      {p.date} · {p.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-serif text-lg font-bold mb-3 leading-snug transition-colors group-hover:text-orange-600"
                    style={{ color: '#111' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#5E5750' }}>
                    {p.desc}
                  </p>

                  {isOpen && (
                    <div
                      className="pt-4 mb-4 border-t space-y-3 text-xs sm:text-[13px] leading-relaxed"
                      style={{ borderColor: 'var(--border)', color: '#3A3530' }}
                    >
                      {p.fullText.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}

                  <div
                    className="mt-auto flex items-center gap-1.5 text-xs font-semibold btn-arrow"
                    style={{ color: 'var(--orange)' }}
                  >
                    {isOpen ? 'Show Less' : 'Read Article'} <span className="arrow">{isOpen ? '↑' : '→'}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const contactTopics = [
  'UI/UX Design',
  'Mobile App',
  'Web / Dashboard',
  'Full-Time Role',
  'Say Hello',
];

function Contact() {
  const [topic, setTopic] = useState(contactTopics[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);
  const [sent, setSent] = useState(false);

  const copyText = (key: 'email' | 'phone', val: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(k => (k === key ? null : k)), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] ${topic}${name ? ` — from ${name}` : ''}`);
    const bodyLines = [
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      `Topic: ${topic}`,
      '',
      message || `Hi Shubham, I'd love to connect regarding ${topic}.`,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ background: 'var(--dark-bg)', borderTop: '1px solid var(--dark-border)' }}>
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 w-[480px] h-[480px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--orange) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* ── Left Column: Heading + Interactive Contact Cards ── */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: 'var(--orange)' }}>
                  Contact
                </span>
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-medium px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#D6D1C7' }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open to opportunities · {CONTACT_INFO.location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="font-serif font-bold mb-5 leading-[1.08]" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', color: '#FAF8F3' }}>
                Let&apos;s create something<br />
                <span style={{ color: 'var(--orange)' }}>meaningful.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-sm leading-relaxed mb-8 max-w-lg" style={{ color: '#9A9A9A' }}>
                Whether you have a product in mind, want to collaborate on a design challenge, or simply want to say hello — reach out directly or send a quick note.
              </p>
            </Reveal>

            {/* 2x2 Interactive Contact Channels with Original Icons */}
            <Reveal delay={300}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email Card */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group relative p-4 rounded-2xl flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#1A1917',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                    <BrandIcon name="email" size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#7A7068' }}>Email</span>
                      <button
                        type="button"
                        onClick={e => copyText('email', CONTACT_INFO.email, e)}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        style={{
                          background: copiedKey === 'email' ? 'rgba(22,163,74,0.2)' : 'rgba(255,255,255,0.06)',
                          color: copiedKey === 'email' ? '#4ADE80' : '#A39C93',
                        }}
                      >
                        {copiedKey === 'email' ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-sm font-medium mt-1 truncate group-hover:text-orange-400 transition-colors" style={{ color: '#FAF8F3' }}>
                      {CONTACT_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="group relative p-4 rounded-2xl flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#1A1917',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                    <BrandIcon name="phone" size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#7A7068' }}>Phone</span>
                      <button
                        type="button"
                        onClick={e => copyText('phone', CONTACT_INFO.phoneDisplay, e)}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        style={{
                          background: copiedKey === 'phone' ? 'rgba(22,163,74,0.2)' : 'rgba(255,255,255,0.06)',
                          color: copiedKey === 'phone' ? '#4ADE80' : '#A39C93',
                        }}
                      >
                        {copiedKey === 'phone' ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-sm font-medium mt-1 group-hover:text-orange-400 transition-colors" style={{ color: '#FAF8F3' }}>
                      {CONTACT_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                {/* LinkedIn Card */}
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#1A1917',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                    <BrandIcon name="linkedin" size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#7A7068' }}>LinkedIn</span>
                      <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#7A7068' }}>↗</span>
                    </div>
                    <div className="text-sm font-medium mt-1 truncate group-hover:text-orange-400 transition-colors" style={{ color: '#FAF8F3' }}>
                      in/shubham-sharma
                    </div>
                  </div>
                </a>

                {/* Behance Card */}
                <a
                  href={CONTACT_INFO.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl flex items-start gap-3.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: '#1A1917',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="mt-0.5 transition-transform duration-300 group-hover:scale-110">
                    <BrandIcon name="behance" size={28} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] uppercase tracking-wider font-medium" style={{ color: '#7A7068' }}>Behance</span>
                      <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: '#7A7068' }}>↗</span>
                    </div>
                    <div className="text-sm font-medium mt-1 truncate group-hover:text-orange-400 transition-colors" style={{ color: '#FAF8F3' }}>
                      behance.net/iamshubham5ed9
                    </div>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Interactive Quick Message Card ── */}
          <Reveal delay={200} dir="right" className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl"
              style={{
                background: '#1A1917',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#FAF8F3' }}>Send a Quick Note</h3>
                  <p className="text-xs mt-0.5" style={{ color: '#7A7068' }}>Pick a topic and say hello — goes straight to my inbox.</p>
                </div>
                <BrandIcon name="email" size={24} />
              </div>

              {/* Interactive Topic Pills */}
              <div className="mb-5">
                <label className="block text-[11px] uppercase tracking-widest mb-2.5" style={{ color: '#7A7068' }}>
                  What&apos;s on your mind?
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map(t => {
                    const active = topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className="text-xs font-medium px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200"
                        style={{
                          background: active ? 'var(--orange)' : 'rgba(255,255,255,0.04)',
                          color: active ? '#fff' : '#B5ADA2',
                          border: active ? '1px solid var(--orange)' : '1px solid rgba(255,255,255,0.08)',
                          transform: active ? 'scale(1.02)' : 'none',
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <div>
                  <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: '#7A7068' }}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[#C85D2A]"
                    style={{
                      background: '#121110',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#FAF8F3',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: '#7A7068' }}>
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors focus:border-[#C85D2A]"
                    style={{
                      background: '#121110',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#FAF8F3',
                    }}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="contact-msg" className="block text-[11px] uppercase tracking-wider mb-1.5" style={{ color: '#7A7068' }}>
                  Message
                </label>
                <textarea
                  id="contact-msg"
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={`Hi Shubham, I'd love to chat about ${topic.toLowerCase()}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none transition-colors focus:border-[#C85D2A]"
                  style={{
                    background: '#121110',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#FAF8F3',
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm btn-arrow cursor-pointer transition-all duration-200 hover:brightness-110"
                  style={{ background: 'var(--orange)', color: '#fff', borderRadius: 10 }}
                >
                  {sent ? 'Opening Mail App ✓' : 'Send Message'} <span className="arrow">→</span>
                </button>

                <a
                  href={CONTACT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 text-xs font-medium transition-colors hover:text-orange-400"
                  style={{ color: '#A39C93' }}
                >
                  <BrandIcon name="phone" size={16} />
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 overflow-hidden shrink-0"
                style={{
                  background: '#EFE9DE',
                  borderRadius: 9,
                  border: '1.5px solid rgba(255,255,255,0.18)',
                }}
              >
                <img
                  src="/shubham_character_avatar.jpg"
                  alt="Shubham Sharma logo"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <div className="font-serif font-semibold text-sm" style={{ color: '#FAF8F3' }}>Shubham Sharma</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: 'var(--orange)' }}>UI/UX Designer</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#7A7068' }}>
              Product designer based in Gurugram — blending visual craft, systems thinking, and frontend fluency across mobile apps, web platforms, and operational dashboards.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#7A7068' }}>Quick Links</div>
            <ul className="space-y-2">
              {['home','skills','portfolio','about','expertise','process','blog','contact'].map(l => (
                <li key={l}>
                  <a
                    href={`#${l}`}
                    onClick={e => { e.preventDefault(); scrollTo(l); }}
                    className="text-sm capitalize transition-colors hover:text-orange-400"
                    style={{ color: '#9A9A9A' }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#7A7068' }}>Expertise</div>
            <ul className="space-y-2">
              {capabilities.map(s => (
                <li key={s.title}>
                  <span className="text-sm transition-colors" style={{ color: '#9A9A9A' }}>{s.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: '#7A7068' }}>Let&apos;s Connect</div>
            <div className="space-y-2 mb-4 text-sm">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="block truncate transition-colors hover:text-orange-400"
                style={{ color: '#9A9A9A' }}
              >
                {CONTACT_INFO.email}
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="block transition-colors hover:text-orange-400"
                style={{ color: '#9A9A9A' }}
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-3 mt-4">
              {[
                { href: CONTACT_INFO.linkedin, icon: 'linkedin' as const, label: 'LinkedIn', ext: true },
                { href: CONTACT_INFO.behance, icon: 'behance' as const, label: 'Behance', ext: true },
                { href: `mailto:${CONTACT_INFO.email}`, icon: 'email' as const, label: 'Email', ext: false },
                { href: CONTACT_INFO.phoneHref, icon: 'phone' as const, label: 'Phone', ext: false },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.ext ? '_blank' : undefined}
                  rel={s.ext ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  title={s.label}
                  className="w-9 h-9 border rounded-lg flex items-center justify-center transition-all duration-200 hover:border-orange-500 hover:-translate-y-0.5"
                  style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <BrandIcon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: '#7A7068' }}>© 2025 Shubham Sharma. All rights reserved.</p>
          <p className="text-xs italic" style={{ color: 'rgba(200,93,42,0.6)', fontFamily: 'Georgia, serif' }}>
            Create Meaningful Experiences
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

function parseCaseStudySlug(hash: string): string | null {
  const m = hash.match(/^#\/case-study\/([a-z0-9-]+)$/i);
  return m ? m[1] : null;
}

export default function App() {
  const [caseStudySlug, setCaseStudySlug] = useState<string | null>(() =>
    parseCaseStudySlug(window.location.hash)
  );

  useEffect(() => {
    const onHashChange = () => {
      setCaseStudySlug(parseCaseStudySlug(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openCaseStudy = useCallback((slug: string) => {
    window.location.hash = `#/case-study/${slug}`;
    setCaseStudySlug(slug);
  }, []);

  const closeCaseStudy = useCallback(() => {
    window.history.pushState(null, '', '#portfolio');
    setCaseStudySlug(null);
    requestAnimationFrame(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  const activeProject = caseStudySlug
    ? projects.find(p => p.slug === caseStudySlug)
    : undefined;

  if (activeProject) {
    return (
      <CaseStudyPage
        project={activeProject}
        onBack={closeCaseStudy}
        onSelectProject={openCaseStudy}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--ivory)' }}>
      <Navbar />
      <Hero onOpenCaseStudy={openCaseStudy} />
      <PortfolioOverview onOpenCaseStudy={openCaseStudy} />
      <FeaturedProjects onOpenCaseStudy={openCaseStudy} />
      <About />
      <Expertise />
      <Process />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
