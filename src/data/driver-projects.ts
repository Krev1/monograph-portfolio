import type { ProjectId } from "@/lib/driver-machine";

export type EvidenceLink = { label: string; url: string };
export type ProjectCardConfig = {
  code: string;
  accent: string;
  emblem: "ledger" | "brackets" | "monogram";
};
export type AbilityCardConfig = {
  id: string;
  title: string;
  kind: "TOOL" | "SKILL" | "PROCESS";
  description: string;
  result: string;
  evidence: EvidenceLink;
};
export type PortfolioProject = {
  id: ProjectId;
  title: string;
  category: string;
  year: string;
  status: "concept" | "in-progress" | "completed";
  description: string;
  problem?: string;
  contribution?: string;
  outcomes: string[];
  technologies: string[];
  repositoryUrl: string;
  visual: "ledger" | "learning" | "system";
  mainCard: ProjectCardConfig;
  abilities: AbilityCardConfig[];
};

const spend =
  "https://github.com/Krev1/spendwise-ai/blob/e2221c7de66d0ac676cf3d6936d64c65a930e045/";
const learn =
  "https://github.com/Krev1/Learn/blob/134c0128b05e38f143b22bd86e3a3f7557f655e4/";
export const driverProjects: PortfolioProject[] = [
  {
    id: "001",
    title: "SPENDWISE AI",
    category: "AI / Python / Personal finance",
    year: "2026",
    status: "in-progress",
    description:
      "A personal finance project built through Python tooling and careful AI experiments. Transaction processing, CSV validation and rule / Dummy baselines exist; a complete web app and production ML pipeline are still in development.",
    problem:
      "Explore how Vietnamese expense descriptions can become useful, reviewable spending records.",
    contribution:
      "Transaction domain, CSV tooling, synthetic dataset checks, baseline prototypes and a documented development process.",
    outcomes: [
      "Transaction and CSV code with automated tests",
      "Versioned synthetic seed and grouped split prototype",
      "v0.2 web and deep-learning requirements documented; implementation remains future work",
    ],
    technologies: ["Python", "CSV", "pytest", "Rule / Dummy baselines"],
    repositoryUrl: "https://github.com/Krev1/spendwise-ai",
    visual: "ledger",
    mainCard: { code: "DATA / 01", accent: "#ff3ea5", emblem: "ledger" },
    abilities: [
      {
        id: "python",
        title: "PYTHON",
        kind: "TOOL",
        description:
          "Typed transaction objects and report / CSV services structure the current prototype.",
        result:
          "Executable Python domain and service modules, rather than a completed finance interface.",
        evidence: {
          label: "Transaction domain",
          url: spend + "src/spendwise/domain/transactions.py",
        },
      },
      {
        id: "data",
        title: "DATA PROCESSING",
        kind: "SKILL",
        description:
          "CSV validation and dataset construction establish explicit data contracts. The seed contains synthetic descriptions, not real customer records.",
        result:
          "Versioned data provenance and split checks; no real-world model performance is claimed.",
        evidence: {
          label: "Dataset card",
          url: spend + "data/seed/v0.1/DATASET_CARD.md",
        },
      },
      {
        id: "testing",
        title: "TESTING",
        kind: "PROCESS",
        description:
          "Automated tests exercise transaction rules, input contracts, baseline behavior and grouped splits.",
        result:
          "Repository verification records explain what was checked and which review items remain.",
        evidence: {
          label: "Verification record",
          url: spend + "VERIFICATION.md",
        },
      },
      {
        id: "baselines",
        title: "AI BASELINES",
        kind: "PROCESS",
        description:
          "Keyword rules and a Dummy classifier provide exploratory reference behavior for synthetic probes.",
        result:
          "Prototype baseline code exists. A trained production model and evaluation on real users are not complete.",
        evidence: {
          label: "Baseline implementation",
          url: spend + "src/spendwise/ml/baselines.py",
        },
      },
      {
        id: "product",
        title: "PRODUCT THINKING",
        kind: "PROCESS",
        description:
          "SDD v0.2 defines the proposed web product, budgets, forecasting and deep-learning scope.",
        result:
          "Requirements distinguish planned behavior from the currently implemented Python prototype.",
        evidence: {
          label: "Current requirements",
          url: spend + "docs/sdd-v0.2/01_requirements.md",
        },
      },
    ],
  },
  {
    id: "002",
    title: "LEARN",
    category: "Python / Computer science / Learning",
    year: "2026",
    status: "in-progress",
    description:
      "A public learning journal for Python and computer science. Lessons, exercises and project notes connect the foundations to the ongoing SpendWise AI work.",
    contribution:
      "Structured study material, money / CSV exercises, dataset guides and a recorded learning track.",
    outcomes: [
      "Lessons for Git, Python / money and CSV / labels",
      "Dataset construction and labeling guides",
      "Progress notes and a companion project learning path",
    ],
    technologies: ["Python", "Markdown", "Git", "GitHub"],
    repositoryUrl: "https://github.com/Krev1/Learn",
    visual: "learning",
    mainCard: { code: "STUDY / 02", accent: "#9c63ff", emblem: "brackets" },
    abilities: [
      {
        id: "python",
        title: "PYTHON",
        kind: "SKILL",
        description:
          "Exercises connect Python foundations to transaction amounts, data types and CSV records.",
        result:
          "Published learning material; no certification or finished course claim.",
        evidence: {
          label: "Python and money lesson",
          url: learn + "spendwise-ai/lessons/01_python_and_money.md",
        },
      },
      {
        id: "docs",
        title: "DOCUMENTATION",
        kind: "PROCESS",
        description:
          "Lessons and guides record concepts and the decisions behind the project exercises.",
        result:
          "A readable companion track that separates learning progress from project delivery.",
        evidence: {
          label: "Learning track",
          url: learn + "spendwise-ai/README.md",
        },
      },
      {
        id: "learning",
        title: "LEARNING PROCESS",
        kind: "PROCESS",
        description:
          "A staged learning path and progress journal make practice and reflection explicit.",
        result: "An ongoing study process with recorded next steps.",
        evidence: {
          label: "Learning path",
          url: learn + "spendwise-ai/learning_path.md",
        },
      },
      {
        id: "github",
        title: "GITHUB",
        kind: "TOOL",
        description:
          "Git and GitHub organize the public lessons and their revision history.",
        result:
          "Source history links learning material to the companion project.",
        evidence: {
          label: "Git and environment lesson",
          url: learn + "spendwise-ai/lessons/00_git_and_environment.md",
        },
      },
    ],
  },
  {
    id: "003",
    title: "KREV1 PORTFOLIO",
    category: "UI/UX / Frontend engineering",
    year: "2026",
    status: "in-progress",
    description:
      "A portfolio explored through a mechanical card reader. Open the linked handles, insert a project, close to transform, then inspect the tools and decisions behind the work.",
    contribution:
      "Original SVG hardware, a guarded state machine, pointer gestures, keyboard equivalents and a directed transformation timeline.",
    outcomes: [
      "One continuous open / insert / close / reveal experience",
      "Evidence-linked project and ability cards",
      "Typed transitions with cancellation and reduced-motion support",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SVG", "CSS"],
    repositoryUrl: "https://github.com/Krev1/monograph-portfolio",
    visual: "system",
    mainCard: { code: "DESIGN / 03", accent: "#ff8dca", emblem: "monogram" },
    abilities: [
      {
        id: "ux",
        title: "UI/UX DESIGN",
        kind: "SKILL",
        description:
          "The interface uses a single focal device, staged disclosure and specific feedback for each mechanical action.",
        result:
          "A specified interaction flow with acceptance criteria and accessible equivalents.",
        evidence: {
          label: "Interaction specification",
          url: "https://github.com/Krev1/monograph-portfolio/blob/feat/decade-driver-sdd/docs/SDD-DECADE-DRIVER.md",
        },
      },
      {
        id: "next",
        title: "NEXT.JS",
        kind: "TOOL",
        description:
          "App Router renders one homepage; the interactive controller runs in a client component.",
        result:
          "Project discovery works without a live API request or an authentication token.",
        evidence: {
          label: "Homepage",
          url: "https://github.com/Krev1/monograph-portfolio/blob/feat/decade-driver-sdd/src/app/page.tsx",
        },
      },
      {
        id: "ts",
        title: "TYPESCRIPT",
        kind: "TOOL",
        description:
          "Explicit project, card, event and model types define the system boundaries.",
        result:
          "Guards preserve card identity and reject unsafe or stale transitions.",
        evidence: {
          label: "State machine",
          url: "https://github.com/Krev1/monograph-portfolio/blob/feat/decade-driver-sdd/src/lib/driver-machine.ts",
        },
      },
      {
        id: "interaction",
        title: "INTERACTION DESIGN",
        kind: "SKILL",
        description:
          "Pointer capture, exclusive gesture ownership and geometry checks connect physical gestures to valid states.",
        result:
          "Wrong drops, insufficient travel and cancellations recover to a valid state.",
        evidence: {
          label: "Gesture controller",
          url: "https://github.com/Krev1/monograph-portfolio/blob/feat/decade-driver-sdd/src/components/decade-experience.tsx",
        },
      },
      {
        id: "motion",
        title: "MOTION DESIGN",
        kind: "SKILL",
        description:
          "Lock, scan, recognition and docking share one bounded timeline with a reduced-motion equivalent.",
        result:
          "Project content is mounted only after transformation completes.",
        evidence: {
          label: "Directed timeline",
          url: "https://github.com/Krev1/monograph-portfolio/blob/feat/decade-driver-sdd/src/lib/driver-timeline.ts",
        },
      },
      {
        id: "github",
        title: "GITHUB",
        kind: "TOOL",
        description:
          "Source control records the specification, implementation and verification together.",
        result: "Reviewable code and reproducible build / test commands.",
        evidence: {
          label: "Source repository",
          url: "https://github.com/Krev1/monograph-portfolio",
        },
      },
    ],
  },
];
