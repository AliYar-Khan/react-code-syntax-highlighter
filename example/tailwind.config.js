module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-code-syntax-highlighter/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "text-zinc-500",
    "italic",
    "text-yellow-400",
    "text-blue-400",
    "font-semibold",
    "text-green-400",
    "text-purple-400",
    "text-teal-300",
    "text-white",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
