export const inputClass =
  "min-h-[44px] w-full rounded-sm border border-charcoal/20 bg-white px-3 py-2.5 text-sm text-charcoal outline-none transition-colors focus:border-gold";
export const textareaClass = `${inputClass} min-h-[110px] resize-y`;
export const selectClass = inputClass;

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function Field({ label, error, hint, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-wide text-charcoal/60">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-charcoal/40">{hint}</span>}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
