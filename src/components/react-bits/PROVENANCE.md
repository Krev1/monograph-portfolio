# Adapted React Bits components

Copyright (c)2026 David Haz. Official source: https://github.com/DavidHDev/react-bits, revision d86fccbd477786f94ca7eb891fbe0ec039d3cd3b. Supplied license retained in REACT-BITS-LICENSE.md (MIT + Commons Clause); components are part of this portfolio application.

- GlareHover.tsx / GlareHover.css: src/ts-default/Animations/GlareHover. Preserve the CSS sweep; use transparent border/background, actual card dimensions, non-intercepting decorative layer, keyboard-focus activation and explicit disabled/reduced mode.
- AnimatedContent.tsx: src/ts-default/Animations/AnimatedContent. Retain GSAP + one-shot ScrollTrigger reveal; use useGSAP for cleanup, the project's real panel scroller, a visible fallback, and immediate completion on input/focus. Interactive ability sections have zero travel.
- SplitText.tsx: src/ts-default/TextAnimations/SplitText. Retain GSAP SplitText and staggered character reveal; trigger from the mounted active-project state, clean up font readiness, preserve the parent h1/focus ref, and bypass under reduced motion or unavailable browser infrastructure.

gsap3.15.0, @gsap/react2.1.2 and lenis1.3.26 are pinned dependencies. No Motion runtime is introduced. Driver arrival and Henshin rendering are scoped in src/lib/driver-motion.ts; Lenis is confined to the project panel in src/lib/project-scroll.ts.
