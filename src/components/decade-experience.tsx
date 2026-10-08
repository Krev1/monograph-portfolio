"use client";

import {useEffect, useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent, PointerEvent} from "react";
import {projects, profile} from "@/data/site";

type Phase="locked"|"open"|"loaded"|"transforming"|"active"|"reopened"|"ejecting";
type Direction=-1|1;
type Ability={label:string;type:"SKILL"|"TOOL"|"PROCESS";description:string};
type CardDrag={id:string;x:number;y:number};
type Gesture={x:number;y:number;direction?:Direction};
const THRESHOLD_X=65;
const THRESHOLD_Y=55;
type Sfx="open"|"insert"|"henshin"|"ability"|"eject";
const tones:Record<Sfx,Array<[number,number,number,OscillatorType]>>={
 open:[[190,0,.08,"square"],[310,.085,.12,"triangle"]],
 insert:[[440,0,.055,"triangle"],[660,.07,.06,"sine"],[880,.14,.13,"sine"]],
 henshin:[[135,0,.16,"sawtooth"],[180,.17,.15,"sawtooth"],[370,.36,.17,"triangle"],[550,.55,.15,"triangle"],[740,.73,.24,"sine"]],
 ability:[[495,0,.08,"triangle"],[740,.09,.13,"sine"]],
 eject:[[440,0,.09,"sine"],[260,.1,.14,"triangle"]]
};

const abilities:Record<string,Ability[]>={
 "001":[
  {label:"PYTHON",type:"TOOL",description:"Python is used for transaction and CSV tooling, data preparation and experimental scripts."},
  {label:"DATA",type:"SKILL",description:"Synthetic transaction records and documented data processing steps support early experiments. No real-world dataset performance is claimed."},
  {label:"AI BASELINES",type:"PROCESS",description:"Keyword and Dummy baselines are exploratory prototypes. The production ML pipeline and full application are not finished."},
  {label:"TESTING",type:"SKILL",description:"Automated checks, tests and technical task gates provide engineering evidence during development."},
  {label:"PRODUCT THINKING",type:"PROCESS",description:"Budgeting and spending insights are defined in product specifications; completed UI research and user testing are future work."}
 ],
 "002":[
  {label:"PYTHON",type:"SKILL",description:"Practice with Python concepts through recorded lessons and coding exercises."},
  {label:"DOCUMENTATION",type:"PROCESS",description:"A public learning track records exercises and decisions while building stronger foundations."},
  {label:"GITHUB",type:"TOOL",description:"Git and GitHub organize learning material and track progress."}
 ],
 "003":[
  {label:"UI / UX",type:"SKILL",description:"A one-screen interaction design using intentional hierarchy, card metaphors and state-based feedback."},
  {label:"NEXT.JS",type:"TOOL",description:"React components and the Next.js App Router render the portfolio."},
  {label:"TYPESCRIPT",type:"TOOL",description:"Strongly typed project data and gesture handlers keep the interface maintainable."},
  {label:"CSS MOTION",type:"SKILL",description:"Original CSS transforms, keyframes and reduced-motion support create the transformation sequence."},
  {label:"GITHUB",type:"TOOL",description:"Source control and public repository links document the work."}
 ]
};

function Art({id}:{id:string}){
 if(id==="001")return <div className="ex-visual ex-visual-finance" aria-label="Abstract finance data visual, not a product screenshot" role="img"><div className="ex-art-overline">SPENDWISE / EXPERIMENTAL DATA</div><div className="ex-chart"><div className="ex-chart-grid"/><svg viewBox="0 0 520 250" preserveAspectRatio="none" aria-hidden="true"><path d="M0 213 C80 206 82 90 149 112 S263 215 321 124 S431 102 520 23" stroke="#FF4EB1" strokeWidth="4" fill="none"/><path d="M0 213 C80 206 82 90 149 112 S263 215 321 124 S431 102 520 23 L520 250 L0 250Z" fill="url(#exFade)" opacity=".38"/><defs><linearGradient id="exFade" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#FF4EB1"/><stop offset="1" stopColor="#FF4EB1" stopOpacity="0"/></linearGradient></defs></svg></div><span className="ex-art-bottom">DATA → INSIGHT / CONCEPT</span></div>;
 if(id==="002")return <div className="ex-visual ex-visual-learn" role="img" aria-label="Abstract coding and learning concept visual"><div className="ex-art-overline">LEARN / CONTINUOUS PRACTICE</div><div className="ex-learn-mark"><span>PY</span><span>TH</span><span>ON</span></div><span className="ex-art-bottom">BUILD THE FOUNDATION / 001</span></div>;
 return <div className="ex-visual ex-visual-portfolio" role="img" aria-label="Abstract KREV1 interface visual"><div className="ex-art-overline">KREV1 / INTERACTION SYSTEM</div><div className="ex-portfolio-mark">K<span>·</span>1</div><span className="ex-art-bottom">DESIGN × ENGINEERING / 2026</span></div>;
}

