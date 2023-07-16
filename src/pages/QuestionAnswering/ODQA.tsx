import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "ODQA",
  desc: (
    <p>
      Open Domain Question Answering (ODQA) answers any question based on the
      document collection covering a wide range of topics. The ODQA task
      combines two challenges of document retrieval (finding the relevant
      articles) with that of machine comprehension of text (identifying the
      answer span from those articles). This component can be used to answer
      questions based on the company knowledge base. This demo uses entire
      Wikipedia as a knowledge-base. To learn more on implementation read our{" "}
      <a href="https://docs.deeppavlov.ai/en/master/features/models/odqa.html">
        documentation
      </a>
      {" "}and check out our{" "}
      <a href="https://medium.com/deeppavlov/open-domain-question-answering-with-deeppavlov-c665d2ee4d65">
        tutorial
      </a>
      {" "}on this component.
      {/* Config link: https://github.com/deeppavlov/DeepPavlov/blob/dev/deeppavlov/configs/odqa/en_odqa_infer_wiki.json */}
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
      question: "When did the first moon landing happen?",
    },
    {
      question: "Who was the first president of France?",
    },
    {
      question: "What is the type of climate in Miami?",
    },
    {
      question: "What is the smallest country in the world?",
    },
    {
      question: "What is the name of the third planet from the Sun?",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    }
    return await axios.post("https://7038.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "textqa" },
  snippets: scripts.openDomainQA.openDomianQA,
}

const ODQA = skillWrapper<Req, Res>("odqaen")
export default function () {
  return <ODQA {...config} />
}
