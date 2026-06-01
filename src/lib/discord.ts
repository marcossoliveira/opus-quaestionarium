import type { QuestionnaireData } from '@/types/form';

const COLOR = 0x4206e3;

const v = (s?: string) => (s ?? '').trim();

// Select com opção "outro": usa o texto livre quando o valor for 'outro'.
const sel = (value: string, outro: string) => (value === 'outro' ? v(outro) : v(value));

// Lista de checkboxes + eventual texto livre de "outro".
const arr = (a: string[], outro?: string) => {
  const items = (a || []).map(v).filter(Boolean);
  const o = v(outro);
  if (o && !items.includes(o)) items.push(o);
  return items.join(', ');
};

type Item = [name: string, value: string];
type Group = { header: string; items: Item[]; block?: boolean };

interface Embed {
  title?: string;
  description?: string;
  color: number;
  fields: { name: string; value: string; inline: boolean }[];
  image?: { url: string };
  footer?: { text: string };
  timestamp?: string;
}

function buildFields(groups: Group[]) {
  const fields: Embed['fields'] = [];
  for (const g of groups) {
    const present = g.items.filter(([, val]) => v(val));
    if (!present.length) continue;
    fields.push({ name: '​', value: `**— ${g.header} —**`, inline: false });
    for (const [name, val] of present) {
      const value = val.length > 1024 ? `${val.slice(0, 1021)}…` : val;
      fields.push({ name, value, inline: !g.block });
    }
  }
  return fields;
}

export async function sendDiscordNotification(data: QuestionnaireData): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const naipe = sel(data.naipe, data.naipeOutro);
  const artistico =
    v(data.nomeArtistico) && data.nomeArtistico !== data.nomeCompleto ? v(data.nomeArtistico) : '';
  const documento: Item[] =
    data.rgCpfUnificados === 'sim'
      ? [['🪪 Documento (CIN/CPF)', v(data.cpf)]]
      : [['🪪 RG', v(data.rg)], ['🪪 CPF', v(data.cpf)]];
  const endereco =
    [v(data.rua), v(data.numero)].filter(Boolean).join(', ') +
    (v(data.complemento) ? ` — ${v(data.complemento)}` : '');
  const cidadeEstado = [v(data.cidade), v(data.estado)].filter(Boolean).join(' / ');

  // ── Embed 1: identificação + foto ──
  const embed1: Embed = {
    title: '📋 Novo Questionário Socioeconômico',
    description:
      `Um novo coralista respondeu o questionário socioeconômico do **Coral Opus Liberi**.\n\n` +
      `> As informações são confidenciais e destinadas exclusivamente à diretoria.`,
    color: COLOR,
    fields: buildFields([
      {
        header: 'Identificação',
        items: [
          ['👤 Nome completo', v(data.nomeCompleto)],
          ['🎭 Nome artístico', artistico],
          ['🎵 Naipe', naipe],
          ['🗓️ Tempo no coral', v(data.tempoCoral)],
          ...documento,
          ['📮 CEP', v(data.cep)],
          ['🏠 Endereço', endereco],
          ['🏘️ Bairro', v(data.bairro)],
          ['📍 Cidade / Estado', cidadeEstado],
        ],
      },
    ]),
    ...(v(data.fotoUrl) ? { image: { url: data.fotoUrl } } : {}),
  };

  // ── Embed 2: formação, trabalho, transporte, tecnologia ──
  const embed2: Embed = {
    color: COLOR,
    fields: buildFields([
      {
        header: 'Formação',
        items: [
          ['🎓 Escolaridade', v(data.escolaridade)],
          ['🎼 Formação musical', sel(data.formacaoMusical, data.formacaoMusicalOutro)],
          ['📄 Leitura de partitura', v(data.leituraPartitura)],
        ],
      },
      {
        header: 'Trabalho & Renda',
        items: [
          ['💼 Situação de trabalho', sel(data.situacaoTrabalho, data.situacaoTrabalhoOutro)],
          ['🏢 Área de atuação', v(data.areaAtuacao)],
          ['💰 Renda familiar', v(data.rendaFamiliar)],
          ['👨‍👩‍👧 Dependentes', v(data.pessoasDependentes)],
        ],
      },
      {
        header: 'Transporte',
        items: [
          ['🚌 Meio de transporte', arr(data.meioTransporte, data.meioTransporteOutro)],
          ['⏱️ Tempo de deslocamento', v(data.tempoDeslocamento)],
          ['💸 Custo dificulta?', v(data.custoDeslocamento)],
        ],
      },
      {
        header: 'Tecnologia',
        items: [
          ['🌐 Acesso à internet', v(data.acessoInternet)],
          ['📱 Possui smartphone', v(data.possuiSmartphone)],
          ['📲 Facilidade com apps', v(data.facilidadeApps)],
        ],
      },
    ]),
  };

  // ── Embed 3: cultura, disponibilidade, necessidades, acessibilidade ──
  const embed3: Embed = {
    color: COLOR,
    fields: buildFields([
      {
        header: 'Participação Cultural',
        items: [
          ['🎭 Outras atividades', arr(data.outrasAtividades, data.outrasAtividadesOutro)],
          ['🎟️ Frequência em eventos', v(data.frequenciaEventos)],
          ['💸 Custo dificulta acesso', v(data.custoDificultaEventos)],
        ],
      },
      {
        header: 'Disponibilidade',
        items: [
          ['📅 Dias disponíveis', arr(data.diasDisponiveis)],
          ['🕐 Período preferido', arr(data.periodoViavel)],
          ['🔄 Rotina dificulta?', v(data.rotinaDificulta)],
        ],
      },
      {
        header: 'Necessidades & Apoio',
        items: [
          ['🤝 Dificuldade com custos', v(data.dificuldadeCustos)],
          ['💳 Custos que impactam', arr(data.custosImpactam, data.custosImpactamOutro)],
          ['📌 Interesse em apoio', v(data.interesseApoio)],
        ],
      },
      {
        header: 'Inclusão & Acessibilidade',
        items: [
          ['♿ Necessidades', arr(data.necessidadesAcessibilidade, data.necessidadesAcessibilidadeOutra)],
          ['💡 Sugestões de melhoria', v(data.melhoriaParticipacao)],
        ],
      },
    ]),
  };

  // ── Embed 4: perguntas abertas (texto longo, largura total) ──
  const embed4: Embed = {
    color: COLOR,
    fields: buildFields([
      {
        header: 'Perguntas Abertas',
        block: true,
        items: [
          ['💬 Motivação', v(data.motivacao)],
          ['🧩 Maiores dificuldades', v(data.maioresDificuldades)],
          ['🙌 Tipo de apoio desejado', v(data.tipoApoio)],
          ['📝 Informações adicionais', v(data.informacoesAdicionais)],
        ],
      },
    ]),
    footer: { text: 'Coral Opus Liberi • Codex Liberi' },
    timestamp: new Date().toISOString(),
  };

  // Mantém só embeds com conteúdo; garante footer/timestamp no último.
  const candidates = [embed1, embed2, embed3, embed4];
  const embeds = candidates.filter((e) => e.fields.length > 0 || e.image);
  const last = embeds[embeds.length - 1];
  if (last && last !== embed4) {
    last.footer = embed4.footer;
    last.timestamp = embed4.timestamp;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '@diretoria', embeds }),
    });
  } catch (err) {
    // Notificação não deve derrubar o envio: o questionário já foi salvo.
    console.error('Falha ao notificar o Discord:', err);
  }
}
