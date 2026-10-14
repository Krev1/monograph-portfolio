"use client";

import { memo, useId } from "react";
import type { PortfolioProject } from "@/data/driver-projects";
import { CardArtwork } from "./card-artwork";
import { CardEmblemPaths } from "./card-emblem";
import { DRIVER_DIMENSIONS } from "@/lib/driver-dimensions";

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
      className={"dx-model " + (activated ? "dx-model-activated " : "") + (card && cardPhase === "seated" ? "dx-model-card-seated" : "")}
      aria-hidden="true"
    >
      <svg
        className="dx-svg"
        viewBox={`30 40 ${DRIVER_DIMENSIONS.viewportWidth} ${DRIVER_DIMENSIONS.viewportHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <linearGradient id={ref("shell")} x1="0" y1="0" x2=".65" y2="1">
            <stop stopColor="#44434a" />
            <stop offset=".12" stopColor="#3f474f" />
            <stop offset=".48" stopColor="#1c252e" />
            <stop offset=".78" stopColor="#27282d" />
            <stop offset="1" stopColor="#151b22" />
          </linearGradient>
          <linearGradient id={ref("sideWall")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#77868e" /><stop offset=".2" stopColor="#283039" /><stop offset=".65" stopColor="#525e65" /><stop offset="1" stopColor="#10171e" />
          </linearGradient>
          <linearGradient id={ref("handleFace")} x1="0" y1="0" x2=".45" y2="1">
            <stop stopColor="#4f4d53" /><stop offset=".3" stopColor="#17171c" /><stop offset=".46" stopColor="#38373e" /><stop offset=".7" stopColor="#131418" /><stop offset="1" stopColor="#424147" />
          </linearGradient>
          <linearGradient id={ref("blackEdge")} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#626067" /><stop offset=".3" stopColor="#191a1f" /><stop offset=".7" stopColor="#3f3c43" /><stop offset="1" stopColor="#0e1014" /></linearGradient>
          <radialGradient id={ref("machinedRing")} cx=".5" cy=".5" r=".5">
            <stop offset=".65" stopColor="#152330" /><stop offset=".7" stopColor="#f8ffff" /><stop offset=".75" stopColor="#7f94a5" /><stop offset=".84" stopColor="#dce6e9" /><stop offset=".9" stopColor="#9daeb8" /><stop offset=".96" stopColor="#f7fcfc" /><stop offset="1" stopColor="#617584" />
          </radialGradient>
          <linearGradient id={ref("edge")} x1="0" y1="0" x2=".25" y2="1">
            <stop stopColor="#c7cfd2" />
            <stop offset=".17" stopColor="#737e86" />
            <stop offset=".48" stopColor="#353e47" />
            <stop offset=".63" stopColor="#c4cacc" />
            <stop offset=".9" stopColor="#59636d" />
            <stop offset="1" stopColor="#a3abb0" />
          </linearGradient>
          <linearGradient id={ref("silver")} x1=".16" y1="0" x2=".82" y2="1">
            <stop stopColor="#f4f7f5" />
            <stop offset=".17" stopColor="#90a0b3" />
            <stop offset=".34" stopColor="#bcc9d2" />
            <stop offset=".48" stopColor="#ffffff" />
            <stop offset=".61" stopColor="#8495a6" />
            <stop offset=".79" stopColor="#bdc8ce" />
            <stop offset="1" stopColor="#768898" />
          </linearGradient>
          <linearGradient id={ref("ivory")} x1=".1" y1="0" x2=".9" y2="1">
            <stop stopColor="#ff9bdd" />
            <stop offset=".26" stopColor="#ed49b6" />
            <stop offset=".52" stopColor="#c82b95" />
            <stop offset=".72" stopColor="#ef59bd" />
            <stop offset="1" stopColor="#9e237b" />
          </linearGradient>
          <linearGradient id={ref("whiteEdge")} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffb1e5" />
            <stop offset=".35" stopColor="#902263" />
            <stop offset=".74" stopColor="#711c57" />
            <stop offset="1" stopColor="#e46bbd" />
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
            <stop stopColor="#a12325" />
            <stop offset=".46" stopColor="#5d1019" />
            <stop offset=".85" stopColor="#1c080e" />
            <stop offset="1" stopColor="#591820" />
          </radialGradient>
          <linearGradient id={ref("reflection")} x1=".2" y1="0" x2=".8" y2="1">
            <stop stopColor="#f5faf8" stopOpacity=".42" />
            <stop offset=".24" stopColor="#b9ccd4" stopOpacity=".1" />
            <stop offset=".7" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={ref("glassCoating")} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffd7d6" stopOpacity=".18" />
            <stop offset=".45" stopColor="#d8e8eb" stopOpacity="0" />
            <stop offset="1" stopColor="#f5485d" stopOpacity=".09" />
          </linearGradient>
          <linearGradient id={ref("panelSheen")} x1="0" y1="0" x2="1" y2=".7">
            <stop stopColor="#fff" stopOpacity=".02" /><stop offset=".44" stopColor="#fff" stopOpacity=".5" /><stop offset=".49" stopColor="#fff" stopOpacity=".02" /><stop offset="1" stopColor="#91a8bb" stopOpacity=".12" />
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
            <stop stopColor={card?.mainCard.accent ?? "#ff3ea5"} />
            <stop
              offset=".38"
              stopColor={card?.mainCard.accent ?? "#ff3ea5"}
              stopOpacity=".55"
            />
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
            <rect x="288" y="225" width="91" height="72" />
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
              data-testid="reader-card-definition"
              transform={`translate(${DRIVER_DIMENSIONS.cardSeatX} ${257 + DRIVER_DIMENSIONS.cardWidth / 2}) rotate(-90) scale(${DRIVER_DIMENSIONS.cardWidth / DRIVER_DIMENSIONS.artworkWidth})`}
            >
              <CardArtwork project={card} readerSide />
            </g>
          )}
          <g id={ref("screw")}>
            <circle r="4" fill="#141b20" stroke="#859097" strokeWidth="1" />
            <path d="M-2-2L2 2" stroke="#b1b9bb" strokeWidth="1.1" />
          </g>
          <g id={ref("mechanicalPlate")}>
            <path d="M260 150H376V371H260L244 351V171Z" fill="#111820" stroke="#080d12" strokeWidth="5" />
            <path d="M268 159H369V235H257V176ZM257 289H369V362H267L257 349Z" fill="#242c35" stroke="#485059" strokeWidth="1.5" />
            <path d="M273 166H360V225H267V179ZM268 299H360V355H276L267 344Z" fill="none" stroke="#10161d" strokeWidth="3" />
            {[195,328].map(y => <g key={y}>
              <path d={`M298 ${y-22}l19 11v22l-19 11-19-11v-22Z`} fill="#171f27" stroke="#59636d" strokeWidth="1.3" />
              <circle cx="298" cy={y} r="12" fill="#222c34" stroke="#080f17" strokeWidth="2" />
              <circle cx="298" cy={y} r="6" fill="#151c23" stroke="#58616a" strokeWidth="1" />
              <path d={`M316 ${y}h20l18 ${y < 250 ? -17 : 17}M280 ${y}h-10l-8 ${y < 250 ? 18 : -18}`} fill="none" stroke="#59636e" strokeWidth="2" />
              <path d={`M318 ${y+5}h21l20 ${y < 250 ? -19 : 19}`} fill="none" stroke="#080f15" strokeWidth="3" />
            </g>)}
            <path d="M250 247H372V275H250Z" fill={paint("rail")} stroke="#071017" strokeWidth="3" />
            <path d="M258 251H371M258 270H371" stroke="#a3afb9" strokeWidth="1" opacity=".7" />
            <use href={`#${ref("screw")}`} x="349" y="168" /><use href={`#${ref("screw")}`} x="349" y="351" />
          </g>
          <g id={ref("grip")} transform="translate(-16.92 -26.3) scale(1.06 1.1)">
            {/* Sculpted silver cage, recessed windows and a separate inner spine. */}
            <path d="M324 106L285 145L151 183Q128 190 120 215L111 245Q108 283 121 313L146 346L281 387L324 409L314 426L276 401L138 358Q113 330 107 297L104 246Q108 201 131 184L276 140L307 108Z" fill={paint("sideWall")} stroke="#080e16" strokeWidth="4" />
            <path d="M324 106L284 151L151 190Q128 198 124 219L116 248Q113 282 126 309L149 338L284 377L324 409L292 405L138 356Q116 326 110 293L110 249Q112 208 133 183L280 138L298 109Z" fill={paint("handleFace")} stroke={paint("blackEdge")} strokeWidth="2.5" />
            <path d="M151 204L273 169L254 229H131Z" fill="#02060b" stroke="#576873" strokeWidth="2" />
            <path d="M135 292H254L272 351L151 317Z" fill="#02060b" stroke="#576873" strokeWidth="2" />
            <path d="M153 208L267 175L262 190L157 219L141 229H131Z" fill="#26323b" />
            <path d="M141 294L158 310L263 340L272 351L151 317L135 292Z" fill="#3b4850" />
            <path d="M163 200L175 197L162 229H149ZM149 292H162L175 324L164 321Z" fill={paint("blackEdge")} />
            <path d="M166 201L172 200L161 226M161 296L172 319" stroke="#8b858e" strokeWidth=".8" opacity=".6" />
            <path d="M299 112L324 106Q292 170 281 231H263Q272 170 299 112ZM263 292H281Q292 354 324 409L298 399Q271 350 263 292Z" fill="#090f16" stroke="#0b121a" strokeWidth="2" />
            <path d="M288 137L309 127Q288 177 279 231H262Q270 184 288 137ZM262 292H279Q287 347 309 390L288 378Q270 341 262 292Z" fill={paint("blackEdge")} />
            <path d="M284 150L291 147Q276 190 273 226H263Q270 181 284 150ZM263 297H273Q277 338 291 371L284 368Q269 329 263 297Z" fill="#384149" />
            <path d="M310 126Q289 178 281 228M281 296Q290 350 310 391" fill="none" stroke="#77747b" strokeWidth="1.5" />
            <path d="M300 115L281 146L142 191Q124 218 122 247M122 294Q127 324 144 347L281 388L309 406" fill="none" stroke="#74727a" strokeWidth="1.2" opacity=".85" />
            <path d="M118 249H280V233H120Z M118 290H280V306H126Z" fill={paint("blackEdge")} stroke="#141d26" strokeWidth="2" />
            <path d="M122 237H276M123 300H276" stroke="#79767d" strokeWidth="1.2" opacity=".9" />
            <circle cx="282" cy="263" r="33" fill="#091017" stroke="#64727a" strokeWidth="2" />
            <circle cx="282" cy="263" r="28" fill={paint("sideWall")} />
          </g>
          <g id={ref("pods")}>
            <path
              d="M-25-25H112A25 25 0 0 1 112 25H-25Q-35 25-35 12V-12Q-35-25-25-25Z"
              fill="#0a1015"
              stroke={paint("blackEdge")}
              strokeWidth="2"
            />
            {(["green", "pink", "blue"] as const).map((color, index) => (
              <g key={color} transform={`translate(${index * 49} 0)`}>
                <circle
                  r="22"
                  fill="#11171c"
                  stroke="#727f88"
                  strokeWidth="1.4"
                />
                <circle r="18.5" fill="#c474a0" />
                <circle
                  r="15.7"
                  fill={paint("blackEdge")}
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
                <ellipse cx="-4" cy="-7" rx="6.5" ry="3" fill="#f6ffff" opacity=".2" transform="rotate(-25)" />
                <circle r="20" fill="none" stroke="#f0f6f7" strokeWidth=".65" opacity=".65" />
              </g>
            ))}
          </g>
        </defs>

        <ellipse cx="500" cy="454" rx="318" ry="14" fill="#000" opacity=".35" />
        <g className="dx-carrier" data-part="carrier">
          <path
            d="M150 237H850V290H150Z"
            fill={paint("rail")}
            stroke="#0d151e"
            strokeWidth="4"
          />
          <path
            d="M154 242H846M154 286H846"
            stroke="#a2aab0"
            strokeWidth="2"
            opacity=".6"
          />
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d={`M${151 + i * 30} 247V280`}
              stroke="#101820"
              strokeWidth="4"
            />
          ))}
          <path
            d="M348 58H652L681 100L683 134L706 195L723 228V294L704 355L679 393L652 416H348L321 393L296 355L277 294V228L294 195L317 134L319 100Z"
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
            <use href={`#${ref("mechanicalPlate")}`} />
            <path
              d="M283 220H376V304H283Z"
              fill="none"
              stroke="#151c24"
              strokeWidth="4"
            />
            <path
              d="M295 224H370M295 301H370"
              stroke="#7e898e"
              strokeWidth="2"
            />
            <use href={`#${ref("grip")}`} />
            <g transform="translate(282 263) scale(1.06 1.1) translate(-282 -263)"><use href={`#${ref("pods")}`} x="165" y="263" /></g>
          </g>
          <g className="dx-mechanical-right">
            <use href={`#${ref("mechanicalPlate")}`} transform="translate(1000 0) scale(-1 1)" />
            <path
              d="M624 220H717V304H624Z"
              fill="none"
              stroke="#151c24"
              strokeWidth="4"
            />
            <path
              d="M630 224H705M630 301H705"
              stroke="#7e898e"
              strokeWidth="2"
            />
            <use
              href={`#${ref("grip")}`}
              transform="translate(1000 0) scale(-1 1)"
            />
            <g transform="translate(718 263) scale(1.06 1.1) translate(-718 -263)"><use href={`#${ref("pods")}`} x="737" y="263" /></g>
          </g>
          {/* Engraving on the connected rear carrier crown, behind the reader. */}
          <g className="dx-carrier-brand" data-testid="carrier-brand">
            <path d="M349 60H651L664 78H336Z" fill={paint("shell")} />
            <path
              d="M351 62H649"
              stroke="#d6d9d5"
              strokeWidth="1.1"
              opacity=".75"
            />
            <text
              x="501"
              y="74"
              textAnchor="middle"
              fontSize="12"
              letterSpacing="10"
              fontFamily="Arial,sans-serif"
              fontWeight="600"
              fill="#c4cccc"
              stroke="#111920"
              strokeWidth=".45"
            >
              KREV1
            </text>
          </g>
          <g className="dx-face-rotor dx-reader-unit" data-part="reader">
            <path
              d="M344 96Q500 64 656 96L680 117Q708 175 714 231V283Q711 355 681 407L658 426Q500 451 342 426L319 407Q289 355 286 283V231Q292 174 320 117Z"
              fill={paint("sideWall")}
              stroke="#0a1017"
              strokeWidth="7"
              transform="translate(0 17)"
            />
            <path
              d="M344 96Q500 64 656 96L680 117Q708 175 714 231V283Q711 355 681 407L658 426Q500 451 342 426L319 407Q289 355 286 283V231Q292 174 320 117Z"
              data-testid="reader-outer-rim"
              fill={paint("shell")}
              stroke={paint("edge")}
              strokeWidth="3"
            />
            <path d="M319 408L342 438H658L681 408L675 426L659 451H341L325 429Z" fill={paint("sideWall")} />
            <path d="M343 448H657" stroke="#a9b8bc" strokeWidth="1" opacity=".7" />
            {/* The card passes over the rear rim, but underneath the two front shell halves. */}
            {card && cardPhase !== "seated" && (
              <g
                className={"dx-transient-card dx-card-" + cardPhase}
                data-testid="transient-card"
              >
                <use
                  className="dx-card-motion"
                  href={`#${ref("readerCard")}`}
                />
              </g>
            )}
            <path
              d="M355 99Q500 62 645 99L665 119Q689 170 699 225H301Q311 170 335 119Z"
              data-testid="reader-front-shell"
              fill={paint("whiteEdge")}
            />
            <path
              d="M355 99Q500 62 645 99L665 119Q689 170 699 225H301Q311 170 335 119Z"
              fill={paint("ivory")}
              transform="translate(0 -3)"
            />
            <path
              d="M301 298H699Q695 362 668 408L649 430H351L332 408Q305 362 301 298Z"
              fill={paint("whiteEdge")}
            />
            <path
              d="M303 297H697Q691 357 665 402L647 419Q500 446 353 419L335 402Q309 357 303 297Z"
              fill={paint("ivory")}
            />
            <g className="dx-shell-facets">
              <path d="M355 96Q500 63 645 96L627 112Q500 80 373 112Z" fill="#f374ca" />
              <path d="M355 96L373 112L343 164L301 225Q308 156 333 119Z" fill="#bb298e" />
              <path d="M645 96L627 112L657 164L699 225Q692 156 667 119Z" fill="#962271" />
              <path d="M627 112L657 164L688 214Q680 154 655 123Z" fill="#df49aa" />
              <path d="M303 298L338 330L367 396L353 419L335 402Q309 355 303 298Z" fill="#a3297c" />
              <path d="M697 298L662 330L633 396L647 419L665 402Q691 355 697 298Z" fill="#c63899" />
              <path d="M353 419L367 396Q500 429 633 396L647 419Q500 448 353 419Z" fill="#a92a82" />
              <path d="M351 358Q500 420 649 358L633 395Q500 446 367 395Z" fill={paint("ivory")} opacity=".8" />
              <path d="M367 397Q500 438 633 397" fill="none" stroke="#f586d1" strokeWidth="1.2" opacity=".65" />
              <path d="M360 99Q500 69 640 99" fill="none" stroke="#ffb4e4" strokeWidth="1.2" opacity=".7" />
            </g>
            <path d="M288 228H712V294H288Z" fill="#090f13" />
            <path
              d="M298 231H702M298 292H702"
              stroke="#4f5758"
              strokeWidth="1"
            />
            <path d="M625 232H702V290H625Z" fill={paint("ribs")} />
            {/* The curved shell cutout becomes the top card mouth when the reader opens. */}
            <g
              className="dx-reader-window"
              data-testid="reader-card-window"
              data-card-id={card?.id}
            >
              <path d="M301 225H379V297H303Q326 279 326 261Q326 242 301 225Z" fill={paint("cavity")} />
              {/* The curved mouth is a rear guide; the moving card covers it. */}
              <path d="M300 225Q324 243 324 261Q324 279 302 297" fill="none" stroke="#74194f" strokeWidth="5" />
              <path d="M299 225Q321 243 321 261Q321 279 301 297" fill="none" stroke="#f273c2" strokeWidth="2.2" />
              <path d="M303 226H370M304 296H370" stroke="#822457" strokeWidth="3" />
              <path d="M304 224H369M304 298H369" stroke="#fb8bce" strokeWidth="1" opacity=".6" />
              <g clipPath={paint("cardWindowClip")}>
                <path d="M301 225H379V297H303Q326 279 326 261Q326 242 301 225Z" fill={paint("texture")} opacity=".3" />
                <path d="M352 230Q365 260 352 292" fill="none" stroke="#030508" strokeWidth="9" />
                <path d="M357 230Q369 260 357 292" fill="none" stroke="#48515a" strokeWidth="1.3" opacity=".7" />
                <path d="M327 229L337 238M329 293L338 284" stroke="#5c636a" strokeWidth="1.2" opacity=".35" />
                {card && (
                  <g
                    className={"dx-card-" + cardPhase}
                    data-testid="seated-card"
                    data-card-id={card.id}
                  >
                    <use className="dx-card-motion" href={`#${ref("readerCard")}`} />
                  </g>
                )}
                <path d="M301 225H379V297H303Q326 279 326 261Q326 242 301 225Z" fill={paint("windowShadow")} />
                <path d="M302 226H374L370 235H320ZM304 296H374L370 289H322Z" fill="#020408" opacity=".8" />
                <path d="M309 228H369M311 294H369" stroke="#353b43" strokeWidth="1.2" opacity=".65" />
              </g>
            </g>
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
            <path d="M354 88H644M306 211Q317 151 340 119M660 119Q683 152 694 211M311 306Q318 367 350 414M650 414Q682 366 689 306" fill="none" stroke="#ffffff" strokeWidth=".8" opacity=".7" />
            <path d="M355 88H644L661 116L303 209Q317 150 340 110Z" fill={paint("panelSheen")} opacity=".45" />
            <path d="M313 310L685 310Q679 369 647 419H354Z" fill={paint("panelSheen")} opacity=".32" />
            <path d="M314 217H355M645 217H686M315 305H350M650 305H685" stroke="#7b8789" strokeWidth=".7" opacity=".7" />

            <ellipse cx="502" cy="267" rx="139" ry="137" fill="#02070b" opacity=".23" />
            <ellipse cx="501" cy="264" rx="136" ry="134" fill="#02070b" opacity=".3" />
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
              fill={paint("machinedRing")}
              stroke="#c4cecd"
              strokeWidth="2"
            />
            <circle cx="500" cy="257" r="130" fill="none" stroke="#101820" strokeWidth="1.2" />
            <path d="M383 312A132 132 0 0 0 616 311" fill="none" stroke="#2c3d49" strokeWidth="5" opacity=".6" />
            <circle cx="500" cy="257" r="126.5" fill="none" stroke="#f7ffff" strokeWidth=".8" opacity=".85" />
            {Array.from({ length: 48 }, (_, index) => <g key={`lens-knurl-${index}`} transform={`rotate(${index * 7.5} 500 257)`}>
              <path d={`M500 126V${index % 4 ? 131 : 134}`} stroke="#121f2b" strokeWidth={index % 4 ? .7 : 1.2} opacity=".6" />
              <path d="M501 127V130" stroke="#f2f8fc" strokeWidth=".6" opacity=".75" />
            </g>)}
            {Array.from({ length: 38 }, (_, i) => (
              <circle
                key={i}
                cx="500"
                cy="257"
                r={125 - i * .81}
                fill="none"
                stroke={i % 2 ? "#e9edec" : "#536b7b"}
                strokeWidth=".45"
                opacity={i % 2 ? ".65" : ".48"}
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
            <g className="dx-metal-sheen" fill="none" strokeLinecap="round">
              <path d="M400 207A112 112 0 0 1 549 156" stroke="#fff" strokeWidth="9" opacity=".12" />
              <path d="M455 365A117 117 0 0 0 612 280" stroke="#fff" strokeWidth="6" opacity=".2" />
              <path d="M390 268A110 110 0 0 0 421 333" stroke="#243643" strokeWidth="5" opacity=".22" />
            </g>
            <circle
              cx="500"
              cy="257"
              r="94"
              fill="#81616b"
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
            {!card && <g clipPath={paint("lensClip")} opacity=".42">
              {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => <path key={i} d={`M${454 + i * 8} ${222 + (i % 3) * 8}V${292 - (i % 4) * 7}`} stroke="#fa594f" strokeWidth={i % 3 ? 2 : 4} />)}
              <circle cx="500" cy="257" r="74" fill="none" stroke="#f95b60" strokeWidth=".8" opacity=".4" />
            </g>}
            <circle cx="500" cy="257" r="87" fill="none" stroke="#071219" strokeWidth="2" />
            <circle cx="500" cy="257" r="88" fill="none" stroke="#ad6079" strokeWidth="1.8" opacity=".65" />
            <g clipPath={paint("lensClip")} data-testid="lens-aperture">
              {card && (
                <g
                  className={"dx-lens-card dx-card-" + cardPhase}
                  data-testid={
                    cardPhase === "inserting"
                      ? "lens-card-slide"
                      : "lens-emblem"
                  }
                  data-card-id={card.id}
                  data-emblem={card.mainCard.emblem}
                >
                  <use
                    className="dx-card-motion"
                    href={`#${ref("readerCard")}`}
                  />
                  <circle
                    cx="500"
                    cy="257"
                    r="81"
                    fill="none"
                    stroke="#02070b"
                    strokeWidth="8"
                    opacity=".55"
                  />
                </g>
              )}
            </g>
            <circle
              className="dx-lens-lit"
              cx="500"
              cy="257"
              r="83"
              fill={paint("activated")}
            />
            <g clipPath={paint("lensClip")}>
              <circle cx="500" cy="257" r="85" fill={paint("glassCoating")} />
              <path d="M421 202L437 183L570 295L555 314Z" fill="#b3d8ed" opacity=".035" />
              <path d="M429 229A77 77 0 0 1 548 195" fill="none" stroke="#eefcff" strokeWidth="2.2" opacity=".28" />
              <path d="M451 322A76 76 0 0 0 568 274" fill="none" stroke="#8bb6d0" strokeWidth=".8" opacity=".22" />
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
            {card && cardPhase === "seated" && (
              <g clipPath={paint("lensClip")} data-testid="reader-logo-light" key={card.id}>
                <g className="dx-reader-logo-light" color={card.mainCard.accent}>
                  <circle className="dx-reader-logo-halo" cx="500" cy="257" r="62" fill={paint("activated")} />
                  <g transform="translate(444 201) scale(.7)">
                    <CardEmblemPaths emblem={card.mainCard.emblem} />
                  </g>
                </g>
              </g>
            )}
            <g className="dx-lens-scanner">
              <circle
                cx="500"
                cy="257"
                r="74"
                fill="none"
                stroke={card?.mainCard.accent ?? "#ff3ea5"}
                strokeWidth="1.5"
              />
              <path
                d="M444 208A74 74 0 0 1 566 224"
                stroke={card?.mainCard.accent ?? "#ff3ea5"}
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

            <g className="dx-status-jewel" data-testid="status-jewel">
              <path d="M482 123V106Q482 86 500 86Q518 86 518 106V123Z" fill="#18201b" stroke="#603e58" strokeWidth="2" />
              <circle cx="500" cy="105" r="14" fill={paint("jewel")} stroke="#173d28" strokeWidth="2" />
              {[95, 98, 101, 104, 107, 110, 113, 116].map(y => <path key={y} d={`M491 ${y}H509`} stroke="#b5ffc8" strokeWidth=".6" opacity=".12" />)}
              <ellipse cx="496" cy="99" rx="5" ry="3" fill="#c5ffd7" opacity=".65" transform="rotate(-25 496 99)" />
              <circle cx="500" cy="105" r="11.5" fill="none" stroke="#71e89b" strokeWidth=".7" opacity=".5" />
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
                    mark.label.length > 2
                      ? 9.5
                      : mark.badge === "gear"
                        ? 10
                        : 12
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
        </g>
      </svg>
    </div>
  );
}

export default memo(DecadriverModel);
