'use client';

import { useEffect, useState } from 'react';
import { Palette, Circle } from 'lucide-react';

const STORAGE_KEY = 'data-mono';

export function MonoToggle() {
  const [mono, setMono] = useState(false);

  useEffect(() => {
    setMono(document.documentElement.getAttribute('data-mono') === 'true');
  }, []);

  const toggle = () => {
    const next = !mono;
    setMono(next);
    document.documentElement.setAttribute('data-mono', String(next));
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle black / mono accent"
      title={mono ? 'Use colour accent' : 'Use black / mono accent'}
      className="flex items-center justify-center rounded-full transition-colors cursor-pointer"
      style={{
        width: 40,
        height: 40,
        color: 'var(--neutral-on-background-medium)',
      }}
    >
      {mono ? (
        <Palette className="w-[18px] h-[18px]" />
      ) : (
        <Circle className="w-[18px] h-[18px] fill-current" />
      )}
    </button>
  );
}
