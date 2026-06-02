'use client';

import { useEffect, useRef, useState } from 'react';
import { Checkbox, RadioGroup, Label } from 'react-aria-components';
import { FieldInput } from '@/components/ui/FieldInput';
import { RadioOption } from '@/components/ui/RadioOption';
import { uploadPhoto } from '@/lib/upload';
import type { StepProps } from '@/types/form';

const MESES: [string, string][] = [
  ['01', 'Janeiro'], ['02', 'Fevereiro'], ['03', 'Março'], ['04', 'Abril'],
  ['05', 'Maio'], ['06', 'Junho'], ['07', 'Julho'], ['08', 'Agosto'],
  ['09', 'Setembro'], ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro'],
];
const ANO_ATUAL = new Date().getFullYear();
const ANOS = Array.from({ length: ANO_ATUAL - 1980 + 1 }, (_, i) => String(ANO_ATUAL - i));

const selectClass =
  'w-full min-w-0 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] ' +
  'text-sm text-[var(--text)] outline-none transition-all ' +
  'focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-2 focus:ring-offset-[var(--card)]';

// ─── Inline checkbox (para opções de conveniência) ───────────────────────────

function InlineCheckbox({
  isSelected,
  onChange,
  children,
}: {
  isSelected: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Checkbox
      isSelected={isSelected}
      onChange={onChange}
      className="group flex items-center gap-2.5 cursor-pointer outline-none w-fit"
    >
      <div
        className="w-4 h-4 rounded border-2 border-[var(--border)] flex items-center justify-center
          flex-shrink-0 transition-all
          group-data-[selected]:border-[var(--brand)] group-data-[selected]:bg-[var(--brand)]
          group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-[var(--brand)]
          group-data-[focus-visible]:ring-offset-2 group-data-[focus-visible]:ring-offset-[var(--card)]"
      >
        <svg viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth={1.8}
          className="w-2.5 h-2 opacity-0 group-data-[selected]:opacity-100 transition-opacity">
          <polyline points="1,4 4,7 9,1" />
        </svg>
      </div>
      <span className="text-sm text-[var(--text-secondary)] leading-snug">{children}</span>
    </Checkbox>
  );
}

// ─── Photo picker ─────────────────────────────────────────────────────────────

