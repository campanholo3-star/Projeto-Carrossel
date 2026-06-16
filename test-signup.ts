import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Faltando variáveis de ambiente!')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testSignup() {
  const email = `test-${Date.now()}@carrosselflow.com`
  console.log('Tentando registrar:', email)
  const { data, error } = await supabase.auth.signUp({
    email,
    password: 'password123'
  })

  if (error) {
    console.error('Erro no signUp:', error.message)
  } else {
    console.log('Sucesso no signUp!', data)
    
    // Tentar logar logo depois
    const loginResult = await supabase.auth.signInWithPassword({
        email,
        password: 'password123'
    })

    if (loginResult.error) {
        console.error('Erro no signIn após signUp:', loginResult.error.message)
    } else {
        console.log('Sucesso no signIn!')
    }
  }
}

testSignup()
