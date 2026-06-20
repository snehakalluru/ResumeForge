export type TemplateId = 'classic-ats' | 'modern-professional' | 'creative-professional'

export type PersonalDetails = {
  fullName: string; jobTitle: string; email: string; phone: string; location: string
  linkedIn: string; github: string; portfolio: string
}
export type Experience = { id:string; company:string; role:string; location:string; startDate:string; endDate:string; description:string }
export type Project = { id:string; name:string; techStack:string; description:string; githubLink:string; liveLink:string }
export type Education = { id:string; institution:string; degree:string; field:string; startYear:string; endYear:string; score:string }
export type Certification = { id:string; name:string; organization:string; year:string; link:string }
export type ResumeData = {
  personal: PersonalDetails; summary:string; skills:string[]; experiences:Experience[]; projects:Project[]
  education:Education[]; certifications:Certification[]; achievements:string[]; languages:string[]
}
export type ThemeState = { accent:string; fontSize:number; mode:'dark'|'light' }
export type ATSResult = { score:number; completeness:number; keywordScore:number; matched:string[]; missing:string[]; suggestions:string[]; checks:Record<string,boolean> }
