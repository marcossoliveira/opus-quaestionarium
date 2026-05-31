'use client';

import { CheckboxGroup, RadioGroup, Label } from 'react-aria-components';
import { RadioOption } from '@/components/ui/RadioOption';
import { CheckOption } from '@/components/ui/CheckOption';
import type { StepProps } from '@/types/form';

export function Step8({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        value={data.diasDisponiveis}
        onChange={(v) => onChange('diasDisponiveis', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Quais dias da semana você costuma ter mais disponibilidade?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((d) => (
            <CheckOption key={d} value={d}>{d}</CheckOption>
          ))}
        </div>
      </CheckboxGroup>

      <CheckboxGroup
        value={data.periodoViavel}
        onChange={(v) => onChange('periodoViavel', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Qual período é mais viável para você?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Manhã', 'Tarde', 'Noite', 'Finais de semana'].map((p) => (
            <CheckOption key={p} value={p}>{p}</CheckOption>
          ))}
        </div>
      </CheckboxGroup>

      <RadioGroup
        value={data.rotinaDificulta}
        onChange={(v) => onChange('rotinaDificulta', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Sua rotina de trabalho/estudo dificulta a participação regular nos ensaios?
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Não', 'Às vezes', 'Sim, frequentemente', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
