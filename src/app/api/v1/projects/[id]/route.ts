import { getUserOrError } from '@/lib/auth/getUser'
import { apiResponse, apiError } from '@/lib/validation/apiResponse'
import { carrosselSchema } from '@/lib/validation/carrosselSchema'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  const { data, error } = await supabase!
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return apiError('Projeto não encontrado', 404)
  }

  return apiResponse(data)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  try {
    const body = await request.json()
    const updates: Record<string, unknown> = {}

    if (body.title !== undefined) {
      updates.title = body.title
    }

    if (body.content !== undefined) {
      const validation = carrosselSchema.safeParse(body.content)
      if (!validation.success) {
        return apiError(validation.error.issues[0].message, 400)
      }
      updates.content = body.content
    }

    if (Object.keys(updates).length === 0) {
      return apiError('Nenhum dado para atualizar', 400)
    }

    const { data, error } = await supabase!
      .from('projects')
      .update(updates)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return apiError('Projeto não encontrado ou erro ao atualizar', 404)
    }

    return apiResponse(data)
  } catch {
    return apiError('Payload inválido', 400)
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { supabase, errorResponse } = await getUserOrError()
  if (errorResponse) return errorResponse

  const { error } = await supabase!
    .from('projects')
    .delete()
    .eq('id', params.id)

  if (error) {
    return apiError('Projeto não encontrado ou erro ao deletar', 404)
  }

  return apiResponse({ deleted: true })
}
