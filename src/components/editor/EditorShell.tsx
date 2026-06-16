"use client"

import { useEffect } from 'react'
import { Project } from '@/types'
import { useEditorStore } from '@/stores/editorStore'
import { SlideSidebar } from './SlideSidebar'
import { SlidePreview } from './SlidePreview'
import { SlideNavigator } from './SlideNavigator'
import { SaveButton } from './SaveButton'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface EditorShellProps {
  initialProject: Project
}

export function EditorShell({ initialProject }: EditorShellProps) {
  const loadProject = useEditorStore((state) => state.loadProject)
  const project = useEditorStore((state) => state.project)

  useEffect(() => {
    loadProject(initialProject)
  }, [initialProject, loadProject])

  if (!project) return null

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-950">
      {/* Topbar do Editor */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-white line-clamp-1">
            {project.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <SlideNavigator />
          <SaveButton />
        </div>
      </header>

      {/* Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar (Esquerda) */}
        <aside className="w-96 border-r border-slate-800 bg-slate-900 overflow-y-auto shrink-0">
          <SlideSidebar />
        </aside>

        {/* Canvas (Direita) */}
        <section className="flex-1 bg-slate-950 p-8 overflow-y-auto flex items-center justify-center">
          <SlidePreview />
        </section>
      </main>
    </div>
  )
}
