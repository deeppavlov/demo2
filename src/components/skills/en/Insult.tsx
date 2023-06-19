// tslint:disable: max-line-length
import React from "react"
import skillWrapper, { BaseSkillProps } from "../BaseSkill"
import api, { Res, StoreReq } from "../../../lib/api"
import { CustomLink } from "components/CustomLink/CustomLink"

const config: BaseSkillProps<StoreReq, Res> = {
  title: "Insult detection",
  desc: (
    <p>
      Insult detection predicts whether a comment posted during a public
      discussion is considered insulting to one of the participants. This
      component is the defense against spam and abuse in your business. To learn
      more on implementation read our{" "}
      <CustomLink href="https://docs.deeppavlov.ai/en/master/features/models/classification.html">
        documentation.
      </CustomLink>
    </p>
  ),
  docker: "deeppavlov/insults_en",
  inputs: [
    {
      title: "Enter text",
      type: "text",
      name: "question",
    },
  ],
  examples: [
    {
      question: "Shit happens",
    },
    {
      question: "You're just too fat, man",
    },
    {
      question: "Money talks and bullshit walks",
    },
    {
      question: "You are stupid asshole",
    },
    {
      question: "I just fucked up",
    },
    {
      question:
        "Your house is so dirty you have to wipe your feet before you go outside",
    },
  ],
  api: api("https://7006.deeppavlov.ai/model"),
}

const Insult = skillWrapper<StoreReq, Res>("insulten")
export default function () {
  return <Insult {...config} />
}
