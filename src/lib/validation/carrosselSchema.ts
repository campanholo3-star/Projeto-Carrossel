import { z } from 'zod'

const hexColorRegex = /^#([0-9A-Fa-f]{6})$/
const colorErrorMsg = 'Cor inválida, use o formato #RRGGBB'

export const themeSchema = z.object({
  primaryColor: z.string().regex(hexColorRegex, colorErrorMsg),
  accentColor: z.string().regex(hexColorRegex, colorErrorMsg),
  backgroundColor: z.string().regex(hexColorRegex, colorErrorMsg),
  fontFamily: z.string().min(1, 'A fonte principal é obrigatória'),
  fontHeading: z.string().min(1, 'A fonte de título é obrigatória'),
})

export const slideSchema = z.object({
  index: z.number().min(0, 'O índice não pode ser negativo'),
  type: z.enum(['cover', 'content', 'cta'], {
    message: 'Tipo de slide inválido (use cover, content ou cta)',
  }),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  body: z.string().nullable().optional(),
  brandHandle: z.string().nullable().optional(),
  suggestedBgColor: z.string().regex(hexColorRegex, colorErrorMsg).nullable().optional(),
  imagePrompt: z.string().min(1, 'O imagePrompt é obrigatório para cada slide'),
  imageStyle: z.string().nullable().optional(),
  referenceSuggestion: z.string().nullable().optional(),
  imageUrl: z.string().url('URL de imagem inválida').nullable().optional(),
  imageFit: z.enum(['cover', 'contain', 'fill']).nullable().optional(),
  icon: z.string().nullable().optional(),
  layout: z.enum(['center', 'top', 'bottom', 'split']).optional(),
  template: z.enum(['capa', 'conteudo', 'lista', 'citacao', 'imagem', 'cta']).default('conteudo'),
  author: z.string().nullable().optional(),
  fontSettings: z.object({
    titleSize: z.string().optional(),
    bodySize: z.string().optional(),
    titleColor: z.string().regex(hexColorRegex, colorErrorMsg).optional(),
    bodyColor: z.string().regex(hexColorRegex, colorErrorMsg).optional(),
  }).nullable().optional(),
})

export const carrosselSchema = z.object({
  version: z.string().min(1, 'A versão é obrigatória'),
  title: z.string().min(1, 'O título é obrigatório'),
  source_url: z.string().url('URL fonte inválida').nullable().optional(),
  language: z.string().default('pt-BR'),
  theme: themeSchema,
  slides: z.array(slideSchema).min(1, 'O carrossel deve conter pelo menos 1 slide'),
})

export type CarrosselInput = z.infer<typeof carrosselSchema>
export type ThemeInput = z.infer<typeof themeSchema>
export type SlideInput = z.infer<typeof slideSchema>
