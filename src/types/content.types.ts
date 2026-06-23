import type { IconName } from '@/resources/icons';
import { zones } from 'tzdata';

export type IANATimeZone = Extract<keyof typeof zones, string>;

export type Person = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: IANATimeZone;
  languages?: string[];
};

export type Social = Array<{
  name: string;
  icon: IconName;
  link: string;
  essential?: boolean;
}>;

export type TestimonialItem = {
  text: string;
  name: string;
  role: string;
  image?: string;
};

export type ShowcaseProject = {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
};

export interface BasePageConfig {
  path: `/${string}` | string;
  label: string;
  title: string;
  description: string;
  image?: `/images/${string}` | string;
}

export interface Home extends BasePageConfig {
  image: `/images/${string}` | string;
  headline: React.ReactNode;
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  subline: React.ReactNode;
  roleWords: string[];
  showcaseProjects: ShowcaseProject[];
}

export interface About extends BasePageConfig {
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  intro: {
    display: boolean;
    title: string;
    description: React.ReactNode;
  };
  work: {
    display: boolean;
    title: string;
    experiences: Array<{
      company: string;
      timeframe: string;
      role: string;
      achievements: React.ReactNode[];
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  studies: {
    display: boolean;
    title: string;
    institutions: Array<{
      name: string;
      description: React.ReactNode;
    }>;
  };
  technical: {
    display: boolean;
    title: string;
    skills: Array<{
      title: string;
      description?: React.ReactNode;
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
}

export type SkillCategory = 'languages' | 'web' | 'ai-ml' | 'tools';

export type SkillProficiency = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: string;
  proficiency: SkillProficiency;
  note: string;
  relatedProjectSlug?: string;
}

export interface SkillCategoryMeta {
  id: SkillCategory;
  label: string;
  command: string;
}

export interface Work extends BasePageConfig {}

export type Testimonials = {
  display: boolean;
  title: string;
  description: string;
  items: TestimonialItem[];
};
