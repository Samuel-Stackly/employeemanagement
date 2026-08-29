import type { EmployeeFormErrors, EmployeeInput } from '@/types/employee';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,16}$/;

export function validateEmployee(values: EmployeeInput): EmployeeFormErrors {
  const errors: EmployeeFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!values.department) {
    errors.department = 'Select a department.';
  }

  if (!values.role.trim()) {
    errors.role = 'Role is required.';
  }

  if (!values.joiningDate) {
    errors.joiningDate = 'Joining date is required.';
  } else {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (new Date(values.joiningDate) > today) {
      errors.joiningDate = 'Joining date cannot be in the future.';
    }
  }

  if (!values.status) {
    errors.status = 'Select a status.';
  }

  return errors;
}

export function hasErrors(errors: EmployeeFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}
