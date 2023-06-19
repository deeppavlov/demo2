import React from "react"
import skillWrapper, { BaseSkillProps } from "../BaseSkill"
import api, { Res, StoreReq } from "../../../lib/api"
import { CustomLink } from "components/CustomLink/CustomLink"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Анализ тональности",
  desc: (
    <p>
      Анализ тональности - это задача для автоматизированного выявления в
      текстах эмоционально окрашенной лексики и эмоциональной оценки авторов
      (мнений) по отношению к объектам, речь о которых идёт в тексте. Этот
      компонент позволит вам оценить комментарии о вашем продукте или сервисе.
      Подробнее смотрите в нашем туториале на
      <CustomLink href="https://towardsdatascience.com/the-bert-based-text-classification-models-of-deeppavlov-a85892f14d61">
        {" "}
        Medium{" "}
      </CustomLink>
      и в{" "}
      <CustomLink href="http://docs.deeppavlov.ai/en/master/features/models/classifiers.html">
        документации.
      </CustomLink>
    </p>
  ),
  inputs: [
    {
      title: "Введите текст",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Мне фильм показался скучным и затянутым.",
    },
    {
      question: "Капец классный чувак.",
    },
    {
      question: "Херовая прическа.",
    },
    {
      question: "Охеренная прическа.",
    },
  ],
  api: api("https://7015.deeppavlov.ai/model"),
}

const Sentiment = skillWrapper<StoreReq, Res>("sentimentru")
export default function () {
  return <Sentiment {...config} />
}
