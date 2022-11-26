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
  desc: <p>DaNetQA - это набор да/нет вопросов с ответами и фрагментом текста, содержащим ответ.</p>,
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
      text: "В период с 1969 по 1972 год по программе «Аполлон» было выполнено 6 полётов с посадкой на Луне. Всего на Луне высаживались 12 астронавтов США. Список космонавтов Список космонавтов — участников орбитальных космических полётов Список астронавтов США — участников орбитальных космических полётов Список космонавтов СССР и России — участников космических полётов Список женщин-космонавтов Список космонавтов, посещавших МКС Энциклопедия астронавтики.",
      question: "Был ли человек на луне?",
    },
    {
      text: "Доисторическая эпоха Австралии — временной отрезок с момента прибытия в Австралию первых людей и до их первой встречи с европейцами в 1606 году, когда начинается письменная история Австралии. По различным оценкам, праистория Австралии продолжалась от 40 до 70 тысяч лет. Первые грацильные сапиенсы переправились в Сахул там, где сейчас находится Арафурское море и архипелаг Ару. По мнению антропологов, человек разумный прибыл в Австралию не позднее 40 тысяч лет назад. К этому времени относятся следы обитания человека, обнаруженные в верховьях реки Суон в Западной Австралии.",
      question: "Были ли в австралии аборигены?",
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
