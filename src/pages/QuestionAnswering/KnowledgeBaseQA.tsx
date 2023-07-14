import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"

interface Req {
  question: string
}

// Config link: https://github.com/deeppavlov/DeepPavlov/blob/feat/kbqa_research/deeppavlov/configs/kbqa/kbqa_rubq.json

const config: BaseSkillProps<Req, Res> = {
  title: "Knowledge-base QA",
  desc: (
    <p>
      Knowledge Base Question Answering (KBQA) answers to user questions based
      on a structured or semi-structured knowledge base. A knowledge base is a
      repository of organized information in the form of a database containing
      facts, relationships and entities within a specific subject area. This
      demo uses Wikidata as a knowledge base. To learn more on implementation
      read our{" "}
      <a href="http://docs.deeppavlov.ai/en/master/features/models/kbqa.html">
        documentation
      </a>
      .
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
      question: "What position did Angela Merkel hold on November 10, 1994?",
    },
    {
      question: "When did Jean-Paul Sartre move to Le Havre?",
    },
    {
      question: "How many sponsors are for Juventus F.C.?",
    },
    {
      question: "Which country has the highest individual tax rate?",
    },
    {
      question: "What is crew member Yuri Gagarin’s Vostok?",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    }
    return await axios.post("https://7011.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "kbqa" },
  snippets: scripts.questionAnswering.knowledgeBaseQA,
}

const KnowledgeBaseQA = skillWrapper<Req, Res>("kbqasa")
export default function () {
  return <KnowledgeBaseQA {...config} />
}
