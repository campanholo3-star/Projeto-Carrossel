"use client"

import React from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { SlideRenderer } from './templates/SlideRenderer'

export function HiddenRenderArea() {
  const project = useEditorStore(state => state.project)

  if (!project || !project.content?.slides || !project.content?.theme) {
    return null
  }

  const { slides, theme } = project.content

  return (
    <div 
      className="fixed left-[-9999px] top-0 pointer-events-none z-[-1]"
      aria-hidden="true"
    >
      {slides.map((slide, index) => (
        <div 
          key={slide.id || index}
          id={`export-slide-${index}`}
          className="relative flex overflow-hidden"
          style={{ 
            width: '1080px', 
            height: '1350px',
            backgroundColor: slide.suggestedBgColor || theme.backgroundColor || '#0F172A'
          }}
        >
          <SlideRenderer slide={slide} theme={theme} />
        </div>
      ))}
    </div>
  )
}
