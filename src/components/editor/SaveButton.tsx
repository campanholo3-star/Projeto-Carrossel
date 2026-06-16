"use client"

import { useEditorStore } from '@/stores/editorStore'
import { updateProject } from '@/lib/api/projects'
import { Save } from 'lucide-react'
import { toast } from 'sonner'

export function SaveButton() {
  const project = useEditorStore(state => state.project)
  const isDirty = useEditorStore(state => state.isDirty)
  const isSaving = useEditorStore(state => state.isSaving)
  const setSaving = useEditorStore(state => state.setSaving)
  const markClean = useEditorStore(state => state.markClean)

  const handleSave = async () => {
    if (!project || !isDirty) return

    setSaving(true)
    try {
      const res = await updateProject(project.id, {
        title: project.title,
        content: project.content, // state.project is updated via EditorStore when fields change
      })

      if (res.success) {
        toast.success('Projeto salvo com sucesso!')
        markClean()
      } else {
        toast.error(res.error || 'Erro ao salvar projeto')
      }
    } catch {
      toast.error('Erro de rede ao salvar projeto')
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      onClick={handleSave}
      disabled={!isDirty || isSaving}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
        ${isDirty && !isSaving 
          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20' 
          : 'bg-slate-800 text-slate-400 cursor-not-allowed'
        }
      `}
    >
      <Save className="w-4 h-4" />
      {isSaving ? 'Salvando...' : 'Salvar'}
    </button>
  )
}
