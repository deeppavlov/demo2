// tslint:disable: max-line-length
import React from "react";
import axios from "axios";
import skillWrapper, { BaseSkillProps } from "../BaseSkill";

import { Res } from "../../../lib/api";
interface Req {
  text: string;
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: "BoolQ",
  desc: <p>BoolQ is a QA task where each example consists of a short passage and a yes/no question about the passage.</p>,
  // docker: 'deeppavlov/squad_ru',
  inputs: [
    {
      title: "Введите текст",
      type: "textarea",
      name: "text",
    },
    {
      title: "Введите да/нет вопрос",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      text: "American entry into Canada by land -- Persons driving into Canada must have their vehicle's registration document and proof of insurance.",
      question: "can u drive in canada with us license?",
    },
    {
      text: "Anne (TV series) -- The series is filmed partially in Prince Edward Island as well as locations in Southern Ontario (including Millbrook and Caledon).",
      question: "is anne with an e filmed on pei?",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      passage: [stateReq.text],
      question: [stateReq.question],
    };
    return await axios.post("https://7043.deeppavlov.ai/model", req);
  },
  renderAnswer: { type: "textqa" },
};

const SuperGlueBoolq = skillWrapper<Req, Res>("textqaru");
export default function () {
  return <SuperGlueBoolq {...config} />;
}
