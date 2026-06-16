import { createClient } from '@/lib/supabase/server'
import { apiError } from '@/lib/validation/apiResponse'

export async function getUserOrError() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, supabase: null, errorResponse: apiError('Não autorizado', 401) }
  }

  return { user, supabase, errorResponse: null }
}
