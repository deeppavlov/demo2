// tslint:disable: max-line-length
import axios from 'axios';
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import { Res } from '../../../lib/api';

interface Req {
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: 'ODQA',
  desc: <p>
    Open Domain Question Answering (ODQA) answers any question based on the document collection covering a wide range of topics.
     The ODQA task combines two challenges of document retrieval (finding the relevant articles) with that of machine comprehension of text (identifying the answer span from those articles).
     This component can be used to answer questions based on the company knowledge base.
     This demo uses entire Wikipedia as a knowledge-base.
     To learn more on implementation read our <a href="https://docs.deeppavlov.ai/en/master/features/models/odqa.html" target="_blank" rel="noopener noreferrer" >documentation </a>
     and check out our <a target="_blank" rel="noopener noreferrer" href="https://medium.com/deeppavlov/open-domain-question-answering-with-deeppavlov-c665d2ee4d65">tutorial</a> on this component.
    </p>,
  docker: 'deeppavlov/odqa_en',
  inputs: [{
    title: 'Question',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'What does computational linguistics study?',
  }, {
    question: 'When did the first moon landing happen?',
  }, {
    question: 'Where did guinea pigs originate?',
  }, {
    question: 'Who is the Greek god of War?',
  }],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    };
    return await axios.post('https://7011.deeppavlov.ai/model', req);
  },
  renderAnswer: { type: 'textqa' },
};

const ODQA = skillWrapper<Req, Res>('odqaen');
export default function () {
  return <ODQA {...config}/>;
}
