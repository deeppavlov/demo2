// tslint:disable: max-line-length
import React from "react";
import skillWrapper, { BaseSkillProps } from "../BaseSkill";
import { Res } from "../../../lib/api";
import axios from "axios";

interface Req {
  text: string;
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: "NLI",
  desc: <div>Natural Language Inference (NLI) - given a premise sentence and a hypothesis sentence, the task is to predict whether the premise entails the hypothesis (entailment), contradicts the hypothesis (contradiction), or neither (neutral).</div>,
  // docker: "deeppavlov/ner_ru",
  inputs: [
    {
      title: "Premise",
      type: "textarea",
      name: "text",
    },
    {
      title: "Hypothesis",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      text: "Nevertheless Tommy was now certain of what he had before only suspected.",
      question: "Tommy now knew what he thought was true all along.",
    },
    {
      text: "The new rights are nice enough.",
      question: "Everyone really likes the newest benefits.",
    },
    {
      text: "Sorry but that's how it is.",
      question: "This is how things are and there are no apologies about it.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      premise: [stateReq.text],
      hypothesis: [stateReq.question],
    };
    return await axios.post("https://7002.deeppavlov.ai/model", req);
  },
};

const SuperGlueNli = skillWrapper<Req, Res>("textqaru");
export default function () {
  return <SuperGlueNli {...config} />;
}
