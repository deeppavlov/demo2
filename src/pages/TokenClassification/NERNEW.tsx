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
  title: "Named Entity Recognition NEW",
  desc: (
    <div style={{ marginTop: "1em" }}>
      Named Entity Recognition (NER) classifies tokens in text into predefined
      categories (tags), such as <b>person names</b>,{" "}
      <b>quantity expressions</b>, <b>percentage expressions</b>,{" "}
      <b>names of locations</b>, <b>organizations</b>, as well as expression of{" "}
      <b>time</b>, <b>currency</b> and others. NER can be used as a knowledge
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
      text: "Ибупрофен — это нестероидное противовоспалительное средство. Рекомендуемая максимальная суточная доза для взрослого — 1200 мг.",
      question: "Что такое ибупрофен? Какова максимальная суточная доза для взрослого?",
      answer: "Ибупрофен — это нестероидное противовоспалительное средство. Максимальная суточная доза для взрослого — 2400 мг.",
    },
    {
      text: "Rafael Nadal es un famoso tenista español. Ha ganado múltiples títulos de Grand Slam.",
      question: "¿Qué deporte practica Rafael Nadal? ¿Cuántos mundiales de fútbol ha ganado?",
      answer: "Rafael Nadal practica tenis. Ha ganado tres mundiales de fútbol..",
    },
    {
      text: "Компания 'Ромашка' была основана в 1995 году в Москве. В настоящее время в компании работает более 500 сотрудников. Основные направления деятельности — розничная торговля и логистика.",
      question: "",
      answer: "Компания 'Ромашка' была основана в 1995 году в Москве и Санкт-Петербурге, и сейчас у неё более 500 сотрудников.",
    },
    {
      text: "The Mars Rover Curiosity landed on Mars in August 2012. It was designed by NASA to explore the surface of the planet and search for signs of past life. The rover is equipped with a range of scientific instruments and cameras. Curiosity has provided valuable data about the geology and climate of Mars.",
      question: "",
      answer: "NASA's Curiosity rover landed on Mars in 2012 and discovered evidence of current microbial life on the planet.",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      context_raw: [stateReq.text],
      question_raw: [stateReq.question],
      answer_raw: [stateReq.answer],
    }
    // return await axios.post("https://7008.deeppavlov.ai/model", req)
    return await axios.post("http://localhost:5000/model", req)
  },
  renderAnswer: { type: "text_span" },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NERNEW = skillWrapper<Req, Res>("nernew")
export default function () {
  return React.createElement(NERNEW as React.ComponentType<BaseSkillProps<Req, Res>>, config)
}
