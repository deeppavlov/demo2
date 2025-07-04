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
      text: "The U.S. is ready to engage in talks about North Korea's nuclear program even as it maintains pressure on Kim Jong Un's regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea's President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed 'maximum pressure and engagement at the same time.' Pence spoke in an interview on his way home from the Winter Olympics. 'The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,' the Post quoted Pence as saying. 'So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we'll talk.'",
      question: "What country is under the pressure?",
      answer: "North Korea",
    },
    {
      text: "The U.S. is ready to engage in talks about North Korea's nuclear program even as it maintains pressure on Kim Jong Un's regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea's President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed 'maximum pressure and engagement at the same time.' Pence spoke in an interview on his way home from the Winter Olympics. 'The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,' the Post quoted Pence as saying. 'So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we'll talk.'",
      question: "Who is Mike Pence?",
      answer: "Vice President of the United States",
    },
    {
      text: "The U.S. is ready to engage in talks about North Korea's nuclear program even as it maintains pressure on Kim Jong Un's regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea's President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed 'maximum pressure and engagement at the same time.' Pence spoke in an interview on his way home from the Winter Olympics. 'The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,' the Post quoted Pence as saying. 'So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we'll talk.'",
      question: "Where is the Winter Olympic Games in 2018?",
      answer: "Pyeongchang, South Korea",
    },
    {
      text: "The most basic method of checking the primality of a given integer n is called trial division. This routine consists of dividing n by each integer m that is greater than 1 and less than or equal to the square root of n. If the result of any of these divisions is an integer, then n is not a prime, otherwise it is a prime. Indeed, if  is composite (with a and b ≠ 1) then one of the factors a or b is necessarily at most . For example, for , the trial divisions are by m = 2, 3, 4, 5, and 6. None of these numbers divides 37, so 37 is prime. This routine can be implemented more efficiently if a complete list of primes up to  is known—then trial divisions need to be checked only for those m that are prime. For example, to check the primality of 37, only three divisions are necessary (m = 2, 3, and 5), given that 4 and 6 are composite.",
      question:
        "How many divisions are required to verify the primality of the number 37?",
      answer: "3",
    },
    {
      text: "The most basic method of checking the primality of a given integer n is called trial division. This routine consists of dividing n by each integer m that is greater than 1 and less than or equal to the square root of n. If the result of any of these divisions is an integer, then n is not a prime, otherwise it is a prime. Indeed, if  is composite (with a and b ≠ 1) then one of the factors a or b is necessarily at most . For example, for , the trial divisions are by m = 2, 3, 4, 5, and 6. None of these numbers divides 37, so 37 is prime. This routine can be implemented more efficiently if a complete list of primes up to  is known—then trial divisions need to be checked only for those m that are prime. For example, to check the primality of 37, only three divisions are necessary (m = 2, 3, and 5), given that 4 and 6 are composite.",
      question:
        "Trial division involves dividing n by every integer m greater than what?",
      answer: "1",
    },
    {
      text: "The most basic method of checking the primality of a given integer n is called trial division. This routine consists of dividing n by each integer m that is greater than 1 and less than or equal to the square root of n. If the result of any of these divisions is an integer, then n is not a prime, otherwise it is a prime. Indeed, if  is composite (with a and b ≠ 1) then one of the factors a or b is necessarily at most . For example, for , the trial divisions are by m = 2, 3, 4, 5, and 6. None of these numbers divides 37, so 37 is prime. This routine can be implemented more efficiently if a complete list of primes up to  is known—then trial divisions need to be checked only for those m that are prime. For example, to check the primality of 37, only three divisions are necessary (m = 2, 3, and 5), given that 4 and 6 are composite.",
      question:
        "What must the integer m be less than or equal to when performing trial division?",
      answer: "square root of n",
    },
    {
      text: "Prince Harry and fiancee American actress Meghan Markle have released more details about their May 19 wedding, revealing that the event will include a carriage ride through Windsor so they can share the big day with the public. The couple will marry at noon in St. George's Chapel, the 15th century church on the grounds of Windsor Castle that has long been the backdrop of choice for royal occasions. Harry's grandmother, Queen Elizabeth II, gave permission for use of the venue and will attend the wedding. Kensington Palace said in a statement that the couple is 'hugely grateful' for the many good wishes they have received and they hope the carriage ride will give the general public a chance to take part.",
      question: "Who is going to marry?",
      answer: "Prince Harry and Meghan Markle",
    },
    {
      text: "Prince Harry and fiancee American actress Meghan Markle have released more details about their May 19 wedding, revealing that the event will include a carriage ride through Windsor so they can share the big day with the public. The couple will marry at noon in St. George's Chapel, the 15th century church on the grounds of Windsor Castle that has long been the backdrop of choice for royal occasions. Harry's grandmother, Queen Elizabeth II, gave permission for use of the venue and will attend the wedding. Kensington Palace said in a statement that the couple is 'hugely grateful' for the many good wishes they have received and they hope the carriage ride will give the general public a chance to take part.",
      question: "When will be the wedding?",
      answer: "May 19",
    },
    {
      text: "Prince Harry and fiancee American actress Meghan Markle have released more details about their May 19 wedding, revealing that the event will include a carriage ride through Windsor so they can share the big day with the public. The couple will marry at noon in St. George's Chapel, the 15th century church on the grounds of Windsor Castle that has long been the backdrop of choice for royal occasions. Harry's grandmother, Queen Elizabeth II, gave permission for use of the venue and will attend the wedding. Kensington Palace said in a statement that the couple is 'hugely grateful' for the many good wishes they have received and they hope the carriage ride will give the general public a chance to take part.",
      question: "Where is St. George's Chapel located?",
      answer: "Windsor, United Kingdom",
    },
  ],
  api: async (stateReq: Req) => {
    const req = {
      context_raw: [stateReq.text],
      question_raw: [stateReq.question],
      answer_raw: [stateReq.answer],
    }
    return await axios.post("https://7008.deeppavlov.ai/model", req)
  },
  renderAnswer: { type: "textqa" },
  snippets: scripts.tokenClassification.namedEntityRecognition,
}

const NERNEW = skillWrapper<Req, Res>("nernew")
export default function () {
  return React.createElement(NERNEW as React.ComponentType<BaseSkillProps<Req, Res>>, config)
}
