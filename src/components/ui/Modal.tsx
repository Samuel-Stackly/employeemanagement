import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({ title, onClose, children, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-8 sm:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`w-full ${maxWidth} rounded-sm bg-white shadow-panel`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="modal-title" className="font-mono text-sm font-semibold uppercase tracking-wide text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm p-1 text-ink-faint hover:bg-black/5 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3L15 15M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
