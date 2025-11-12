import Svg from "../../ui/Svg";

// NOTE: Insert the exact vector shapes from your Forside design where marked.
export default function Forside(props) {
  return (
    <Svg viewBox="0 0 1440 1024" {...props}>
      {/* Background */}
      <rect x="0" y="0" width="1440" height="1024" fill="#F7F7F5" />
      {/* TODO: vector shapes for hills / trees / title (Danish text if vectorized) */}
      {/* <g id="title" fill="#1C1C1C">...</g> */}
      {/* <g id="scene" fill="#B7BEB2">...</g> */}
    </Svg>
  );
}
