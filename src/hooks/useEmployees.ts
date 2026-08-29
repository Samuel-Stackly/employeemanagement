import { useCallback, useEffect, useState } from 'react';
import { employeeApi } from '@/services/api';
import type { Employee, EmployeeInput } from '@/types/employee';

interface UseEmployeesResult {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addEmployee: (payload: EmployeeInput) => Promise<Employee>;
  editEmployee: (id: string, payload: EmployeeInput) => Promise<Employee>;
  deleteEmployee: (id: string) => Promise<void>;
}

export function useEmployees(): UseEmployeesResult {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeApi.getAll();
      setEmployees(data);
    } catch (err) {
      setError(
        'Could not reach the server. Make sure JSON Server is running on port 4000.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const addEmployee = useCallback(async (payload: EmployeeInput) => {
    const created = await employeeApi.create(payload);
    setEmployees((prev) => [created, ...prev]);
    return created;
  }, []);

  const editEmployee = useCallback(async (id: string, payload: EmployeeInput) => {
    const updated = await employeeApi.update(id, payload);
    setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  }, []);

  const deleteEmployee = useCallback(async (id: string) => {
    await employeeApi.remove(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return {
    employees,
    loading,
    error,
    refetch: fetchEmployees,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };
}
