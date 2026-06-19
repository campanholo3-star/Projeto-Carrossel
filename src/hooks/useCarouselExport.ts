import { useState } from 'react';
import { exportImage } from '@/lib/export/exportImage';
import { exportZip } from '@/lib/export/exportZip';
import { useEditorStore } from '@/stores/editorStore';

export function useCarouselExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const project = useEditorStore(state => state.project);

  const handleExportSingle = async (slideIndex: number) => {
    if (!project) return;
    
    setIsExporting(true);
    setProgress(0);
    setError(null);

    try {
      const projectName = project.title.replace(/\s+/g, '-').toLowerCase() || 'carrossel';
      const slideNumber = String(slideIndex + 1).padStart(2, '0');
      await exportImage(`export-slide-${slideIndex}`, `${projectName}-slide-${slideNumber}.png`);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao exportar. Verifique se o CORS do bucket "project-images" está habilitado.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAll = async () => {
    if (!project || !project.content?.slides) return;
    
    setIsExporting(true);
    setProgress(0);
    setError(null);

    try {
      const projectName = project.title.replace(/\s+/g, '-').toLowerCase() || 'carrossel';
      await exportZip(project.content.slides.length, projectName, (p) => setProgress(p));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao gerar ZIP. Verifique se o CORS do bucket "project-images" está habilitado.');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    progress,
    error,
    exportSingle: handleExportSingle,
    exportAll: handleExportAll
  };
}
