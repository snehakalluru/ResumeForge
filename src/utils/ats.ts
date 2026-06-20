import type { ATSResult, ResumeData } from '../types'

const stop = new Set('a an and are as at be by for from has have in is it its of on or that the this to with will your you our we job role work experience required preferred using'.split(' '))
export function extractKeywords(text:string){
  const counts:Record<string,number> = {}
  text.toLowerCase().match(/[a-z][a-z+#.\-]{2,}/g)?.forEach(word=>{ if(!stop.has(word)) counts[word]=(counts[word]||0)+1 })
  return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,25).map(([word])=>word)
}
export function resumeText(data:ResumeData){ return JSON.stringify(data).toLowerCase() }
export function analyzeResume(data:ResumeData,jd:string):ATSResult{
  const p=data.personal, text=resumeText(data), verbs=['built','created','developed','designed','led','improved','increased','reduced','managed','implemented','optimized','delivered','launched']
  const checks:Record<string,boolean>={
    email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email), phone:p.phone.replace(/\D/g,'').length>=7, linkedIn:!!p.linkedIn.trim(),
    skills:data.skills.filter(Boolean).length>=3, education:data.education.some(x=>!!(x.institution||x.degree||x.field)), projects:data.projects.some(x=>!!(x.name||x.description||x.techStack)),
    experience:data.experiences.some(x=>!!(x.company||x.role||x.description)), summary:data.summary.trim().length>=40, actionVerbs:verbs.some(v=>text.includes(v))
  }
  const keywords=extractKeywords(jd), matched=keywords.filter(k=>text.includes(k)), missing=keywords.filter(k=>!text.includes(k))
  const base=Object.values(checks).filter(Boolean).length/Object.keys(checks).length
  const keywordScore=keywords.length?Math.round(matched.length/keywords.length*100):100
  const score=Math.round((base*80)+(keywordScore*.2))
  const suggestions=Object.entries(checks).filter(([,ok])=>!ok).map(([key])=>({
    email:'Add a valid professional email address.',phone:'Add a complete phone number.',linkedIn:'Add your LinkedIn profile.',skills:'Include at least three relevant skills.',education:'Add your education.',projects:'Show at least one relevant project.',experience:'Add professional experience.',summary:'Write a focused summary of at least 40 characters.',actionVerbs:'Start bullets with action verbs and include measurable outcomes.'
  }[key]!))
  if(missing.length) suggestions.push(`Consider naturally adding relevant keywords: ${missing.slice(0,6).join(', ')}.`)
  return {score,completeness:Math.round(base*100),keywordScore,matched,missing,suggestions,checks}
}
