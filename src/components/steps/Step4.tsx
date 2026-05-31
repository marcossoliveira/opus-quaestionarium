'use client';

import { CheckboxGroup, RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import { CheckOption } from '@/components/ui/CheckOption';
import type { StepProps } from '@/types/form';

export function Step4({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        value={data.meioTransporte}
        onChange={(v) => onChange('meioTransporte', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Como você costuma ir aos ensaios/apresentações?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Carro próprio', 'Moto própria', 'Transporte público', 'Aplicativo de transporte', 'Carona', 'Bicicleta', 'A pé'].map((o) => (
            <CheckOption key={o} value={o}>{o}</CheckOption>
          ))}
          <CheckOption value="outro">Outro</CheckOption>
        </div>
      </CheckboxGroup>
      {data.meioTransporte.includes('outro') && (
        <FieldInput
          label="Especifique o meio de transporte"
          value={data.meioTransporteOutro}
          onChange={(v) => onChange('meioTransporteOutro', v)}
          placeholder="Descreva"
        />
      )}

      <RadioGroup
        value={data.custoDeslocamento}
        onChange={(v) => onChange('custoDeslocamento', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">O custo de deslocamento dificulta sua participação no coral?</Label>
        <div className="flex flex-col gap-2">
          {['Não', 'Raramente', 'Às vezes', 'Frequentemente', 'Sim, é uma grande dificuldade', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.tempoDeslocamento}
        onChange={(v) => onChange('tempoDeslocamento', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Tempo médio para chegar ao local de ensaio</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Até 15 minutos', '15 a 30 minutos', '30 minutos a 1 hora', 'Mais de 1 hora'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
