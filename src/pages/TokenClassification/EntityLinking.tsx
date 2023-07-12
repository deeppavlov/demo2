import axios from "axios"
import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import { Res } from "lib/api"
import { scripts } from "assets/scripts"

interface Req {
  question: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "Entity Linking",
  desc: (
    <p>
      Entity Linking is the task of linking named entities mentioned in the text
      with their corresponding entities in a database. This task usually
      consists of two steps: first, named entities (persons, organizations,
      locations, etc.) are recognized and extracted from the text, then a
      relevant record in the database (in our case it’s Wikidata) is searched
      for each extracted entity. To learn more on implementation read our{" "}
      <a href="http://docs.deeppavlov.ai/en/master/features/models/entity_extraction.html">
        documentation{" "}
      </a>
      {/* Config link:
      https://github.com/deeppavlov/DeepPavlov/blob/master/deeppavlov/configs/entity_extraction/entity_extraction_en.json */}
    </p>
  ),
  docker: "deeppavlov/odqa_en",
  inputs: [
    {
      title: "Question",
      type: "textarea",
      name: "question",
    },
  ],
  examples: [
    {
      question:
        "Forrest Gump is a comedy-drama film directed by Robert Zemeckis and written by Eric Roth.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    }
    return await axios.post("https://7011.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "entitylinking" },
  snippets: scripts.tokenClassification.entityLinking,
}

const EntityLinking = skillWrapper<Req, Res>("entitylinking")
export default function () {
  return <EntityLinking {...config} />
}
