import { getUserOrError } from '@/lib/auth/getUser'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { EditorShell } from '@/components/editor/EditorShell'
import { Project } from '@/types'

export default async function EditorPage({ params }: { params: { id: string } }) {
  // Garantir que o usuário está logado
  await getUserOrError()

  const supabase = await createClient()
  
  // Buscar o projeto pelo id
  // RLS garante que ele só pegará se for dono
  const { data: projectData, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !projectData) {
    redirect('/dashboard')
  }

  const project = projectData as unknown as Project

  return (
    <div className="h-[calc(100vh-4rem)]">
      <EditorShell initialProject={project} />
    </div>
  )
}
