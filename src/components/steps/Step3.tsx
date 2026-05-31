'use client';

import { RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import type { StepProps } from '@/types/form';

export function Step3({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup
        value={data.situacaoTrabalho}
        onChange={(v) => onChange('situacaoTrabalho', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Situação atual de trabalho</Label>
        <div className="flex flex-col gap-2">
          {[
            'Empregado com carteira assinada',
            'Servidor público',
            'Autônomo/freelancer',
            'Empresário/microempreendedor',
            'Estudante',
            'Aposentado/pensionista',
            'Desempregado',
            'Trabalho informal',
            'Prefiro não responder',
          ].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
          <RadioOption value="outro">Outro</RadioOption>
        </div>
      </RadioGroup>
      {data.situacaoTrabalho === 'outro' && (
        <FieldInput
          label="Especifique a situação"
          value={data.situacaoTrabalhoOutro}
          onChange={(v) => onChange('situacaoTrabalhoOutro', v)}
          placeholder="Descreva sua situação"
        />
      )}

      <FieldInput
        label="Área de atuação profissional"
        value={data.areaAtuacao}
        onChange={(v) => onChange('areaAtuacao', v)}
        placeholder="Ex: Educação, Saúde, Tecnologia…"
        description="Opcional"
      />

      <RadioGroup
        value={data.rendaFamiliar}
        onChange={(v) => onChange('rendaFamiliar', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Faixa de renda familiar mensal</Label>
        <div className="flex flex-col gap-2">
          {[
            'Até 1 salário mínimo',
            'De 1 a 2 salários mínimos',
            'De 2 a 4 salários mínimos',
            'De 4 a 6 salários mínimos',
            'De 6 a 10 salários mínimos',
            'Acima de 10 salários mínimos',
            'Prefiro não responder',
          ].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>

      <RadioGroup
        value={data.pessoasDependentes}
        onChange={(v) => onChange('pessoasDependentes', v)}
        className="flex flex-col gap-2"
      >
        <Label className="text-sm font-medium text-[var(--text)]">Quantas pessoas dependem dessa renda?</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Apenas eu', '2 pessoas', '3 pessoas', '4 pessoas', '5 ou mais pessoas', 'Prefiro não responder'].map((o) => (
            <RadioOption key={o} value={o}>{o}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
