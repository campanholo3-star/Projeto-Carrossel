import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar os dados de entrada
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Dados inválidos", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Buscar o usuário por e-mail
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Mensagem genérica para não revelar se o e-mail existe
    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Comparar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    // Retornar dados do usuário SEM a senha
    return NextResponse.json(
      {
        message: "Login realizado com sucesso",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
