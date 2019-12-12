// tslint:disable: max-line-length
import axios from 'axios';
import React from 'react';
import uuidv4 from 'uuid/v4';
import skillWrapper, { ChatSkillProps } from '../ChatSkill';
import { Res } from '../../../lib/api';

const apiUrl = 'https://7018.lnsigo.mipt.ru/';
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

const config: ChatSkillProps<Res> = {
  title: 'DREAM Socialbot',
  desc: <div style={{ marginTop: '1em' }}>A virtual character able to provide entertainment with useful and funny facts,
   as well as, engage its partner into a deeper discussion on topics of interest in a natural way.</div>,
  messageApi: chatApi,
  resetApi: async () => await chatApi('/start')
};

const Chat = skillWrapper('chaten');
export default function () {
  return <Chat {...config}/>;
}
