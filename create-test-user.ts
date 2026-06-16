import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltando variáveis de ambiente!')
  process.exit(1)
}

const adminAuthClient = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}).auth.admin

async function createTestUser() {
  const { data, error } = await adminAuthClient.createUser({
    email: 'admin@carrosselflow.com',
    password: 'password123',
    email_confirm: true
  })

  if (error) {
    console.error('Erro ao criar usuário:', error.message)
    // Se o usuário já existir, vamos atualizar a senha dele para ter certeza
    if (error.message.includes('already registered')) {
        console.log('Usuário já existe, atualizando a senha e forçando confirmação...')
        // Precisamos buscar o ID do usuário para atualizar
        const { data: users } = await adminAuthClient.listUsers()
        const user = users.users.find(u => u.email === 'admin@carrosselflow.com')
        if (user) {
            await adminAuthClient.updateUserById(user.id, { password: 'password123', email_confirm: true })
            console.log('Senha atualizada com sucesso.')
        }
    }
  } else {
    console.log('Usuário de teste criado com sucesso:', data.user.email)
  }
}

createTestUser()
