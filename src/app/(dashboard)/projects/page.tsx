import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Meus Projetos</h1>
      <p className="text-slate-400">Bem-vindo, {user.email}!</p>
      
      <div className="mt-8 p-6 border border-slate-800 rounded-xl bg-slate-900">
        <p className="text-center text-slate-500">Nenhum projeto encontrado. Placeholder de teste da área logada.</p>
      </div>

      <form action="/auth/signout" method="post" className="mt-8">
        <button type="submit" className="text-red-400 hover:text-red-300">Sair</button>
      </form>
    </div>
  )
}
