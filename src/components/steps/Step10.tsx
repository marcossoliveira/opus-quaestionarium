'use client';

import { FieldTextArea } from '@/components/ui/FieldTextArea';
import type { StepProps } from '@/types/form';

export function Step10({ data, onChange }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <FieldTextArea
        label="O que mais motiva você a participar do coral?"
        value={data.motivacao}
        onChange={(v) => onChange('motivacao', v)}
        placeholder="Compartilhe suas motivações…"
        rows={4}
      />

      <FieldTextArea
        label="Quais são as maiores dificuldades para sua permanência no coral?"
        value={data.maioresDificuldades}
        onChange={(v) => onChange('maioresDificuldades', v)}
        placeholder="Descreva as dificuldades…"
        rows={4}
      />

      <FieldTextArea
        label="Que tipo de apoio ou melhoria você acredita que o coral poderia oferecer aos participantes?"
        value={data.tipoApoio}
        onChange={(v) => onChange('tipoApoio', v)}
        placeholder="Suas sugestões são muito bem-vindas…"
        rows={4}
      />

      <FieldTextArea
        label="Deseja acrescentar alguma informação socioeconômica, familiar, profissional ou pessoal que considere importante?"
        value={data.informacoesAdicionais}
        onChange={(v) => onChange('informacoesAdicionais', v)}
        placeholder="Informações adicionais (opcional)…"
        rows={4}
      />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--brand-subtle)] px-4 py-3">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          🔒 <strong>Privacidade:</strong> Suas informações serão utilizadas exclusivamente para fins
          administrativos e institucionais do Coro Opus Liberi, em conformidade com a LGPD.
          Informações sensíveis (renda, acessibilidade) são tratadas com confidencialidade.
        </p>
      </div>
    </div>
  );
}
