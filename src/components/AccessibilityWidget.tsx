'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

const SIZES: { value: FontSize; label: string; title: string }[] = [
  { value: 'normal', label: 'A',   title: 'Normal'       },
  { value: 'large',  label: 'A+',  title: 'Grande'       },
  { value: 'xlarge', label: 'A++', title: 'Muito grande' },
];

function applySize(size: FontSize) {
  document.documentElement.setAttribute('data-a11y-size', size);
}

function applyContrast(high: boolean) {
  document.documentElement.setAttribute('data-a11y-contrast', high ? 'high' : 'normal');
}

export function AccessibilityWidget() {
  const [open, setOpen]             = useState(false);
  const [fontSize, setFontSize]     = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Apply saved settings on mount (also applied by inline script in layout to avoid flash)
  useEffect(() => {
    try {
      const size     = (localStorage.getItem('a11y-size') as FontSize) ?? 'normal';
      const contrast = localStorage.getItem('a11y-contrast') === 'high';
      setFontSize(size);
      setHighContrast(contrast);
      applySize(size);
      applyContrast(contrast);
    } catch {}
  }, []);

  // Close on Escape or outside click
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false); }
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const changeSize = useCallback((size: FontSize) => {
    setFontSize(size);
    applySize(size);
    try { localStorage.setItem('a11y-size', size); } catch {}
  }, []);

  const toggleContrast = useCallback(() => {
    setHighContrast(prev => {
      const next = !prev;
      applyContrast(next);
      try { localStorage.setItem('a11y-contrast', next ? 'high' : 'normal'); } catch {}
      return next;
    });
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Opções de acessibilidade"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Acessibilidade"
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors
          outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
          ${open
            ? 'bg-[var(--brand-subtle)] text-[var(--brand)]'
            : 'text-[var(--text-secondary)] hover:bg-[var(--brand-subtle)] hover:text-[var(--brand)]'
          }`}
      >
        {/* Universal accessibility figure */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
          strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 8v6M7 11h10M10 14l-2 6M14 14l2 6" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Opções de acessibilidade"
          className="absolute right-0 top-full mt-2 z-50 w-60 rounded-2xl
            border border-[var(--border)] bg-[var(--card)] shadow-xl p-4 flex flex-col gap-5"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">
            Acessibilidade
          </p>

          {/* ── Font size ── */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[var(--text)]">Tamanho do texto</p>
            <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Tamanho do texto">
              {SIZES.map(({ value, label, title }) => (
                <button
                  key={value}
                  onClick={() => changeSize(value)}
                  aria-pressed={fontSize === value}
                  title={title}
                  className={`py-2.5 rounded-xl border text-sm font-bold transition-all
                    outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
                    focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--card)]
                    ${fontSize === value
                      ? 'border-[var(--brand)] bg-[var(--brand)] text-white'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {SIZES.find(s => s.value === fontSize)?.title}
            </p>
          </div>

          <div className="h-px bg-[var(--border)]" />

          {/* ── High contrast ── */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[var(--text)]">Alto contraste</p>
              <p className="text-xs text-[var(--text-muted)]">Cores mais nítidas</p>
            </div>
            <button
              role="switch"
              aria-checked={highContrast}
              aria-label="Alto contraste"
              onClick={toggleContrast}
              className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200
                outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
                focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]
                ${highContrast ? 'bg-[var(--brand)]' : 'bg-[var(--border)]'}`}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm
                  transition-transform duration-200
                  ${highContrast ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
              />
            </button>
          </div>

          {/* ── Reset ── */}
          {(fontSize !== 'normal' || highContrast) && (
            <>
              <div className="h-px bg-[var(--border)]" />
              <button
                onClick={() => { changeSize('normal'); if (highContrast) toggleContrast(); }}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--brand)]
                  transition-colors text-left outline-none focus-visible:underline"
              >
                Restaurar padrão
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
