export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: "#33626C",
        sage: "#CED3CD",
        beige: "#C5B496",
        capsule: "#829B97",
        ink: "#2A4F57",
      },
      fontFamily: {
        sans: [
          '"Nanum Gothic"',
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ], // <— IMPORTANT
        zen: ['"Zen Loop"', "cursive"],
      },
    },
  },
  plugins: [],
};
