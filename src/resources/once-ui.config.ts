import type {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from '@/types';
import { env } from '@/lib/env';
import { home } from './content';
import { Geist, Geist_Mono } from 'next/font/google';

const baseURL: string = env.baseUrl;

const routes: RoutesConfig = {
  '/': true,
  '/about': true,
  '/work': true,
  '/blog': false,
  '/gallery': false,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

const heading = Geist({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

const body = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const label = Geist({
  variable: '--font-label',
  subsets: ['latin'],
  display: 'swap',
});

const code = Geist_Mono({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

const fonts: FontsConfig = {
  heading,
  body,
  label,
  code,
};

const style: StyleConfig = {
  theme: 'dark',
  neutral: 'slate',
  brand: 'cyan',
  accent: 'cyan',
  solid: 'contrast',
  solidStyle: 'plastic',
  border: 'playful',
  surface: 'translucent',
  transition: 'micro',
  scaling: '100',
};

const dataStyle: DataStyleConfig = {
  variant: 'gradient',
  mode: 'categorical',
  height: 24,
  axis: { stroke: 'var(--neutral-alpha-weak)' },
  tick: {
    fill: 'var(--neutral-on-background-weak)',
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: { cursor: true, x: 50, y: 0, radius: 80 },
  gradient: {
    display: true,
    opacity: 60,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: 'brand-background-strong',
    colorEnd: 'page-background',
  },
  dots: {
    display: true,
    opacity: 25,
    size: '1',
    color: 'brand-background-strong',
  },
  grid: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-medium',
    width: '0.25rem',
    height: '0.25rem',
  },
  lines: {
    display: false,
    opacity: 100,
    color: 'neutral-alpha-weak',
    size: '16',
    thickness: 1,
    angle: 45,
  },
};

const schema: SchemaConfig = {
  logo: '',
  type: 'Individual',
  name: 'Vijay Makkad',
  description: home.description,
  email: 'vijaymakkad0104@gmail.com',
};

const sameAs: SameAsConfig = {
  linkedin: 'https://www.linkedin.com/in/vijay-makkad-1573681b3/',
};

const socialSharing: SocialSharingConfig = {
  display: false,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  baseURL,
  dataStyle,
  display,
  effects,
  fonts,
  protectedRoutes,
  routes,
  sameAs,
  schema,
  socialSharing,
  style,
};
