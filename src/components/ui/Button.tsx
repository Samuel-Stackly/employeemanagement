import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-teal-500 text-paper hover:bg-teal-600 focus-visible:outline-teal-600',
  secondary:
    'bg-white text-ink border border-line hover:border-ink-faint hover:bg-teal-50/40',
  ghost: 'bg-transparent text-ink-soft hover:bg-black/5',
  danger: 'bg-rust-500 text-paper hover:bg-rust-600',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
