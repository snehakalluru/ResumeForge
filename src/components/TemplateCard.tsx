import { motion } from 'framer-motion'
import type { Template } from '../data/templates'
type Props=Template&{selected:boolean;onPreview:()=>void;onUse:()=>void}
export default function TemplateCard({id,name,score,bestFor,description,selected,onPreview,onUse}:Props){return <motion.article whileHover={{y:-4}} className={`glass-card template-card ${selected?'selected':''}`}>
  <div className={`template-thumb ${id}`}><div className="mock-name">YOUR NAME</div><div className="mock-line wide"/><div className="mock-cols"><div><div className="mock-line"/><div className="mock-line short"/><div className="mock-line"/></div><div><div className="mock-line"/><div className="mock-line"/><div className="mock-line short"/></div></div></div>
  <div className="template-copy"><div><div className="template-title"><h3>{name}</h3><span>ATS {score}%</span></div><p><strong>Best for:</strong> {bestFor}</p><p className="template-description">{description}</p></div><div className="button-row"><button className="btn ghost" onClick={onPreview}>Preview</button><button className="btn" onClick={onUse}>{selected?'Selected':'Use Template'}</button></div></div>
 </motion.article>}
