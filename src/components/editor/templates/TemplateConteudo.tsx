import { Slide, Theme } from '@/types'

export function TemplateConteudo({ slide, theme }: { slide: Slide, theme: Theme }) {
  const titleColor = slide.fontSettings?.titleColor || '#FFFFFF'
  const bodyColor = slide.fontSettings?.bodyColor || '#F1F5F9'
  
  return (
    <div className="flex-1 flex flex-col justify-center p-12 h-full w-full">
      {slide.title && (
        <h2 
          className="text-4xl font-bold mb-6 tracking-tight leading-tight"
          style={{ color: titleColor, fontFamily: theme.fontHeading }}
        >
          {slide.title}
        </h2>
      )}
      
      {slide.body && (
        <p 
          className="text-xl leading-relaxed opacity-90 whitespace-pre-wrap mb-8"
          style={{ color: bodyColor, fontFamily: theme.fontFamily }}
        >
          {slide.body}
        </p>
      )}

      {slide.imageUrl ? (
        <div className="mt-auto flex-1 w-full rounded-xl overflow-hidden relative">
          <img 
            src={slide.imageUrl} 
            alt="Conteúdo" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ) : slide.imagePrompt ? (
        <div className="mt-auto flex-1 w-full border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center p-6 bg-black/20 text-center">
          <span 
            className="text-xs uppercase tracking-widest font-bold mb-2 opacity-80"
            style={{ color: theme.accentColor }}
          >
            IA Image Generation
          </span>
          <span className="text-white/60 text-sm italic">
            {slide.imagePrompt}
          </span>
        </div>
      ) : null}
    </div>
  )
}