function ProjectCard({id,index,disabled,onBegin,onMove,onEnd,onKeyboard}:{id:string;index:number;disabled:boolean;onBegin:(e:PointerEvent<HTMLButtonElement>,id:string)=>void;onMove:(e:PointerEvent<HTMLButtonElement>)=>void;onEnd:(e:PointerEvent<HTMLButtonElement>)=>void;onKeyboard:(id:string)=>void}){
 const p=projects.find(p=>p.id===id)!;
 return <button className={"ex-project-card ex-project-card-"+index} type="button" disabled={disabled} onPointerDown={e=>onBegin(e,id)} onPointerMove={onMove} onPointerUp={onEnd} onPointerCancel={onEnd} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onKeyboard(id)}}} aria-label={p.title+" — drag vertically into the Driver slot"}>
  <span className="ex-card-header"><b>K / {p.id}</b><span>PROJECT CARD</span></span>
  <span className="ex-card-emblem" aria-hidden="true"><span className="ex-card-diagonal"/><b>{String(index+1).padStart(2,"0")}</b></span>
  <strong>{p.title}</strong><span className="ex-card-footer"><span>{p.type}</span><span className="ex-barcode" aria-hidden="true"/></span>
 </button>;
}

export default function DecadeExperience(){
 const [phase,setPhase]=useState<Phase>("locked");
 const [openDirection,setOpenDirection]=useState<Direction|null>(null);
 const [projectId,setProjectId]=useState<string|null>(null);
 const [activeAbility,setActiveAbility]=useState<number|null>(null);
 const [gripOffset,setGripOffset]=useState(0);
 const [cardDrag,setCardDrag]=useState<CardDrag|null>(null);
 const [slotLift,setSlotLift]=useState(0);
 const [cycle,setCycle]=useState(0);
 const [soundEnabled,setSoundEnabled]=useState(false);
 const audioContext=useRef<AudioContext|null>(null);
 const playSfx=(type:Sfx)=>{
  if(!soundEnabled)return;
  try{
   const ctx=audioContext.current??new AudioContext();audioContext.current=ctx;void ctx.resume();const now=ctx.currentTime;
   tones[type].forEach(([hz,delay,duration,wave])=>{
    const osc=ctx.createOscillator();const gain=ctx.createGain();const start=now+delay;
    osc.type=wave;osc.frequency.setValueAtTime(hz,start);osc.frequency.exponentialRampToValueAtTime(hz*1.14,start+duration);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.045,start+.02);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    osc.connect(gain);gain.connect(ctx.destination);osc.start(start);osc.stop(start+duration+.015);
   });
  }catch{/* Audio is optional; gesture experience remains usable. */}
 };
 const gripStart=useRef<Gesture|null>(null);
 const dragStart=useRef<{id:string;x:number;y:number}|null>(null);
 const ejectStart=useRef<number|null>(null);
 const slotRef=useRef<HTMLButtonElement|null>(null);
 useEffect(()=>()=>{if(audioContext.current)void audioContext.current.close()},[]);
 const liveProject=projects.find(p=>p.id===projectId);
 const modules=projectId?abilities[projectId]||[]:[];
 const isOpen=phase==="open"||phase==="reopened"||phase==="loaded"||phase==="ejecting";
 const canInsert=phase==="open"&&!projectId;
 const hasCard=Boolean(liveProject);
 
 useEffect(()=>{if(phase!=="transforming")return;const timer=window.setTimeout(()=>{setPhase("active");setActiveAbility(null)},1080);return()=>window.clearTimeout(timer)},[phase]);
 useEffect(()=>{if(phase!=="ejecting")return;const timer=window.setTimeout(()=>{setProjectId(null);setPhase("open");setSlotLift(0);setCycle(n=>n+1)},460);return()=>window.clearTimeout(timer)},[phase]);
 const beginOpen=(direction:Direction)=>{playSfx("open");setOpenDirection(direction);setPhase(phase==="active"?"reopened":"open");setActiveAbility(null);setCycle(n=>n+1)};
 const turnGrip=(direction:Direction)=>{
  if(phase==="locked"||phase==="active"){beginOpen(direction);return;}
  if(phase==="loaded"&&openDirection!==null&&direction===-openDirection){playSfx("henshin");setPhase("transforming");setCycle(n=>n+1);}
 };
 const onGripDown=(e:PointerEvent<HTMLButtonElement>)=>{if(phase!=="locked"&&phase!=="loaded"&&phase!=="active")return;e.currentTarget.setPointerCapture(e.pointerId);gripStart.current={x:e.clientX,y:e.clientY};setGripOffset(0)};
 const onGripMove=(e:PointerEvent<HTMLButtonElement>)=>{if(!gripStart.current)return;setGripOffset(Math.max(-105,Math.min(105,e.clientX-gripStart.current.x)))};
 const onGripEnd=(e:PointerEvent<HTMLButtonElement>)=>{const start=gripStart.current;gripStart.current=null;setGripOffset(0);if(!start)return;const dx=e.clientX-start.x;if(Math.abs(dx)>=THRESHOLD_X)turnGrip(dx>0?1:-1)};
 const onGripKey=(e:KeyboardEvent<HTMLButtonElement>)=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();turnGrip(e.key==="ArrowRight"?1:-1)};
 const insert=(id:string)=>{if(!canInsert)return;playSfx("insert");setProjectId(id);setPhase("loaded");setActiveAbility(null);setCycle(n=>n+1)};
 const onCardDown=(e:PointerEvent<HTMLButtonElement>,id:string)=>{if(!canInsert)return;e.currentTarget.setPointerCapture(e.pointerId);dragStart.current={id,x:e.clientX,y:e.clientY};setCardDrag({id,x:e.clientX,y:e.clientY})};
 const onCardMove=(e:PointerEvent<HTMLButtonElement>)=>{if(!dragStart.current)return;setCardDrag({...dragStart.current,x:e.clientX,y:e.clientY})};
 const onCardEnd=(e:PointerEvent<HTMLButtonElement>)=>{
  const start=dragStart.current;dragStart.current=null;setCardDrag(null);if(!start)return;
  const rect=slotRef.current?.getBoundingClientRect();
  const inside=!!rect&&e.clientX>=rect.left-18&&e.clientX<=rect.right+18&&e.clientY>=rect.top-24&&e.clientY<=rect.bottom+24;
  if(inside&&e.clientY-start.y>50)insert(start.id);
 };
 const eject=()=>{if(phase!=="reopened")return;playSfx("eject");setPhase("ejecting");setSlotLift(0);setActiveAbility(null)};
 const onEjectDown=(e:PointerEvent<HTMLButtonElement>)=>{if(phase!=="reopened")return;e.currentTarget.setPointerCapture(e.pointerId);ejectStart.current=e.clientY;setSlotLift(0)};
 const onEjectMove=(e:PointerEvent<HTMLButtonElement>)=>{if(ejectStart.current===null)return;setSlotLift(Math.max(-105,Math.min(0,e.clientY-ejectStart.current)))};
 const onEjectEnd=(e:PointerEvent<HTMLButtonElement>)=>{const start=ejectStart.current;ejectStart.current=null;setSlotLift(0);if(start!==null&&e.clientY-start<-THRESHOLD_Y)eject()};
 const instructions:Record<Phase,string>={
  locked:"01 / KÉO TAY NẮM DRIVER SANG TRÁI HOẶC PHẢI ĐỂ MỞ",
  open:"02 / KÉO THẺ DỰ ÁN TỪ TRÊN XUỐNG KHE THẺ",
  loaded:"03 / KÉO DRIVER NGƯỢC HƯỚNG ĐỂ ĐÓNG VÀ HENSHIN",
  transforming:"TRANSFORMING / HENSHIN",
  active:"PROJECT ACTIVE / KÉO DRIVER ĐỂ MỞ VÀ ĐỔI THẺ",
  reopened:"04 / KÉO THẺ ĐANG CẮM LÊN TRÊN ĐỂ RÚT RA",
  ejecting:"EJECTING / THẺ ĐANG ĐƯỢC RÚT RA"
 };
 const progress=phase==="locked"?1:phase==="open"?2:phase==="loaded"?3:phase==="transforming"?4:phase==="active"?5:6;
 return <main className={"ex-page ex-phase-"+phase} aria-label="KREV1 interactive portfolio">
  <div className="ex-ambient" aria-hidden="true"/><div className="ex-grid" aria-hidden="true"/>
  <header className="ex-header"><a href="/" className="ex-logo" aria-label="KREV1 home">KREV1<span>®</span></a><span className="ex-header-center">D E C A D E / P R O J E C T — S Y S T E M</span><div className="ex-header-actions"><button type="button" className="ex-sound-toggle" aria-pressed={soundEnabled} onClick={()=>setSoundEnabled(v=>!v)}>{soundEnabled?"SFX ON ◖))":"SFX OFF ◖"}</button><a href={profile.github} target="_blank" rel="noreferrer">SOURCE ↗</a></div></header>
  <div className="ex-progress" aria-label={"Step "+progress+" of 6"}><span>PROJECT DRIVER</span><div className="ex-progress-bars">{Array.from({length:6},(_,i)=><i key={i} className={i<progress?"ex-progress-lit":""}/>)}</div><span>0{progress} / 06</span></div>
  <div className="ex-status" aria-live="polite">{instructions[phase]}</div>
  {(phase==="locked"||isOpen)&&<div className="ex-deck" aria-label="Project card deck"><div className="ex-deck-title"><span>PROJECT ARCHIVE</span><span>CHỌN THẺ → KÉO XUỐNG</span></div><div className="ex-card-row">{projects.map((p,i)=><ProjectCard key={p.id} id={p.id} index={i} disabled={!canInsert} onBegin={onCardDown} onMove={onCardMove} onEnd={onCardEnd} onKeyboard={insert}/>)}</div></div>}
  {(phase==="active"||phase==="transforming")&&liveProject&&<section className="ex-stage" aria-labelledby="ex-project-title"><div className="ex-stage-meta"><span>PROJECT / {liveProject.id}</span><span>2026 — ACTIVE FORM</span></div><div className="ex-stage-main"><div className="ex-stage-copy"><p className="ex-kicker">TRANSFORMATION COMPLETE / {liveProject.type}</p><h1 id="ex-project-title">{liveProject.title}</h1><p>{liveProject.description}</p><div className="ex-stage-links">{liveProject.url&&<a href={liveProject.url} target="_blank" rel="noreferrer">VIEW REPOSITORY ↗</a>}</div></div><Art id={liveProject.id}/></div><div className="ex-ability-area"><span className="ex-ability-label">ABILITY CARDS / CHỌN KỸ NĂNG ĐỂ KÍCH HOẠT</span><div className="ex-ability-row">{modules.map((m,i)=><button className={"ex-ability-card "+(activeAbility===i?"ex-ability-selected":"")} type="button" key={m.label} onClick={()=>{playSfx("ability");setActiveAbility(i)}} aria-pressed={activeAbility===i}><small>{m.type} / 0{i+1}</small><strong>{m.label}</strong></button>)}</div><div className="ex-ability-details" aria-live="polite">{activeAbility===null?<p>SELECT AN ABILITY CARD TO REVEAL TOOLS, SKILLS AND PROCESS.</p>:<><span>{modules[activeAbility].type} ACTIVATED</span><strong>{modules[activeAbility].label}</strong><p>{modules[activeAbility].description}</p></>}</div></div></section>}
  <div className={"ex-driver-zone "+(phase==="active"?"ex-driver-docked":"")}><div className="ex-driver-caption"><span>DECADE / DEVICE 01</span><span>{phase==="loaded"?"CARD SET":isOpen?"DRIVER OPEN":phase==="active"?"ACTIVE":"DRIVER LOCKED"}</span></div><div className={"ex-device "+(isOpen?"ex-device-open":"")+(phase==="transforming"?" ex-device-transform":"") } key={phase==="transforming"?"henshin-"+cycle:"device"}><div className="ex-belt ex-belt-left" aria-hidden="true"/><div className="ex-mechanism"><div className="ex-mechanism-tracks" aria-hidden="true"><i/><i/><i/></div><div className="ex-rotating-reader" aria-hidden="true"><div className="ex-rotating-reader-ring"/><div className="ex-reader-cross"><i/><i/><i/><i/></div></div><div className="ex-gate ex-gate-left" aria-hidden="true"/><div className="ex-gate ex-gate-right" aria-hidden="true"/><div className="ex-slot-surround"><button ref={slotRef} type="button" className={"ex-slot "+(hasCard?"ex-slot-filled":"")} disabled={!(phase==="open"||phase==="reopened")} onPointerDown={onEjectDown} onPointerMove={onEjectMove} onPointerUp={onEjectEnd} onPointerCancel={onEjectEnd} onKeyDown={e=>{if(e.key==="ArrowUp"){e.preventDefault();eject()}}} aria-label={phase==="reopened"?"Swipe card upward to eject; press Arrow Up for keyboard":"Vertical card insertion slot"}><div className="ex-slot-rim"/>{liveProject?<div className="ex-slot-card" style={{transform:slotLift?"translateY("+slotLift+"px)":undefined}}><span>PROJECT / {liveProject.id}</span><strong>{liveProject.title}</strong><small>{phase==="reopened"?"↑ PULL OUT":phase==="loaded"?"READY":"ACTIVATED"}</small></div>:<span className="ex-slot-placeholder">↓<small>INSERT CARD</small></span>}</button></div><div className="ex-driver-core"><span>DECADE</span><div className="ex-core-emblem" aria-hidden="true"><span/></div><small>KREV1 / 2026</small></div><button className="ex-grip ex-grip-left" type="button" style={{"--ex-grip-offset":gripOffset+"px"} as CSSProperties} onPointerDown={onGripDown} onPointerMove={onGripMove} onPointerUp={onGripEnd} onPointerCancel={()=>{gripStart.current=null;setGripOffset(0)}} onKeyDown={onGripKey} disabled={phase==="open"||phase==="reopened"||phase==="transforming"} aria-label={phase==="loaded"?"Drag opposite opening direction to close and transform; ArrowLeft or ArrowRight on keyboard":"Drag left or right to open driver; ArrowLeft or ArrowRight on keyboard"}><span className="ex-grip-lines" aria-hidden="true">≡</span><span>PULL ◀ ▶</span></button><button className="ex-grip ex-grip-right" type="button" style={{"--ex-grip-offset":gripOffset+"px"} as CSSProperties} onPointerDown={onGripDown} onPointerMove={onGripMove} onPointerUp={onGripEnd} onPointerCancel={()=>{gripStart.current=null;setGripOffset(0)}} onKeyDown={onGripKey} disabled={phase==="open"||phase==="reopened"||phase==="transforming"} aria-label={phase==="loaded"?"Drag opposite opening direction to close and transform; ArrowLeft or ArrowRight on keyboard":"Drag left or right to open driver; ArrowLeft or ArrowRight on keyboard"}><span className="ex-grip-lines" aria-hidden="true">≡</span><span>DRAG ◀ ▶</span></button><div className="ex-scan" aria-hidden="true"/></div><div className="ex-belt ex-belt-right" aria-hidden="true"/></div><div className="ex-driver-hint">{phase==="loaded"?"REVERSE DIRECTION TO HENSHIN":phase==="reopened"?"SWIPE INSERTED CARD UP TO EJECT":phase==="active"?"DRAG THE HANDLE TO REOPEN":"DRAG HANDLE LEFT OR RIGHT / USE ARROW KEYS"}</div></div>
  <footer className="ex-footer"><span>© 2026 KREV1 — ORIGINAL INTERACTIVE PORTFOLIO</span><span>INSPIRED BY CARD TRANSFORMATION SYSTEMS</span></footer>
  {phase==="transforming"&&<div className="ex-henshin" aria-live="assertive"><div className="ex-henshin-rings"/><strong>HENSHIN</strong><span>PROJECT SYSTEM / ACTIVATING</span></div>}
  {cardDrag&&<div className="ex-card-ghost" style={{left:cardDrag.x,top:cardDrag.y}} aria-hidden="true"><span>PROJECT / {cardDrag.id}</span><strong>{projects.find(p=>p.id===cardDrag.id)?.title}</strong><span>↓ INSERT</span></div>}
 </main>;
}
