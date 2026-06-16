"use client"

import { useRef, useState } from 'react'
import { useEditorStore } from '@/stores/editorStore'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'
import { toast } from 'sonner'
import { SlideRenderer } from './templates/SlideRenderer'

export function SlidePreview() {
  const project = useEditorStore(state => state.project)
  const getCurrentSlide = useEditorStore(state => state.getCurrentSlide)
  const currentSlideIndex = useEditorStore(state => state.currentSlideIndex)
  
  const slideRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  if (!project || !project.content) return null
  const theme = project.content.theme
  const slide = getCurrentSlide()
  
  if (!slide) return null

  // Fallbacks usando o theme raiz, ou defaults do app
  const bgColor = slide.suggestedBgColor || theme?.backgroundColor || '#1E293B'

  const handleExport = async () => {
    if (!slideRef.current) return

    try {
      setIsExporting(true)
      const dataUrl = await toPng(slideRef.current, {
        cacheBust: true,
        pixelRatio: 2, // Garante alta resolução
        backgroundColor: bgColor, // Força a cor de fundo no Canvas final por segurança
        skipFonts: false, // Força a engine a buscar e embutir as Web Fonts (Next.js/Google Fonts)
      })

      const link = document.createElement('a')
      link.download = `slide-${currentSlideIndex + 1}.png`
      link.href = dataUrl
      link.click()

      toast.success('Slide exportado com sucesso!')
    } catch (err) {
      console.error('Erro ao exportar slide:', err)
      toast.error('Ocorreu um erro ao exportar a imagem.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* 
        Container proporção 4:5 típica de redes sociais (ex: 1080x1350)
      */}
      <div 
        ref={slideRef}
        className="relative w-full max-w-md aspect-[4/5] overflow-hidden flex flex-col transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <SlideRenderer slide={slide} theme={theme} />
      </div>

      {/* Botões de Ação Visual */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-200 text-black font-semibold rounded-full shadow-lg transition-colors disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          {isExporting ? 'Processando...' : 'Baixar Slide (PNG)'}
        </button>

        <div className="text-slate-500 text-sm flex gap-4">
          <span>Tipo: <span className="text-slate-300 uppercase">{slide.type}</span></span>
          <span>Layout: <span className="text-slate-300 uppercase">{slide.layout}</span></span>
        </div>
      </div>
    </div>
  )
}
