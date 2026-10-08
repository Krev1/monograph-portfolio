// Replace all sample information below before publishing your portfolio.
export const profile = {
  name: "YOUR NAME", initials: "YN", role: "Software Developer / Creative Technologist",
  location: "Ho Chi Minh City, Vietnam", email: "hello@example.com",
  github: "https://github.com/Krev1", githubUsername: "Krev1",
  linkedin: "https://www.linkedin.com/", resumeUrl: "/resume.pdf",
  headline: ["DESIGN-MINDED.", "DEVELOPMENT-DRIVEN."],
  description: "I create thoughtful digital experiences at the intersection of clean design and functional code.",
  about: "I care about purposeful interfaces, well-structured software, and the little details that make a digital product feel right.",
  skills: ["TypeScript", "React", "Next.js", "Flutter", "Firebase", "UI/UX", "Git"],
};
export type Project = {id:string;title:string;type:string;year:string;description:string;stack:string[];url?:string};
// Illustrative concepts, not claims of completed professional projects.
export const projects:Project[] = [
  {id:"001",title:"SURVIVAL WORLD",type:"GAME / SYSTEM DESIGN",year:"2026",description:"An exploration prototype concept focused on worldbuilding and survival systems.",stack:["TypeScript","Game Design"]},
  {id:"002",title:"PRODUCT INTERFACE",type:"WEB / UI DESIGN",year:"2026",description:"An experimental digital interface focused on clarity and responsive layouts.",stack:["Next.js","React","CSS"]},
  {id:"003",title:"DIGITAL STUDIO",type:"CREATIVE DEVELOPMENT",year:"2026",description:"A minimal web experience combining expressive typography and subtle interactions.",stack:["TypeScript","UI/UX"]},
];
