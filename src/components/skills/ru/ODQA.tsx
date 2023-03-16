import axios from 'axios';
// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';
import { Res } from '../../../lib/api';

interface Req {
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: 'Ответы на вопросы по Википедии',
  desc: <p>
    Open Domain Question Answering (ODQA) - это задача поиска ответа на любой вопрос внутри коллекции документов, например, в Википедии.
     Решение задачи идет в два шага: сначала подбираются релевантные документы, затем в тексте каждого выбирается фраза, предположительно содержащая ответ, и наиболее подходящий отображается на экране.
     Представленный здесь навык ищет ответы в русскоязычной Википедии.
     Бизнес решения на основе ODQA - это, например, диалоговые ассистенты, отвечающие на вопросы по корпоративным базам знаний, справочной и технической документации.
    <br/><br/> Основы практического использования описано в нашем туториале на
    <a href="https://medium.com/deeppavlov/open-domain-question-answering-with-deeppavlov-c665d2ee4d65" target="_blank" rel="noopener noreferrer"> Medium </a>
    и в <a href="https://docs.deeppavlov.ai/en/master/features/models/odqa.html" target="_blank" rel="noopener noreferrer">документации.</a>
    </p>,
  docker: 'deeppavlov/odqa_ru',
  inputs: [{
    title: 'Введите вопрос',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    question: 'Как отводятся излишки тепла у млекопитающих?',
  }, {
    question: 'Сколько детей родилось в 2008 году у граждан Швейцарии?',
  }, {
    question: 'Какое государство берберов считается последним?',
  }, {
    question: 'Где расположен международный аэропорт Никола Тесла?',
  }],
  api: async (stateReq: Req) => {
    const req = {
      question_raw: [stateReq.question],
    };
    return await axios.post('https://7012.deeppavlov.ai/model', req);
  },
  renderAnswer: { type: 'textqa' },
};

const ODQA = skillWrapper<Req, Res>('odqaru');
export default function () {
  return <ODQA {...config}/>;
}
