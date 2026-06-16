import { Slide, Theme } from '@/types'

export function TemplateCTA({ slide, theme }: { slide: Slide, theme: Theme }) {
  const titleColor = slide.fontSettings?.titleColor || '#FFFFFF'
  const bodyColor = slide.fontSettings?.bodyColor || '#F1F5F9'
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 h-full w-full text-center">
      <div 
        className="w-20 h-20 rounded-full mb-10 flex items-center justify-center shadow-lg"
        style={{ backgroundColor: theme.primaryColor }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      {slide.title && (
        <h2 
          className="text-5xl font-extrabold mb-8 tracking-tight leading-tight uppercase"
          style={{ color: titleColor, fontFamily: theme.fontHeading }}
        >
          {slide.title}
        </h2>
      )}
      
      {slide.body && (
        <p 
          className="text-2xl leading-relaxed opacity-90 mb-12 font-medium"
          style={{ color: bodyColor, fontFamily: theme.fontFamily }}
        >
          {slide.body}
        </p>
      )}

      {/* Simulador de Botão se houver CTA ou apenas decorativo */}
      <div 
        className="px-10 py-5 rounded-full text-xl font-bold uppercase tracking-wider shadow-2xl"
        style={{ backgroundColor: theme.accentColor, color: '#000000' }}
      >
        Saiba Mais
      </div>

      {slide.imageUrl && (
        <div className="absolute inset-0 z-[-1] opacity-20">
          <img 
            src={slide.imageUrl} 
            alt="Fundo" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}
