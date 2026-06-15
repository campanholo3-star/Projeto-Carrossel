import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// NUNCA importar no client. Isso ignora o RLS e tem privilégios de admin.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
