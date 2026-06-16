import { useEditorStore } from '@/stores/editorStore'
import { templates } from '@/lib/templates/definitions'
import { TemplateId } from '@/lib/templates/types'

export function TemplatePicker() {
  const currentSlide = useEditorStore(state => state.getCurrentSlide())
  const updateCurrentSlide = useEditorStore(state => state.updateCurrentSlide)

  if (!currentSlide) return null

  const activeTemplate = currentSlide.template || 'conteudo'

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {templates.map(tmpl => {
          const isActive = activeTemplate === tmpl.id
          
          return (
            <button
              key={tmpl.id}
              onClick={() => updateCurrentSlide({ template: tmpl.id as TemplateId })}
              className={`flex flex-col text-left p-3 rounded-xl border-2 transition-colors ${
                isActive 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="font-semibold text-white mb-1">{tmpl.name}</div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {tmpl.description}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
