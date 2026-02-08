'use client'

import { CMSIcon } from '@/app/components/cms-icon'
import { KnownTech as IKnownTech } from '@/app/types/projects'
import { getRelativeTimeString } from '@/app/utils/get-relative-time'

console.log('🔥 KnownTech component rendered')


type KnownTechProps = {
  tech: IKnownTech
}

export const KnownTech = ({ tech }: KnownTechProps) => {
  // Console log the entire tech object
  console.log('Tech data:', tech)
  
  // Console log specific properties
  console.log('Tech name:', tech.name)
  console.log('Tech iconSvg:', tech.iconSvg)
  console.log('Tech startDate:', tech.startDate)
  
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate),
    'en-US'
  ).replace('ago', '')
  
  console.log('Relative time:', relativeTime)

  return (
    <div className='p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-emerald-500 hover:bg-gray-600/30 transition-all'>
      <div className='flex items-center justify-between'>
        <p className='font-medium'>{tech.name}</p>
        <CMSIcon icon={tech.iconSvg} />
      </div>
      <span>{relativeTime} of experience</span>
    </div>
  )
}