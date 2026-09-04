import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        penelove: {
          palette: {
            pink: "#FDD1D9",
            yellow: "#FFE9A9",
            lilac: "#D0CCE9",
            blue: "#BCE0F6",
            mint: "#E1E8BC",
            sage: "#E1E8BC",
          },
          pink: {
            50: "#FFF5F7",
            100: "#FEE9ED",
            200: "#FDD1D9", // Primary Requested Pink
            300: "#FAB4C2",
            400: "#F68FA6",
            500: "#EE5B7F",
            600: "#D63E63",
            700: "#AC2849",
          },
          blue: {
            50: "#F2F9FD",
            100: "#DEF0FA",
            200: "#BCE0F6", // Primary Requested Blue
            300: "#8ECCF1",
            400: "#57B2E9",
            500: "#2695DC",
            600: "#1777B6",
          },
          yellow: {
            50: "#FFFDF5",
            100: "#FFF5D4",
            200: "#FFE9A9", // Primary Requested Yellow
            300: "#FED978",
            400: "#FAC248",
            500: "#EFA21C",
            600: "#D0820F",
          },
          lilac: {
            50: "#F7F6FC",
            100: "#E9E6F6",
            200: "#D0CCE9", // Primary Requested Lilac
            300: "#B4ACE0",
            400: "#9789D4",
            500: "#7A66C4",
            600: "#624FA8",
            700: "#4F3E8C",
          },
          mint: {
            50: "#F9FAF4",
            100: "#F0F5D9",
            200: "#E1E8BC", // Primary Requested Mint/Sage
            300: "#C7D58F",
            400: "#AABF61",
            500: "#8BA33E",
            600: "#6E832D",
          },
          cream: {
            50: "#FFFDFB",
            100: "#FFF8F0",
            200: "#FDF4E7",
            300: "#F7ECE1",
          },
          dark: {
            800: "#2D264B",
            900: "#1E1B2E",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "Nunito", "Outfit", "system-ui", "sans-serif"],
        display: ["var(--font-fredoka)", "Quicksand", "Nunito", "sans-serif"],
      },
      boxShadow: {
        pastel: "0 10px 30px -10px rgba(253, 209, 217, 0.35), 0 4px 12px -2px rgba(208, 204, 233, 0.25)",
        "pastel-hover": "0 20px 40px -15px rgba(253, 209, 217, 0.45), 0 8px 20px -4px rgba(188, 224, 246, 0.35)",
        "pastel-glow": "0 0 25px rgba(253, 209, 217, 0.5)",
        "pastel-pink": "0 10px 30px -10px rgba(253, 209, 217, 0.45)",
        "pastel-blue": "0 10px 30px -10px rgba(188, 224, 246, 0.45)",
        "pastel-lilac": "0 10px 30px -10px rgba(208, 204, 233, 0.45)",
        "pastel-yellow": "0 10px 30px -10px rgba(255, 233, 169, 0.5)",
        "pastel-mint": "0 10px 30px -10px rgba(225, 232, 188, 0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-fast": "float 3.5s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "wiggle-soft": "wiggle 2s ease-in-out infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.03)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1.2) rotate(15deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
