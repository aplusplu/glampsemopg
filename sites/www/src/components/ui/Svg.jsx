// Small helper for clean SVG usage
export default function Svg({ viewBox = "0 0 1440 1024", children, ...rest }) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}
