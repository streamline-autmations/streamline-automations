/** Underline-style input (Cuberto contacts feel). Shared by /contact and the
 *  Restaurant Direct review form — `idPrefix` keeps ids unique per form. */
export default function Field({
  label,
  value,
  onChange,
  name,
  type = 'text',
  placeholder,
  textarea = false,
  required = false,
  error,
  idPrefix = 'contact',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string;
  idPrefix?: string;
}) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;
  const cls =
    'w-full border-0 border-b bg-transparent pb-3 pt-2 text-[19px] text-site-ink outline-none transition-colors duration-300 placeholder:text-site-text-muted focus:border-site-accent md:text-[22px]';
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[14px] font-medium text-site-text-body">
        {label}
        {required && <span className="text-site-accent"> *</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={2}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-none ${error ? 'border-site-accent' : 'border-site-line'}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} ${error ? 'border-site-accent' : 'border-site-line'}`}
        />
      )}
      {error && (
        <span id={errorId} className="mt-2 block text-[13px] font-medium text-site-accent">
          {error}
        </span>
      )}
    </label>
  );
}
