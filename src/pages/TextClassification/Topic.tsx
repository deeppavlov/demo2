import React from "react"
import { topicClasses } from "utils/utils"
import { scripts } from "assets/scripts"
import api, { Res, StoreReq } from "lib/api"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Topic classification",
  desc: (
    <p>
      Topic classification involves categorizing text documents or content into
      specific topics or subject areas, such as <b>music</b>, <b>sports</b>,{" "}
      <b>clothes</b> and others. Our multilingual model was trained to automatically
      assign one of 22 possible topics to texts. To learn more on implementation
      read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation
      </a>
      .
    </p>
  ),
  docker: "deeppavlov/intents_en",
  inputs: [
    {
      title: "Text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Great shirt, the talls are perfect length",
    },
    {
      question:
        "Acrobat Medical Clinic has been providing qualified medical care to you and your family",
    },
    {
      question:
        "Играл в мобильную стратегию с составлением собственной команды из специальных наборов - очень понравилось",
    },
    {
      question: "Какой запах не любят кошки?",
    },
    {
      question: "Quelle est la sécurité de Munich? Je veux y aller avec mon mari.",
    },
    {
      question: "Wann warst du das letzte Mal in der Kirche?",
    },
    {
      question: "En nuestra escuela, los estudiantes deben asistir a clases de Inglés",
    },
  ],
  api: api("https://7035.deeppavlov.ai/model"),
  renderAnswer: { type: "topic", colors: topicClasses },
  snippets: scripts.textClassification.topicClassification,
}
const Topic = skillWrapper<StoreReq, Res>("topic")
export default function () {
  return <Topic {...config} />
}
