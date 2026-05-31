'use client';

import { CheckboxGroup, RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import { CheckOption } from '@/components/ui/CheckOption';
import type { StepProps } from '@/types/form';

export function Step6({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <CheckboxGroup
        value={data.outrasAtividades}
        onChange={(v) => onChange('outrasAtividades', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Além do coral, você participa de outras atividades culturais/artísticas?
          <span className="text-xs text-[var(--text-secondary)] ml-1">(pode marcar mais de um)</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            'Não',
            'Sim, música',
            'Sim, teatro',
            'Sim, dança',
            'Sim, artes visuais',
            'Sim, literatura',
            'Sim, manifestações populares/tradicionais',
          ].map((o) => (
            <CheckOption key={o} value={o}>{o}</CheckOption>
          ))}
          <CheckOption value="outro">Outro</CheckOption>
        </div>
      </CheckboxGroup>
      {data.outrasAtividades.includes('outro') && (
        <FieldInput
          label="Especifique a atividade"
          value={data.outrasAtividadesOutro}
          onChange={(v) => onChange('outrasAtividadesOutro', v)}
          placeholder="Descreva a atividade"
        />
      )}

      <RadioGroup
        value={data.frequenciaEventos}
        onChange={(v) => onChange('frequenciaEventos', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Com que frequência você frequenta eventos culturais?</Label>
        <div className="flex flex-col gap-2">
          {['Nunca ou quase nunca', 'Algumas vezes por ano', 'Uma vez por mês', 'Algumas vezes por mês', 'Semanalmente'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.custoDificultaEventos}
        onChange={(v) => onChange('custoDificultaEventos', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          O custo de ingressos, transporte ou alimentação dificulta seu acesso a eventos culturais?
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Não', 'Às vezes', 'Frequentemente', 'Sim, muito', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
