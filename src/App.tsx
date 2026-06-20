import { useEffect, useMemo, useRef, useState } from 'react'
import TemplateGallery from './components/TemplateGallery'
import ResumeBuilder from './components/ResumeBuilder'
import ATSDashboard from './components/ATSDashboard'
import ThemeCustomizer from './components/ThemeCustomizer'
import { emptyResume, sampleResumes, withIds } from './data/resume'
import { analyzeResume } from './utils/ats'
import type { ResumeData, TemplateId, ThemeState } from './types'

const DATA_KEY='resumeforge:resume', TEMPLATE_KEY='resumeforge:template', THEME_KEY='resumeforge:theme', JD_KEY='resumeforge:jd'
const read=<T,>(key:string,fallback:T):T=>{ try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw):fallback } catch { return fallback } }
const accentContrast=(hex:string)=>{
  const value=hex.replace('#','')
  const rgb=[0,2,4].map(index=>parseInt(value.slice(index,index+2),16)/255)
  const linear=rgb.map(channel=>channel<=.04045?channel/12.92:((channel+.055)/1.055)**2.4)
  return .2126*linear[0]+.7152*linear[1]+.0722*linear[2]>.42?'#08111f':'#ffffff'
}

export default function App(){
  const [data,setData]=useState<ResumeData>(()=>withIds(read(DATA_KEY,read('rf:resume:draft',emptyResume))))
  const [template,setTemplate]=useState<TemplateId>(()=>read(TEMPLATE_KEY,'classic-ats'))
  const [theme,setTheme]=useState<ThemeState>(()=>read(THEME_KEY,{accent:'#7c5cff',fontSize:16,mode:'dark'}))
  const [jd,setJd]=useState(()=>read(JD_KEY,'')); const [showJd,setShowJd]=useState(false); const [hasRun,setHasRun]=useState(false)
  const editorRef=useRef<HTMLDivElement>(null); const result=useMemo(()=>analyzeResume(data,jd),[data,jd])
  useEffect(()=>localStorage.setItem(DATA_KEY,JSON.stringify(data)),[data])
  useEffect(()=>localStorage.setItem(TEMPLATE_KEY,JSON.stringify(template)),[template])
  useEffect(()=>localStorage.setItem(JD_KEY,JSON.stringify(jd)),[jd])
  useEffect(()=>{localStorage.setItem(THEME_KEY,JSON.stringify(theme));document.documentElement.dataset.theme=theme.mode;document.documentElement.style.setProperty('--accent',theme.accent);document.documentElement.style.setProperty('--accent-contrast',accentContrast(theme.accent));document.documentElement.style.setProperty('--base-font-size',`${theme.fontSize}px`)},[theme])
  const selectTemplate=(id:TemplateId)=>{setTemplate(id);setTimeout(()=>editorRef.current?.scrollIntoView({behavior:'smooth'}),0)}
  const loadSample=()=>{const populated=JSON.stringify(data)!==JSON.stringify(emptyResume);if(populated&&!confirm('Replace your current resume with realistic sample data?'))return;setData(sampleResumes[template])}
  return <div className="app">
    <header className="topbar"><div><div className="logo">Resume<span>Forge</span></div><p>Build a resume that reads beautifully—to people and parsers.</p></div><ThemeCustomizer value={theme} onChange={setTheme}/></header>
    <TemplateGallery selected={template} onSelect={selectTemplate}/>
    <main className="workspace" ref={editorRef}><ResumeBuilder data={data} onChange={setData} template={template} onLoadSample={loadSample}/><aside className="ats-column"><ATSDashboard result={result} visible={hasRun}/><section className="glass-card action-card"><div><h3>Job description match</h3><p>Paste a target role to compare its keywords with your resume.</p></div><div className="button-row"><button className="btn ghost" onClick={()=>setShowJd(v=>!v)}>Import JD</button><button className="btn" onClick={()=>{setHasRun(true);setShowJd(true)}}>Run ATS Check</button></div>{showJd&&<textarea className="jd-input" value={jd} onChange={e=>setJd(e.target.value)} placeholder="Paste the complete job description here…"/>}</section></aside></main>
    <footer><div><strong>Developed by</strong><div>Kalluru Sneha</div><a href="mailto:snehakalluru91@gmail.com">snehakalluru91@gmail.com</a></div><a className="btn footer-btn" href="https://digitalheroesco.com" target="_blank" rel="noreferrer">Built for Digital Heroes</a></footer>
  </div>
}
