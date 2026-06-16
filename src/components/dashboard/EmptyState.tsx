interface EmptyStateProps {
  onOpenImport: () => void
}

export function EmptyState({ onOpenImport }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
      <h3 className="text-2xl font-bold text-white mb-2">Nenhum projeto encontrado</h3>
      <p className="text-slate-400 max-w-md mb-8">
        Você ainda não possui projetos de carrossel. Crie seu primeiro projeto colando um JSON gerado pela IA.
      </p>
      <button 
        onClick={onOpenImport}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all"
      >
        Importar Projeto
      </button>
    </div>
  )
}
