import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    // 1. Receber os dados do corpo da requisição (email e senha)
    const body = await request.json()
    const { email, password } = body

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // 2. Buscar o usuário pelo e-mail no banco de dados
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    // Se o usuário não existir
    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas (usuário não encontrado)' },
        { status: 401 }
      )
    }

    // 3. Comparar a senha recebida em texto puro com a senha criptografada salva no banco
    const passwordMatch = await bcrypt.compare(password, user.password)

    // Se a senha estiver incorreta
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Credenciais inválidas (senha incorreta)' },
        { status: 401 }
      )
    }

    // 4. Retornar sucesso com os dados básicos do usuário (NUNCA retorne a senha, nem criptografada)
    return NextResponse.json(
      {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erro na API de login:', error)
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    )
  }
}
