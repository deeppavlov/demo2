import axios from 'axios';
// tslint:disable: max-line-length
import React from 'react';
import skillWrapper, { BaseSkillProps } from '../BaseSkill';

import { Res } from '../../../lib/api';
interface Req {
  text: string;
  question: string;
}

const config: BaseSkillProps<Req, Res> = {
  title: 'Text QA',
  desc: <p>
    The Question Answering component answers a question based on a given context (e.g, a paragraph of text), where the answer to the question is a segment of the context. This component allows you to answer questions based on your documentation. To learn more on implementation check out our
    <a href="http://docs.deeppavlov.ai/en/master/features/models/squad.html" target="_blank" rel="noopener noreferrer"> documentation</a>.
    </p>,
  // docker: 'deeppavlov/squad_en',
  inputs: [{
    title: 'Enter text',
    type: 'textarea',
    name: 'text',
  }, {
    title: 'Question',
    type: 'text',
    name: 'question',
  }],
  examples: [{
    text: "北角、冊魚涌舊樓區:這一帶的人口以閩籍為主要多數，是銅鑼灣一帶人口的延續，民國時期人口不及銅鑼灣一帶多，但戰後香港人口由50萬上升到220萬，數十萬閩籍人口南下，很多都進入北角區，北角成為全世界人口最密集的地區，而人口以福建籍為壓倒性多數，這些人口或他們的第二、三代成為東區私樓人口的大部份，不少人仍懂或仍說閩南話，北角新樓亦有不少閩籍富商聚居，由銅鑼灣、跑馬地一直到冊魚涌的華人人口都是以閩籍為大多數，而北角則在中心，北角一帶亦是廣為人知的小福建社區，維多利中心的福建社團聯會為近年全港閩籍人口聯誼的地方，亦有其餘商家，構成多元文化，銅鑼灣以及北角亦有不少閩語系富商華僑聚居，不少南洋商家後代手持最少數個物業。隨住語文統一，這一帶營商的人以及住客亦有不少為非閩籍，閩籍商家亦歡迎非閩籍人口租住或購買這一帶的物業。近年很多內地人在北角站一帶街道上，使環境變差，加上蔡素玉議員熱心幫助新移民，北角站一帶有不少新移民以及內地旅客，春秧街、馬寶道一帶的商販實有部份為福建籍以及上海籍新移民。",
    question: "戰後全世界人口最密集的地區是哪裡?",
  }, {
    text: "烈女義坑有個傳說，為清朝末年，一漁人遭海盜殺害，漁人之妻不願受辱，在此跳崖自殺，後人感念烈女殉節義舉，乃命名為烈女義坑。山崖距海高達數十丈，氣勢奇偉，是拍照留念的最佳景點之一。一線天位於烈女義坑不遠的軍事據點，在兩垂直相臨的山崖中，軍事坑道靠一座水泥橋相連，橋面距海面數十丈，氣勢懾人。旅客參觀一線天之前，須先前往東引遊客服務中心申請參觀證，經衛兵陪同下，前往參觀、拍照。由於一線天目前仍屬重要軍事基地，除非經由地方軍事首長允許，一般旅客不可進入坑道內參觀。太白天聲位於東引燈塔下方海岸，指的是一處險峻尖聳的巨石，每到3至5月的霧季，煙霧朦朧的霧氣就會將石頭遮掩，若隱若現的朦朧美景，讓人彷彿置身太虛幻境中，因此有「太白天聲」之說。遊客可漫步至觀景台，清楚瞭望整個大自然渾然天成的秀麗景色。",
    question: "烈女義坑的生成與何時發生的事件有關？"
  }, {
    text: "網球正拍擊球指右手球員從身體右側擊球，擊球後球拍從體前划過，最後停留在身體左側。左手球員相反。它是網球基本技術中常用的擊球方法，往往是初學者最先學習的技術，包括上旋球、下旋球、平擊球等。正手上旋球速度快，而且不易失誤，往往用於進攻和雙方僵持對拉。正手的握拍有大陸式、東方式、半西方式和西方式。大陸式可以打出下旋球，同時方便反手擊球。半西方式和西方式有利於打出強烈的上旋。正手一般是單手握拍，但也有一些優秀運動員採用正手雙手握拍。反手擊球指右手球員從身體左側引拍擊球，擊球後球拍從體前划過，最後停留在身體右側。左手球員相反。相對於正手擊球，反手擊球較難掌握。反手擊球根據球的旋轉可分為上旋、下旋和平擊，根據握拍手可分為單手反拍和雙手反拍。單手反拍就是僅僅用持球手反手擊球，控制的範圍大，便於偽裝放小球，但穩定性較雙反差。雙手反拍是利用另一隻手輔助持拍手反手擊球，一般比單手反拍產生更大的力量，穩定性好，但需要更精密的步伐配合。在20世紀多數優秀的網球選手採用單手反拍，但1970年代後越來越多的選手採用雙反，目前大多職業選手選擇了雙反，包括拉斐爾·納達爾和小威廉絲。",
    question: "正拍擊球加上大陸式的握拍方法可以打出什麼樣的球？",
  }, {
    text: "灣仔向海的方向則有戰後1950年代至1960年代香港紅燈區所在地的駱克道、謝斐道，至今仍然有不少酒吧及一些夜總會位於這兩條街道附近，曾經大為有名的杜老誌夜總會亦是位於這裏。最後向北橫過了告士打道，進入高速發展的1970年代至1990年代，是商業區及酒店區。有各式的高樓大廈及世界級名建築，見證香港經濟的繁盛及財富的累積。此處名建築物包括有香港會議展覽中心、香港演藝學院、中環廣場等。最接近維多利亞港海旁的，是1997年香港主權移交時典禮使用的會展新翼，和象徵回歸的金紫荊廣場。灣仔亦曾一度擁有為數眾多的電影院，當中很多現已不復存在。已消失的電影院包括：香港大舞台、東方戲院、國泰戲院、京都戲院、南洋戲院、東城戲院、國民戲院、環球戲院。",
    question: "謝斐道和哪一條街道是1950、60年代灣仔的紅燈區？",
  }],
  api: async (stateReq: Req) => {
    const req = {
      context_raw: [stateReq.text],
      question_raw: [stateReq.question],
    };
    return await axios.post('https://7017.lnsigo.mipt.ru/model', req);
  },
  renderAnswer: { type: 'textqa' },
};

const TexqQA = skillWrapper<Req, Res>('textqazh');
export default function () {
  return <TexqQA {...config}/>;
}
