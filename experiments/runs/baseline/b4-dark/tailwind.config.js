// Build: npx tailwindcss@3 -c tailwind.config.js -i src.css -o styles.css --minify
module.exports = Object.assign({ content: { relative: true, files: ['./index.html'] } }, {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#0f0e0c',
        card: '#171613',
        ink: '#ece8df',
        muted: '#a39e93',
        line: '#2b2925',
        signal: '#ec7044',
        deep: '#1a1915',
        ondeep: '#ece8df',
      },
      maxWidth: { page: '1240px' },
    },
  },
});
