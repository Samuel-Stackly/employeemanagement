import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon },
  { to: '/employees', label: 'Directory', icon: DirectoryIcon },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-white">
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-teal-500 font-mono text-xs font-bold text-paper">
          R
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-ink">Rosterly</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            Personnel Records
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `file-tab flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-ink-soft hover:bg-black/5 hover:text-ink'
              }`
            }
            style={({ isActive }) =>
              isActive ? { boxShadow: 'inset 3px 0 0 #0F6E63' } : undefined
            }
          >
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
          JSON Server · localhost:4000
        </p>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="8.5" y="1.5" width="6" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1.5" y="9.5" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function DirectoryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10.5" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 6H14.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 1.5V4M12 1.5V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
