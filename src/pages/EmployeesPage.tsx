import { useMemo, useState } from 'react';
import Layout from '@/components/layout/Layout';
import FilterBar from '@/components/employees/FilterBar';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeForm from '@/components/employees/EmployeeForm';
import EmployeeViewModal from '@/components/employees/EmployeeViewModal';
import DeleteConfirmModal from '@/components/employees/DeleteConfirmModal';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import { useEmployees } from '@/hooks/useEmployees';
import { useDebounce } from '@/hooks/useDebounce';
import type { Employee, EmployeeFilters } from '@/types/employee';

const defaultFilters: EmployeeFilters = {
  search: '',
  department: 'All',
  status: 'All',
  sort: 'newest',
};

type ModalState =
  | { type: 'none' }
  | { type: 'add' }
  | { type: 'view'; employee: Employee }
  | { type: 'edit'; employee: Employee }
  | { type: 'delete'; employee: Employee };

export default function EmployeesPage() {
  const { employees, loading, error, refetch, addEmployee, editEmployee, deleteEmployee } =
    useEmployees();
  const [filters, setFilters] = useState<EmployeeFilters>(defaultFilters);
  const [modal, setModal] = useState<ModalState>({ type: 'none' });
  const debouncedSearch = useDebounce(filters.search, 250);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    let result = employees.filter((emp) => {
      const matchesSearch =
        !term ||
        emp.fullName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term);
      const matchesDept = filters.department === 'All' || emp.department === filters.department;
      const matchesStatus = filters.status === 'All' || emp.status === filters.status;
      return matchesSearch && matchesDept && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      const diff = new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
      return filters.sort === 'newest' ? -diff : diff;
    });

    return result;
  }, [employees, debouncedSearch, filters.department, filters.status, filters.sort]);

  return (
    <Layout title="Employee Directory" subtitle="Search, filter, and manage personnel records">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-faint">
            {employees.length} record{employees.length === 1 ? '' : 's'} on file
          </p>
          <Button onClick={() => setModal({ type: 'add' })}>
            <PlusIcon />
            Add Employee
          </Button>
        </div>

        {loading && <LoadingState label="Loading directory…" />}
        {!loading && error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && (
          <>
            <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
            <EmployeeTable
              employees={filtered}
              onView={(emp) => setModal({ type: 'view', employee: emp })}
              onEdit={(emp) => setModal({ type: 'edit', employee: emp })}
              onDelete={(emp) => setModal({ type: 'delete', employee: emp })}
            />
          </>
        )}
      </div>

      {modal.type === 'add' && (
        <Modal title="Add Employee" onClose={() => setModal({ type: 'none' })}>
          <EmployeeForm
            submitLabel="Add Employee"
            onCancel={() => setModal({ type: 'none' })}
            onSubmit={async (payload) => {
              await addEmployee(payload);
              setModal({ type: 'none' });
            }}
          />
        </Modal>
      )}

      {modal.type === 'edit' && (
        <Modal title="Edit Employee" onClose={() => setModal({ type: 'none' })}>
          <EmployeeForm
            initial={modal.employee}
            submitLabel="Save Changes"
            onCancel={() => setModal({ type: 'none' })}
            onSubmit={async (payload) => {
              await editEmployee(modal.employee.id, payload);
              setModal({ type: 'none' });
            }}
          />
        </Modal>
      )}

      {modal.type === 'view' && (
        <EmployeeViewModal
          employee={modal.employee}
          onClose={() => setModal({ type: 'none' })}
          onEdit={(emp) => setModal({ type: 'edit', employee: emp })}
        />
      )}

      {modal.type === 'delete' && (
        <DeleteConfirmModal
          employee={modal.employee}
          onClose={() => setModal({ type: 'none' })}
          onConfirm={deleteEmployee}
        />
      )}
    </Layout>
  );
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 2V13M2 7.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
