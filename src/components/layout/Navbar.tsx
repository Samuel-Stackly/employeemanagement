interface NavbarProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
}

export default function Navbar({ title, subtitle, onMenuClick }: NavbarProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-paper/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-sm p-1.5 text-ink hover:bg-black/5 lg:hidden"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-ink sm:text-xl">{title}</h1>
          {subtitle && <p className="text-xs text-ink-faint">{subtitle}</p>}
        </div>
      </div>
      <p className="hidden font-mono text-xs text-ink-faint sm:block">{today}</p>
    </header>
  );
}
