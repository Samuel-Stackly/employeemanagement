import type { EmployeeFilters } from '@/types/employee';
import { DEPARTMENTS } from '@/types/employee';

interface FilterBarProps {
  filters: EmployeeFilters;
  onChange: (filters: EmployeeFilters) => void;
  resultCount: number;
}

export default function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-sm border border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle cx="6.5" cy="6.5" r="4.7" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10 10L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search by name or email…"
          className="w-full rounded-sm border border-line bg-paper py-2 pl-9 pr-3 text-sm placeholder:text-ink-faint focus:border-teal-500 focus:bg-white"
          aria-label="Search employees"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.department}
          onChange={(e) =>
            onChange({ ...filters, department: e.target.value as EmployeeFilters['department'] })
          }
          className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-medium text-ink-soft focus:border-teal-500"
          aria-label="Filter by department"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as EmployeeFilters['status'] })
          }
          className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-medium text-ink-soft focus:border-teal-500"
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as EmployeeFilters['sort'] })}
          className="rounded-sm border border-line bg-paper px-3 py-2 text-xs font-medium text-ink-soft focus:border-teal-500"
          aria-label="Sort by joining date"
        >
          <option value="newest">Joining Date: Newest</option>
          <option value="oldest">Joining Date: Oldest</option>
        </select>

        <span className="font-mono text-[11px] text-ink-faint">{resultCount} found</span>
      </div>
    </div>
  );
}
