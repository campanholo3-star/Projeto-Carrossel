import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { ExportDialog } from './ExportDialog'

export function ExportButton() {
  return (
    <ExportDialog>
      <Button variant="outline" className="flex items-center gap-2 border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800">
        <Download className="w-4 h-4" />
        Exportar
      </Button>
    </ExportDialog>
  )
}
