import axios from 'axios';

// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';

import { Res } from '../../../lib/api';
interface Req {
  text: string;
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: 'Text QA',
  desc: <p>
    The Question Answering component answers a question based on a given context
     (e.g, a paragraph of text), where the answer to the question is a segment of the context.
     This component allows you to answer questions based on your documentation.
     To learn more on implementation check out our
    <a href="http://docs.deeppavlov.ai/en/master/components/squad.html" target="_blank" rel="noopener noreferrer"> documentation</a>.
    </p>,
  docker: 'deeppavlov/squad_en',
  inputs: [{
    title: 'Enter text',
    type: 'textarea',
    name: 'text',
  }, {
    title: 'Question',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    text: 'The U.S. is ready to engage in talks about North Korea’s nuclear program even as it maintains pressure on Kim Jong Un’s regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea’s President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed “maximum pressure and engagement at the same time.” Pence spoke in an interview on his way home from the Winter Olympics. “The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,” the Post quoted Pence as saying. “So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we’ll talk.”',
    question: 'What country is under the pressure?',
  }, {
    text: 'The U.S. is ready to engage in talks about North Korea’s nuclear program even as it maintains pressure on Kim Jong Un’s regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea’s President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed “maximum pressure and engagement at the same time.” Pence spoke in an interview on his way home from the Winter Olympics. “The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,” the Post quoted Pence as saying. “So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we’ll talk.”',
    question: 'Who is Mike Pence?',
  }, {
    text: 'The U.S. is ready to engage in talks about North Korea’s nuclear program even as it maintains pressure on Kim Jong Un’s regime, the Washington Post reported, citing an interview with Vice President Mike Pence. Pence and South Korea’s President Moon Jae-in agreed on a post-Olympics strategy during conversations at the Winter Olympics in the South Korean resort of Pyeongchang that Pence dubbed “maximum pressure and engagement at the same time.” Pence spoke in an interview on his way home from the Winter Olympics. “The point is, no pressure comes off until they are actually doing something that the alliance believes represents a meaningful step toward denuclearization,” the Post quoted Pence as saying. “So the maximum pressure campaign is going to continue and intensify. But if you want to talk, we’ll talk.”',
    question: 'Where is the Winter Olympic Games in 2018?',
  }],
  api: async (stateReq: Req) => {
    const req = {
      text1: [stateReq.text],
      text2: [stateReq.question],
    };
    return await axios.post('https://7008.lnsigo.mipt.ru/answer', req);
  },
};

const TexqQA = skillWrapper<Req, Res>('textqaen');
export default function () {
  return <TexqQA {...config}/>;
}
