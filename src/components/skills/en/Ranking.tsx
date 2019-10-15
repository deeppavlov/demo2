// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'Ranking',
  desc: <p>
    The ranking component solves the tasks of ranking and paraphrases identification based on siamese neural networks with integrated semantic similarity measure.
     The component retrieves the semantically closest response from a set of predefined responses. To learn more on implementation check out our <a href="https://deeppavlov.readthedocs.io/en/master/features/models/neural_ranking.html" target="_blank" rel="noopener noreferrer">documentation.</a><br/>
     This demo was trained on the <a href="https://github.com/shuzi/insuranceQA" target="_blank" rel="noopener noreferrer">InsuranceQA V1</a> dataset.
    </p>,
  docker: 'deeppavlov/ranking_en',
  inputs: [{
    title: 'Enter text',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'What is the price for home insurance?',
  }, {
    question: 'Fire occured in my home, is it covered by insurance?',
  }, {
    question: 'What is disability insurance?',
  }, {
    question: 'Appeal of insurance denial?',
  }],
  api: api('https://7009.lnsigo.mipt.ru/model'),
  renderAnswer: { type: 'ranking' },
};

const ODQA = skillWrapper<StoreReq, Res>('rankingen');
export default function () {
  return <ODQA {...config}/>;
}
