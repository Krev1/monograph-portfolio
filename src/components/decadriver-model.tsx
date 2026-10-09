"use client";

import { memo, useId } from "react";
import type { PortfolioProject } from "@/data/driver-projects";
import { CardEmblemPaths } from "./card-emblem";

// Original hardware: photograph-informed proportions and typographic language marks.
const marks = [
  { x: 416, y: 128, name: "Python", label: "PY", badge: "outline" },
  { x: 584, y: 128, name: "JavaScript", label: "JS", badge: "square" },
  { x: 658, y: 211, name: "TypeScript", label: "TS", badge: "square" },
  { x: 647, y: 331, name: "C++", label: "C++", badge: "hex" },
  { x: 579, y: 396, name: "C#", label: "C#", badge: "hex" },
  { x: 500, y: 415, name: "Java", label: "JAVA", badge: "word" },
  { x: 425, y: 387, name: "Go", label: "GO", badge: "word" },
  { x: 355, y: 325, name: "Rust", label: "RS", badge: "gear" },
  { x: 352, y: 211, name: "Kotlin", label: "KT", badge: "outline" },
] as const;

function DecadriverModel({
  activated = false,
  card,
  cardPhase = "seated",
}: {
  activated?: boolean;
  card?: PortfolioProject;
  cardPhase?: "inserting" | "seated" | "pulling" | "ejecting";
}) {
  const id = useId().replace(/:/g, "");
  const ref = (name: string) => `${id}-${name}`;
  const paint = (name: string) => `url(#${ref(name)})`;
  return (
    <div
      className={"dx-model " + (activated ? "dx-model-activated" : "")}
      aria-hidden="true"
    >
      <svg
        className="dx-svg"
        viewBox="30 40 940 435"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <linearGradient id={ref("shell")} x1="0" y1="0" x2=".65" y2="1">
            <stop stopColor="#838b92" />
            <stop offset=".12" stopColor="#3f474f" />
            <stop offset=".48" stopColor="#242b32" />
            <stop offset=".78" stopColor="#49515a" />
            <stop offset="1" stopColor="#151b22" />
          </linearGradient>
          <linearGradient id={ref("edge")} x1="0" y1="0" x2=".25" y2="1">
            <stop stopColor="#c7cfd2" />
            <stop offset=".17" stopColor="#737e86" />
            <stop offset=".48" stopColor="#353e47" />
            <stop offset=".63" stopColor="#c4cacc" />
            <stop offset=".9" stopColor="#59636d" />
            <stop offset="1" stopColor="#a3abb0" />
          </linearGradient>
          <linearGradient id={ref("silver")} x1=".16" y1="0" x2=".82" y2="1">
            <stop stopColor="#e1e8e8" />
            <stop offset=".17" stopColor="#9fabba" />
            <stop offset=".34" stopColor="#bcc9d2" />
            <stop offset=".48" stopColor="#f1f3ed" />
            <stop offset=".61" stopColor="#8495a6" />
            <stop offset=".79" stopColor="#bdc8ce" />
            <stop offset="1" stopColor="#768898" />
          </linearGradient>
          <linearGradient id={ref("ivory")} x1=".1" y1="0" x2=".9" y2="1">
            <stop stopColor="#fffef0" />
            <stop offset=".3" stopColor="#eeeade" />
            <stop offset=".65" stopColor="#f5f2e7" />
            <stop offset="1" stopColor="#bfbfb3" />
          </linearGradient>
          <linearGradient id={ref("whiteEdge")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#fffef3" />
            <stop offset=".35" stopColor="#babbb4" />
            <stop offset=".74" stopColor="#a5aaa6" />
            <stop offset="1" stopColor="#e7e7dc" />
          </linearGradient>
          <linearGradient id={ref("cavity")} x1="0" y1="0" x2=".6" y2="1">
            <stop stopColor="#010306" />
            <stop offset=".7" stopColor="#0a0e12" />
            <stop offset="1" stopColor="#2c343a" />
          </linearGradient>
          <linearGradient id={ref("rail")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#aeb9be" />
            <stop offset=".22" stopColor="#4d5964" />
            <stop offset=".5" stopColor="#18212b" />
            <stop offset=".8" stopColor="#475561" />
            <stop offset="1" stopColor="#94a0a8" />
          </linearGradient>
          <radialGradient id={ref("lens")} cx=".42" cy=".35" r=".7">
            <stop stopColor="#1b252e" />
            <stop offset=".46" stopColor="#0c1218" />
            <stop offset=".85" stopColor="#05090d" />
            <stop offset="1" stopColor="#202b33" />
          </radialGradient>
          <linearGradient id={ref("reflection")} x1=".2" y1="0" x2=".8" y2="1">
            <stop stopColor="#f5faf8" stopOpacity=".42" />
            <stop offset=".24" stopColor="#b9ccd4" stopOpacity=".1" />
            <stop offset=".7" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={ref("green")} cx=".35" cy=".25">
            <stop stopColor="#d7e7de" />
            <stop offset=".5" stopColor="#a2b9b0" />
            <stop offset=".8" stopColor="#5c8575" />
            <stop offset="1" stopColor="#324e43" />
          </radialGradient>
          <radialGradient id={ref("pink")} cx=".35" cy=".25">
            <stop stopColor="#f2e5e8" />
            <stop offset=".5" stopColor="#c7a9b2" />
            <stop offset=".8" stopColor="#8c6475" />
            <stop offset="1" stopColor="#483d46" />
          </radialGradient>
          <radialGradient id={ref("blue")} cx=".35" cy=".25">
            <stop stopColor="#c4dce3" />
            <stop offset=".5" stopColor="#709cae" />
            <stop offset=".8" stopColor="#3e6c87" />
            <stop offset="1" stopColor="#243e54" />
          </radialGradient>
          <radialGradient id={ref("jewel")} cx=".35" cy=".2">
            <stop stopColor="#c6f7b4" />
            <stop offset=".18" stopColor="#55bd70" />
            <stop offset=".48" stopColor="#008d45" />
            <stop offset=".82" stopColor="#00582b" />
            <stop offset="1" stopColor="#07271c" />
          </radialGradient>
          <radialGradient id={ref("activated")}>
            <stop stopColor="#ed90bd" />
            <stop offset=".38" stopColor="#9d2d62" />
            <stop offset="1" stopColor="#100b17" />
          </radialGradient>
          <pattern
            id={ref("texture")}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".65" fill="#fff" opacity=".12" />
            <circle cx="4" cy="5" r=".75" fill="#000" opacity=".3" />
          </pattern>
          <pattern
            id={ref("ribs")}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <rect width="9" height="9" fill="#1b2228" />
            <path d="M2 0V9" stroke="#657078" strokeWidth="1.5" />
            <path d="M5 0V9" stroke="#080d13" strokeWidth="3" />
          </pattern>
          <clipPath id={ref("lensClip")}>
            <circle cx="500" cy="257" r="85" />
          </clipPath>
          <clipPath id={ref("cardWindowClip")}>
            <rect x="302" y="235" width="65" height="53" rx="1" />
          </clipPath>
          <linearGradient id={ref("windowShadow")} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#000" stopOpacity=".7" />
            <stop offset=".14" stopColor="#000" stopOpacity=".12" />
            <stop offset=".72" stopColor="#000" stopOpacity=".12" />
            <stop offset="1" stopColor="#000" stopOpacity=".8" />
          </linearGradient>
          {card && (
            <g
              id={ref("readerCard")}
              transform="translate(300 315) rotate(-90)"
            >
              <rect
                width="116"
                height="170"
                rx="5"
                fill="#141019"
                stroke="#d3c4d0"
                strokeWidth="1.5"
              />
              <rect
                x="4"
                y="4"
                width="108"
                height="11"
                rx="2"
                fill={card.mainCard.accent}
              />
              <path
                d="M7 20H109M7 153H109"
                stroke={card.mainCard.accent}
                strokeWidth="1.2"
              />
              <path
                d="M3 24H10V28H3ZM3 32H13V36H3ZM3 42H10V44H3ZM3 50H13V54H3ZM3 60H10V64H3ZM3 73H13V77H3ZM3 83H10V87H3ZM3 94H13V97H3ZM3 108H10V112H3Z"
                fill="#ccc2c9"
              />
              <g
                transform="translate(18 30) scale(.5)"
                color={card.mainCard.accent}
              >
                <CardEmblemPaths emblem={card.mainCard.emblem} />
              </g>
              <text
                x="17"
                y="28"
                fill="#f3dae8"
                fontFamily="Arial,sans-serif"
                fontSize="7"
                letterSpacing="2"
              >
                K / {card.id}
              </text>
              <text
                x="16"
                y="139"
                fill="#f3dae8"
                fontFamily="Arial,sans-serif"
                fontSize="8"
                fontWeight="700"
              >
                {card.title === "KREV1 PORTFOLIO" ? "KREV1" : card.title}
              </text>
              <text
                x="16"
                y="164"
                fill={card.mainCard.accent}
                fontFamily="Arial,sans-serif"
                fontSize="5"
                letterSpacing="1"
              >
                {card.mainCard.code}
              </text>
            </g>
          )}
          <g id={ref("screw")}>
            <circle r="4" fill="#141b20" stroke="#859097" strokeWidth="1" />
            <path d="M-2-2L2 2" stroke="#b1b9bb" strokeWidth="1.1" />
          </g>
          <g id={ref("grip")}>
            <path
              d="M121 195L144 160L282 126L320 151V369L282 397L144 365L121 328L110 281V240Z"
              fill="#0b1118"
              stroke="#111820"
              strokeWidth="8"
              transform="translate(0 7)"
            />
            <path
              d="M121 188L144 153L282 119L320 144V362L282 390L144 358L121 321L110 274V233Z"
              fill={paint("shell")}
              stroke={paint("edge")}
              strokeWidth="6"
            />
            <path
              d="M121 188L144 153L282 119L320 144V362L282 390L144 358L121 321L110 274V233Z"
              fill={paint("texture")}
            />
            <path
              d="M135 222L151 183L173 172L283 145L296 160V225Z"
              fill={paint("cavity")}
              stroke="#111820"
              strokeWidth="4"
            />
            <path
              d="M135 222L151 183L173 172L283 145"
              fill="none"
              stroke="#818b8e"
              strokeWidth="3"
            />
            <path
              d="M138 299H296V350L282 364L161 338Z"
              fill={paint("cavity")}
              stroke="#131c24"
              strokeWidth="4"
            />
            <path
              d="M138 299L161 338L282 364"
              fill="none"
              stroke="#91999a"
              strokeWidth="3"
            />
            <path
              d="M166 174L176 171L187 222H175Z M177 299H188L201 343L190 340Z"
              fill={paint("rail")}
            />
            <path
              d="M284 132L314 147V360L284 383L277 366V151Z"
              fill={paint("edge")}
              stroke="#262f36"
              strokeWidth="2"
            />
            <path
              d="M294 154V356"
              stroke="#eef0e7"
              strokeWidth="1.5"
              opacity=".55"
            />
            <path
              d="M120 226H285V237H116Z M118 290H285V301H122Z"
              fill={paint("silver")}
              stroke="#404950"
              strokeWidth="2"
            />
            <path
              d="M124 228H280M124 293H278"
              stroke="#eceee5"
              strokeWidth="1.5"
              opacity=".7"
            />
            <use href={`#${ref("screw")}`} x="145" y="164" />
            <use href={`#${ref("screw")}`} x="145" y="347" />
          </g>
          <g id={ref("pods")}>
            <path
              d="M-28-28H126L141-16V16L127 28H-28L-36 15V-15Z"
              fill="#0a1015"
              stroke={paint("edge")}
              strokeWidth="3"
            />
            {(["green", "pink", "blue"] as const).map((color, index) => (
              <g key={color} transform={`translate(${index * 49} 0)`}>
                <circle
                  r="22"
                  fill="#11171c"
                  stroke="#727f88"
                  strokeWidth="1.4"
                />
                <circle r="18.5" fill={paint("silver")} />
                <circle
                  r="15.7"
                  fill={paint(color)}
                  stroke="#24343e"
                  strokeWidth="1"
                />
                <path
                  d="M-10-7Q-3-17 9-10"
                  fill="none"
                  stroke="#f0eee9"
                  strokeWidth="1.5"
                  opacity=".7"
                />
                <path
                  d="M-14 7Q-3 18 10 11"
                  fill="none"
                  stroke="#090d12"
                  strokeWidth="1"
                  opacity=".5"
                />
              </g>
            ))}
          </g>
        </defs>

        <ellipse cx="500" cy="454" rx="318" ry="14" fill="#000" opacity=".35" />
        <path
          d="M94 237H906V290H94Z"
          fill={paint("rail")}
          stroke="#0d151e"
          strokeWidth="4"
        />
        <path
          d="M103 242H897M103 286H897"
          stroke="#a2aab0"
          strokeWidth="2"
          opacity=".6"
        />
        {Array.from({ length: 26 }, (_, i) => (
          <path
            key={i}
            d={`M${121 + i * 30} 247V280`}
            stroke="#101820"
            strokeWidth="4"
          />
        ))}
        <path
          d="M327 99L352 79H648L675 100V407L649 438H351L325 407Z"
          fill={paint("shell")}
          stroke="#0e151c"
          strokeWidth="7"
        />
        <circle
          cx="500"
          cy="257"
          r="160"
          fill="#171e24"
          stroke="#667079"
          strokeWidth="3"
        />
        <circle cx="500" cy="257" r="153" fill={paint("ribs")} />

        <g className="dx-mechanical-left">
          <path
            d="M283 220H376V304H283Z"
            fill={paint("ribs")}
            stroke="#151c24"
            strokeWidth="4"
          />
          <path d="M295 224H370M295 301H370" stroke="#7e898e" strokeWidth="2" />
          <use href={`#${ref("grip")}`} />
          <use href={`#${ref("pods")}`} x="165" y="263" />
        </g>
        <g className="dx-mechanical-right">
          <path
            d="M624 220H717V304H624Z"
            fill={paint("ribs")}
            stroke="#151c24"
            strokeWidth="4"
          />
          <path d="M630 224H705M630 301H705" stroke="#7e898e" strokeWidth="2" />
          <use
            href={`#${ref("grip")}`}
            transform="translate(1000 0) scale(-1 1)"
          />
          <use href={`#${ref("pods")}`} x="737" y="263" />
        </g>

        <g className="dx-face-rotor">
          {card && cardPhase !== "seated" && (
            <g
              className={"dx-transient-card dx-card-" + cardPhase}
              data-testid="transient-card"
            >
              <use className="dx-card-motion" href={`#${ref("readerCard")}`} />
            </g>
          )}
          <path
            d="M344 78H656L680 109Q708 175 714 231V283Q711 355 681 407L658 437H342L319 407Q289 355 286 283V231Q292 174 320 109Z"
            fill="#10161d"
            stroke="#0a1017"
            strokeWidth="7"
            transform="translate(0 6)"
          />
          <path
            d="M344 78H656L680 109Q708 175 714 231V283Q711 355 681 407L658 437H342L319 407Q289 355 286 283V231Q292 174 320 109Z"
            fill={paint("shell")}
            stroke={paint("edge")}
            strokeWidth="3"
          />
          <path
            d="M355 85H645L665 112Q689 170 699 225H301Q311 170 335 112Z"
            fill={paint("whiteEdge")}
          />
          <path
            d="M355 85H645L665 112Q689 170 699 225H301Q311 170 335 112Z"
            fill={paint("ivory")}
            transform="translate(0 -3)"
          />
          <path
            d="M301 298H699Q695 362 668 408L649 430H351L332 408Q305 362 301 298Z"
            fill={paint("whiteEdge")}
          />
          <path
            d="M303 297H697Q691 357 665 402L647 424H353L335 402Q309 357 303 297Z"
            fill={paint("ivory")}
          />
          <path d="M288 228H712V294H288Z" fill="#090f13" />
          <path d="M298 231H702M298 292H702" stroke="#4f5758" strokeWidth="1" />
          <path d="M625 232H702V290H625Z" fill={paint("ribs")} />
          {/* Only this aperture exposes the fully seated card behind the casing. */}
          <g
            className="dx-reader-window"
            data-testid="reader-card-window"
            data-card-id={card?.id}
          >
            <path
              d="M299 232H373V291H299Z"
              fill="#05090c"
              stroke="#717b7c"
              strokeWidth="1.2"
            />
            <g clipPath={paint("cardWindowClip")}>
              <rect
                x="302"
                y="235"
                width="65"
                height="53"
                fill={paint("cavity")}
              />
              {card && (
                <g
                  className={"dx-card-" + cardPhase}
                  data-testid="seated-card"
                  data-card-id={card.id}
                >
                  <use
                    className="dx-card-motion"
                    href={`#${ref("readerCard")}`}
                  />
                </g>
              )}
              <rect
                x="302"
                y="235"
                width="65"
                height="53"
                fill={paint("windowShadow")}
              />
            </g>
            <path
              d="M301 234H369M301 289H369"
              stroke="#b5beba"
              strokeWidth="1"
              opacity=".65"
            />
            <path d="M302 236V287" stroke="#010406" strokeWidth="3" />
          </g>
          <path
            d="M348 82H651L667 110H333Z"
            fill={paint("shell")}
            stroke="#777f83"
            strokeWidth="1.5"
          />
          <path
            d="M351 84H649"
            stroke="#d6d9d5"
            strokeWidth="1.1"
            opacity=".75"
          />
          <text
            x="501"
            y="102"
            textAnchor="middle"
            fontSize="13"
            letterSpacing="11"
            fontFamily="Arial,sans-serif"
            fontWeight="600"
            fill="#10181f"
            stroke="#8e9696"
            strokeWidth=".35"
          >
            KREV1
          </text>
          <path
            d="M333 161Q382 97 464 117M536 117Q615 99 667 161"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            opacity=".45"
          />
          <path
            d="M339 385Q382 417 443 414M557 414Q617 413 661 385"
            fill="none"
            stroke="#888f84"
            strokeWidth="1"
            opacity=".3"
          />

          {/* Left-edge slot reaches the top at the clockwise quarter-turn. */}
          <g className="dx-card-slot">
            <path
              d="M287 184L304 190V325L287 332Z"
              fill={paint("silver")}
              stroke="#152027"
              strokeWidth="2"
            />
            <rect
              x="290"
              y="196"
              width="7"
              height="123"
              rx="3"
              fill="#02070a"
            />
            <path d="M299 197V318" stroke="#909b9c" strokeWidth="1" />
            <path
              className="dx-slot-ready"
              d="M293 202V313"
              stroke="#dc95ba"
              strokeWidth="2"
            />
          </g>

          <circle
            cx="500"
            cy="257"
            r="133"
            fill="#081017"
            stroke="#747c7b"
            strokeWidth="1.5"
          />
          <circle
            cx="500"
            cy="257"
            r="128"
            fill={paint("silver")}
            stroke="#c4cecd"
            strokeWidth="2"
          />
          {Array.from({ length: 19 }, (_, i) => (
            <circle
              key={i}
              cx="500"
              cy="257"
              r={125 - i * 1.65}
              fill="none"
              stroke={i % 2 ? "#e9edec" : "#536b7b"}
              strokeWidth=".55"
              opacity={i % 3 ? ".21" : ".34"}
            />
          ))}
          <path
            d="M399 181A127 127 0 0 1 543 138M381 283A122 122 0 0 0 452 370"
            fill="none"
            stroke="#f8faf0"
            strokeWidth="2"
            opacity=".55"
          />
          <path
            d="M601 333A127 127 0 0 1 457 376"
            fill="none"
            stroke="#354b60"
            strokeWidth="2"
            opacity=".45"
          />
          <circle
            cx="500"
            cy="257"
            r="94"
            fill="#d4dedc"
            stroke="#6d7f8b"
            strokeWidth="1.5"
          />
          <circle
            cx="500"
            cy="257"
            r="89"
            fill="#111b25"
            stroke="#7c8d97"
            strokeWidth="2"
          />
          <circle cx="500" cy="257" r="85" fill={paint("lens")} />
          <circle
            className="dx-lens-lit"
            cx="500"
            cy="257"
            r="83"
            fill={paint("activated")}
          />
          {card && cardPhase !== "inserting" && (
            <g clipPath={paint("lensClip")}>
              <g
                className="dx-lens-display"
                data-testid="lens-emblem"
                data-card-id={card.id}
                data-emblem={card.mainCard.emblem}
                color={card.mainCard.accent}
              >
                <g
                  className="dx-lens-emblem"
                  transform="translate(444 201) scale(.7)"
                >
                  <CardEmblemPaths emblem={card.mainCard.emblem} />
                </g>
              </g>
            </g>
          )}
          <g clipPath={paint("lensClip")}>
            <path
              d="M434 197Q489 158 558 207L463 292L419 259Z"
              fill={paint("reflection")}
            />
            <path
              d="M531 180L565 197L443 335L429 319Z"
              fill="#dae3dd"
              opacity=".035"
            />
            <path
              d="M432 212Q477 164 546 194"
              fill="none"
              stroke="#cad3cb"
              strokeWidth="1.5"
              opacity=".17"
            />
            <path
              d="M540 219L551 214M547 217L543 226"
              stroke="#ebefe5"
              strokeWidth="1.3"
              opacity=".48"
            />
            <circle cx="545" cy="219" r="2.4" fill="#e6eee0" opacity=".6" />
          </g>
          <g className="dx-lens-scanner">
            <circle
              cx="500"
              cy="257"
              r="74"
              fill="none"
              stroke="#b8668b"
              strokeWidth="1.5"
            />
            <path
              d="M444 208A74 74 0 0 1 566 224"
              stroke="#efb5d0"
              fill="none"
              strokeWidth="2"
            />
          </g>
          <circle
            cx="500"
            cy="257"
            r="85"
            fill="none"
            stroke="#becbc7"
            strokeWidth=".8"
            opacity=".3"
          />

          <g className="dx-status-jewel">
            <path
              d="M485 132V122Q485 107 500 107Q515 107 515 122V132Z"
              fill="#10181c"
              stroke="#b8c4b7"
              strokeWidth="2"
            />
            <path
              d="M489 130V122Q489 111 500 111Q511 111 511 122V130Z"
              fill={paint("jewel")}
            />
            <path
              d="M493 118L499 113L505 118L500 128Z"
              fill="#7ada87"
              opacity=".28"
            />
            <path
              d="M491 120Q491 114 497 114"
              stroke="#e9ffe3"
              strokeWidth="2"
              strokeLinecap="round"
              opacity=".85"
            />
          </g>
          {marks.map((mark) => (
            <g
              key={mark.name}
              className="dx-language-mark"
              data-language={mark.name}
              transform={`translate(${mark.x} ${mark.y})`}
            >
              <title>{mark.name}</title>
              {mark.badge === "square" ? (
                <rect
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  rx="1"
                  fill="#18211f"
                />
              ) : mark.badge === "hex" ? (
                <path
                  d="M0-13 15-6.5V6.5L0 13-15 6.5V-6.5Z"
                  fill="none"
                  stroke="#18211f"
                  strokeWidth="1.5"
                />
              ) : mark.badge === "gear" ? (
                <>
                  <circle
                    r="12"
                    fill="none"
                    stroke="#18211f"
                    strokeWidth="3"
                    strokeDasharray="2.1 2.1"
                  />
                  <circle
                    r="9.5"
                    fill="none"
                    stroke="#18211f"
                    strokeWidth="1"
                  />
                </>
              ) : mark.badge === "outline" ? (
                <rect
                  x="-13"
                  y="-10"
                  width="26"
                  height="20"
                  rx="3"
                  fill="none"
                  stroke="#18211f"
                  strokeWidth="1.1"
                />
              ) : null}
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontFamily="Arial,Helvetica,sans-serif"
                fontWeight="800"
                fontSize={
                  mark.label.length > 2 ? 9.5 : mark.badge === "gear" ? 10 : 12
                }
                letterSpacing={mark.label === "JAVA" ? ".5" : "-.6"}
                fill={mark.badge === "square" ? "#f5f2e7" : "#18211f"}
              >
                {mark.label}
              </text>
            </g>
          ))}
          <use href={`#${ref("screw")}`} x="329" y="116" />
          <use href={`#${ref("screw")}`} x="671" y="116" />
          <use href={`#${ref("screw")}`} x="330" y="400" />
          <use href={`#${ref("screw")}`} x="670" y="400" />
        </g>
      </svg>
    </div>
  );
}

export default memo(DecadriverModel);
