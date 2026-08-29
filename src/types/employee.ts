export type EmployeeStatus = 'Active' | 'Inactive';

export type Department =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Sales'
  | 'Marketing'
  | 'Human Resources'
  | 'Finance'
  | 'Operations';

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: Department;
  role: string;
  joiningDate: string; // ISO date string (yyyy-mm-dd)
  status: EmployeeStatus;
  createdAt: string;
}

export type EmployeeInput = Omit<Employee, 'id' | 'createdAt'>;

export interface EmployeeFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  department?: string;
  role?: string;
  joiningDate?: string;
  status?: string;
}

export type SortOrder = 'newest' | 'oldest';

export interface EmployeeFilters {
  search: string;
  department: Department | 'All';
  status: EmployeeStatus | 'All';
  sort: SortOrder;
}

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'Design',
  'Product',
  'Sales',
  'Marketing',
  'Human Resources',
  'Finance',
  'Operations',
];
