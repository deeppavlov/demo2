// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'Sentiment',
  desc: <p>
    Sentiment analysis (also known as opinion mining or emotion AI) is the use of natural language processing, text analysis, computational linguistics, and 
     biometrics to systematically identify, extract, quantify, and study affective states and subjective information.
    </p>,
  docker: 'deeppavlov/sentiment_en',
  inputs: [{
    title: 'Enter text',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'the greatest musicians',
  }, {
    question: 'redundant concept',
  }, {
    question: 'a smile on your face',
  }, {
    question: 'the action is stilted',
  }],
  api: api('https://7024.deeppavlov.ai/model'),
};

const Sentimenten = skillWrapper<StoreReq, Res>('sentimenten');
export default function () {
  return <Sentimenten {...config}/>;
}
