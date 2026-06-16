import { Slide, Theme } from '@/types'

export type TemplateId = 'capa' | 'conteudo' | 'lista' | 'citacao' | 'imagem' | 'cta'

export interface TemplateMeta {
  id: TemplateId
  name: string
  description: string
  usaImagem: boolean
  usaAutor: boolean
}

export interface TemplateProps {
  slide: Slide
  theme: Theme
}
