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
      "I am excited to invite you to my 30th birthday party on May 16th at 8 pm in the evening. The celebration will take place at the delightful Tasty Food restaurant, located at 426 Jordy Lodge, Cartwrightshire. This event, which occurs once a year, will be a joyous gathering of friends and family. We will be indulging in a delicious dinner featuring Italian cuisine. Dress code: smart casual, with a touch of blue and green colors to add a festive flair."
    },
    {
      question:
      "Due to new regulations under the Fair Trade Act, customers are entitled to a refund for up to 30 items. For inquiries or to request a refund, please contact us at (123) 456-7890 or email support@example.com. All requests must be made in accordance with the outlined law and within the given timeframe."
    },
    {
      question:
      "Музей-квартира Владимира Ивановича Немировича-Данченко была создана как филиал Музея МХАТ постановлением Совнаркома СССР от 25 апреля 1943 года в целях увековечения памяти одного из основателей и руководителей Московского Художественного театра. Немирович-Данченко прожил последние пять лет своей жизни в доме под номером 5 в Глинищевском переулке."
    },
    {
      question:
      "Члены Американской академии киноискусств решили присудить режиссеру Дэвиду Линчу почетную премию Оскар за выдающийся вклад в кинематограф, сообщается на сайте академии. Церемония награждения пройдет 27 октября в развлекательном комплексе \"Cinematography Center\" в Лос-Анджелесе, Калифорния."
    },
    {
      question:
      "Cuenta con un PIB nominal de 142223 millones € y un PIB per cápita nominal de 30619 €, lo que representa un PIB PPA per cápita de 36240 €, 11​ siendo la segunda área metropolitana francesa en actividad económica y la decimoséptima después de Londres, París, Rin-Ruhr, Ámsterdam. Наш отель располагается по адресу Москва, улица Новая, дом 14. Ресторан при нашем отеле открыт каждый день, кроме воскресенья, с 10 утра и до 8 вечера. Last year, US corporations occupied 80% of Tianjin City's foreign merchant investment, with operating volume occupying 32%, but profits occupying 45%."
    },
  ],
  api: api("https://7002.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
