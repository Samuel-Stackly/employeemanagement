import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SummaryCard from '@/components/dashboard/SummaryCard';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import Badge from '@/components/ui/Badge';
import { useEmployees } from '@/hooks/useEmployees';
import { formatDate, initials } from '@/utils/format';

export default function DashboardPage() {
  const { employees, loading, error, refetch } = useEmployees();

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === 'Active').length;
    const inactive = total - active;
    const departments = new Set(employees.map((e) => e.department)).size;
    return { total, active, inactive, departments };
  }, [employees]);

  const recent = useMemo(
    () =>
      [...employees]
        .sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime())
        .slice(0, 5),
    [employees]
  );

  return (
    <Layout title="Dashboard" subtitle="Overview of your organization's headcount">
      {loading && <LoadingState label="Compiling records…" />}
      {!loading && error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Total Employees" value={stats.total} accent="ink" index="01" />
            <SummaryCard label="Active Employees" value={stats.active} accent="teal" index="02" />
            <SummaryCard label="Inactive Employees" value={stats.inactive} accent="rust" index="03" />
            <SummaryCard label="Departments" value={stats.departments} accent="gold" index="04" />
          </div>

          <div className="rounded-sm border border-line bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Recently Joined
              </h2>
              <Link to="/employees" className="text-xs font-semibold text-teal-600 hover:underline">
                View full directory →
              </Link>
            </div>

            {recent.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-ink-faint">
                No employees yet. Add your first record from the directory.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {recent.map((emp) => (
                  <li key={emp.id} className="flex items-center gap-3 px-5 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 font-mono text-xs font-semibold text-paper">
                      {initials(emp.fullName)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{emp.fullName}</p>
                      <p className="truncate text-xs text-ink-faint">
                        {emp.role} · {emp.department}
                      </p>
                    </div>
                    <span className="hidden font-mono text-xs text-ink-faint sm:block">
                      {formatDate(emp.joiningDate)}
                    </span>
                    <Badge tone={emp.status === 'Active' ? 'teal' : 'rust'}>{emp.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
