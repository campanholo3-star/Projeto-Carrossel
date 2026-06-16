import { Slide, Theme } from '@/types'
import { TemplateCapa } from './TemplateCapa'
import { TemplateConteudo } from './TemplateConteudo'
import { TemplateLista } from './TemplateLista'
import { TemplateCitacao } from './TemplateCitacao'
import { TemplateImagem } from './TemplateImagem'
import { TemplateCTA } from './TemplateCTA'

interface SlideRendererProps {
  slide: Slide
  theme: Theme
}

export function SlideRenderer({ slide, theme }: SlideRendererProps) {
  const templateType = slide.template || 'conteudo' // fallback seguro

  switch (templateType) {
    case 'capa':
      return <TemplateCapa slide={slide} theme={theme} />
    case 'conteudo':
      return <TemplateConteudo slide={slide} theme={theme} />
    case 'lista':
      return <TemplateLista slide={slide} theme={theme} />
    case 'citacao':
      return <TemplateCitacao slide={slide} theme={theme} />
    case 'imagem':
      return <TemplateImagem slide={slide} theme={theme} />
    case 'cta':
      return <TemplateCTA slide={slide} theme={theme} />
    default:
      return <TemplateConteudo slide={slide} theme={theme} />
  }
}
