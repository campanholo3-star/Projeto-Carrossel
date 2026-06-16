import { Slide, Theme } from '@/types'

export function TemplateImagem({ slide, theme }: { slide: Slide, theme: Theme }) {
  const bodyColor = slide.fontSettings?.bodyColor || '#F1F5F9'
  
  return (
    <div className="flex-1 flex flex-col p-8 h-full w-full gap-8">
      {slide.imageUrl ? (
        <div className="flex-1 w-full rounded-2xl overflow-hidden relative shadow-2xl">
          <img 
            src={slide.imageUrl} 
            alt="Destaque" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ) : slide.imagePrompt ? (
        <div className="flex-1 w-full border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-6 bg-black/20 text-center shadow-2xl">
          <span 
            className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80"
            style={{ color: theme.accentColor }}
          >
            IA Image Generation
          </span>
          <span className="text-white/60 text-sm italic max-w-[80%]">
            {slide.imagePrompt}
          </span>
        </div>
      ) : (
        <div className="flex-1 w-full rounded-2xl bg-black/10 flex items-center justify-center shadow-2xl">
          <span className="text-white/30 text-sm">Nenhuma imagem definida</span>
        </div>
      )}

      {slide.body && (
        <div className="h-1/4 flex items-center justify-center px-4 text-center">
          <p 
            className="text-2xl leading-relaxed opacity-90 font-medium"
            style={{ color: bodyColor, fontFamily: theme.fontFamily }}
          >
            {slide.body}
          </p>
        </div>
      )}
    </div>
  )
}
