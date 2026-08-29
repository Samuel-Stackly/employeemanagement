import type { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export default function Select({ label, error, id, children, className = '', ...rest }: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <select
        id={selectId}
        className={`rounded-sm border bg-white px-3 py-2 text-sm text-ink focus:border-teal-500 ${
          error ? 'border-rust-500' : 'border-line'
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="text-xs font-medium text-rust-500">
          {error}
        </p>
      )}
    </div>
  );
}
