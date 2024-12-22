import { type LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  icon: LucideIcon;
  color?: string;
  liveLink?: string;
  githubRepo?: string;
}

