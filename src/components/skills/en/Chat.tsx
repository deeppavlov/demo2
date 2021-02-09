// tslint:disable: max-line-length
import axios from 'axios';
import React from 'react';
import uuidv4 from 'uuid/v4';
import skillWrapper, { ChatSkillProps } from '../ChatSkill';
import { Res } from '../../../lib/api';

//const apiUrl = 'http://10.11.1.41:4242/'
const apiUrl = 'https://7019.lnsigo.mipt.ru/';
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
  title: 'DeepPavlov Deepy - Demo Moonbase AI Assistant',
  desc: <div style={{ marginTop: '1em' }}>Welcome to Deepy demo! It is a running version of our Open-Source Multiskill AI Assistant that you can clone from <a href="https://github.com/deepmipt/deepy/">Deepy GitHub Repository</a>. It shows how to blend simple and Go-Bot-based goal-oriented and chit-chat skills inside a single AI assistant. It was born from earlier DeepPavlov Dream AI Assistant Demo. You can also <a href="https://t.me/deeppavlov_dream_ai_bot">chat in Telegram</a>, and leave feedback in Telegram <a href="https://t.me/joinchat/CroEYRm2Oi12sC4EYxGUDQ">group</a> and via <a href="https://deeppavlov.ai/feedbackdream">feedback form</a>.</div>,
  messageApi: chatApi,
  resetApi: async () => await chatApi('/start'),
  dialogRating,
  utteranceRating
};

const Chat = skillWrapper('chaten');
export default function () {
  return <Chat {...config}/>;
}
