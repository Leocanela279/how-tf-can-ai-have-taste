# Portfolio

A static portfolio site: home page plus one page per project under `/work/<slug>/`.

## Build

```sh
npm install
npm run build
```

The site is written to `dist/` as plain HTML and CSS, so any static host can serve it.

## Where to edit

- `content.mjs`: the words, projects, links and stack chips
- `styles.css`: colours, spacing and type (the tokens at the top), light and dark themes
- `build.mjs`: the page templates and the small script for the clock and theme toggle

Fonts: Geist and Geist Mono, from `@fontsource-variable`.
