
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import DashboardPage from '@/pages/DashboardPage';
import EmployeesPage from '@/pages/EmployeesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
