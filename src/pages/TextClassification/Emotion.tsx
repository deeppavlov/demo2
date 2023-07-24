import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"
import { emotionClasses } from "utils/utils"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "Emotion Classification",
  desc: (
    <p>
      Emotion classification - a task similar to the sentiment classification,
      is to identify and classify the emotions expressed in the text. This can
      help to understand the emotional reactions or attitudes of individuals
      towards a particular topic, product, or experience. We can recognize one
      out of 5 emotions using a multilingual model. To learn more on implementation
      read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation
      </a>
      .
    </p>
  ),
  docker: "deeppavlov/odqa_en",
  inputs: [
    {
      title: "Text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: "This makes me smile",
    },
    {
      question: "It surprises me that he's slow some days",
    },
    {
      question: "I am very afraid of heights, go there without me",
    },
    {
      question: "Меня снова накрыла депрессия!",
    },
    {
      question:
        "Как можно быть таким упрямым, и не замечать очевидного, бесишь!",
    },
    {
      question:
        "J'ai été très surpris quand il est arrivé à l'heure. Habituellement, il a 30 minutes de retard",
    },
    {
      question: "Ich habe es satt, ich verlasse dich!",
    },
    {
      question: "No voy a nadar allí, tengo miedo de las profundidades",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      x: [stateReq.question],
    }
    return await axios.post("https://7031.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "emotion", colors: emotionClasses },
  snippets: scripts.textClassification.emotionClassification,
}

const Emotion = skillWrapper<Req, Res>("emotion")
export default function () {
  return <Emotion {...config} />
}
