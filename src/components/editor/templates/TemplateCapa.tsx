import { Slide, Theme } from '@/types'

export function TemplateCapa({ slide, theme }: { slide: Slide, theme: Theme }) {
  const textColor = slide.fontSettings?.titleColor || '#FFFFFF'
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center h-full relative">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 bg-black/40" />
      {slide.imageUrl ? (
        <img 
          src={slide.imageUrl} 
          alt={slide.title || 'Capa'} 
          className="absolute inset-0 z-[-1] w-full h-full object-cover opacity-60"
        />
      ) : slide.imagePrompt ? (
        <div className="absolute inset-0 z-[-1] w-full h-full bg-slate-800 flex items-center justify-center p-6 text-center opacity-60">
          <span className="text-white/40 text-sm italic border-2 border-dashed border-white/20 p-4 rounded-xl">
            [IA Placeholder] {slide.imagePrompt}
          </span>
        </div>
      ) : null}

      <div className="relative z-10 w-full">
        {slide.title && (
          <h2 
            className="text-5xl font-bold mb-6 tracking-tight leading-tight"
            style={{ color: textColor, fontFamily: theme.fontHeading }}
          >
            {slide.title}
          </h2>
        )}
      </div>
    </div>
  )
}
