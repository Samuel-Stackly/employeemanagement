import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="6" width="16" height="12" rx="1.5" stroke="#0F6E63" strokeWidth="1.5" />
          <path d="M3 9H19" stroke="#0F6E63" strokeWidth="1.5" />
          <path d="M7 3.5L7 6M15 3.5L15 6" stroke="#0F6E63" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="max-w-xs text-sm text-ink-faint">{description}</p>
      {action}
    </div>
  );
}
