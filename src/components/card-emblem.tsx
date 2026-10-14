import type { ProjectCardConfig } from "@/data/driver-projects";

export function CardEmblemPaths({
  emblem,
}: {
  emblem: ProjectCardConfig["emblem"];
}) {
  return (
    <g fill="none">
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
    </g>
  );
}

export function CardEmblem({
  emblem,
}: {
  emblem: ProjectCardConfig["emblem"];
}) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <CardEmblemPaths emblem={emblem} />
    </svg>
  );
}
