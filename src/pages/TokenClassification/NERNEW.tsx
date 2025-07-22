import React from "react"
import skillWrapper, { BaseSkillProps } from "components/BaseSkill"
import api, { Res, StoreReq } from "lib/api"
import { newNer } from "utils/utils"
import { CustomLink } from "components/CustomLink/CustomLink"
import { scripts } from "assets/scripts"
import axios from "axios"

interface Req {
  text: string
  question: string
  answer: string
}

const config: BaseSkillProps<Req, Res> = {
  title: "Factual Hallucination Detection",
  desc: (
    <div style={{ marginTop: "1em" }}>
      Contextual Hallucination Detector classifies spans of text in model-generated responses based on their factual consistency with the context. It identifies which spans are <b>supported</b> by the context and which are <b>hallucinated</b>. This tool is useful in tasks like <b>question answering</b> and <b>summarization</b>, where verifying alignment between the output and source content is essential.
    </div>
  ),
  docker: "deeppavlov/ner_en",
  inputs: [
    {
      title: "Context",
      type: "textarea",
      name: "text",
    },
    {
      title: "Question",
      type: "text",
      name: "question",
    },
    {
      title: "Answer",
      type: "text",
      name: "answer",
    },
  ],
  examples: [
    {
      text: "France is a country in Europe. The capital of France is Paris. The population of France is 67 million.",
      question: "What is the capital of France? What is the population of France?",
      answer: "The capital of France is Paris. The population of France is 69 million.",
    },
    {
      text: "Canada is a country in North America. The capital city is Ottawa. The population is 38 million.",
      question: "What is the capital of Canada? What is the main language spoken?",
      answer: "The capital of Canada is Ottawa. The main language is Spanish.",
    },
    {
      text: "Rafael Nadal es un famoso tenista español. Ha ganado múltiples títulos de Grand Slam.",
      question: "¿Qué deporte practica Rafael Nadal? ¿Cuántos mundiales de fútbol ha ganado?",
      answer: "Rafael Nadal practica tenis. Ha ganado tres mundiales de fútbol..",
    },
    {
      text: "Ибупрофен — это нестероидное противовоспалительное средство. Рекомендуемая максимальная суточная доза для взрослого — 1200 мг.",
      question: "Что такое ибупрофен? Какова максимальная суточная доза для взрослого?",
      answer: "Ибупрофен — это нестероидное противовоспалительное средство. Максимальная суточная доза для взрослого — 2400 мг.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      context_raw: [stateReq.text],
      question_raw: [stateReq.question],
      answer_raw: [stateReq.answer],
    }
    // return await axios.post("https://7008.deeppavlov.ai/model", req)
    return await axios.post("http://10.11.1.2:5000/model", req)
  },
  renderAnswer: { type: "text_span" },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NERNEW = skillWrapper<Req, Res>("nernew")
export default function () {
  return React.createElement(NERNEW as React.ComponentType<BaseSkillProps<Req, Res>>, config)
}
