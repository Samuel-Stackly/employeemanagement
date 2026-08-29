import type { ReactNode } from 'react';

type Tone = 'teal' | 'gold' | 'rust' | 'neutral';

const toneClasses: Record<Tone, string> = {
  teal: 'bg-teal-50 text-teal-700',
  gold: 'bg-gold-50 text-gold-600',
  rust: 'bg-rust-50 text-rust-600',
  neutral: 'bg-black/5 text-ink-soft',
};

const toneDot: Record<Tone, string> = {
  teal: '#0F6E63',
  gold: '#D9A24B',
  rust: '#C4463C',
  neutral: '#8891A0',
};

export default function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`file-tab inline-flex items-center gap-1.5 rounded-sm py-1 pl-3 pr-2.5 text-xs font-semibold ${toneClasses[tone]}`}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: toneDot[tone] }}
      />
      {children}
    </span>
  );
}
