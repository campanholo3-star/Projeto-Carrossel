export type Role = 'free' | 'admin'
export type ProjectStatus = 'draft' | 'done'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: Role
  created_at: string
}

export interface Template {
  id: string
  name: string
  is_premium: boolean
  config: Record<string, unknown> // Estilos do template
  thumbnail_url: string | null
  created_at: string
}

export interface Project {
  id: string
  user_id: string
  title: string
  source_url: string | null
  template_id: string | null
  content: Record<string, unknown> // Será do tipo CarrosselInput após validação
  brand_handle: string | null
  keywords: string[]
  language: string
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export interface ProjectImage {
  id: string
  project_id: string
  storage_path: string
  slide_index: number
  created_at: string
}

// JSON Skill Types
export type SlideType = 'cover' | 'content' | 'cta'
export type Layout = 'center' | 'top' | 'bottom' | 'split'

export interface Theme {
  primaryColor: string
  accentColor: string
  backgroundColor: string
  fontFamily: string
  fontHeading: string
}

export interface Slide {
  index: number
  type: SlideType
  title?: string | null
  subtitle?: string | null
  body?: string | null
  brandHandle?: string | null
  suggestedBgColor?: string | null
  imagePrompt: string
  imageStyle?: string | null
  referenceSuggestion?: string | null
  imageUrl?: string | null
  layout: Layout
}

export interface CarrosselData {
  version: string
  title: string
  source_url?: string | null
  language: string
  theme: Theme
  slides: Slide[]
}
