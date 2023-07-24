import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"
import { sentimentClasses } from "utils/utils"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "Sentiment Classification",
  desc: (
    <p>
      Sentiment classification is a NLP task consisting in classifying text into
      categories such as positive, neutral or negative, that is, the definition
      of expressed emotional tone. We can recognize all these sentiments with a
      multilingual model that has been trained on English and Russian data.
      To learn more on implementation read our{" "}
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
      question:
        "I want to wish all the moms a Happy Mother’s Day. Hope you’re all treated like Queens!",
    },
    {
      question: "You are a slow answerer",
    },
    {
      question:
        "Thank you all for the huge response with blessings and congratulations",
    },
    {
      question:
        "Это лишь официальная часть статистики. Фактическое потребление может быть в разы выше",
    },
    {
      question: "Классное заведение! Не хочется уходить отсюда",
    },
    {
      question: "Je n'ai jamais été à Paris. On peut y aller?",
    },
    {
      question: "Das war großartig!",
    },
    {
      question: "No vayas a este Restaurante, es horrible cocinar en él",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      x: [stateReq.question],
    }
    return await axios.post("https://7034.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "sentiment", colors: sentimentClasses },
  snippets: scripts.textClassification.sentimentClassification,
}

const Sentiment = skillWrapper<Req, Res>("sentiment")
export default function () {
  return <Sentiment {...config} />
}
