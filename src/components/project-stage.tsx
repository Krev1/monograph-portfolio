import type { RefObject } from "react";
import type { PortfolioProject } from "@/data/driver-projects";

export function CardEmblem({
  emblem,
}: {
  emblem: "ledger" | "brackets" | "monogram";
}) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path
        d="M80 10 141 45v70l-61 35-61-35V45Z"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".45"
      />
      {emblem === "ledger" ? (
        <>
          <path
            d="M45 110V90h16v20M72 110V67h16v43M99 110V45h16v65"
            stroke="currentColor"
            strokeWidth="7"
          />
          <path
            d="m41 66 31-22 19 9 29-26"
            stroke="currentColor"
            strokeWidth="3"
          />
        </>
      ) : emblem === "brackets" ? (
        <>
          <path
            d="m58 50-30 30 30 30m44-60 30 30-30 30M89 42l-18 76"
            stroke="currentColor"
            strokeWidth="9"
          />
        </>
      ) : (
        <>
          <path
            d="M47 43v74m0-37 54-37m-54 37 54 37M118 43v74"
            stroke="currentColor"
            strokeWidth="11"
          />
        </>
      )}
    </svg>
  );
}

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
}: {
  project: PortfolioProject;
  abilityId: string | null;
  onAbility: (id: string) => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
}) {
  const ability = project.abilities.find((item) => item.id === abilityId);
  return (
    <section
      className="project-stage"
      aria-labelledby="project-title"
      data-testid="project-stage"
    >
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
            {project.title}
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
                "ability-card" + (ability?.id === item.id ? " is-selected" : "")
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
              <a href={ability.evidence.url} target="_blank" rel="noreferrer">
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
    </section>
  );
}
