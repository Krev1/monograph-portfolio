// Replace all sample information below before publishing your portfolio.
export const profile = {
  name: "YOUR NAME", initials: "YN", role: "Computer Science Student · Artificial Intelligence",
  location: "Ho Chi Minh City, Vietnam", email: "hello@example.com",
  github: "https://github.com/Krev1", githubUsername: "Krev1",
  linkedin: "https://www.linkedin.com/", resumeUrl: "/resume.pdf",
  headline: ["DESIGNING INTELLIGENT.", "DIGITAL EXPERIENCES."],
  description: "Computer Science student specializing in Artificial Intelligence, with a primary focus on UI/UX design and AI-powered digital experiences.",
  about: "I study Computer Science with a specialization in Artificial Intelligence. My main interests are human-centered UI/UX and AI; I also explore full-stack software development and game design.",
  skills: ["UI/UX Design", "Artificial Intelligence", "Computer Science", "Full-stack Development", "Game Design"],
};
export type Project = {id:string;title:string;type:string;year:string;description:string;stack:string[];url?:string};
// Illustrative concepts, not claims of completed professional projects.
export const projects:Project[] = [
  {id:"001",title:"SURVIVAL WORLD",type:"GAME / SYSTEM DESIGN",year:"2026",description:"An exploration prototype concept focused on worldbuilding and survival systems.",stack:["TypeScript","Game Design"]},
  {id:"002",title:"PRODUCT INTERFACE",type:"WEB / UI DESIGN",year:"2026",description:"An experimental digital interface focused on clarity and responsive layouts.",stack:["Next.js","React","CSS"]},
  {id:"003",title:"DIGITAL STUDIO",type:"CREATIVE DEVELOPMENT",year:"2026",description:"A minimal web experience combining expressive typography and subtle interactions.",stack:["TypeScript","UI/UX"]},
];
