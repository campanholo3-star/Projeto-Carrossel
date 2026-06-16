import { useEditorStore } from '@/stores/editorStore'
import { Layers } from 'lucide-react'
import { toast } from 'sonner'

export function BulkApplyButton() {
  const currentSlide = useEditorStore(state => state.getCurrentSlide())
  const applyTemplateToAll = useEditorStore(state => state.applyTemplateToAll)

  if (!currentSlide) return null

  const handleBulkApply = () => {
    const template = currentSlide.template || 'conteudo'
    if (confirm(`Aplicar o template "${template}" a TODOS os slides? Isso mudará a estrutura de todos eles.`)) {
      applyTemplateToAll(template)
      toast.success('Template aplicado a todos os slides!')
    }
  }

  return (
    <button
      onClick={handleBulkApply}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
    >
      <Layers className="w-4 h-4" />
      Aplicar a Todos os Slides
    </button>
  )
}
