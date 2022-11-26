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
  title: "Да/Нет QA",
  desc: <p></p>,
  // docker: 'deeppavlov/squad_ru',
  inputs: [
    {
      title: "Введите текст",
      type: "textarea",
      name: "text",
    },
    {
      title: "Введите вопрос",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      text: "Одна из наиболее влиятельных групп первой половины 70-х, Kraftwerk, вышедшие из краут-рока, заложили основы всей последующей электронной музыки своими работами, начиная с диска 1974 года Autobahn . Фактически именно Kraftwerk стали переходной ступенью от рок-музыки к новому музыкальному поджанру, в дальнейшем отдалившемуся от собственно рока, однако ставшему огромной частью музыкальной индустрии. Краут-рок в целом (и, в частности, Can и Faust) оказал немалое влияние на развитие альтернативного рока и построка. Влиятельнейшим продюсером краут-рока, разработавшим в какой-то мере его звучание и форму, был Конни Планк.",
      question: "Кто был влиятельнейшим продюсером краут-рока?",
    },
    {
      text: "Глобализация экономики — сложный и противоречивый процесс. С одной стороны, она облегчает хозяйственное взаимодействие между государствами, создаёт условия для доступа стран к передовым достижениям человечества, обеспечивает экономию ресурсов, стимулирует мировой прогресс. С другой, глобализация ведёт к негативным последствиям: закреплению периферийной модели экономики, потере своих ресурсов странами, не входящими в золотой миллиард . Глобализация распространяет конкурентную борьбу на всех участников, в том числе на слабые страны, что приводит к разорению малого бизнеса, снижению уровня жизни населения и др.",
      question: "Что делает глобализация экономики?",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      passage: [stateReq.text],
      question: [stateReq.question],
    };
    return await axios.post("https://7000.deeppavlov.ai/model", req);
  },
  renderAnswer: { type: "textqa" },
};

const SuperGlueDanetQA = skillWrapper<Req, Res>("textqaru");
export default function () {
  return <SuperGlueDanetQA {...config} />;
}
