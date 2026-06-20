import type { TemplateId } from '../types'
export type Template = { id:TemplateId; name:string; score:number; bestFor:string; description:string }
export const templates:Template[] = [
  {id:'classic-ats',name:'Classic ATS',score:95,bestFor:'Engineering, operations, finance, and graduate roles',description:'A crisp single-column layout optimized for reliable ATS parsing.'},
  {id:'modern-professional',name:'Modern Professional',score:90,bestFor:'Experienced, data, cloud, product, and leadership roles',description:'A polished two-column layout with contact details and skills in a sidebar.'},
  {id:'creative-professional',name:'Creative Professional',score:86,bestFor:'Design, marketing, creative development, and portfolio roles',description:'A colorful header and expressive two-column layout that stays readable.'}
]
