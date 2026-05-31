'use client';

import { CheckboxGroup, RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import { CheckOption } from '@/components/ui/CheckOption';
import type { StepProps } from '@/types/form';

export function Step7({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        value={data.dificuldadeCustos}
        onChange={(v) => onChange('dificuldadeCustos', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Você teria dificuldade em arcar com custos relacionados ao coral, como uniforme, transporte,
          alimentação ou viagens?
        </Label>
        <div className="flex flex-col gap-2">
          {['Não', 'Talvez, dependendo do valor', 'Sim, tenho dificuldade', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <CheckboxGroup
        value={data.custosImpactam}
        onChange={(v) => onChange('custosImpactam', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Quais custos mais impactam sua participação?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Transporte',
            'Alimentação',
            'Uniforme/figurino',
            'Material de estudo',
            'Aulas/preparação musical',
            'Viagens',
            'Nenhum',
          ].map((o) => (
            <CheckOption key={o} value={o}>{o}</CheckOption>
          ))}
          <CheckOption value="outro">Outro</CheckOption>
        </div>
      </CheckboxGroup>
      {data.custosImpactam.includes('outro') && (
        <FieldInput
          label="Especifique o custo"
          value={data.custosImpactamOutro}
          onChange={(v) => onChange('custosImpactamOutro', v)}
          placeholder="Descreva"
        />
      )}

      <RadioGroup
        value={data.interesseApoio}
        onChange={(v) => onChange('interesseApoio', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Você teria interesse em participar de ações de apoio, bolsas, subsídios ou campanhas de
          arrecadação para viabilizar atividades do coral?
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Sim', 'Não', 'Talvez', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
