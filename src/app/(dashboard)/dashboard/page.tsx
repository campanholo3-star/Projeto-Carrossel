"use client"

import { useEffect, useState } from 'react'
import { Project } from '@/types'
import { listProjects, deleteProject } from '@/lib/api/projects'
import { ProjectCard } from '@/components/dashboard/ProjectCard'
import { EmptyState } from '@/components/dashboard/EmptyState'

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await listProjects(1, 20)
      if (res.success && res.data) {
        setProjects(res.data.projects)
      } else {
        setError(res.error || 'Erro desconhecido')
      }
    } catch {
      setError('Erro ao carregar projetos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este projeto?')) return
    
    // Atualização otimista
    const prev = projects
    setProjects(projects.filter(p => p.id !== id))
    
    try {
      const res = await deleteProject(id)
      if (!res.success) {
        setProjects(prev)
        alert('Erro ao excluir: ' + res.error)
      }
    } catch {
      setProjects(prev)
      alert('Erro na requisição')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
        Erro: {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Meus Projetos</h1>
      </div>

      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
