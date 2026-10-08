"use client";
import {useState} from "react";
import {projects} from "@/data/site";

type Module={name:string;kind:"SKILL"|"TOOL"|"PROCESS";detail:string};
const modules:Record<string,Module[]>={
 "001":[
 {name:"PYTHON",kind:"TOOL",detail:"Python scripts support CSV transaction previews, data handling, prototypes and automated checks."},
 {name:"DATA PROCESSING",kind:"SKILL",detail:"Synthetic Vietnamese expense descriptions and a versioned data workflow support early experiments. These are not validated real-user datasets."},
 {name:"AI BASELINES",kind:"PROCESS",detail:"Prototype keyword and Dummy baselines are explored. The full machine-learning pipeline and finished app are still in development."},
 {name:"TESTING",kind:"SKILL",detail:"Automated tests, technical verification and documented task gates are part of the engineering workflow."},
 {name:"PRODUCT UX",kind:"PROCESS",detail:"Product requirements explore budgets, transaction flows and forecasts. User testing and completed UX screens are future work."}
 ],
 "002":[
 {name:"PYTHON",kind:"SKILL",detail:"Self-study lessons and coding exercises document the progression of Python fundamentals."},
 {name:"LEARNING DESIGN",kind:"PROCESS",detail:"Lessons, exercises and a learning roadmap are organized around real practice and SpendWise AI."},
 {name:"GITHUB",kind:"TOOL",detail:"Versioned learning materials, exercises and documentation are maintained publicly."}
 ],
 "003":[
 {name:"UI/UX",kind:"SKILL",detail:"A minimal, editorial interface designed around hierarchy, contrast and approachable navigation."},
 {name:"NEXT.JS",kind:"TOOL",detail:"Next.js App Router and React components power the website and project pages."},
 {name:"TYPESCRIPT",kind:"TOOL",detail:"Typed project data and reusable components keep the interface maintainable."},
 {name:"GITHUB API",kind:"TOOL",detail:"Public repositories are displayed using GitHub's public API."},
 {name:"VERCEL",kind:"TOOL",detail:"The site is hosted through Vercel with its source managed on GitHub."}
 ]
};
export default function DecadeDriver(){
 const [selected,setSelected]=useState<string|null>(null);
 const [activated,setActivated]=useState(false);
 const [moduleIndex,setModuleIndex]=useState<number|null>(null);
 const [round,setRound]=useState(0);
 const project=projects.find(p=>p.id===selected);
 const activeModules=selected?modules[selected]||[]:[];
 const choose=(id:string)=>{setSelected(id);setActivated(false);setModuleIndex(null);setRound(n=>n+1)};
 return <section id="work" className="dd-section" aria-labelledby="dd-heading">
 <div className="dd-section-top"><span>01 / PROJECT ARCHIVE</span><span>DECADE SYSTEM — PROJECT DRIVER</span></div>
 <div className="dd-intro"><p>SELECT. INSERT. TRANSFORM.</p><h2 id="dd-heading">PROJECT<br/><em>DECADE.</em></h2><span>Choose a project card, activate the driver, then explore its skills and tools.</span></div>
 <div className="dd-layout">
  <aside className="dd-deck" aria-label="Project cards"><div className="dd-mini-title">PROJECT CARDS <span>01 — 0{projects.length}</span></div>
   <div className="dd-deck-list">{projects.map((p,i)=><button type="button" className={"dd-main-card "+(selected===p.id?"dd-picked":"")} aria-pressed={selected===p.id} onClick={()=>choose(p.id)} key={p.id}><span className="dd-card-top"><span>K / {p.id}</span><span>PROJECT</span></span><strong>{p.title}</strong><span className="dd-card-bottom"><span>{p.type}</span><span>↗</span></span><span className="dd-card-rail" aria-hidden="true"/></button>)}</div>
  </aside>
  <div className="dd-driver-area"><div className="dd-mini-title">TRANSFORMATION DRIVER <span>{activated?"ACTIVE":"STANDBY"}</span></div>
   <div className={"dd-driver "+(activated?"dd-driver-active ":"")+(selected?"dd-driver-loaded":"") } role="status" aria-live="polite">
    <div key={"hardware-"+round} className="dd-driver-hardware"><div className="dd-driver-side"/><div className="dd-driver-frame"><div className="dd-driver-screen"><span className="dd-small-glyph">KREV1 / DECADE</span>{project?<div key={"insert-"+selected} className="dd-inserted"><span>{activated?"TRANSFORMED":"CARD READY"}</span><strong>{project.title}</strong><span>PROJECT / {project.id}</span></div>:<div className="dd-slot-empty"><span>↳</span><strong>INSERT<br/>PROJECT CARD</strong></div>}</div><span className="dd-driver-indicator" aria-hidden="true"/><div aria-hidden="true" className="dd-transformation-flash"/></div><div className="dd-driver-side"/></div>
    <div className="dd-driver-control"><span>{!project?"AWAITING INPUT":activated?"PROJECT ACTIVE":"CARD DETECTED"}</span><button type="button" disabled={!project||activated} onClick={()=>{setActivated(true);setModuleIndex(null);setRound(n=>n+1)}}>{activated?"HENSHIN COMPLETE ✓":"HENSHIN →"}</button></div>
   </div>
  </div>
 </div>
 <div className="dd-detail" aria-live="polite">{activated&&project?<><div className="dd-detail-heading"><span>ACTIVE PROJECT / {project.id}</span><strong>{project.title}</strong><p>{project.description}</p><div className="dd-links">{project.id==="001"&&<a href="/projects/spendwise-ai">READ CASE STUDY ↗</a>}{project.url&&<a href={project.url} target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>}</div></div>
 <div className="dd-modules"><div className="dd-mini-title">ABILITY CARDS <span>ACTIVATE TO INSPECT</span></div><div className="dd-modules-grid">{activeModules.map((m,i)=><button type="button" key={m.name} className={"dd-sub-card "+(i===moduleIndex?"dd-sub-active":"") } onClick={()=>setModuleIndex(i)} aria-pressed={i===moduleIndex}><span>{m.kind} / 0{i+1}</span><strong>{m.name}</strong><small>{moduleIndex===i?"ACTIVATED ✓":"ACTIVATE ↗"}</small></button>)}</div><div key={selected+"-"+moduleIndex} className="dd-module-panel">{moduleIndex===null?<p>Select an ability card to reveal how it relates to this project.</p>:<><span>{activeModules[moduleIndex].kind} MODULE / ACTIVE</span><h3>{activeModules[moduleIndex].name}</h3><p>{activeModules[moduleIndex].detail}</p></>}</div></div></>:<div className="dd-standby-message">{project?"PRESS HENSHIN TO REVEAL PROJECT DETAILS.":"SELECT A MAIN PROJECT CARD TO BEGIN."}</div>}</div>
 <p className="dd-disclaimer">Original interaction concept inspired by collectible-card transformation systems. Project capabilities reflect documented work, not fictional power levels.</p>
 </section>
}
