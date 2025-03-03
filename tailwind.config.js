export default {
    
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          black: "#322625",
          grey: "#ebebeb",
          blue: "#c0e3e5",
          yellow: "#fdc936",
        },
        fontFamily: {
          neutra: ["Neutra Text", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
  };