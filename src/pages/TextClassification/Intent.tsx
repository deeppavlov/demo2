import React from "react"
import skillWrapper, { BaseSkillProps } from "../../components/BaseSkill"
import api, { Res, StoreReq } from "../../lib/api"
import { intentsClasses } from "../../utils/utils"
import { CustomLink } from "components/CustomLink/CustomLink"
import { scripts } from "assets/scripts"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Intent classification",
  desc: (
    <p>
      Intent classification recognizes intents based on users utterance. This
      demo was trained on the
      <CustomLink href="https://github.com/snipsco/nlu-benchmark/tree/master/2017-06-custom-intent-engines">
        {" "}
        SNIPS{" "}
      </CustomLink>
      dataset that focuses on seven intents <b>SearchCreativeWork</b>,{" "}
      <b>GetWeather</b>, <b>BookRestaurant</b> and others. This component solves
      various business problems such as ticketing and booking services, renting
      and scheduling, accepting orders, consulting and customer support. To
      learn more on implementation read our
      <CustomLink href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        {" "}
        documentation{" "}
      </CustomLink>
      and check out our{" "}
      <CustomLink href="https://towardsdatascience.com/the-bert-based-text-classification-models-of-deeppavlov-a85892f14d61">
        tutorial.
      </CustomLink>
      <br />
      <br />
    </p>
  ),
  docker: "deeppavlov/intents_en",
  inputs: [
    {
      title: "Enter text",
      type: "text",
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
  api: api("https://7007.deeppavlov.ai/model"),
  renderAnswer: { type: "intent", colors: intentsClasses },
  snippets: scripts.textClassification.intentClassification,
}

const Intent = skillWrapper<StoreReq, Res>("intenten")
export default function () {
  return <Intent {...config} />
}
