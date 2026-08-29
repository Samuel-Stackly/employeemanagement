interface SummaryCardProps {
  label: string;
  value: number | string;
  accent: 'teal' | 'gold' | 'rust' | 'ink';
  index: string;
}

const accentBar: Record<SummaryCardProps['accent'], string> = {
  teal: '#0F6E63',
  gold: '#D9A24B',
  rust: '#C4463C',
  ink: '#1B2430',
};

export default function SummaryCard({ label, value, accent, index }: SummaryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm border border-line bg-white p-5 shadow-card">
      <span
        className="absolute left-0 top-0 h-full w-1"
        style={{ backgroundColor: accentBar[accent] }}
      />
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <span className="font-mono text-[10px] text-ink-faint">{index}</span>
      </div>
      <p className="mt-3 font-mono text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
