import { useState } from 'react';
import type { Employee, EmployeeFormErrors, EmployeeInput } from '@/types/employee';
import { DEPARTMENTS } from '@/types/employee';
import { validateEmployee, hasErrors } from '@/utils/validation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

interface EmployeeFormProps {
  initial?: Employee;
  onSubmit: (payload: EmployeeInput) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

const emptyValues: EmployeeInput = {
  fullName: '',
  email: '',
  phone: '',
  department: 'Engineering',
  role: '',
  joiningDate: '',
  status: 'Active',
};

export default function EmployeeForm({ initial, onSubmit, onCancel, submitLabel }: EmployeeFormProps) {
  const [values, setValues] = useState<EmployeeInput>(
    initial
      ? {
          fullName: initial.fullName,
          email: initial.email,
          phone: initial.phone,
          department: initial.department,
          role: initial.role,
          joiningDate: initial.joiningDate,
          status: initial.status,
        }
      : emptyValues
  );
  const [errors, setErrors] = useState<EmployeeFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof EmployeeInput>(key: K, value: EmployeeInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof EmployeeFormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateEmployee(values);
    setErrors(validation);
    if (hasErrors(validation)) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setSubmitError('Could not save this record. Check the server connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Full Name"
        value={values.fullName}
        onChange={(e) => update('fullName', e.target.value)}
        error={errors.fullName}
        placeholder="e.g. Ananya Sharma"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          placeholder="name@company.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          error={errors.phone}
          placeholder="+91 98765 43210"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Department"
          value={values.department}
          onChange={(e) => update('department', e.target.value as EmployeeInput['department'])}
          error={errors.department}
        >
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
        <Input
          label="Role"
          value={values.role}
          onChange={(e) => update('role', e.target.value)}
          error={errors.role}
          placeholder="e.g. Frontend Engineer"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Joining Date"
          type="date"
          value={values.joiningDate}
          onChange={(e) => update('joiningDate', e.target.value)}
          error={errors.joiningDate}
        />
        <Select
          label="Status"
          value={values.status}
          onChange={(e) => update('status', e.target.value as EmployeeInput['status'])}
          error={errors.status}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
      </div>

      {submitError && (
        <p className="rounded-sm bg-rust-50 px-3 py-2 text-xs font-medium text-rust-600">
          {submitError}
        </p>
      )}

      <div className="mt-2 flex items-center justify-end gap-2 border-t border-line pt-4">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
