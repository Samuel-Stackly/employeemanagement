import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, className = '', ...rest }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <input
        id={inputId}
        className={`rounded-sm border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-teal-500 ${
          error ? 'border-rust-500' : 'border-line'
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs font-medium text-rust-500">
          {error}
        </p>
      )}
    </div>
  );
}
