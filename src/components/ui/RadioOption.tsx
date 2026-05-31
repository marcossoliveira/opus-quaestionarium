import { Radio } from 'react-aria-components';

interface Props {
  value: string;
  children: React.ReactNode;
}

export function RadioOption({ value, children }: Props) {
  return (
    <Radio
      value={value}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)]
        cursor-pointer transition-all duration-150 outline-none
        hover:border-[var(--brand)] hover:bg-[var(--brand-subtle)]
        data-[selected]:border-[var(--brand)] data-[selected]:bg-[var(--brand-subtle)]
        data-[focus-visible]:ring-2 data-[focus-visible]:ring-[var(--brand)] data-[focus-visible]:ring-offset-2
        data-[focus-visible]:ring-offset-[var(--card)]"
    >
      <div
        className="w-4 h-4 rounded-full border-2 border-[var(--text-muted)] flex items-center justify-center
          flex-shrink-0 transition-colors
          group-data-[selected]:border-[var(--brand)]"
      >
        <div className="w-2 h-2 rounded-full bg-[var(--brand)] opacity-0 scale-50 transition-all
          group-data-[selected]:opacity-100 group-data-[selected]:scale-100" />
      </div>
      <span className="text-sm text-[var(--text)] leading-snug">{children}</span>
    </Radio>
  );
}
