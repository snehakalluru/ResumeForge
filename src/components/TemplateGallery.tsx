import { useState } from 'react'
import TemplateCard from './TemplateCard'
import TemplatePreviewModal from './TemplatePreviewModal'
import { templates, type Template } from '../data/templates'
import type { TemplateId } from '../types'
export default function TemplateGallery({selected,onSelect}:{selected:TemplateId;onSelect:(id:TemplateId)=>void}){
  const [active,setActive]=useState<Template|null>(null)
  return <section className="template-section"><div className="section-heading"><div><span className="eyebrow">Choose your foundation</span><h1>Resume templates built to get read</h1></div><span className="autosave">Selection saves automatically</span></div><div className="gallery">{templates.map(t=><TemplateCard key={t.id} {...t} selected={selected===t.id} onPreview={()=>setActive(t)} onUse={()=>onSelect(t.id)}/>)}</div><TemplatePreviewModal open={!!active} onClose={()=>setActive(null)} template={active} onUse={()=>{if(active)onSelect(active.id);setActive(null)}}/></section>
}
