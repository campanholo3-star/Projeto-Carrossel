import { getUserOrError } from '@/lib/auth/getUser'
import { apiResponse, apiError } from '@/lib/validation/apiResponse'
import { carrosselSchema } from '@/lib/validation/carrosselSchema'
import { createProject } from '@/lib/projects/createProject'

export async function GET(request: Request) {
  const { supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // Supabase RLS ensures the user only sees their own projects.
  const { data, error, count } = await supabase!
    .from('projects')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return apiError('Erro ao buscar projetos', 500)
  }

  return apiResponse({ projects: data, total: count, page, limit })
}

export async function POST(request: Request) {
  const { user, supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  try {
    const body = await request.json()
    if (!body.title) {
      return apiError('O título é obrigatório', 400)
    }

    // Se houver content no payload, o mesmo deve ser um JSON válido de Carrossel
    let contentToSave = {}
    if (body.content) {
      const validation = carrosselSchema.safeParse(body.content)
      if (!validation.success) {
        return apiError(validation.error.issues[0].message, 400)
      }
      contentToSave = body.content
    }

    const { data, error } = await createProject({
      supabase: supabase!,
      userId: user!.id,
      title: body.title,
      content: contentToSave,
    })

    if (error) {
      return apiError('Erro ao criar projeto', 500)
    }

    return apiResponse(data, 201)
  } catch {
    return apiError('Payload inválido', 400)
  }
}
