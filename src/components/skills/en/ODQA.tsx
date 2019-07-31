// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'ODQA',
  desc: <p>
    Open Domain Question Answering (ODQA) answers any question based on the document collection covering a wide range of topics.
     The ODQA task combines two challenges of document retrieval (finding the relevant articles) with that of machine comprehension of text (identifying the answer span from those articles).
     This component can be used to answer questions based on the company knowledge base.
     This demo uses entire Wikipedia as a knowledge-base.
     To learn more on implementation read our <a href="http://docs.deeppavlov.ai/en/master/features/skills/odqa.html" target="_blank" rel="noopener noreferrer" >documentation </a>
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
  api: api('https://7011.lnsigo.mipt.ru/answer'),
};

const ODQA = skillWrapper<StoreReq, Res>('odqaen');
export default function () {
  return <ODQA {...config}/>;
}
