/** @type {import('tailwindcss').Config} */
// tailwind-component.config.js
module.exports = {
  content: [
    "./src/components/TestNavbar.js", // Include only TestNavbar.js
  ],
  theme: {
    extend: {
      // Your custom theme configurations
    },
  },
  variants: {
    extend: {
      // Your custom variants
    },
  },
  plugins: [
    // Your custom plugins
  ],
}
