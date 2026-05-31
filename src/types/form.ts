export interface QuestionnaireData {
  // 1. Identificação básica
  fotoUrl: string;
  nomeCompleto: string;
  nomeArtistico: string;
  nomeArtisticoIgualNome: string;
  rgCpfUnificados: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  rg: string;
  cpf: string;
  naipe: string;
  naipeOutro: string;
  tempoCoral: string;

  // 2. Escolaridade e formação
  escolaridade: string;
  formacaoMusical: string;
  formacaoMusicalOutro: string;
  leituraPartitura: string;

  // 3. Trabalho e renda
  situacaoTrabalho: string;
  situacaoTrabalhoOutro: string;
  areaAtuacao: string;
  rendaFamiliar: string;
  pessoasDependentes: string;

  // 4. Transporte e deslocamento
  meioTransporte: string[];
  meioTransporteOutro: string;
  custoDeslocamento: string;
  tempoDeslocamento: string;

  // 5. Acesso à tecnologia
  acessoInternet: string;
  possuiSmartphone: string;
  facilidadeApps: string;

  // 6. Participação cultural
  outrasAtividades: string[];
  outrasAtividadesOutro: string;
  frequenciaEventos: string;
  custoDificultaEventos: string;

  // 7. Necessidades e apoio
  dificuldadeCustos: string;
  custosImpactam: string[];
  custosImpactamOutro: string;
  interesseApoio: string;

  // 8. Disponibilidade
  diasDisponiveis: string[];
  periodoViavel: string[];
  rotinaDificulta: string;

  // 9. Inclusão e acessibilidade
  necessidadesAcessibilidade: string[];
  necessidadesAcessibilidadeOutra: string;
  melhoriaParticipacao: string;

  // 10. Perguntas abertas
  motivacao: string;
  maioresDificuldades: string;
  tipoApoio: string;
  informacoesAdicionais: string;
}

export const defaultFormData: QuestionnaireData = {
  fotoUrl: '',
  nomeCompleto: '',
  nomeArtistico: '',
  nomeArtisticoIgualNome: '',
  rgCpfUnificados: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  rg: '',
  cpf: '',
  naipe: '',
  naipeOutro: '',
  tempoCoral: '',
  escolaridade: '',
  formacaoMusical: '',
  formacaoMusicalOutro: '',
  leituraPartitura: '',
  situacaoTrabalho: '',
  situacaoTrabalhoOutro: '',
  areaAtuacao: '',
  rendaFamiliar: '',
  pessoasDependentes: '',
  meioTransporte: [],
  meioTransporteOutro: '',
  custoDeslocamento: '',
  tempoDeslocamento: '',
  acessoInternet: '',
  possuiSmartphone: '',
  facilidadeApps: '',
  outrasAtividades: [],
  outrasAtividadesOutro: '',
  frequenciaEventos: '',
  custoDificultaEventos: '',
  dificuldadeCustos: '',
  custosImpactam: [],
  custosImpactamOutro: '',
  interesseApoio: '',
  diasDisponiveis: [],
  periodoViavel: [],
  rotinaDificulta: '',
  necessidadesAcessibilidade: [],
  necessidadesAcessibilidadeOutra: '',
  melhoriaParticipacao: '',
  motivacao: '',
  maioresDificuldades: '',
  tipoApoio: '',
  informacoesAdicionais: '',
};

export interface StepProps {
  data: QuestionnaireData;
  onChange: (field: keyof QuestionnaireData, value: string | string[]) => void;
}

export const STEPS = [
  { number: 1, title: 'Identificação', icon: '👤' },
  { number: 2, title: 'Formação', icon: '🎓' },
  { number: 3, title: 'Trabalho', icon: '💼' },
  { number: 4, title: 'Transporte', icon: '🚌' },
  { number: 5, title: 'Tecnologia', icon: '📱' },
  { number: 6, title: 'Cultura', icon: '🎭' },
  { number: 7, title: 'Apoio', icon: '🤝' },
  { number: 8, title: 'Disponibilidade', icon: '📅' },
  { number: 9, title: 'Acessibilidade', icon: '♿' },
  { number: 10, title: 'Perguntas abertas', icon: '💬' },
];
