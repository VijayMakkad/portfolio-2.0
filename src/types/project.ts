import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  name: string;
  description: string;
  tags?: string[];
  icon?: JSX.Element;
  color?: string;
  liveLink?: string;
  githubRepo?: string;
}
