import { create } from 'zustand'
import { Project, Slide } from '@/types'

interface EditorState {
  project: Project | null
  currentSlideIndex: number
  isDirty: boolean
  isSaving: boolean
  
  // Actions
  loadProject: (project: Project) => void
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
  updateCurrentSlide: (slideUpdates: Partial<Slide>) => void
  setSaving: (status: boolean) => void
  markClean: () => void
  getCurrentSlide: () => Slide | null
  applyTemplateToAll: (template: 'capa' | 'conteudo' | 'lista' | 'citacao' | 'imagem' | 'cta') => void
}

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  currentSlideIndex: 0,
  isDirty: false,
  isSaving: false,

  loadProject: (project) => {
    set({
      project,
      currentSlideIndex: 0,
      isDirty: false,
      isSaving: false,
    })
  },

  nextSlide: () => {
    const { project, currentSlideIndex } = get()
    if (!project || !project.content?.slides) return
    
    if (currentSlideIndex < project.content.slides.length - 1) {
      set({ currentSlideIndex: currentSlideIndex + 1 })
    }
  },

  prevSlide: () => {
    const { currentSlideIndex } = get()
    if (currentSlideIndex > 0) {
      set({ currentSlideIndex: currentSlideIndex - 1 })
    }
  },

  goToSlide: (index) => {
    const { project } = get()
    if (!project || !project.content?.slides) return

    if (index >= 0 && index < project.content.slides.length) {
      set({ currentSlideIndex: index })
    }
  },

  updateCurrentSlide: (slideUpdates) => {
    const { project, currentSlideIndex } = get()
    if (!project || !project.content?.slides) return

    const slides = [...project.content.slides]
    
    // Atualiza apenas o slide no índice atual
    slides[currentSlideIndex] = {
      ...slides[currentSlideIndex],
      ...slideUpdates,
    }

    set({
      project: {
        ...project,
        content: {
          ...project.content,
          slides,
        },
      },
      isDirty: true,
    })
  },

  setSaving: (status) => set({ isSaving: status }),
  
  markClean: () => set({ isDirty: false }),

  getCurrentSlide: () => {
    const { project, currentSlideIndex } = get()
    if (!project || !project.content?.slides) return null
    return project.content.slides[currentSlideIndex] || null
  },

  applyTemplateToAll: (template) => {
    const { project } = get()
    if (!project || !project.content?.slides) return

    const slides = project.content.slides.map(slide => ({
      ...slide,
      template
    }))

    set({
      project: {
        ...project,
        content: {
          ...project.content,
          slides,
        },
      },
      isDirty: true,
    })
  },
}))
