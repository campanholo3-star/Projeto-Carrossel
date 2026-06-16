"use client"

import { useEditorStore } from '@/stores/editorStore'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function SlideNavigator() {
  const project = useEditorStore(state => state.project)
  const currentSlideIndex = useEditorStore(state => state.currentSlideIndex)
  const nextSlide = useEditorStore(state => state.nextSlide)
  const prevSlide = useEditorStore(state => state.prevSlide)

  if (!project || !project.content) return null
  
  const slides = project.content.slides || []
  const total = slides.length

  return (
    <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
      <button 
        onClick={prevSlide}
        disabled={currentSlideIndex === 0}
        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <span className="text-sm font-medium text-slate-300 min-w-[5rem] text-center">
        {currentSlideIndex + 1} / {total}
      </span>

      <button 
        onClick={nextSlide}
        disabled={currentSlideIndex === total - 1}
        className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
