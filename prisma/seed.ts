import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Criptografando a senha "123456"
  // O número 10 é o "salt", que define a força da criptografia (10 é o padrão seguro)
  const hashedPassword = await bcrypt.hash('123456', 10)

  // Criando (ou atualizando se já existir) o usuário no banco de dados
  const user = await prisma.user.upsert({
    where: { email: 'teste@teste.com' },
    update: {},
    create: {
      email: 'teste@teste.com',
      name: 'Usuário Teste',
      password: hashedPassword,
    },
  })

  console.log('Seed executado com sucesso! Usuário de teste criado:')
  console.log({
    id: user.id,
    email: user.email,
    name: user.name,
  })
}

main()
  .catch((e) => {
    console.error('Erro ao executar o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
