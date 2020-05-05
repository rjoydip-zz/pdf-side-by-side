module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: { preset: 'default' },
    '@fullhuman/postcss-purgecss': {
      content: [
        './pages/**/*.{ts,tsx,css}',
        './components/**/*.{ts,tsx,css}',
        'tailwind.css',
      ],
    },
  },
}
