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
        "I am excited to invite you to my 30th birthday party on Saturday, May 16th at 6 pm. The celebration will take place at the delightful Tasty Food restaurant, located at 50431 Sherry Lodge, Mitchellberg. This event, which occurs once a year, will be a joyous gathering of friends and family. We will be indulging in a delicious dinner featuring Italian cuisine. As we celebrate, we expect a warm and sunny weather, perfect for enjoying the evening. Dress code: smart casual, with a touch of green and color to add a festive flair."
    },
    {
      question:
        "On this warm, sunny, and lovely day for a walk in Central Park, David was in a hurry for an interview at the tech giant Groggle Company. He woke up at 6 AM but didn't have time to have a proper breakfast. David, a young man, lives in his brother's house, which includes a bathroom, a bedroom and a living room, located outside the bustling city of New York. His brother, Alex, who is five years older than him, often advises him to move closer to the city."
    },
    {
      question:
        "Cuenta con un PIB nominal de 142223 millones € y un PIB per cápita nominal de 30619 €, lo que representa un PIB PPA per cápita de 36240 €, 11​ siendo la segunda área metropolitana francesa en actividad económica y la decimoséptima mundial después de Londres, París, Rin-Ruhr, Ámsterdam. Наш отель располагается по адресу Москва, улица Новая, дом 14. Ресторан при нашем отеле открыт каждый день, кроме воскресенья, с 10 утра и до 8 вечера. Last year, US corporations occupied 80% of Tianjin City's foreign merchant investment, with operating volume occupying 32%, but profits occupying 45%. "
    },
    {
      question:
        "Музей-квартира Владимира Ивановича Немировича-Данченко была создана как филиал Музея МХАТ постановлением Совнаркома СССР от 25 апреля 1943 года в целях увековечения памяти одного из основателей и руководителей Московского Художественного театра. В доме 5 в Глинищевском переулке Немирович-Данченко прожил последние пять лет своей жизни."
    },
    {
      question:
        "Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию Оскар за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе Hollywood and Highland Center в Лос-Анджелесе, Калифорния."
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
