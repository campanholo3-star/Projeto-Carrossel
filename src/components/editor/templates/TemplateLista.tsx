import { Slide, Theme } from '@/types'

export function TemplateLista({ slide, theme }: { slide: Slide, theme: Theme }) {
  const titleColor = slide.fontSettings?.titleColor || '#FFFFFF'
  const bodyColor = slide.fontSettings?.bodyColor || '#F1F5F9'
  
  const listItems = slide.body 
    ? slide.body.split('\n').filter(line => line.trim() !== '')
    : []

  return (
    <div className="flex-1 flex flex-col justify-center p-12 h-full w-full">
      {slide.title && (
        <h2 
          className="text-4xl font-bold mb-10 tracking-tight leading-tight"
          style={{ color: titleColor, fontFamily: theme.fontHeading }}
        >
          {slide.title}
        </h2>
      )}
      
      {listItems.length > 0 && (
        <ul className="space-y-6">
          {listItems.map((item, index) => (
            <li 
              key={index} 
              className="flex items-start gap-4 text-xl leading-relaxed opacity-90"
              style={{ color: bodyColor, fontFamily: theme.fontFamily }}
            >
              <span 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-1"
                style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
              >
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
