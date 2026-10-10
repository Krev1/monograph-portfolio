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
          <stop stopColor="#281426" />
          <stop offset=".55" stopColor="#110b17" />
          <stop offset="1" stopColor="#20102b" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="116"
        height="170"
        rx="3"
        fill={`url(#${gradient})`}
        stroke={accent}
        strokeWidth="1"
      />
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
      <rect x="5" y="5" width="108" height="10" rx="1" fill={accent} />
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
      <g
        data-card-print={project.mainCard.emblem}
        transform={
          readerSide
            ? "translate(59 85) rotate(90) translate(-28 -28) scale(.35)"
            : "translate(20 29) scale(.5)"
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
            fontSize="14"
            fontWeight="800"
            letterSpacing="-.5"
          >
            {title}
          </text>
          {project.id === "001" && (
            <text
              x="16"
              y="148"
              fill="#f8f2f7"
              fontFamily="Arial,sans-serif"
              fontSize="11"
              fontWeight="800"
            >
              AI
            </text>
          )}
        </>
      )}
      <path d="M16 153H108" stroke={accent} strokeWidth=".6" opacity=".5" />
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
        stroke="#e9a9ce"
        strokeWidth="1"
      />
    </g>
  );
}
