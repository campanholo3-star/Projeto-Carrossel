"use client"

import { useState } from 'react'
import { carrosselSchema } from '@/lib/validation/carrosselSchema'
import { importProject } from '@/lib/api/projects'

interface ImportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ImportModal({ isOpen, onClose, onSuccess }: ImportModalProps) {
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidated, setIsValidated] = useState(false)

  if (!isOpen) return null

  const handleValidate = () => {
    setError(null)
    setIsValidated(false)

    if (!jsonText.trim()) {
      setError('Cole o JSON primeiro.')
      return
    }

    try {
      const parsed = JSON.parse(jsonText)
      const validation = carrosselSchema.safeParse(parsed)

      if (!validation.success) {
        const issues = validation.error.issues.map(i => i.message).join(' | ')
        setError(`Erro de validação: ${issues}`)
        return
      }

      setIsValidated(true)
    } catch {
      setError('JSON inválido — verifique se copiou o conteúdo completo')
    }
  }

  const handleImport = async () => {
    if (!isValidated) return

    setIsLoading(true)
    setError(null)

    try {
      const res = await importProject(jsonText)
      if (res.success) {
        alert('Projeto importado com sucesso!')
        onSuccess() // triggers refetch and close
      } else {
        setError(res.error || 'Erro ao importar projeto na API.')
        setIsValidated(false)
      }
    } catch {
      setError('Erro de rede ao importar.')
      setIsValidated(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Importar JSON do Carrossel</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-xl">&times;</button>
        </div>

        <textarea
          className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-green-400 font-mono resize-none focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="Cole o JSON gerado pela IA aqui..."
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value)
            setIsValidated(false)
            setError(null)
          }}
          disabled={isLoading}
        />

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>

          {!isValidated ? (
            <button 
              onClick={handleValidate}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
            >
              Validar JSON
            </button>
          ) : (
            <button 
              onClick={handleImport}
              disabled={isLoading}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isLoading ? 'Importando...' : 'Importar Projeto'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
