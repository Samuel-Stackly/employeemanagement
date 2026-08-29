import axios from 'axios';
import type { Employee, EmployeeInput } from '@/types/employee';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://employdirectory.onrender.com';

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const employeeApi = {
  async getAll(): Promise<Employee[]> {
    const { data } = await client.get<Employee[]>('/employees');
    return data;
  },

  async getById(id: string): Promise<Employee> {
    const { data } = await client.get<Employee>(`/employees/${id}`);
    return data;
  },

  async create(payload: EmployeeInput): Promise<Employee> {
    const body: Omit<Employee, 'id'> = {
      ...payload,
      createdAt: new Date().toISOString(),
    };
    const { data } = await client.post<Employee>('/employees', body);
    return data;
  },

  async update(id: string, payload: EmployeeInput): Promise<Employee> {
    const { data } = await client.put<Employee>(`/employees/${id}`, {
      ...payload,
      id,
    });
    return data;
  },

  async remove(id: string): Promise<void> {
    await client.delete(`/employees/${id}`);
  },
};
