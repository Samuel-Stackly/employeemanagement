import { useState } from 'react';
import type { Employee } from '@/types/employee';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface DeleteConfirmModalProps {
  employee: Employee;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export default function DeleteConfirmModal({ employee, onClose, onConfirm }: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      await onConfirm(employee.id);
      onClose();
    } catch {
      setError('Could not delete this record. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <Modal title="Confirm Deletion" onClose={onClose} maxWidth="max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rust-50">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2.5L16.5 15.5H1.5L9 2.5Z" stroke="#C4463C" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M9 7.5V10.5" stroke="#C4463C" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="9" cy="13" r="0.8" fill="#C4463C" />
          </svg>
        </div>
        <p className="text-sm text-ink-soft">
          You're about to permanently remove <span className="font-semibold text-ink">{employee.fullName}</span> from
          the directory. This action cannot be undone.
        </p>
      </div>

      {error && (
        <p className="mt-3 rounded-sm bg-rust-50 px-3 py-2 text-xs font-medium text-rust-600">{error}</p>
      )}

      <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
        <Button variant="ghost" onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete Employee'}
        </Button>
      </div>
    </Modal>
  );
}
