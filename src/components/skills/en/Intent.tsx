// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';
import { renderNerClasses, intentsClasses } from '../utils';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'Intent classification',
  desc: <p>
    Intent classification recognizes intents based on users utterance.
     This demo was trained on the
     <a href="https://github.com/snipsco/nlu-benchmark/tree/master/2017-06-custom-intent-engines"> SNIPS </a>
     dataset that focuses on seven intents <b>SearchCreativeWork</b>, <b>GetWeather</b>, <b>BookRestaurant</b> and others.
     This component solves various business problems such as ticketing and booking services, renting and scheduling, accepting orders, consulting and customer support.
     To learn more on implementation read our
     <a href="http://docs.deeppavlov.ai/en/master/components/classifiers.html" target="_blank" rel="noopener noreferrer"> documentation </a>
     and check out our <a href="https://towardsdatascience.com/the-bert-based-text-classification-models-of-deeppavlov-a85892f14d61" target="_blank" rel="noopener noreferrer">tutorial.</a>
     <br/><br/>
    Classes: {renderNerClasses(intentsClasses)}
    </p>,
  docker: 'deeppavlov/intents_en',
  inputs: [{
    title: 'Enter text',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'Show me the forecast for my upcoming weekend',
  }, {
    question: 'Find me the I, Robot television show',
  }, {
    question: 'Can I get some Russian cuisine at a restaurant with Shari and I?',
  }, {
    question: 'Add Diamonds to my roadtrip playlist',
  }, {
    question: 'Play the last track from Beyoncé off Spotify',
  }, {
    question: 'Give 6 stars to Of Mice and Men',
  }, {
    question: 'Tell me what movies are showing at 7am at the closest movie house',
  }],
  api: api('https://7007.lnsigo.mipt.ru/answer'),
  renderAnswer: { type: 'intent', colors: intentsClasses },
};

const Intent = skillWrapper<StoreReq, Res>('intenten');
export default function () {
  return <Intent {...config}/>;
}
