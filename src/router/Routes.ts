import { Language } from "components/skills/utils"
type RouteConfig = { title: string; link: string }
type Routes = Record<Language, RouteConfig[]>

export const ROUTES: Routes = {
  ru: [
    { title: "Ответы на вопросы по тексту", link: "textqa" },
    { title: "Ответы на вопросы по Википедии", link: "odqa" },
    { title: "Распознавание именованных сущностей", link: "ner" },
    { title: "Анализ тональности", link: "sentiment" },
  ],
  en: [
    { title: "Entity recognition", link: "ner" },
    { title: "Text QA", link: "textqa" },
    { title: "ODQA", link: "odqa" },
    { title: "Ranking", link: "ranking" },
    { title: "Intent classification", link: "intent" },
    { title: "Insult detection", link: "insult" },
  ],
  mu: [
    { title: "Text QA", link: "textqa" },
    { title: "Entity recognition", link: "ner" },
  ],
}
