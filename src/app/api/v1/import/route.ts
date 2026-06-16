import { getUserOrError } from '@/lib/auth/getUser'
import { apiResponse, apiError } from '@/lib/validation/apiResponse'
import { carrosselSchema } from '@/lib/validation/carrosselSchema'
import { createProject } from '@/lib/projects/createProject'

export async function POST(request: Request) {
  const { user, supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  try {
    const body = await request.json()

    // Valida o body inteiro com o carrosselSchema
    const validation = carrosselSchema.safeParse(body)
    
    if (!validation.success) {
      return apiError(validation.error.issues[0].message, 400)
    }

    const { data, error } = await createProject({
      supabase: supabase!,
      userId: user!.id,
      title: validation.data.title,
      content: validation.data,
    })

    if (error) {
      return apiError('Erro ao importar projeto', 500)
    }

    return apiResponse({ id: data.id, title: data.title }, 201)
  } catch {
    return apiError('Payload inválido', 400)
  }
}
