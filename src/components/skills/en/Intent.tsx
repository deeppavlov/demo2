import React from "react"
import skillWrapper, { BaseSkillProps } from "../BaseSkill"
import api, { Res, StoreReq } from "../../../lib/api"
import { intentsClasses } from "../utils"
import { CustomLink } from "components/CustomLink/CustomLink"

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
      <CustomLink href="http://docs.deeppavlov.ai/en/master/features/models/classifiers.html">
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
      question: "Show me the forecast for my upcoming weekend",
    },
    {
      question: "Find me the I, Robot television show",
    },
    {
      question:
        "Can I get some Russian cuisine at a restaurant with Shari and I?",
    },
    {
      question: "Add Diamonds to my roadtrip playlist",
    },
    {
      question: "Play the last track from Beyoncé off Spotify",
    },
    {
      question: "Give 6 stars to Of Mice and Men",
    },
    {
      question:
        "Tell me what movies are showing at 7am at the closest movie house",
    },
  ],
  api: api("https://7007.deeppavlov.ai/model"),
  renderAnswer: { type: "intent", colors: intentsClasses },
}

const Intent = skillWrapper<StoreReq, Res>("intenten")
export default function () {
  return <Intent {...config} />
}
