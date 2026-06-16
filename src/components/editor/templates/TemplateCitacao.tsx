import { Slide, Theme } from '@/types'

export function TemplateCitacao({ slide, theme }: { slide: Slide, theme: Theme }) {
  const bodyColor = slide.fontSettings?.bodyColor || '#FFFFFF'
  const authorColor = theme.accentColor || '#38bdf8'
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-14 h-full w-full text-center">
      <div 
        className="text-8xl opacity-20 mb-4"
        style={{ color: theme.primaryColor, fontFamily: theme.fontHeading }}
      >
        &quot;
      </div>
      
      {slide.body && (
        <p 
          className="text-3xl font-medium leading-relaxed mb-10"
          style={{ color: bodyColor, fontFamily: theme.fontHeading }}
        >
          {slide.body}
        </p>
      )}

      {slide.author && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-current opacity-50" style={{ color: authorColor }} />
          <span 
            className="text-xl font-bold uppercase tracking-widest"
            style={{ color: authorColor, fontFamily: theme.fontFamily }}
          >
            {slide.author}
          </span>
          <div className="w-12 h-1 bg-current opacity-50" style={{ color: authorColor }} />
        </div>
      )}
    </div>
  )
}
