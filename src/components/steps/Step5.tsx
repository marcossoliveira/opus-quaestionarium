'use client';

import { RadioGroup, Label } from 'react-aria-components';
import { RadioOption } from '@/components/ui/RadioOption';
import type { StepProps } from '@/types/form';

export function Step5({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        value={data.acessoInternet}
        onChange={(v) => onChange('acessoInternet', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Você possui acesso regular à internet?</Label>
        <div className="flex flex-col gap-2">
          {[
            'Sim, em qualquer lugar',
            'Sim, em casa',
            'Sim, pelo celular',
            'Sim, mas com limitações',
            'Não tenho acesso regular',
          ].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.possuiSmartphone}
        onChange={(v) => onChange('possuiSmartphone', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Você possui smartphone?</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Sim', 'Não'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.facilidadeApps}
        onChange={(v) => onChange('facilidadeApps', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Você tem facilidade para usar aplicativos, formulários online e grupos de comunicação?
        </Label>
        <div className="flex flex-col gap-2">
          {['Sim', 'Tenho alguma dificuldade', 'Tenho muita dificuldade', 'Preciso de ajuda com frequência'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
