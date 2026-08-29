import Button from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-sm border border-rust-500/30 bg-rust-50 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 3L20 19H2L11 3Z" stroke="#C4463C" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M11 9V13" stroke="#C4463C" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="11" cy="16" r="0.9" fill="#C4463C" />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-rust-600">Something went wrong</h3>
      <p className="max-w-sm text-sm text-ink-soft">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
