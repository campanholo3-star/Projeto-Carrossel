import { SupabaseClient } from '@supabase/supabase-js'
import { CarrosselInput } from '@/lib/validation/carrosselSchema'

interface CreateProjectParams {
  supabase: SupabaseClient
  userId: string
  title: string
  content: CarrosselInput | Record<string, unknown>
}

export async function createProject({ supabase, userId, title, content }: CreateProjectParams) {
  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      title,
      content,
    })
    .select()
    .single()

  return { data, error }
}
