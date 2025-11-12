import MinListeSvg from "./MinListeSvg";

// Middle CTA panel (gradient band + rounded card + heart icon)
export default function MinListeCtaPanel(props) {
  return (
    <MinListeSvg {...props}>
      {/* Gradient band + overlay */}
      {/* <path fill="url(#midGrad)" d="M0 1064h390v311H0z" />
          <path fill="#4D4D4D" fillOpacity="0.65" d="M0 1064h390v311H0z" /> */}

      {/* Lower green panel */}
      <path
        fill="#33626C"
        d="M15 1382c0-27.61 22.386-50 50-50h311v144c0 27.61-22.386 50-50 50H15z"
      />

      {/* White outline card */}
      <path
        stroke="#fff"
        d="M83 1442.5h274.5v12.5c0 27.34-22.162 49.5-49.5 49.5H33.5V1492c0-27.34 22.162-49.5 49.5-49.5Z"
      />

      {/* Small white corner block (optional) */}
      <path
        fill="#fff"
        fillOpacity="0.18"
        d="M305 1367c0-5.52 4.477-10 10-10h35v30c0 5.52-4.477 10-10 10h-35z"
      />

      {/* Heart icon (clip if needed) */}
      {/* <g clipPath="url(#heartClip)">
            <path fill="#fff" d="..." />
          </g> */}

      {/* Optional Danish text paths inside CTA */}
      {/* TODO: paste any white text/paths that belong in the CTA here */}
    </MinListeSvg>
  );
}
