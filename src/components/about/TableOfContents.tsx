'use client';

import React from 'react';
import { slugify } from '@/lib/slugify';
import styles from './about.module.scss';

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const scrollTo = (id: string, offset: number) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offsetPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  if (!about.tableOfContent.display) return null;

  const sections = structure.filter(section => section.display);

  return (
    <nav className="flex flex-col gap-6" aria-label="Table of contents">
      {sections.map(section => (
        <div key={section.title} className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => scrollTo(slugify(section.title), 80)}
            className={`group flex items-center gap-2 text-left ${styles.hover}`}
          >
            <span className="h-px w-4 c-surface-line transition-all group-hover:w-6" />
            <span className="text-sm c-text-weak group-hover:c-text-strong transition-colors">
              {section.title}
            </span>
          </button>

          {about.tableOfContent.subItems && section.items.length > 0 && (
            <div className="flex flex-col gap-2 pl-6">
              {section.items.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollTo(slugify(item), 80)}
                  className={`group flex items-center gap-2 text-left ${styles.hover}`}
                >
                  <span className="h-px w-2 c-surface-line" />
                  <span className="text-xs c-text-weak group-hover:c-text-strong transition-colors">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default TableOfContents;
