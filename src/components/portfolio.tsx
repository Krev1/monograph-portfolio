"use client";
import { useState } from "react";
import { profile, projects } from "@/data/site";
import GitHubRepos from "./github-repos";
import DecadeDriver from "./decade-driver";

export default function Portfolio() {
 const [menuOpen,setMenuOpen]=useState(false);
 const closeMenu=()=>setMenuOpen(false);
 return <div className="k-minimal">
  <header className="k-header">
   <a className="k-logo" href="#top" onClick={closeMenu}>KREV1<span>®</span></a>
   <span className="k-header-note">INDEPENDENT DIGITAL PORTFOLIO / 2026</span>
   <button type="button" className="k-menu-button" aria-expanded={menuOpen} aria-controls="k-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?"CLOSE −":"MENU +"}</button>
   <nav id="k-navigation" className={menuOpen?"k-navigation k-navigation-open":"k-navigation"} aria-label="Main navigation">
    <a href="#work" onClick={closeMenu}>WORK</a><a href="#about" onClick={closeMenu}>ABOUT</a><a href="#contact" onClick={closeMenu}>CONTACT</a><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
   </nav>
  </header>
  <main id="top">
   <section className="k-hero" aria-labelledby="k-hero-title">
    <div className="k-hero-index"><span>DESIGN × INTELLIGENCE</span><span>HCMC / VIETNAM</span></div>
    <div className="k-hero-center"><p className="k-overline">COMPUTER SCIENCE / ARTIFICIAL INTELLIGENCE</p><h1 id="k-hero-title">BEYOND<br/>THE <span>INTERFACE.</span></h1><p className="k-hero-subtitle">Human-centered design. Intelligent engineering.</p></div>
    <div className="k-hero-bottom"><span>UI/UX DESIGN — AI — SOFTWARE DEVELOPMENT</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
   </section>
   <DecadeDriver />
   <section id="about" className="k-about">
    <div className="k-section-heading"><span>02 / ABOUT</span><span>WHO I AM</span></div>
    <div className="k-about-content"><h2>LESS,<br/><span>BUT BETTER.</span></h2><div className="k-about-description"><p>{profile.about}</p><div className="k-expertise-list"><div><span>01</span><strong>UI/UX DESIGN</strong></div><div><span>02</span><strong>ARTIFICIAL INTELLIGENCE</strong></div><div><span>03</span><strong>FULL-STACK DEVELOPMENT</strong></div><div><span>04</span><strong>GAME DESIGN</strong></div></div></div></div>
   </section>
   <section className="k-github"><GitHubRepos username={profile.githubUsername}/></section>
   <section id="resume" className="k-resume"><div className="k-section-heading"><span>03 / RESUME</span><span>BACKGROUND</span></div><div className="k-simple-row"><span>Computer Science / Artificial Intelligence</span><span>CV AVAILABLE UPON REQUEST</span></div></section>
   <section id="contact" className="k-contact"><div className="k-section-heading"><span>04 / CONTACT</span><span>LET'S CONNECT</span></div><p>HAVE SOMETHING<br/>IN MIND?</p><a href={profile.github} target="_blank" rel="noreferrer">FIND ME ON GITHUB ↗</a></section>
  </main>
  <footer className="k-footer"><span>KREV1® / {new Date().getFullYear()}</span><span>DESIGN × TECHNOLOGY</span><a href="#top">BACK TO TOP ↑</a></footer>
 </div>;
}
