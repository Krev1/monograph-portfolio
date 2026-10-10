import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type { PortfolioProject } from "@/data/driver-projects";
import { CardEmblem } from "./card-emblem";
import AnimatedContent from "./react-bits/AnimatedContent";
import SplitText from "./react-bits/SplitText";
import { createProjectScroll } from "@/lib/project-scroll";
import type { ProjectScroll } from "@/lib/project-scroll";
import "lenis/dist/lenis.css";

function ProjectVisual({ project }: { project: PortfolioProject }) {
  return (
    <figure className={"project-visual visual-" + project.visual}>
      <span className="visual-caption">
        {project.visual === "ledger"
          ? "TRANSACTIONS → EXPERIMENTS"
          : project.visual === "learning"
            ? "PRACTICE → UNDERSTANDING"
            : "DESIGN → INTERACTION"}
      </span>
      <div className="visual-emblem">
        <CardEmblem emblem={project.mainCard.emblem} />
      </div>
      <div className="visual-trace" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <i key={i} style={{ height: i * 17 + 12 + "%" }} />
        ))}
      </div>
      <figcaption>
        Original concept visual · not a product screenshot
      </figcaption>
    </figure>
  );
}

export default function ProjectStage({
  project,
  abilityId,
  onAbility,
  headingRef,
  reduced,
}: {
  project: PortfolioProject;
  abilityId: string | null;
  onAbility: (id: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
  reduced: boolean;
}) {
  const ability = project.abilities.find((item) => item.id === abilityId);
  const stageRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<ProjectScroll | null>(null);
  useEffect(() => {
    if (!stageRef.current || !contentRef.current) return;
    const scrolling = createProjectScroll(
      stageRef.current,
      contentRef.current,
      reduced,
    );
    scrollRef.current = scrolling;
    return () => {
      scrolling.destroy();
      scrollRef.current = null;
    };
  }, [project.id, reduced]);
  useEffect(() => {
    if (!abilityId || !stageRef.current || !panelRef.current) return;
    const stage = stageRef.current;
    const top =
      panelRef.current.getBoundingClientRect().top -
      stage.getBoundingClientRect().top +
      stage.scrollTop;
    scrollRef.current?.resize();
    scrollRef.current?.scrollTo(Math.max(0, top - 12));
  }, [abilityId]);
  return (
    <section
      ref={stageRef}
      className="project-stage"
      aria-labelledby="project-title"
      tabIndex={0}
      data-testid="project-stage"
    >
      <div className="project-stage-content" ref={contentRef}>
        <div className="stage-index">
          <span>ACTIVE FORM / {project.id}</span>
          <span>
            {project.year} <i />{" "}
            {project.status === "in-progress"
              ? "WORK IN PROGRESS"
              : project.status.toUpperCase()}
          </span>
        </div>
        <div className="stage-main">
          <div className="stage-copy">
            <p className="eyebrow">{project.category}</p>
            <h1 id="project-title" tabIndex={-1} ref={headingRef}>
              <SplitText
                key={project.id}
                text={project.title}
                reduced={reduced}
              />
            </h1>
            <p className="project-description">{project.description}</p>
            <a
              className="source-link"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              EXPLORE SOURCE <span aria-hidden="true">↗</span>
            </a>
          </div>
          <ProjectVisual project={project} />
        </div>
        <AnimatedContent scroller={stageRef} reduced={reduced}>
          <div className="project-facts">
            <div>
              <span className="eyebrow">BUILT & DOCUMENTED</span>
              <p>{project.contribution}</p>
            </div>
            <div>
              <span className="eyebrow">CURRENT OUTPUT</span>
              <ul>
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="technology-list" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </AnimatedContent>
        <AnimatedContent scroller={stageRef} reduced={reduced} distance={0}>
          <div className="ability-section">
            <div className="ability-heading">
              <span className="eyebrow">ABILITY CARDS</span>
              <span>Inspect a tool, skill or process</span>
            </div>
            <div className="ability-deck">
              {project.abilities.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={
                    "ability-card" +
                    (ability?.id === item.id ? " is-selected" : "")
                  }
                  aria-pressed={ability?.id === item.id}
                  aria-controls="ability-panel"
                  onClick={() => onAbility(item.id)}
                >
                  <small>
                    {item.kind} / 0{index + 1}
                  </small>
                  <strong>{item.title}</strong>
                  <span aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div
              className="ability-panel"
              ref={panelRef}
              id="ability-panel"
              aria-live="polite"
              aria-atomic="true"
            >
              {ability ? (
                <div key={ability.id} className="ability-content">
                  <span className="eyebrow">{ability.kind} RECOGNIZED</span>
                  <h2>{ability.title}</h2>
                  <p>{ability.description}</p>
                  <p className="ability-result">{ability.result}</p>
                  <a
                    href={ability.evidence.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ability.evidence.label} ↗
                  </a>
                </div>
              ) : (
                <p className="ability-empty">
                  Choose an ability card to see how it was used, with source
                  evidence.
                </p>
              )}
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