function PhotoUpload({
  fotoUrl,
  onChange,
}: {
  fotoUrl: string;
  onChange: (url: string) => void;
}) {
  const [preview, setPreview] = useState(fotoUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (fotoUrl && fotoUrl !== preview) setPreview(fotoUrl);
  }, [fotoUrl]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('A foto deve ter no máximo 5 MB.'); return; }

    const blobUrl = URL.createObjectURL(file);
    setPreview(blobUrl);
    setError('');
    setUploading(true);

    try {
      const downloadUrl = await uploadPhoto(file);
      onChange(downloadUrl);
      URL.revokeObjectURL(blobUrl);
      setPreview(downloadUrl);
    } catch (err) {
      console.error('Falha no upload da foto:', err);
      setError('Erro ao enviar a foto. Tente novamente.');
      setPreview('');
      onChange('');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    setPreview('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {!preview && !uploading && (
        <div className="text-center">
          <p className="text-base font-semibold text-[var(--text)]">📸 Bora colocar uma foto sua?</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Assim a gente consegue te conhecer melhor 💜{' '}
            <span className="text-[var(--text-muted)]">(opcional)</span>
          </p>
        </div>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label={preview ? 'Alterar foto de perfil' : 'Adicionar foto de perfil'}
          className={`relative w-32 h-32 rounded-full overflow-hidden transition-all duration-200 group
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]
            focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)]
            ${preview
              ? 'border-2 border-dashed border-[var(--border)] hover:border-[var(--brand)]'
              : 'border-2 border-[var(--brand)] photo-glow'
            }`}
          disabled={uploading}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5
              bg-[var(--card-soft)] group-hover:bg-[var(--brand-subtle)] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}
                className="w-10 h-10 text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span className="text-xs font-medium text-[var(--text-muted)] group-hover:text-[var(--brand)] transition-colors">
                Adicionar
              </span>
            </div>
          )}
          {preview && !uploading && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
              transition-opacity flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-8 h-8">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <svg className="w-8 h-8 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                  strokeDasharray="62" strokeDashoffset="20" />
              </svg>
            </div>
          )}
        </button>

        {preview && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remover foto"
            className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full
              bg-[var(--card)] border border-[var(--border)]
              flex items-center justify-center shadow-sm
              hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              className="w-3 h-3 text-[var(--text-muted)]">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="text-center">
        {(uploading || preview) && (
          <p className="text-xs text-[var(--text-secondary)]">
            {uploading ? 'Enviando foto…' : 'Clique para alterar'}
          </p>
        )}
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>

      {!preview && !uploading && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => cameraRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)]
              text-xs text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Tirar foto
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)]
              text-xs text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)]
              transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Galeria
          </button>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />
      <input ref={cameraRef} type="file" accept="image/*" capture="user" className="sr-only" onChange={handleFile} />
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

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
        if (json.erro) { setCepError('CEP não encontrado.'); return; }
        onChange('rua', json.logradouro || '');
        onChange('bairro', json.bairro || '');
        onChange('cidade', json.localidade || '');
        onChange('estado', json.uf || '');
      })
      .catch(() => setCepError('Erro ao buscar CEP.'))
      .finally(() => setCepLoading(false));
  }, [data.cep, onChange]);

  function formatCep(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  }

  function formatTelefone(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : '';
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  const nomeIgual = data.nomeArtisticoIgualNome === 'sim';
  const unificado = data.rgCpfUnificados === 'sim';
  const [anoCoral = '', mesCoral = ''] = (data.tempoCoral || '').split('-');

  return (
    <div className="flex flex-col gap-6">

      {/* Foto */}
      <PhotoUpload fotoUrl={data.fotoUrl} onChange={(url) => onChange('fotoUrl', url)} />

      <div className="border-t border-[var(--border)]" />

      {/* Nome completo */}
      <FieldInput
        label="Nome completo"
        value={data.nomeCompleto}
        onChange={(v) => onChange('nomeCompleto', v)}
        placeholder="Seu nome completo"
        isRequired
      />

      {/* Nome artístico */}
      <div className="flex flex-col gap-3">
        <InlineCheckbox
          isSelected={nomeIgual}
          onChange={(checked) => {
            onChange('nomeArtisticoIgualNome', checked ? 'sim' : '');
            onChange('nomeArtistico', checked ? data.nomeCompleto : '');
          }}
        >
          Usar meu nome completo como nome artístico
        </InlineCheckbox>
        {!nomeIgual && (
          <FieldInput
            label="Nome artístico"
            value={data.nomeArtistico}
            onChange={(v) => onChange('nomeArtistico', v)}
            placeholder="Nome pelo qual é conhecido(a) no coral"
            description="Como prefere ser chamado(a) nas apresentações"
          />
        )}
      </div>

      {/* E-mail */}
      <FieldInput
        label="E-mail"
        value={data.email}
        onChange={(v) => onChange('email', v)}
        placeholder="seu@email.com"
        type="email"
        inputMode="email"
        isRequired
      />

      {/* Telefone */}
      <FieldInput
        label="Telefone (com DDD)"
        value={data.telefone}
        onChange={(v) => onChange('telefone', formatTelefone(v))}
        placeholder="(00) 00000-0000"
        inputMode="tel"
        maxLength={16}
        isRequired
      />

      {/* Endereço */}
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

        {/* Rua + Número: flex para evitar overflow */}
        <div className="flex gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <FieldInput
              label="Rua / Logradouro"
              value={data.rua}
              onChange={(v) => onChange('rua', v)}
              placeholder="Nome da rua"
            />
          </div>
          <div className="w-24 flex-shrink-0">
            <FieldInput
              label="Número"
              value={data.numero}
              onChange={(v) => onChange('numero', v)}
              placeholder="Nº"
            />
          </div>
        </div>

        <FieldInput
          label="Complemento"
          value={data.complemento}
          onChange={(v) => onChange('complemento', v)}
          placeholder="Apto, bloco… (opcional)"
        />

        {/* Bairro + Cidade */}
        <div className="grid grid-cols-2 gap-3 [&>*]:min-w-0">
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

      {/* Documentos */}
      <div className="flex flex-col gap-3">
        <InlineCheckbox
          isSelected={unificado}
          onChange={(checked) => {
            onChange('rgCpfUnificados', checked ? 'sim' : '');
            if (checked) onChange('cpf', '');
          }}
        >
          Já possuo a CIN — informarei apenas este documento (número igual ao CPF)
        </InlineCheckbox>

        {unificado ? (
          <FieldInput
            label="Número do CIN / CPF"
            value={data.cpf}
            onChange={(v) => onChange('cpf', v)}
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        ) : (
          <div className="flex flex-col gap-4">
            <FieldInput
              label="CPF"
              value={data.cpf}
              onChange={(v) => onChange('cpf', v)}
              placeholder="000.000.000-00"
              inputMode="numeric"
            />
            <FieldInput
              label="RG"
              description="Informe também o órgão emissor e o estado. Ex: 1.234.567 SPTC-ES"
              value={data.rg}
              onChange={(v) => onChange('rg', v)}
              placeholder="1.234.567 SPTC-ES"
            />
          </div>
        )}
      </div>

      {/* Naipe */}
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

      {/* No coral desde (mês + ano) */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-[var(--text)]">
          Desde quando você participa do coral? <span className="text-[var(--brand)]">*</span>
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          Se não tiver certeza, informe uma data aproximada (mês e ano).
        </p>
        <div className="grid grid-cols-2 gap-3 [&>*]:min-w-0">
          <select
            aria-label="Mês de início no coral"
            value={mesCoral}
            onChange={(e) => onChange('tempoCoral', `${anoCoral}-${e.target.value}`)}
            className={selectClass}
          >
            <option value="">Mês</option>
            {MESES.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          <select
            aria-label="Ano de início no coral"
            value={anoCoral}
            onChange={(e) => onChange('tempoCoral', `${e.target.value}-${mesCoral}`)}
            className={selectClass}
          >
            <option value="">Ano</option>
            {ANOS.map((ano) => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>
        </div>
      </div>

    </div>
  );
}
