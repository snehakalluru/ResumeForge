import { useState } from 'react'
import { motion } from 'framer-motion'
import Preview from './Preview'
import { sampleResumes } from '../data/resume'
import type { Template } from '../data/templates'
export default function TemplatePreviewModal({open,onClose,template,onUse}:{open:boolean;onClose:()=>void;template:Template|null;onUse:()=>void}){
  const [zoom,setZoom]=useState(.78);if(!open||!template)return null
  return <div className="modal" role="dialog" aria-modal="true" onClick={onClose}><motion.div className="panel" onClick={e=>e.stopPropagation()} initial={{scale:.97,opacity:0}} animate={{scale:1,opacity:1}}><div className="modal-head"><div><h2>{template.name}</h2><p>{template.description} · ATS {template.score}%</p></div><div className="button-row"><label>Zoom <input type="range" min=".55" max="1" step=".05" value={zoom} onChange={e=>setZoom(+e.target.value)}/></label><button className="btn ghost" onClick={onClose}>Close</button><button className="btn" onClick={onUse}>Use Template</button></div></div><div className="modal-canvas"><div style={{width:`${100/zoom}%`,transform:`scale(${zoom})`,transformOrigin:'top center'}}><Preview data={sampleResumes[template.id]} template={template.id}/></div></div></motion.div></div>
}
