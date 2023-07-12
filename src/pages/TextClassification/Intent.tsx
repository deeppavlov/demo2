import React from "react"
import skillWrapper, { BaseSkillProps } from "../../components/BaseSkill"
import api, { Res, StoreReq } from "../../lib/api"
import { newIntent } from "../../utils/utils"
import { CustomLink } from "components/CustomLink/CustomLink"
import { scripts } from "assets/scripts"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Intent Classification",
  desc: (
    <p>
      Intent classification is a task aimed to identify the purpose or intention
      behind some text or query, for example it can <b>be setting the alarm</b>,
      <b> increasing the volume </b>
      or <b> email sending</b>. DeepPavlov was trained on a sampled set from a
      <CustomLink href="https://huggingface.co/datasets/AmazonScience/massive/blob/main/README.md">
        {" MASSIVE "}
      </CustomLink>
      dataset. Our sample dataset consists of 11 popular languages. Our model is
      able to determine intent out of 60 possible from 18 domains. To learn more
      on implementation read our
      <CustomLink href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        {" documentation."}
      </CustomLink>
      <br />
      <br />
    </p>
  ),
  docker: "deeppavlov/intents_en",
  inputs: [
    {
      title: "Enter text",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Turn on some dance music to lift our mood",
    },
    {
      question: "En que día cae nochevieja este año?",
    },
    {
      question: "Dernière nouveauté de la journée internationale de la femme",
    },
    {
      question: "Kannst du für die nächste stunde rock musik abspielen?",
    },
    {
      question: "Puoi inviare l' email al nuovo id",
    },
    {
      question: "把卧室灯改成绿色",
    },
    {
      question: "Какая будет погода в следующие выходные?",
    },
    {
      question: "Olly eve teslimat yapıyorlar mı?",
    },
  ],
  api: api("https://7033.deeppavlov.ai/model"),
  renderAnswer: { type: "intent", colors: newIntent },
  snippets: scripts.textClassification.intentClassification,
}

const Intent = skillWrapper<StoreReq, Res>("intenten")
export default function () {
  return <Intent {...config} />
}
