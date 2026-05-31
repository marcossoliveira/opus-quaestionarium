'use client';

import { RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import type { StepProps } from '@/types/form';

export function Step2({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        value={data.escolaridade}
        onChange={(v) => onChange('escolaridade', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Nível de escolaridade</Label>
        <div className="flex flex-col gap-2">
          {[
            'Ensino Fundamental incompleto',
            'Ensino Fundamental completo',
            'Ensino Médio incompleto',
            'Ensino Médio completo',
            'Ensino Técnico',
            'Ensino Superior incompleto',
            'Ensino Superior completo',
            'Pós-graduação',
            'Mestrado/Doutorado',
            'Prefiro não responder',
          ].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.formacaoMusical}
        onChange={(v) => onChange('formacaoMusical', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Formação musical formal</Label>
        <div className="flex flex-col gap-2">
          {[
            'Não',
            'Sim, cursos livres',
            'Sim, escola de música/conservatório',
            'Sim, graduação em música',
            'Sim, pós-graduação em música',
          ].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
          <RadioOption value="outro">Outro</RadioOption>
        </div>
      </RadioGroup>
      {data.formacaoMusical === 'outro' && (
        <FieldInput
          label="Especifique a formação musical"
          value={data.formacaoMusicalOutro}
          onChange={(v) => onChange('formacaoMusicalOutro', v)}
          placeholder="Descreva sua formação"
        />
      )}

      <RadioGroup
        value={data.leituraPartitura}
        onChange={(v) => onChange('leituraPartitura', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Você sabe ler partitura?</Label>
        <div className="flex flex-col gap-2">
          {['Não', 'Um pouco', 'Sim, em nível básico', 'Sim, em nível intermediário', 'Sim, em nível avançado'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
