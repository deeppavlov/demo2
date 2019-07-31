// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';
import { renderNerClasses, ontonotesClasses } from '../utils';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'Name Entity Recognition',
  desc: <div>
    Named Entity Recognition (NER) classifies tokens in text into predefined categories (tags), such as <b>person names</b>, <b>quantity expressions</b>, <b>percentage expressions</b>, <b>names of locations</b>, <b>organizations</b>, as well as expression of <b>time</b>, <b>currency</b> and others. We can recognize up to 19 entities. DeepPavlov also features a multilingual model that is available for 104 languages. NER can be used as a knowledge extractor when you are interested in a piece of certain information in your text. To learn more on implementation read our <a href="http://docs.deeppavlov.ai/en/master/components/ner.html" target="_blank" rel="noopener noreferrer">documentation.</a>
    <br/><br/>
    Click on an entity to see its class description
    <br/>
    Classes: {renderNerClasses(ontonotesClasses)}
    </div>,
  docker: 'deeppavlov/ner_en',
  inputs: [{
    title: 'Question',
    type: 'textarea',
    name: 'question',
  }],
  examples: [{
    question: 'Computer Sciences Corp . , El Segundo , Calif . , said it is close to making final an agreement to buy Cleveland Consulting Associates from Saatchi & Saatchi',
  }, {
    question: 'Imo Industries Inc . -- $ 150 million of senior subordinated debentures due 2001 , priced at par to yield 12 % . ',
  }, {
    question: 'Gill & Duffus Ltd. , a British cocoa - trading house , estimated that the 1989 - 90 world cocoa surplus would be 231,000 tons , down from 314,000 tons for the previous year .',
  }, {
    question: 'Amtech , which also provides technical temporary employment services to aerospace , defense , computer and high - tech companies in the Southwest and Baltimore - Washington areas , said its final audited results are due in late November .',
  }, {
    question: 'Following the impeachment conviction , Dr. Benjamin Hooks , executive director of the National Association for the Advancement of Colored People , issued a restrained statement , warning that the Hastings case could set a " dangerous precedent , " but adding , " We must respect the considered judgment of the Senate . "',
  }],
  api: api('https://7010.lnsigo.mipt.ru/answer'),
  renderAnswer: { type: 'ner', colors: ontonotesClasses },
};

const NER = skillWrapper<StoreReq, Res>('neren');
export default function () {
  return <NER {...config}/>;
}
