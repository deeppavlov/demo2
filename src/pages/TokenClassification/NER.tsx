import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import api, { Res, StoreReq } from "lib/api"
import { ontonotesClasses } from "utils/utils"
import { CustomLink } from "components/CustomLink/CustomLink"
import { scripts } from "assets/scripts"
const config: BaseSkillProps<StoreReq, Res> = {
  title: "Named Entity Recognition",
  desc: (
    <div style={{ marginTop: "1em" }}>
      Named Entity Recognition (NER) classifies tokens in text into predefined
      categories (tags), such as{" "}
      <b>person names</b>, <b>quantity expressions</b>,{" "}
      <b>percentage expressions</b>, <b>names of locations</b>,{" "}
      <b>organizations</b>, as well as expression of <b>time</b>,{" "}
      <b>currency</b> and others. NER can be used as a knowledge
      extractor when you are interested in a piece of certain information in
      your text. To learn more on implementation read our{" "}
      <CustomLink href="https://docs.deeppavlov.ai/en/master/features/models/NER.html">
        documentation
      </CustomLink>
      .
    </div>
  ),
  docker: "deeppavlov/ner_en",
  inputs: [
    {
      title: "Text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question:
        'Computer Sciences Corp . , El Segundo , Calif . , said it is close to making final an agreement to buy Cleveland Consulting Associates from Saatchi & Saatchi',
    },
    {
      question:
        'Imo Industries Inc . -- $ 150 million of senior subordinated debentures due 2001 , priced at par to yield 12 % .',
    },
    {
      question:
        'Amtech , which also provides technical temporary employment services to aerospace , defense , computer and high - tech companies in the Southwest and Baltimore - Washington areas , said its final audited results are due in late November .',
    },
    {
      question:
        'Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию "Оскар" за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США).',
    }
  ],
  api: api("https://7013.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: ontonotesClasses },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
