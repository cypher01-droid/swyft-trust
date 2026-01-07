export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6D28D9",
          light: "#8B5CF6",
          dark: "#4C1D95"
        }
      },
      boxShadow: {
        soft: "0 10px 40px rgba(109,40,217,0.35)",
        glass: "0 8px 32px rgba(31, 38, 135, 0.37)"
      }
    }
  },
  plugins: []
};
