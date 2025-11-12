import MinListeSvg from "./MinListeSvg";

// NOTE: Insert exact <defs> and upper headline shapes from your design.
export default function MinListeBackground(props) {
  return (
    <MinListeSvg {...props}>
      {/* TODO: <defs> gradients/clipPaths to be pasted here exactly as in design */}
      {/* <defs> ... </defs> */}

      {/* Base canvas */}
      <g /* clipPath if required */>
        <path fill="#CED3CD" d="M0 0h390v2652H0z" />

        {/* Top hero gradient + dark overlay (example) */}
        {/* <path fill="url(#heroGrad)" d="M0 0h390v597.317H0z" />
            <path fill="#363636" fillOpacity="0.7" d="M0 0h390v597.317H0z" /> */}

        {/* Small square avatar/logo (example) */}
        {/* <path fill="url(#avatarGrad)" d="M19 26h52v52H19z" /> */}

        {/* Upper Danish title as vector paths */}
        {/* TODO: paste the white text/paths group here */}
      </g>
    </MinListeSvg>
  );
}
