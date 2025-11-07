import fs from 'fs'
import { resolve } from 'path'
import { createHighlighter } from 'shiki'

const themePath = resolve(__dirname, 'motherscript-color-theme.json')
const langPath = resolve(__dirname, 'motherscript.tmLanguage.json')

export const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'))
export const lang = JSON.parse(fs.readFileSync(langPath, 'utf8'))

const highlighter = await createHighlighter({
  themes: [theme],
  langs: [lang],
})

// await highlighter.loadTheme(theme)

const code = `console.log('hello')`

const html = highlighter.codeToHtml(code, {
  lang: 'MotherScript',
  theme: 'MotherScript Dark Theme'
})