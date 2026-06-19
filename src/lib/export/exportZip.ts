import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getSlideDataUrl } from './exportImage';

export async function exportZip(
  slideCount: number, 
  projectName: string,
  onProgress: (progress: number) => void
): Promise<void> {
  const zip = new JSZip();

  for (let i = 0; i < slideCount; i++) {
    const dataUrl = await getSlideDataUrl(`export-slide-${i}`);
    
    // Extrai o base64 puro removendo o prefixo do Data URL
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    
    // Formata o número do slide com 2 dígitos (01, 02...)
    const slideNumber = String(i + 1).padStart(2, '0');
    zip.file(`${projectName}-slide-${slideNumber}.png`, base64Data, { base64: true });
    
    // Atualiza progresso (1 a 100%)
    onProgress(Math.round(((i + 1) / slideCount) * 100));
  }

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, `${projectName}-export.zip`);
}
