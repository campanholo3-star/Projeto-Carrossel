import { TemplateMeta } from './types'

export const templates: TemplateMeta[] = [
  {
    id: 'capa',
    name: 'Capa',
    description: 'Imagem full-bleed com título centralizado de impacto.',
    usaImagem: true,
    usaAutor: false,
  },
  {
    id: 'conteudo',
    name: 'Conteúdo',
    description: 'Padrão com título no topo, texto explicativo e imagem média.',
    usaImagem: true,
    usaAutor: false,
  },
  {
    id: 'lista',
    name: 'Lista',
    description: 'O texto é dividido em itens de lista.',
    usaImagem: false,
    usaAutor: false,
  },
  {
    id: 'citacao',
    name: 'Citação',
    description: 'Destaque para uma aspa e seu autor.',
    usaImagem: false,
    usaAutor: true,
  },
  {
    id: 'imagem',
    name: 'Imagem Destacada',
    description: 'Imagem gigante no topo com uma breve legenda embaixo.',
    usaImagem: true,
    usaAutor: false,
  },
  {
    id: 'cta',
    name: 'Chamada para Ação',
    description: 'Focado em conversão e botões simbólicos.',
    usaImagem: true, // Opcional, mas aceita
    usaAutor: false,
  }
]
