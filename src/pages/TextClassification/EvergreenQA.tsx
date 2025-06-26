import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"
import { evergreenClasses } from "utils/utils"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "EvergreenQA Classification",
  desc: (
    <p>
      EvergreenQA classification is used to determine whether questions have answers that never change - "Evergreen", -
      and therefore require no extra information to be provided to an LLM for answer generation,
      or they have answers that typically change over time - "Non_Evergreen", - and thus an LLM should be provided
      with specific information that might have changed over years or months.
      To learn more on implementation read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation
      </a>
      .
    </p>
  ),
  docker: "deeppavlov/evergreen_en",
  inputs: [
    {
      title: "Text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: "When was America discovered?",
    },
    {
      question: "Who is the current Formula 1 champion?",
    },
    {
      question: "Combien de jours y a-t-il dans une année?",
    },
    {
      question: "Combien de temps faut-il pour voyager en train de Moscou à Vladivostok ?",
    },
    {
      question: "В каком году было последнее солнечное затмение?",
    },
    {
      question: "В каком году был проведён первый чемпионат мира по футболу?",
    },
    {
      question: "Где находится самое высокое здание в мире?",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      x: [stateReq.question],
    }
    return await axios.post("https://10.11.1.11:5025/model", req)
  },
  renderAnswer: { type: "evergreen", colors: evergreenClasses },
  snippets: scripts.textClassification.evergreenClassification,
}

const Evergreen = skillWrapper<Req, Res>("evergreen")
export default function () {
  return <Evergreen {...config} />
}
