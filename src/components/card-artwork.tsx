import { useId } from "react";
import type { PortfolioProject } from "@/data/driver-projects";
import { CardEmblemPaths } from "./card-emblem";

// Reused by the deck, pointer ghost and physical card inside the reader.
export function CardArtwork({
  project,
  readerSide = false,
}: {
  project: PortfolioProject;
  readerSide?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const gradient = `${id}-card-surface`;
  const foil = `${id}-card-foil`;
  const rim = `${id}-card-rim`;
  const grid = `${id}-card-grid`;
  const aura = `${id}-card-aura`;
  const hologram = `${id}-card-hologram`;
  const accent = project.mainCard.accent;
  const title =
    project.id === "001"
      ? "SPENDWISE"
      : project.id === "003"
        ? "KREV1"
        : project.title;
  return (
    <g
      data-card-artwork={project.id}
      data-card-side={readerSide ? "reader" : "front"}
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#292331" />
          <stop offset=".4" stopColor="#12101c" />
          <stop offset="1" stopColor="#070b14" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#efdbed" /><stop offset=".22" stopColor={accent} /><stop offset=".55" stopColor="#474859" /><stop offset="1" stopColor={accent} />
        </linearGradient>
        <linearGradient id={foil} x1="0" y1="0" x2="1" y2=".8">
          <stop stopColor="#e4f8ff" stopOpacity="0" /><stop offset=".35" stopColor="#e4f8ff" stopOpacity=".06" /><stop offset=".45" stopColor={accent} stopOpacity=".14" /><stop offset=".53" stopColor="#effaff" stopOpacity=".1" /><stop offset=".7" stopColor="#effaff" stopOpacity="0" />
        </linearGradient>
        <pattern id={grid} width="8" height="8" patternUnits="userSpaceOnUse"><path d="M8 0H0V8" fill="none" stroke="#c4c9e9" strokeOpacity=".07" strokeWidth=".35" /></pattern>
        <radialGradient id={aura}><stop stopColor={accent} stopOpacity=".32" /><stop offset=".65" stopColor={accent} stopOpacity=".08" /><stop offset="1" stopColor={accent} stopOpacity="0" /></radialGradient>
        <linearGradient id={hologram} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#80dce7" /><stop offset=".3" stopColor="#d9bdf1" /><stop offset=".55" stopColor={accent} /><stop offset=".8" stopColor="#b7f6da" /><stop offset="1" stopColor="#f2c7df" /></linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="116"
        height="170"
        rx="3"
        fill={`url(#${gradient})`}
        stroke={`url(#${rim})`}
        strokeWidth="1"
      />
      <rect x="2.5" y="2.5" width="113" height="167" rx="2" fill="none" stroke="#000" strokeWidth="1" />
      <rect x="16" y="21" width="92" height="98" fill={`url(#${grid})`} />
      <path d="M17 119L109 27M35 119L109 45M53 119L109 63" stroke={accent} strokeWidth=".35" opacity=".1" />
      <rect
        x="5"
        y="5"
        width="108"
        height="162"
        rx="1"
        fill="none"
        stroke={accent}
        strokeWidth=".5"
        opacity=".3"
      />
      <rect x="5" y="5" width="108" height="10" rx="1" fill={accent} opacity={readerSide ? 1 : .85} />
      <path d="M6 5.5H112M5.5 6V165" stroke="#f5e6ef" strokeWidth=".45" opacity=".55" />
      {!readerSide && <g aria-hidden="true">
        <path d="M19 28H96L109 41V104L94 117H19Z" fill="#080b15" stroke="#b7b6d0" strokeOpacity=".2" strokeWidth=".5" />
        <path d="M20 29H94L108 42V56L20 103Z" fill={`url(#${hologram})`} opacity=".08" />
        <circle cx="60" cy="74" r="45" fill={`url(#${aura})`} />
        <path d="M24 40V33H33M94 33H102V41M24 101V110H32M93 110H102V102" fill="none" stroke={`url(#${hologram})`} strokeWidth="1" opacity=".8" />
        <text x="103" y="110" textAnchor="end" fill="#fff" opacity=".065" fontSize="49" fontWeight="800" letterSpacing="-4">{project.id}</text>
        <circle cx="60" cy="74" r="38" fill="none" stroke={accent} strokeWidth=".45" opacity=".24" />
        <circle cx="60" cy="74" r="35" fill="none" stroke={accent} strokeWidth=".45" strokeDasharray="1 4" opacity=".38" />
        <path d="M22 74H28M92 74H98M60 36V42M60 106V112" stroke={accent} strokeWidth=".65" opacity=".6" />
        <text x="103" y="24" textAnchor="end" fill="#aeb1c3" fontSize="3.2" letterSpacing=".6">FORM / {project.id}</text>
        <path d="M17 123H42M101 123H108" stroke={`url(#${hologram})`} strokeWidth="1.3" />
      </g>}
      {readerSide ? (
        <path
          d="M10 6V14M13 6V14M17 6V14M20 6V14M25 6V14M28 6V14M32 6V14M37 6V14M40 6V14M45 6V14M48 6V14M52 6V14M57 6V14M60 6V14M65 6V14M68 6V14M72 6V14M77 6V14M80 6V14M85 6V14M88 6V14M92 6V14M97 6V14M101 6V14M106 6V14"
          stroke="#160e19"
          strokeWidth="1.4"
        />
      ) : (
        <>
          <text
            x="10"
            y="12"
            fill="#160e19"
            fontFamily="Arial,sans-serif"
            fontSize="5"
            fontWeight="700"
            letterSpacing="1"
          >
            K / {project.id}
          </text>
          <text
            x="108"
            y="12"
            textAnchor="end"
            fill="#160e19"
            fontFamily="Arial,sans-serif"
            fontSize="4"
            letterSpacing=".5"
          >
            PROJECT CARD
          </text>
        </>
      )}
      <path
        d="M5 24H12V28H5ZM5 32H15V36H5ZM5 42H12V44H5ZM5 50H15V54H5ZM5 60H12V64H5ZM5 73H15V77H5ZM5 83H12V87H5ZM5 94H15V97H5ZM5 108H12V112H5Z"
        fill="#ccbfc9"
      />
      {!readerSide && <g transform="translate(20 35.5) scale(.5)" color="#03040a" opacity=".9"><CardEmblemPaths emblem={project.mainCard.emblem} /></g>}
      {!readerSide && <g transform="translate(19.7 33.5) scale(.5)" color="#ffeffb" opacity=".28"><CardEmblemPaths emblem={project.mainCard.emblem} /></g>}
      <g
        className={readerSide ? "reader-print-logo" : undefined}
        data-card-print={project.mainCard.emblem}
        transform={
          readerSide
            ? "translate(59 85) rotate(90) translate(-28 -28) scale(.35)"
            : "translate(20 34) scale(.5)"
        }
        color={accent}
      >
        <CardEmblemPaths emblem={project.mainCard.emblem} />
      </g>
      {readerSide ? (
        <text
          x="59"
          y="149"
          textAnchor="middle"
          fill={accent}
          fontFamily="Arial,sans-serif"
          fontSize="5"
          letterSpacing=".5"
        >
          {title} / {project.id}
        </text>
      ) : (
        <>
          <text
            x="16"
            y="133"
            fill="#f8f2f7"
            fontFamily="Arial,sans-serif"
            fontSize="13"
            fontWeight="800"
            letterSpacing="-.5"
          >
            {title}
          </text>
          {(
            <text
              x="16"
              y="148"
              fill="#f8f2f7"
              fontFamily="Arial,sans-serif"
              fontSize="4.2"
              fontWeight="500"
              letterSpacing="1.1"
            >
              {project.id === "001" ? "FINANCE / ARTIFICIAL INTELLIGENCE" : project.id === "002" ? "CODE / KNOWLEDGE / GROWTH" : "IDENTITY / INTERACTION / DESIGN"}
            </text>
          )}
        </>
      )}
      <path d="M16 153H108" stroke={accent} strokeWidth=".6" opacity=".5" />
      <rect x="5" y="16" width="108" height="136" rx="1" fill={`url(#${foil})`} pointerEvents="none" />
      <text
        x="16"
        y="165"
        fill="#cdbed1"
        fontFamily="Arial,sans-serif"
        fontSize="5"
        letterSpacing=".6"
      >
        {project.mainCard.code}
      </text>
      <path
        d="M85 158V165M88 158V165M91 158V165M94 158V165M99 158V165M103 158V165M107 158V165"
        stroke={accent}
        strokeWidth="1"
      />
      <path d="M2 21V48M2 145V162M116 21V48M116 145V162" stroke={`url(#${hologram})`} strokeWidth="1.3" opacity=".8" />
    </g>
  );
}
