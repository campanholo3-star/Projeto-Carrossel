import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950 p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">Carrossel<span className="text-indigo-500">Flow</span></h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="block px-4 py-2 rounded-lg bg-indigo-600/10 text-indigo-400 font-medium">
            Projetos
          </Link>
          <Link href="/import" className="block px-4 py-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors">
            Importar
          </Link>
        </nav>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-sm text-slate-500 mb-4 truncate">{user.email}</p>
          <form action="/auth/signout" method="post">
            <button className="w-full px-4 py-2 bg-slate-900 hover:bg-red-900/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors text-left">
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
