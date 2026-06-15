import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md p-8 border border-slate-800 rounded-xl bg-slate-900 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Fazer Login</h1>
        
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">E-mail ou Usuário</label>
            <input 
              type="email" 
              id="email" 
              placeholder="seu@email.com" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              className="p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-2 w-full p-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-300 transition-colors">
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
