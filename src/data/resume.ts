import type { ResumeData, TemplateId } from '../types'

export const emptyResume: ResumeData = {
  personal:{fullName:'',jobTitle:'',email:'',phone:'',location:'',linkedIn:'',github:'',portfolio:''},
  summary:'',skills:[],experiences:[],projects:[],education:[],certifications:[],achievements:[],languages:[]
}

const id = () => Math.random().toString(36).slice(2,10)
export const withIds = (input:Partial<ResumeData>&Record<string,any>):ResumeData => {
  const data:any=input||{}
  return {
    personal:{...emptyResume.personal,...data.personal,fullName:data.personal?.fullName||data.name||'',jobTitle:data.personal?.jobTitle||data.title||'',email:data.personal?.email||data.email||'',phone:data.personal?.phone||data.phone||'',location:data.personal?.location||data.location||''},
    summary:data.summary||'', skills:Array.isArray(data.skills)?data.skills.filter(Boolean):[],
    experiences:(data.experiences||[]).map((x:any)=>({id:x.id||id(),company:x.company||'',role:x.role||'',location:x.location||'',startDate:x.startDate||x.time?.split(' - ')[0]||'',endDate:x.endDate||x.time?.split(' - ')[1]||'',description:x.description||x.bullets?.join('\n')||''})),
    projects:(data.projects||[]).map((x:any)=>({id:x.id||id(),name:x.name||'',techStack:x.techStack||'',description:x.description||x.desc||'',githubLink:x.githubLink||'',liveLink:x.liveLink||''})),
    education:Array.isArray(data.education)?data.education.map((x:any)=>({id:x.id||id(),institution:x.institution||x.school||'',degree:x.degree||'',field:x.field||'',startYear:x.startYear||x.time?.split(' - ')[0]||'',endYear:x.endYear||x.time?.split(' - ')[1]||'',score:x.score||''})):(data.education?.school?[{id:id(),institution:data.education.school,degree:data.education.degree||'',field:'',startYear:'',endYear:data.education.time||'',score:''}]:[]),
    certifications:(data.certifications||[]).map((x:any)=>typeof x==='string'?{id:id(),name:x,organization:'',year:'',link:''}:{id:x.id||id(),name:x.name||'',organization:x.organization||'',year:x.year||'',link:x.link||''}),
    achievements:data.achievements||[],languages:data.languages||[]
  }
}

export const sampleResumes:Record<TemplateId,ResumeData> = {
  'classic-ats': withIds({
    personal:{fullName:'Emma Wilson',jobTitle:'Software Engineer',email:'emma.wilson@devmail.com',phone:'+1 206 555 0147',location:'Seattle, WA',linkedIn:'linkedin.com/in/emmawilson',github:'github.com/emmawilson',portfolio:'emmawilson.dev'},
    summary:'Software engineer with experience building reliable web services and accessible products. Strong foundation in algorithms, testing, and system design.',
    skills:['Java','Python','TypeScript','React','Node.js','SQL','AWS','Docker'],
    experiences:[{id:'',company:'AzureStream',role:'Software Engineering Intern',location:'Seattle, WA',startDate:'Jun 2023',endDate:'Aug 2023',description:'Built REST APIs supporting product catalog features.\nImproved unit test coverage from 48% to 82% across two services.'}],
    projects:[{id:'',name:'E-Commerce Platform',techStack:'React, Node.js, PostgreSQL',description:'Designed a resilient checkout service and integrated a secure payment gateway.',githubLink:'github.com/emmawilson/shop',liveLink:'shop.emmawilson.dev'}],
    education:[{id:'',institution:'University of Washington',degree:'B.S.',field:'Computer Science',startYear:'2019',endYear:'2023',score:'3.8 GPA'}],
    certifications:[{id:'',name:'AWS Certified Cloud Practitioner',organization:'Amazon Web Services',year:'2023',link:''}],
    achievements:['Winner, university hackathon among 40 teams'],languages:['English','Spanish']
  }),
  'modern-professional': withIds({
    personal:{fullName:'David Chen',jobTitle:'Data Engineer',email:'david.chen@datasci.io',phone:'+1 347 555 0198',location:'New York, NY',linkedIn:'linkedin.com/in/davidchen',github:'github.com/dchen-data',portfolio:'davidchen.io'},
    summary:'Data engineer specializing in scalable ETL pipelines, data modeling, and cloud-native analytics infrastructure.',skills:['Python','SQL','Airflow','Spark','AWS','Terraform','Docker'],
    experiences:[{id:'',company:'CloudMetrics',role:'Data Engineer',location:'New York, NY',startDate:'Mar 2021',endDate:'Present',description:'Built event-driven pipelines ingesting 50M+ events weekly.\nReduced analytics query latency by 40% through partitioning and compaction.'}],
    projects:[{id:'',name:'Cloud Cost Optimizer',techStack:'Python, AWS, React',description:'Automated cost-analysis workflows that reduced monthly spend by 18%.',githubLink:'github.com/dchen-data/cost-optimizer',liveLink:''}],
    education:[{id:'',institution:'Columbia University',degree:'M.S.',field:'Data Science',startYear:'2018',endYear:'2020',score:'3.9 GPA'}],
    certifications:[{id:'',name:'Professional Data Engineer',organization:'Google Cloud',year:'2022',link:''}],achievements:['Speaker at Data Council 2024'],languages:['English','Mandarin']
  }),
  'creative-professional': withIds({
    personal:{fullName:'Sarah Johnson',jobTitle:'Product Designer',email:'sarah@designhub.com',phone:'+1 512 555 0122',location:'Austin, TX',linkedIn:'linkedin.com/in/sarahjohnson',github:'',portfolio:'sarahjohnson.design'},
    summary:'Product designer creating thoughtful design systems, research programs, and interactive experiences for complex products.',skills:['Figma','Design Systems','Prototyping','User Research','HTML/CSS','Illustration'],
    experiences:[{id:'',company:'BrightCanvas',role:'Senior Product Designer',location:'Austin, TX',startDate:'May 2019',endDate:'Present',description:'Led onboarding redesign that increased activation by 26%.\nEstablished a component library used by seven product teams.'}],
    projects:[{id:'',name:'Accessible Banking System',techStack:'Figma, Storybook',description:'Created an accessible cross-platform design system and documentation hub.',githubLink:'',liveLink:'sarahjohnson.design/banking'}],
    education:[{id:'',institution:'Rhode Island School of Design',degree:'B.F.A.',field:'Industrial Design',startYear:'2014',endYear:'2018',score:''}],
    certifications:[{id:'',name:'UX Certification',organization:'Nielsen Norman Group',year:'2021',link:''}],achievements:['Awwwards Honorable Mention, 2023'],languages:['English']
  })
}

export const createId = id
