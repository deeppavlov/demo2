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
        "Computer Sciences Corp., El Segundo, Calif., the capitalization of which exceeds 150 million dollars, is no longer able to access its page on Facebook and Instagram developed by Meta. Meta signalled this move would be coming as a response to this company's lobbying of the Online News Act, Bill C-18. According to the annual report, after the adoption of these laws, the number of Meta users decreased by 10%.",
    },
    {
      question:
        "On this warm and sunny and a lovely day for a walk in the Central park, David was in a hurry for an interview at the Groggle company. He woke up early and didn't have time to have a proper breakfast, only ate two cookies. David lives in his brother's house with a bathroom, a bedroom and a living room, outside the city. But the problem is that the Uber taxi does not go there.",
    },
    {
      question:
        "À la fin 2019, le Louvre conserve plus de 500000 œuvres, dont plus de 36000 étaient exposées. Elles présentent l'art occidental du Moyen Âge à 1848, celui des civilisations antiques qui l'ont précédé et influencé (orientales, égyptienne, grecque, étrusque et romaine), les arts des premiers chrétiens et de l'islam.",
    },
    {
      question:
        "Cuenta con un PIB nominal de 142 223 millones € y un PIB per cápita nominal de 30 619 €, lo que representa un PIB PPA per cápita de 36 240 €, 11​ siendo la segunda área metropolitana francesa en actividad económica y la decimoséptima mundial después de Londres, París, Rin-Ruhr, Ámsterdam.",
    },
    {
      question:
        "Tesla, as of 2023, is the world's most valuable automaker. In 2022, the company led the battery electric vehicle market, with 18% share. Its subsidiary Tesla Energy develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is one of the largest global suppliers of battery energy storage systems with 6 gigawatt-hours installed in 2022.",
    },
    {
      question:
        'Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию "Оскар" за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США).',
    },
    {
      question:
        "Grandpa gave Monica the shopping list. Ne peut pas trouver la lettre de mark@gmail.com. Me gustaría comerme una hamburguesa de res doble con papas fritas. Geben sie mir ihre adresse und telefonnummer. Включи поп музыку, так будет веселее играть в Tetris.",
    }
  ],
  api: api("https://7039.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
