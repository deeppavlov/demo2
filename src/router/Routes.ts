import { FC } from "react"
import Topic from "pages/TextClassification/Topic"
import Toxic from "pages/TextClassification/Toxic"
import Sentiment from "pages/TextClassification/Sentiment"
import Emotion from "pages/TextClassification/Emotion"
import Intent from "pages/TextClassification/Intent"
import NER from "pages/TokenClassification/NER"
import ODQA from "pages/QuestionAnswering/ODQA"
import ReadingComprehension from "pages/QuestionAnswering/ReadingComprehension"
// import EntityLinking from "pages/TokenClassification/EntityLinking"
// import KnowledgeBaseQA from "pages/QuestionAnswering/KnowledgeBaseQA"
// import { TextFewShot } from "pages/TextClassification/TextFewShot"
// import { PartOfSpeech } from "pages/TokenClassification/PartOfSpeech"
// import { TokenFewShot } from "pages/TokenClassification/TokenFewShot"
// import { ReadingComprehension } from "pages/QuestionAnswering/ReadingComprehension"

export type RouteConfig = { title: string; link: Links; component: null | FC }
export type Routes = Record<Titles, RouteConfig[]>

export enum Links {
  textIntent = "text_intent",
  textTopic = "text_topic",
  textSentiment = "text_sentiment",
  textToxic = "text_toxic",
  textEmotion = "text_emotion",
  textFewShot = "text_few_shot",
  tokenNer = "token_ner",
  tokenPartOfSpeech = "token_part_of_speech",
  tokenEntityLinking = "token_entity_linking",
  tokenFewShot = "token_few_shot",
  readingComprehesion = "reading_comprehension",
  knowledgeQA = "knowledgebase_qa",
  odqa = "odqa",
}

export enum Titles {
  textClass = "TextClassification",
  tokenClass = "TokenClassification",
  qa = "QuestionAnswering",
  // odqa = "OpenDomainQA",
  glue = "GLUE",
  superGlue = "SuperGLUE",
}
export const DisplayTitles: Record<Titles, string> = {
  [Titles.textClass]: "Text Classification",
  [Titles.tokenClass]: "Token Classification",
  [Titles.qa]: "Question Answering",
  // [Titles.odqa]: "Open-Domain QA",
  [Titles.glue]: "GLUE",
  [Titles.superGlue]: "SuperGLUE",
}
export const routesForDemo: Routes = {
  [Titles.textClass]: [
    {
      title: "Intent",
      link: Links.textIntent,
      component: Intent,
    },
    { title: "Topic", link: Links.textTopic, component: Topic },
    {
      title: "Sentiment",
      link: Links.textSentiment,
      component: Sentiment,
    },
    { title: "Toxic", link: Links.textToxic, component: Toxic },
    { title: "Emotion", link: Links.textEmotion, component: Emotion },
    {
      title: "Few-Shot",
      link: Links.textFewShot,
      component: null,
    },
  ],
  [Titles.tokenClass]: [
    {
      title: "Named Entity",
      link: Links.tokenNer,
      component: NER,
    },
    {
      title: "Part of Speech",
      link: Links.tokenPartOfSpeech,
      component: null,
    },
    {
      title: "Entity Linking",
      link: Links.tokenEntityLinking,
      component: null,
      // EntityLinking
    },
    {
      title: "Few-Shot",
      link: Links.tokenFewShot,
      component: null,
    },
  ],
  [Titles.qa]: [
    {
      title: "Reading Comprehension",
      link: Links.readingComprehesion,
      component: ReadingComprehension,
    },
    {
      title: "Knowledge-base QA",
      link: Links.knowledgeQA,
      component: null,
      // KnowledgeBaseQA
    },
    {
      title: "Open-Domain QA",
      link: Links.odqa,
      component: ODQA,
    },
  ],
  // [Titles.odqa]: [

  // ],
  [Titles.glue]: [],
  [Titles.superGlue]: [],
}
