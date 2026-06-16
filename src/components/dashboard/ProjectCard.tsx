import { Project } from '@/types'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:border-slate-700 transition-colors">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-slate-400 mb-4">
          Criado em: {new Date(project.created_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <div className="flex gap-3">
        <Link 
          href={`/editor/${project.id}`}
          className="flex-1 bg-white text-black text-center font-medium py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Abrir
        </Link>
        <button 
          onClick={() => onDelete(project.id)}
          className="px-4 py-2 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 transition-colors"
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
