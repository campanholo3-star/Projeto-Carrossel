'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signup } from '../actions'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterForm) => {
    setError(null)
    startTransition(async () => {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('name', data.name)
      
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white py-12 px-4">
      <div className="w-full max-w-md p-8 border border-slate-800 rounded-xl bg-slate-900 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300">Nome Completo</label>
            <input 
              {...register('name')}
              type="text" 
              id="name" 
              placeholder="Seu nome" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">E-mail</label>
            <input 
              {...register('email')}
              type="email" 
              id="email" 
              placeholder="seu@email.com" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Senha</label>
            <input 
              {...register('password')}
              type="password" 
              id="password" 
              placeholder="••••••••" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-300">Confirmar Senha</label>
            <input 
              {...register('confirmPassword')}
              type="password" 
              id="confirmPassword" 
              placeholder="••••••••" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="mt-2 w-full p-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
          >
            {isPending ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">Ou</span>
            </div>
          </div>
          
          <button 
            type="button"
            className="w-full p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            Continuar com Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-400">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  )
}
