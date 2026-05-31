import { TextField, Label, Input, FieldError, Text } from 'react-aria-components';

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  type?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

export function FieldInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  isRequired,
  isDisabled,
  type = 'text',
  maxLength,
  inputMode,
}: Props) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      isRequired={isRequired}
      isDisabled={isDisabled}
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
      <Input
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        className="px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)]
          text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]
          outline-none transition-all
          focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2
          focus:ring-offset-[var(--card)]
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <FieldError className="text-xs text-red-500" />
    </TextField>
  );
}
