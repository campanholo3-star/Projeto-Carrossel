import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // se houver parâmetro "next", usamos ele como destino de redirect
  const next = searchParams.get('next') ?? '/dashboard/projects'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Se houver erro, redireciona para login com erro
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}
