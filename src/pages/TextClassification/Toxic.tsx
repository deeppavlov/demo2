import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"
import { insultClasses } from "utils/utils"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "Toxic Classification",
  desc: (
    <p>
      Toxicity classification, also known as toxic comment classification or
      offensive expression detection - the technique used to identify and
      categorize text or comments containing toxic or harmful content. Our model
      has been trained to predict whether the text is insulting or not.
      DeepPavlov model is multilingual and has been trained on English and
      Russian datasets. To learn more on implementation read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation{" "}
      </a>
    </p>
  ),
  docker: "deeppavlov/odqa_en",
  inputs: [
    {
      title: "Question",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Was in the city yesterday - didn’t notice anything strange",
    },
    {
      question: "You are stupid asshole",
    },
    {
      question: "They never show adds, it's so cool",
    },
    {
      question: "Who posted this shit?",
    },
    {
      question: "Man, he’s a big mofo",
    },
    {
      question: "Идиот, ты чем вообще думал?!",
    },
    {
      question: "Она - дура конченная, как можно было выложить такую хрень!",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      x: [stateReq.question],
    }
    return await axios.post("https://7032.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "insult", colors: insultClasses },
  snippets: scripts.textClassification.toxicClassification,
}

const Toxic = skillWrapper<Req, Res>("toxic")
export default function () {
  return <Toxic {...config} />
}