import { TextField, Label, TextArea, FieldError, Text } from 'react-aria-components';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  rows?: number;
}

export function FieldTextArea({
  label,
  value,
  onChange,
  placeholder,
  description,
  isRequired,
  rows = 4,
}: Props) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      className="flex flex-col gap-1.5"
    >
      <Label className="text-sm font-medium text-[var(--text)]">
        {label}
        {isRequired && <span className="text-[var(--brand)] ml-0.5">*</span>}
      </Label>
      {description && (
        <Text slot="description" className="text-xs text-[var(--text-secondary)]">
          {description}
        </Text>
      )}
      <TextArea
        rows={rows}
        placeholder={placeholder}
        className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)]
          text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] resize-none
          outline-none transition-all
          focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2
          focus:ring-offset-[var(--card)]"
      />
      <FieldError className="text-xs text-red-500" />
    </TextField>
  );
}
