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
      multilingual model. To learn more on implementation read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation{" "}
      </a>
    </p>
  ),
  docker: "deeppavlov/odqa_en",
  inputs: [
    {
      title: "Question",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      question: "This month was a bad month for Kobold Quarterly",
    },
    {
      question:
        "I want to wish all the moms a Happy Mother’s Day.  Hope you’re all treated like Queens!",
    },
    {
      question: "You are a slow answerer",
    },
    {
      question:
        "We’ve never heard anyone say they like doing anything on Monday mornings! You must have had an early cup of coffee or two",
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
  ],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    }
    return await axios.post("https://7011.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "textsentiment", colors: sentimentClasses },
  snippets: scripts.textClassification.sentimentClassification,
}

const Sentiment = skillWrapper<Req, Res>("sentiment")
export default function () {
  return <Sentiment {...config} />
}
