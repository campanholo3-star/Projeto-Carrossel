import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="p-8 border border-slate-800 rounded-xl bg-slate-900 text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Admin</h1>
        <p className="text-slate-400 mb-6">Painel de administração em construção.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300 underline">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
