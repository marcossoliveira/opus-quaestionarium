'use client';

import { useEffect, useRef, useState } from 'react';
import { RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import type { StepProps } from '@/types/form';

export function Step1({ data, onChange }: StepProps) {
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const prevCep = useRef('');

  useEffect(() => {
    const clean = data.cep.replace(/\D/g, '');
    if (clean.length !== 8 || clean === prevCep.current) return;
    prevCep.current = clean;

    setCepLoading(true);
    setCepError('');
    fetch(`https://viacep.com.br/ws/${clean}/json/`)
      .then((r) => r.json())
      .then((json) => {
        if (json.erro) {
          setCepError('CEP não encontrado.');
          return;
        }
        onChange('rua', json.logradouro || '');
        onChange('bairro', json.bairro || '');
        onChange('cidade', json.localidade || '');
        onChange('estado', json.uf || '');
      })
      .catch(() => setCepError('Erro ao buscar CEP.'))
      .finally(() => setCepLoading(false));
  }, [data.cep, onChange]);

  function formatCep(value: string) {
    const d = value.replace(/\D/g, '').slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  }

  return (
    <div className="flex flex-col gap-6">
      <FieldInput
        label="Nome completo"
        value={data.nomeCompleto}
        onChange={(v) => onChange('nomeCompleto', v)}
        placeholder="Seu nome completo"
        isRequired
      />

      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-[var(--text)]">Endereço</p>

        <div className="flex flex-col gap-1.5">
          <FieldInput
            label="CEP"
            value={data.cep}
            onChange={(v) => onChange('cep', formatCep(v))}
            placeholder="00000-000"
            inputMode="numeric"
            maxLength={9}
          />
          {cepLoading && <p className="text-xs text-[var(--text-secondary)]">Buscando endereço…</p>}
          {cepError && <p className="text-xs text-red-500">{cepError}</p>}
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <FieldInput
            label="Rua / Logradouro"
            value={data.rua}
            onChange={(v) => onChange('rua', v)}
            placeholder="Nome da rua"
          />
          <FieldInput
            label="Número"
            value={data.numero}
            onChange={(v) => onChange('numero', v)}
            placeholder="Nº"
          />
        </div>

        <FieldInput
          label="Complemento"
          value={data.complemento}
          onChange={(v) => onChange('complemento', v)}
          placeholder="Apto, bloco… (opcional)"
        />

        <div className="grid grid-cols-2 gap-3">
          <FieldInput
            label="Bairro"
            value={data.bairro}
            onChange={(v) => onChange('bairro', v)}
            placeholder="Bairro"
          />
          <FieldInput
            label="Cidade"
            value={data.cidade}
            onChange={(v) => onChange('cidade', v)}
            placeholder="Cidade"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FieldInput
          label="RG"
          value={data.rg}
          onChange={(v) => onChange('rg', v)}
          placeholder="00.000.000-0"
        />
        <FieldInput
          label="CPF"
          value={data.cpf}
          onChange={(v) => onChange('cpf', v)}
          placeholder="000.000.000-00"
          inputMode="numeric"
        />
      </div>

      <RadioGroup
        value={data.naipe}
        onChange={(v) => onChange('naipe', v)}
        className="flex flex-col gap-2"
        isRequired
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Naipe <span className="text-[var(--brand)]">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {['Soprano', 'Contralto', 'Mezzo-soprano', 'Tenor', 'Barítono', 'Baixo', 'Ainda não definido'].map((n) => (
            <RadioOption key={n} value={n.toLowerCase()}>{n}</RadioOption>
          ))}
          <RadioOption value="outro">Outro</RadioOption>
        </div>
      </RadioGroup>
      {data.naipe === 'outro' && (
        <FieldInput
          label="Especifique o naipe"
          value={data.naipeOutro}
          onChange={(v) => onChange('naipeOutro', v)}
          placeholder="Seu naipe"
        />
      )}

      <RadioGroup
        value={data.tempoCoral}
        onChange={(v) => onChange('tempoCoral', v)}
        className="flex flex-col gap-2"
        isRequired
      >
        <Label className="text-sm font-medium text-[var(--text)]">
          Há quanto tempo você participa do coral? <span className="text-[var(--brand)]">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {['Menos de 6 meses', '6 meses a 1 ano', '1 a 3 anos', '3 a 5 anos', 'Mais de 5 anos'].map((t) => (
            <RadioOption key={t} value={t}>{t}</RadioOption>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
