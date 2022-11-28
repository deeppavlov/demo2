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
  title: "RTE",
  desc: <div>Recognizing Textual Entailment (RTE) -- the task requires to recognize, given two text fragments, whether the meaning of one text is entailed (can be inferred) from the other text.</div>,
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
      text: "Hepburn's family will receive the proceeds from the sale.",
      question: "Proceeds go to Hepburn's family.",
    },
    {
      text: "About half were along a 20-mile stretch of Santa Monica Bay from Topanga Canyon Boulevard to the Palos Verdes Peninsula.",
      question: "The coastline of Santa Monica Bay is 50 miles long.",
    },
    {
      text: "Texas Data Recovery is also successful at retrieving lost data from notebooks and laptops, regardless of age, make or model.",
      question: "In the event of a disaster you could use Texas Data Recovery and you will have the capability to restore lost data.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      sentence1: [stateReq.text],
      sentence2: [stateReq.question],
    };
    return await axios.post("https://7001.deeppavlov.ai/model", req);
  },
};

const SuperGlueRte = skillWrapper<Req, Res>("textqaru");
export default function () {
  return <SuperGlueRte {...config} />;
}
