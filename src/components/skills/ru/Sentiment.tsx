// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import api, { Res, StoreReq } from '../../../lib/api';

const config: BaseSkillProps<StoreReq, Res> = {
  title: 'Анализ тональности',
  desc: <p>
    Анализ тональности - это задача для автоматизированного выявления в текстах эмоционально окрашенной лексики и эмоциональной оценки авторов (мнений) по отношению к объектам, речь о которых идёт в тексте.
     Этот компонент позволит вам оценить комментарии о вашем продукте или сервисе.
     Подробнее смотрите в нашем туториале на
     <a href="https://towardsdatascience.com/the-bert-based-text-classification-models-of-deeppavlov-a85892f14d61" target="_blank" rel="noopener noreferrer"> Medium </a>
     и в <a target="_blank" rel="noopener noreferrer" href="http://docs.deeppavlov.ai/en/master/features/models/classifiers.html">документации.</a>
    </p>,
  inputs: [{
    title: 'Введите текст',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'Мне фильм показался скучным и затянутым.',
  }, {
    question: 'Капец классный чувак.',
  }, {
    question: 'Херовая прическа.',
  }, {
    question: 'Охеренная прическа.',
  }],
  api: api('https://7015.lnsigo.mipt.ru/model'),
};

const Sentiment = skillWrapper<StoreReq, Res>('sentimentru');
export default function () {
  return <Sentiment {...config}/>;
}
