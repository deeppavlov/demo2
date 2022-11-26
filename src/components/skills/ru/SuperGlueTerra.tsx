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
  title: "Cемантическое следование",
  desc: <div>Модель семантического следования русского языка обучена на датасете TERRa (Textual Entailment Recognition for Russian). Модель представляет собой задачу бинарной классификации является ли значение одного текста вытекающим (может быть выведено) из другого текста в данной паре.</div>,
  // docker: "deeppavlov/ner_ru",
  inputs: [
    {
      title: "Введите утверждение",
      type: "textarea",
      name: "text",
    },
    {
      title: "Введите гипотезу",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      text: "Автор поста написал в комментарии, что прорвалась канализация.",
      question: "Автор поста написал про канализацию.",
    },
    {
      text: "Предприниматели продолжают устанавливать незаконные постройки, однако власти города на примере Сенной площади уже доказали, что лучше не спорить и убрать свое добро самостоятельно.",
      question: "Предприниматели иногда возводят строения незаконно.",
    },
    {
      text: "Кризис стоит рассматривать как хорошую возможность, потому что если остров объединится, то у него появится больший экономический потенциал.",
      question: "Кризис обязательно рассмотреть как признак полного краха.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      premise: [stateReq.text],
      hypothesis: [stateReq.question],
    };
    return await axios.post("https://7021.deeppavlov.ai/model", req);
  },
};

const SuperGlueTerra = skillWrapper<Req, Res>("textqaru");
export default function () {
  return <SuperGlueTerra {...config} />;
}
