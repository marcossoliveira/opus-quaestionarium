import type { QuestionnaireData } from '@/types/form';

function field(name: string, value: string, inline = true) {
  return { name, value: value || '—', inline };
}

export async function sendDiscordNotification(data: QuestionnaireData): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const naipeDisplay = data.naipe === 'outro' && data.naipeOutro
    ? data.naipeOutro
    : data.naipe;

  const payload = {
    content: '@diretoria',
    embeds: [
      {
        title: '📋 Novo Questionário Socioeconômico',
        description:
          `Um novo coralista respondeu o questionário socioeconômico do **Coral Opus Liberi**.\n\n` +
          `> As informações são confidenciais e destinadas exclusivamente à diretoria.`,
        color: 0x4206e3,
        fields: [
          field('👤 Nome completo', data.nomeCompleto),
          field('🎵 Naipe', naipeDisplay),
          field('🗓️ Tempo no coral', data.tempoCoral),
          field('📍 Cidade', data.cidade || `${data.cep}`),
          { name: '​', value: '**— Formação —**', inline: false },
          field('🎓 Escolaridade', data.escolaridade),
          field('🎼 Formação musical', data.formacaoMusical === 'outro' ? data.formacaoMusicalOutro : data.formacaoMusical),
          field('📄 Leitura de partitura', data.leituraPartitura),
          { name: '​', value: '**— Trabalho & Renda —**', inline: false },
          field('💼 Situação de trabalho', data.situacaoTrabalho === 'outro' ? data.situacaoTrabalhoOutro : data.situacaoTrabalho),
          field('💰 Renda familiar', data.rendaFamiliar),
          field('👨‍👩‍👧 Dependentes', data.pessoasDependentes),
          { name: '​', value: '**— Transporte —**', inline: false },
          field('🚌 Meio de transporte', data.meioTransporte.join(', ')),
          field('⏱️ Tempo de deslocamento', data.tempoDeslocamento),
          field('💸 Custo dificulta?', data.custoDeslocamento),
          { name: '​', value: '**— Disponibilidade —**', inline: false },
          field('📅 Dias disponíveis', data.diasDisponiveis.join(', ')),
          field('🕐 Período preferido', data.periodoViavel.join(', ')),
          { name: '​', value: '**— Necessidades —**', inline: false },
          field('🤝 Dificuldade com custos', data.dificuldadeCustos),
          field('📌 Interesse em apoio', data.interesseApoio),
        ],
        footer: {
          text: 'Coral Opus Liberi • Codex Liberi',
        },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
