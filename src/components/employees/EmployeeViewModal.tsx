import type { Employee } from '@/types/employee';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { formatDate, initials, employeeIdTag } from '@/utils/format';

interface EmployeeViewModalProps {
  employee: Employee;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
}

export default function EmployeeViewModal({ employee, onClose, onEdit }: EmployeeViewModalProps) {
  return (
    <Modal title="Personnel Record" onClose={onClose}>
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-500 font-mono text-lg font-semibold text-paper">
          {initials(employee.fullName)}
        </span>
        <div>
          <p className="text-base font-bold text-ink">{employee.fullName}</p>
          <p className="font-mono text-xs text-ink-faint">{employeeIdTag(employee.id)}</p>
        </div>
        <div className="ml-auto">
          <Badge tone={employee.status === 'Active' ? 'teal' : 'rust'}>{employee.status}</Badge>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2">
        <Field label="Email" value={employee.email} />
        <Field label="Phone" value={employee.phone} />
        <Field label="Department" value={employee.department} />
        <Field label="Role" value={employee.role} />
        <Field label="Joining Date" value={formatDate(employee.joiningDate)} />
        <Field label="Record Created" value={formatDate(employee.createdAt)} />
      </dl>

      <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={() => {
            onEdit(employee);
          }}
        >
          Edit Record
        </Button>
      </div>
    </Modal>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}
