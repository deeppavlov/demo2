// tslint:disable: max-line-length
import axios from 'axios';
import React from 'react';
import uuidv4 from 'uuid/v4';
import skillWrapper, { ChatSkillProps } from '../ChatSkill';
import { Res } from '../../../lib/api';

//const apiUrl = 'http://10.11.1.41:4242/'
const apiUrl = 'https://7019.deeppavlov.ai/';
const uid: string = uuidv4();

async function chatApi(text: string): Promise<Res> {
  const req = {
    user_id: uid,
    payload: text,
  };
  return await axios.post(apiUrl, req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

async function dialogRating(dialog_id: string, rating: number): Promise<Res> {
  const req = {
    user_id: uid,
    rating,
    dialog_id
  }
  return await axios.post(apiUrl + "rating/dialog", req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

async function utteranceRating(utt_id: string, rating: number): Promise<Res> {
  const req = {
    user_id: uid,
    rating,
    utt_id
  }
  return await axios.post(apiUrl + "rating/utterance", req, {
    headers: {
        'Content-Type': 'application/json',
    }});
}

const config: ChatSkillProps<Res> = {
  title: 'DeepPavlov Dream Multiskill AI Assistant',
  desc: <div style={{ marginTop: '1em' }}><p>Welcome to DeepPavlov Dream demo! It is a running version of our Open-Source Multiskill AI Assistant that you can clone from <a href="https://github.com/deeppavlov/dream/">Dream GitHub Repository</a>. It shows how to blend goal-oriented and open domain skills inside a single AI assistant. It's under development and will learn new things over the time. You can also <a href="https://t.me/deeppavlov_dream_ai_bot">chat in Telegram</a>, and leave feedback in Telegram <a href="https://t.me/joinchat/CroEYRm2Oi12sC4EYxGUDQ">group</a> and via <a href="https://deeppavlov.ai/feedbackdream">feedback form</a>.</p>
<p><strong>NOTE:</strong> <strong>Please avoid sharing anything sensitive</strong> such as your address, phone number, family member's names, car information, passwords, driver license numbers, insurance policy numbers, loan numbers, credit/debit card numbers, PIN numbers, banking information etc. All of your conversational data may be published on <a href="https://www.deeppavlov.ai">deeppavlov.ai</a> and/or <a href="https://www.github.com/deeppavlov">github.com/deepmipt</a> websites for non-commercial purposes of collecting open-domain Conversational AI datasets.</p></div>,
  messageApi: chatApi,
  resetApi: async () => await chatApi('/start'),
  dialogRating,
  utteranceRating
};

const Chat = skillWrapper('chaten');
export default function () {
  return <Chat {...config}/>;
}
