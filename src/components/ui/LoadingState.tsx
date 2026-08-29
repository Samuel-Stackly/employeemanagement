export default function LoadingState({ label = 'Loading records…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-faint">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      <p className="font-mono text-xs uppercase tracking-wide">{label}</p>
    </div>
  );
}
