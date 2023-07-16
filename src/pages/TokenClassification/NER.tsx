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
      <b>currency</b> and others. Our model was trained on a multilingual
      dataset and can recognize 33 entities. NER can be used as a knowledge
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
        "John, did you set a weekly appointment reminder? Can't find it in my inbox.",
    },
    {
      question:
        "Let's order pizza delivery at Marty and Ricky's for 3 pm.",
    },
    {
      question:
        "Spiel den song major Tom von David Bowie.",
    },
    {
      question:
        "Как думаешь, надо ли мне закрыть окно перед сегодняшней прогулкой? Хочу после неё взять такси и уехать в Рязань.",
    },
    {
      question:
        'Установи освещение в гостиной комнате белого цвета.',
    },
    {
      question:
        "Ali ile gelecek hafta salı toplantı.",
    },
  ],
  api: api("https://7036.deeppavlov.ai/model"),
  renderAnswer: { type: "ner", colors: newNer },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NER = skillWrapper<StoreReq, Res>("neren")
export default function () {
  return <NER {...config} />
}
