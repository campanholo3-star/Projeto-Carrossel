"use client"

import { useEditorStore } from '@/stores/editorStore'
import { TemplatePicker } from './TemplatePicker'
import { BulkApplyButton } from './BulkApplyButton'

export function SlideSidebar() {
  const getCurrentSlide = useEditorStore(state => state.getCurrentSlide)
  const updateCurrentSlide = useEditorStore(state => state.updateCurrentSlide)
  
  const slide = getCurrentSlide()
  if (!slide) return null

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-bold text-white">Editar Slide</h2>

      {/* SEÇÃO 1: TEMPLATE */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Layout</h3>
        <TemplatePicker />
        <BulkApplyButton />
      </div>

      {/* SEÇÃO 2: CONTEÚDO */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Conteúdo</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Título</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            value={slide.title || ''}
            onChange={(e) => updateCurrentSlide({ title: e.target.value })}
            placeholder="Título impactante..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">Texto (Body)</label>
          <textarea
            className="w-full h-32 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
            value={slide.body || ''}
            onChange={(e) => updateCurrentSlide({ body: e.target.value })}
            placeholder="Escreva o texto principal..."
          />
        </div>

        {slide.template === 'citacao' && (
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Autor da Citação</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              value={slide.author || ''}
              onChange={(e) => updateCurrentSlide({ author: e.target.value })}
              placeholder="Nome do autor..."
            />
          </div>
        )}
      </div>

      {/* SEÇÃO 3: IMAGEM */}
      <div className="space-y-4 pt-6 border-t border-slate-800">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Imagem e Fundo</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">URL da Imagem</label>
          <input
            type="url"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            value={slide.imageUrl || ''}
            onChange={(e) => updateCurrentSlide({ imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-400 mb-1">Cor de Fundo Opcional</label>
           <div className="flex items-center gap-3">
             <input
               type="color"
               className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
               value={slide.suggestedBgColor || '#1E293B'}
               onChange={(e) => updateCurrentSlide({ suggestedBgColor: e.target.value })}
             />
             <span className="text-slate-300 font-mono text-sm uppercase">
               {slide.suggestedBgColor || 'Global Theme'}
             </span>
           </div>
        </div>
      </div>
    </div>
  )
}
