import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bg1: "#278550",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
