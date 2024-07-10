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
        "Музей-квартира Владимира Ивановича Немировича-Данченко была создана как филиал Музея МХАТ постановлением Совнаркома СССР от 25 апреля 1943 года в целях увековечения памяти одного из основателей и руководителей Московского Художественного театра. В доме 5 в Глинищевском переулке Немирович-Данченко прожил последние пять лет своей жизни."
    },
    {
      question:
        "Tesla, as of 2023, is the world's most valuable automaker. In 2022, the company led the battery electric vehicle market, with 18% share. Its subsidiary Tesla Energy develops and is a major installer of photovoltaic systems in the United States. Tesla Energy is one of the largest global suppliers of battery energy storage systems with 6 gigawatt-hours installed in 2022."
    },
    {
      question:
        "Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию Оскар за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе (штат Калифорния, США)."
    },
    {
      question:
        "The National Museum of African American Music (NMAAM) located at 510 Broadway, Nashville is the only museum of its kind dedicated to preserving and celebrating the history of Black music in America."
    },
    {
      question:
        "I am excited to invite you to my birthday party on May 16th, taking place at delightful Tasty Food restaurant located at 50431 Sherry Lodge, Mitchellberg"
    },
    {
      question:
        "Last year, US corporations occupied 80% of Tianjin City's foreign merchant investment, with operating volume occupying 32%, but profits occupying 45%"
    },
    {
      question:
        "Cuenta con un PIB nominal de 142223 millones € y un PIB per cápita nominal de 30619 €, lo que representa un PIB PPA per cápita de 36240 €, 11​ siendo la segunda área metropolitana francesa en actividad económica y la decimoséptima mundial después de Londres, París, Rin-Ruhr, Ámsterdam"
    },
    {
      question:
        "Soichiro Honda's picture now hangs with Henry Ford's in the US Automotive Hall of Fame, and the game-show “Jeopardy'' is soon to be Sony-owned"
    },
    {
      question:
        "Свидетельство о регистрации по месту пребывания выдано Иванову Петру Сергеевичу 20 апреля 1985 года о том, что он зарегистрирован по месту пребывания по адресу: Московская обл., г. Красногорск, Красногорский пер., д. 35, кв. 9."
    },
    {
      question:
        "Two other firms, Ovonic Imaging Systems Inc. of Southfield, Mich., and Magnascreen Corp. of Pittsburgh are developing a variation of the flat-panel screens called active-matrix liquid crystal displays"
    },
    {
      question:
        "Chen points out that every year more than 900,000 residents of Taipei - or more than 30 % of its population - travel overseas"
    }
  ],
  api: api("https://7002.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
