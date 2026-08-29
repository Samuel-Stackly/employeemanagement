import type { ReactNode } from 'react';
import type { Employee } from '@/types/employee';
import { formatDate, initials, employeeIdTag } from '@/utils/format';
import Badge from '@/components/ui/Badge';

interface EmployeeRowProps {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeRow({ employee, onView, onEdit, onDelete }: EmployeeRowProps) {
  return (
    <tr className="border-b border-line last:border-0 hover:bg-teal-50/30">
      <td className="py-3 pl-4 pr-3">
        <button
          onClick={() => onView(employee)}
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 font-mono text-xs font-semibold text-paper">
            {initials(employee.fullName)}
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink hover:text-teal-600">
              {employee.fullName}
            </span>
            <span className="block font-mono text-[11px] text-ink-faint">
              {employeeIdTag(employee.id)}
            </span>
          </span>
        </button>
      </td>
      <td className="px-3 py-3 text-sm text-ink-soft">{employee.email}</td>
      <td className="px-3 py-3 text-sm text-ink-soft">{employee.phone}</td>
      <td className="px-3 py-3">
        <Badge tone="teal">{employee.department}</Badge>
      </td>
      <td className="px-3 py-3 text-sm text-ink-soft">{employee.role}</td>
      <td className="px-3 py-3 font-mono text-xs text-ink-soft">{formatDate(employee.joiningDate)}</td>
      <td className="px-3 py-3">
        <Badge tone={employee.status === 'Active' ? 'teal' : 'rust'}>{employee.status}</Badge>
      </td>
      <td className="py-3 pl-3 pr-4">
        <div className="flex items-center justify-end gap-1">
          <RowAction label="View" onClick={() => onView(employee)}>
            <path d="M1 8s2.7-5 7-5 7 5 7 5-2.7 5-7 5-7-5-7-5Z" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
          </RowAction>
          <RowAction label="Edit" onClick={() => onEdit(employee)}>
            <path
              d="M11.5 2.5l2 2L5 13l-2.7.7L3 11l8.5-8.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </RowAction>
          <RowAction label="Delete" onClick={() => onDelete(employee)} danger>
            <path d="M3 4.5h10M6.5 4.5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1.5M4.5 4.5l.6 8.2a1 1 0 0 0 1 .93h3.8a1 1 0 0 0 1-.93l.6-8.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </RowAction>
        </div>
      </td>
    </tr>
  );
}

function RowAction({
  label,
  onClick,
  children,
  danger,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-sm p-1.5 transition-colors ${
        danger ? 'text-ink-faint hover:bg-rust-50 hover:text-rust-500' : 'text-ink-faint hover:bg-teal-50 hover:text-teal-600'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {children}
      </svg>
    </button>
  );
}
