import MinListeSvg from "./MinListeSvg";

// Header badge + burger icon on top-right
export default function MinListeHeader(props) {
  return (
    <MinListeSvg {...props}>
      <path
        fill="#829B97"
        d="M305 51c0-13.807 11.193-25 25-25h39v27c0 13.807-11.193 25-25 25h-39z"
      />
      <path stroke="#fff" strokeWidth="3" d="M324 42h26M324 51h26M324 60h26" />
    </MinListeSvg>
  );
}
