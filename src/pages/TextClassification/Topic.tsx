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
      <b>clothes</b> and others. Our model automatically assigns one of 22
      possible topics to English and Russian texts. To learn more on
      implementation read our
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        {" "}
        documentation.{" "}
      </a>
      <br />
      <br />
    </p>
  ),
  docker: "deeppavlov/intents_en",
  inputs: [
    {
      title: "Enter text",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Great shirt, the talls are perfect length",
    },
    {
      question:
        "I love these - they are so easy to eat and not sticky like the whole dates. I love to mix them with raisins and I eat them daily.",
    },
    {
      question:
        "Tough in places but an excellent read. Gives an insight about what the rest of the world wasn't allowed to hear during this period in history.",
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
  ],
  api: api("https://7035.deeppavlov.ai/model"),
  renderAnswer: { type: "topic", colors: topicClasses },
  snippets: scripts.textClassification.topicClassification,
}
const Topic = skillWrapper<StoreReq, Res>("topic")
export default function () {
  return <Topic {...config} />
}
