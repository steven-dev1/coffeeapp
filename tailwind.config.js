/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(250px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-50': 'repeat(auto-fit, minmax(150px, 1fr))',
      }
    },
  },
  plugins: [],
};
