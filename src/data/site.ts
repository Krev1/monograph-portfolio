// Update email, LinkedIn and resume only after verifying your public contact details.
export const profile = {
  name: "Tri (Krev1)", initials: "KT", role: "Computer Science Student · Artificial Intelligence",
  location: "Ho Chi Minh City, Vietnam", email: "",
  github: "https://github.com/Krev1", githubUsername: "Krev1",
  linkedin: "", resumeUrl: "/resume.pdf",
  headline: ["DESIGNING INTELLIGENT.", "DIGITAL EXPERIENCES."],
  description: "Computer Science student specializing in Artificial Intelligence, with a primary focus on UI/UX design and AI-powered digital experiences.",
  about: "I study Computer Science with a specialization in Artificial Intelligence. My main interests are human-centered UI/UX and AI; I also explore full-stack software development and game design.",
  skills: ["UI/UX Design", "Artificial Intelligence", "Computer Science", "Full-stack Development", "Game Design"],
};
export type Project = {id:string;title:string;type:string;year:string;description:string;stack:string[];url?:string};
// Verified repository-backed projects. Avoid describing unfinished features as completed.
export const projects: Project[] = [
  {
    id: "001",
    title: "SPENDWISE AI",
    type: "AI / PYTHON / FINTECH",
    year: "2026",
    description: "In-progress personal finance and AI learning project. Includes transaction and CSV tooling, specifications, test coverage, and prototype baselines. The full web application and trained ML pipeline are not complete.",
    stack: ["Python", "AI Research", "Data Processing", "Testing"],
    url: "https://github.com/Krev1/spendwise-ai",
  },
  {
    id: "002",
    title: "LEARN",
    type: "PYTHON / LEARNING JOURNAL",
    year: "2026",
    description: "Documented Python self-study journey with lessons, exercises and a companion learning track for SpendWise AI.",
    stack: ["Python", "Computer Science", "Self-study"],
    url: "https://github.com/Krev1/Learn",
  },
  {
    id: "003",
    title: "KREV1 PORTFOLIO",
    type: "UI/UX / WEB DEVELOPMENT",
    year: "2026",
    description: "This personal portfolio, built using Next.js and TypeScript, with a cinematic minimalist visual direction and live GitHub repository integration.",
    stack: ["Next.js", "TypeScript", "UI/UX", "GitHub API"],
    url: "https://github.com/Krev1/monograph-portfolio",
  },
];
