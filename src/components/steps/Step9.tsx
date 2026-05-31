'use client';

import { CheckboxGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { FieldTextArea } from '@/components/ui/FieldTextArea';
import { CheckOption } from '@/components/ui/CheckOption';
import type { StepProps } from '@/types/form';

export function Step9({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        value={data.necessidadesAcessibilidade}
        onChange={(v) => onChange('necessidadesAcessibilidade', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Você possui alguma necessidade de acessibilidade que o coral deveria considerar?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Não',
            'Mobilidade física',
            'Deficiência visual',
            'Deficiência auditiva',
            'Neurodivergência',
            'Necessidade de material adaptado',
            'Prefiro não responder',
          ].map((o) => (
            <CheckOption key={o} value={o}>{o}</CheckOption>
          ))}
          <CheckOption value="outra">Outra</CheckOption>
        </div>
      </CheckboxGroup>
      {data.necessidadesAcessibilidade.includes('outra') && (
        <FieldInput
          label="Especifique a necessidade"
          value={data.necessidadesAcessibilidadeOutra}
          onChange={(v) => onChange('necessidadesAcessibilidadeOutra', v)}
          placeholder="Descreva"
        />
      )}

      <FieldTextArea
        label="Há algo que poderia tornar sua participação no coral mais confortável, acessível ou viável?"
        value={data.melhoriaParticipacao}
        onChange={(v) => onChange('melhoriaParticipacao', v)}
        placeholder="Escreva aqui suas sugestões…"
        rows={4}
      />
    </div>
  );
}
