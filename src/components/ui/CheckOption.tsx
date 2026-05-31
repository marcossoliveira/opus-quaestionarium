import { Checkbox } from 'react-aria-components';

interface Props {
  value: string;
  children: React.ReactNode;
}

export function CheckOption({ value, children }: Props) {
  return (
    <Checkbox
      value={value}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--border)]
        cursor-pointer transition-all duration-150 outline-none
        hover:border-[var(--brand)] hover:bg-[var(--brand-subtle)]
        data-[selected]:border-[var(--brand)] data-[selected]:bg-[var(--brand-subtle)]
        data-[focus-visible]:ring-2 data-[focus-visible]:ring-[var(--brand)] data-[focus-visible]:ring-offset-2
        data-[focus-visible]:ring-offset-[var(--card)]"
    >
      <div
        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0
          border-2 border-[var(--text-muted)] transition-all
          group-data-[selected]:border-[var(--brand)] group-data-[selected]:bg-[var(--brand)]"
      >
        <svg
          viewBox="0 0 10 8"
          className="w-2.5 h-2 text-white opacity-0 group-data-[selected]:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <polyline points="1,4 4,7 9,1" />
        </svg>
      </div>
      <span className="text-sm text-[var(--text)] leading-snug">{children}</span>
    </Checkbox>
  );
}
