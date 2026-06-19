"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DownloadCloud, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useCarouselExport } from '@/hooks/useCarouselExport'
import { useEditorStore } from '@/stores/editorStore'

interface ExportDialogProps {
  children: React.ReactNode
}

export function ExportDialog({ children }: ExportDialogProps) {
  const [open, setOpen] = useState(false)
  const { isExporting, progress, error, exportAll, exportSingle } = useCarouselExport()
  const currentSlideIndex = useEditorStore(state => state.currentSlideIndex)

  return (
    <Dialog open={open} onOpenChange={(val) => {
      // Impede fechar enquanto exporta
      if (!isExporting) setOpen(val)
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Exportar Carrossel</DialogTitle>
          <DialogDescription className="text-slate-400">
            As imagens serão geradas no formato 1080x1350 (4:5) em alta resolução.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-3 py-4">
          <Button 
            onClick={() => exportAll()} 
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 h-12 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isExporting ? <Loader2 className="animate-spin w-5 h-5" /> : <DownloadCloud className="w-5 h-5" />}
            Baixar Todos (ZIP)
          </Button>

          <Button 
            variant="outline"
            onClick={() => exportSingle(currentSlideIndex)} 
            disabled={isExporting}
            className="w-full h-12 flex items-center justify-center gap-2 border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200"
          >
            <ImageIcon className="w-4 h-4" />
            Baixar Slide Atual
          </Button>
        </div>

        {isExporting && (
          <div className="space-y-2 mt-2">
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>Gerando imagens...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
