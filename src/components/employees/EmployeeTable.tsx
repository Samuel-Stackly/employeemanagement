import type { Employee } from '@/types/employee';
import EmployeeRow from './EmployeeRow';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { formatDate, initials, employeeIdTag } from '@/utils/format';

interface EmployeeTableProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export default function EmployeeTable({ employees, onView, onEdit, onDelete }: EmployeeTableProps) {
  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees match these filters"
        description="Try widening your search or clearing a filter to see more personnel records."
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-sm border border-line bg-white shadow-card md:block">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-paper text-left">
              {['Employee', 'Email', 'Phone', 'Department', 'Role', 'Joined', 'Status', ''].map(
                (h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-xs font-semibold uppercase tracking-wide text-ink-faint first:pl-4 last:pr-4"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <EmployeeRow key={emp.id} employee={emp} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {employees.map((emp) => (
          <div key={emp.id} className="rounded-sm border border-line bg-white p-4 shadow-card">
            <button onClick={() => onView(emp)} className="flex w-full items-center gap-3 text-left">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500 font-mono text-xs font-semibold text-paper">
                {initials(emp.fullName)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{emp.fullName}</span>
                <span className="block font-mono text-[11px] text-ink-faint">{employeeIdTag(emp.id)}</span>
              </span>
              <Badge tone={emp.status === 'Active' ? 'teal' : 'rust'}>{emp.status}</Badge>
            </button>

            <dl className="mt-3 grid grid-cols-2 gap-y-1.5 border-t border-line pt-3 text-xs">
              <dt className="text-ink-faint">Email</dt>
              <dd className="text-right text-ink-soft">{emp.email}</dd>
              <dt className="text-ink-faint">Phone</dt>
              <dd className="text-right text-ink-soft">{emp.phone}</dd>
              <dt className="text-ink-faint">Department</dt>
              <dd className="text-right text-ink-soft">{emp.department}</dd>
              <dt className="text-ink-faint">Role</dt>
              <dd className="text-right text-ink-soft">{emp.role}</dd>
              <dt className="text-ink-faint">Joined</dt>
              <dd className="text-right font-mono text-ink-soft">{formatDate(emp.joiningDate)}</dd>
            </dl>

            <div className="mt-3 flex items-center justify-end gap-2 border-t border-line pt-3">
              <button
                onClick={() => onEdit(emp)}
                className="rounded-sm px-3 py-1.5 text-xs font-semibold text-teal-600 hover:bg-teal-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(emp)}
                className="rounded-sm px-3 py-1.5 text-xs font-semibold text-rust-500 hover:bg-rust-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
