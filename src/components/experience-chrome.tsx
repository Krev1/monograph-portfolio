"use client";

import { memo } from "react";
import { driverProjects } from "@/data/driver-projects";
import { ArrowDown, ArrowUpRight, Check, Fingerprint, Layers3, MoveHorizontal, ScanLine, Sparkles } from "lucide-react";

export const ExperienceIntro = memo(function ExperienceIntro() {
  return (
    <section className="experience-intro" aria-label="Welcome to KREV1">
      <div className="intro-kicker"><span /> CREATIVE DEVELOPER / INTERACTIVE PORTFOLIO</div>
      <h1>Every card.<br className="intro-break" /> <span>A new world.</span><ArrowUpRight aria-hidden="true" /></h1>
      <p>Three projects. One Driver. Choose your next transformation.</p>
      <div className="intro-signature" aria-hidden="true"><Fingerprint size={19} /><span>KREV1<br /><b>SELECTED WORKS / 2026</b></span></div>
    </section>
  );
});

const steps = [
  { title: "Open", icon: MoveHorizontal },
  { title: "Insert", icon: Layers3 },
  { title: "Close", icon: ScanLine },
  { title: "Transform", icon: Sparkles },
  { title: "Explore", icon: ArrowUpRight },
];

export function DriverJourney({ step }: { step: number }) {
  return (
    <ol className="driver-journey" aria-label={`Step ${step} of 5`}>
      {steps.map(({ title, icon: Icon }, index) => (
        <li key={title} className={index + 1 === step ? "is-current" : index + 1 < step ? "is-complete" : ""} aria-current={index + 1 === step ? "step" : undefined}>
          <span className="journey-icon">{index + 1 < step ? <Check size={12} aria-hidden="true" /> : <Icon size={13} aria-hidden="true" />}</span>
          <span>{title}</span>
          <small>0{index + 1}</small>
        </li>
      ))}
    </ol>
  );
}

export function ReaderHint() {
  return <div className="reader-hint"><span className="hint-mouse" aria-hidden="true"><ArrowDown size={12} /></span><span>Hold & drag down <i /> Push in 20%, then release</span></div>;
}

export const ExperienceSideNotes = memo(function ExperienceSideNotes() {
  return (
    <div className="experience-side-notes">
      <aside className="studio-note studio-note-left" aria-label="Project index">
        <span className="studio-note-kicker">SELECTED WORKS / 2026</span>
        <h2>Three cards.<br /><span>Three directions.</span></h2>
        <ol className="studio-project-index">
          {driverProjects.map(project => (
            <li key={project.id}>
              <span className="studio-project-number">{project.id}</span>
              <div><strong>{project.title}</strong><p>{project.category}</p></div>
              <i style={{ backgroundColor: project.mainCard.accent }} aria-hidden="true" />
            </li>
          ))}
        </ol>
        <p className="studio-note-foot">Choose a card.<br />Explore the work behind it.</p>
      </aside>
      <aside className="studio-note studio-note-right" aria-label="Driver interaction guide">
        <span className="studio-note-kicker">A SMALL RITUAL</span>
        <h2>Pull. Insert.<br /><span>Transform.</span></h2>
        <ol className="studio-interaction-index">
          <li><span>01</span><div><strong>Open the Driver</strong><p>Pull either handle outward.</p></div></li>
          <li><span>02</span><div><strong>Choose your world</strong><p>Click a card, or push it 20% into the slot.</p></div></li>
          <li><span>03</span><div><strong>Make the connection</strong><p>Push the handles in to transform.</p></div></li>
        </ol>
        <p className="studio-note-foot"><span className="studio-note-signal" aria-hidden="true" /> YOUR NEXT WORLD IS WAITING</p>
      </aside>
    </div>
  );
});
