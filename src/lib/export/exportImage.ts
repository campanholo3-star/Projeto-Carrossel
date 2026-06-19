import { toPng } from 'html-to-image';

export async function exportImage(elementId: string, filename: string): Promise<void> {
  const dataUrl = await getSlideDataUrl(elementId);
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function getSlideDataUrl(elementId: string): Promise<string> {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error(`Elemento com ID ${elementId} não encontrado.`);
  }

  // toPng requires the node to be rendered
  return await toPng(node, {
    cacheBust: true,
    pixelRatio: 1, // Mantém a proporção nativa do nó off-screen (1080x1350)
  });
}
