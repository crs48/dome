// The single source of truth for prefixing hand-written links and public/
// asset URLs with the configured base. <Image> and src/-imported
// assets are prefixed automatically by Astro; anything in public/ or a raw
// href is not — route it through withBase().
const RAW_BASE = import.meta.env.BASE_URL; // "/" on domes.haus

export function withBase(path: string): string {
  const base = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rest}`;
}

export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/#room', label: 'The room' },
  { href: '/#day', label: 'A day here' },
  { href: '/#systems', label: 'How it works' },
  { href: '/studies/', label: 'The studies' },
  { href: '/archive/', label: 'Archive' },
  { href: '/about', label: 'About' },
];
