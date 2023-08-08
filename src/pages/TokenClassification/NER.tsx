import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import api, { Res, StoreReq } from "lib/api"
import { newNer } from "utils/utils"
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
        'Computer Sciences Corp., El Segundo, Calif., said it is close to making final an agreement to buy Cleveland Consulting Associates from Saatchi & Saatchi',
    },
    {
      question:
        'Imo Industries Inc. -- $150 million of senior subordinated debentures due 2001, priced at par to yield 12%.',
    },
    {
      question:
        "À la fin 2019, le Louvre conserve plus de 500000 œuvres, dont plus de 36000 étaient exposées. Elles présentent l'art occidental du Moyen Âge à 1848, celui des civilisations antiques qui l'ont précédé et influencé (orientales, égyptienne, grecque, étrusque et romaine), les arts des premiers chrétiens et de l'islam.",
    },
    {
      question:
        "Cuenta con un PIB nominal de 142 223 millones € y un PIB per cápita nominal de 30 619 €, lo que representa un PIB PPA per cápita de 36 240 €,11​ siendo la segunda área metropolitana española en actividad económica y la decimoséptima europea después de Londres, París, Rin-Ruhr, Ámsterdam.",
    },
    {
      question: "Tesla is one of the world's most valuable companies and, as of 2023, is the world's most valuable automaker. In 2022, the company led the battery electric vehicle market, with 18% share. Its subsidiary Tesla Energy develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is one of the largest global suppliers of battery energy storage systems with 6 gigawatt-hours installed in 2022."
    },
    {
      question:
        'Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию "Оскар" за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США).',
    }
  ],
  api: api("https://7013.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
