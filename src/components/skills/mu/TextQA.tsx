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
    The Question Answering component answers a question based on a given context
     (e.g, a paragraph of text), where the answer to the question is a segment of the context.
     This component allows you to answer questions based on your documentation.
     To learn more on implementation check out our
    <a href="http://docs.deeppavlov.ai/en/master/features/models/squad.html" target="_blank" rel="noopener noreferrer"> documentation</a>.
    </p>,
  docker: 'deeppavlov/squad_en',
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
    text: 'Волосы у меня на груди окрасились, потому что я пролил на них ракетный окислитель. Лет мне двадцать девять, скоро юбилей. А в армии я потому, что меня жена с тёщей хотели в сумасшедший дом отдать — за убеждения',
    question: 'Почему у тебя волосы на груди окрасились?',
  }, {
    text: `Sri Lanka was known from the beginning of British colonial rule as Ceylon (/sɪˈlɒn/, US also /seɪˈlɒn/).
    A nationalist political movement arose in the country in the early 20th century to obtain political independence, which was granted in 1948; the country became a republic and adopted its current name in 1972.
    Sri Lanka's recent history has been marred by a 26-year civil war, which ended decisively when the Sri Lanka Armed Forces defeated the Liberation Tigers of Tamil Eelam (LTTE) in 2009.
    The current constitution stipulates the political system as a republic and a unitary state governed by a semi-presidential system.
    It has had a long history of international engagement, as a founding member of the South Asian Association for Regional Cooperation (SAARC), and a member of the United Nations, the Commonwealth of Nations, the G77, and the Non-Aligned Movement.
    Along with the Maldives, Sri Lanka is one of only two South Asian countries rated "high" on the Human Development Index (HDI), with its HDI rating and per capita income the highest among South Asian nations.
    The Sri Lankan constitution accords Buddhism the "foremost place", although it does not identify it as a state religion. Buddhism is given special privileges in the Sri Lankan constitution.`,
    question: 'What is SAARC?',
  }, {
    text: `Su área de distribución comprende casi toda Sudamérica al este de los Andes en las cuencas del río Orinoco, del Amazonas y del Río de la Plata; cubriendo desde el este de Venezuela y la Guyana hasta Uruguay y el norte y centro de Argentina.
    Pueden vivir en diferentes tipos de hábitat, pero muestran preferencia por algunos en concreto. Suelen encontrarse cerca de lagos, ríos, marismas o manglares.
    También necesitan un suelo firme para dormir, idealmente con una vegetación espesa que les sirve de protección.
    Para alimentarse no tienen problema en adentrarse por la sabana y herbazales.
    La mayor densidad de población de carpinchos se encuentra en las extensas zonas húmedas de Sudamérica, como el Pantanal, o la región de los Llanos del norte del continente, bañada por el río Orinoco. Viven mayoritariamente en las llanuras, pero también habitan en altitudes de hasta 1300 metros por sobre el nivel del mar.
    En comparación con otras especies animales de Sudamérica, las capibaras toleran bastante bien los cambios de hábitat provocados por la actividad humana, y también pueden sobrevivir en zonas transformadas en plantaciones o pastos.`,
    question: '¿En qué países viven los capibaras?',
  }, {
    text: `Su área de distribución comprende casi toda Sudamérica al este de los Andes en las cuencas del río Orinoco, del Amazonas y del Río de la Plata; cubriendo desde el este de Venezuela y la Guyana hasta Uruguay y el norte y centro de Argentina.
    Pueden vivir en diferentes tipos de hábitat, pero muestran preferencia por algunos en concreto. Suelen encontrarse cerca de lagos, ríos, marismas o manglares.
    También necesitan un suelo firme para dormir, idealmente con una vegetación espesa que les sirve de protección.
    Para alimentarse no tienen problema en adentrarse por la sabana y herbazales.
    La mayor densidad de población de carpinchos se encuentra en las extensas zonas húmedas de Sudamérica, como el Pantanal, o la región de los Llanos del norte del continente, bañada por el río Orinoco. Viven mayoritariamente en las llanuras, pero también habitan en altitudes de hasta 1300 metros por sobre el nivel del mar.
    En comparación con otras especies animales de Sudamérica, las capibaras toleran bastante bien los cambios de hábitat provocados por la actividad humana, y también pueden sobrevivir en zonas transformadas en plantaciones o pastos.`,
    question: 'What countries do capybara live in?',
  }, {
    text: `Rosjanie zawsze odnosili wielkie sukcesy pod względem liczby utalentowanych sportowców i ilości zdobytych medali na igrzyskach olimpijskich oraz w innych zawodach międzynarodowych.
    W przeciągu istnienia ZSRR radzieccy olimpijczycy zdobyli największą liczbę medali na 14 spośród 18 olimpiad.
    Biorąc pod uwagę ten fakt, można stwierdzić, iż Związek Radziecki był w owym czasie dominującą potęgą sportową.
    Począwszy od Olimpiady Letniej w 1952 r. sportowcy radzieccy zawsze byli w pierwszej trójce pod względem liczby zdobytych złotych medali. W 1980 r. Letnie Igrzyska Olimpijskie miały miejsce w Moskwie, a w 2014 r. Zimowe Igrzyska odbyły się w Soczi.
    2 grudnia 2010 r. Komitet Wykonawczy FIFA powierzył Rosji organizację mistrzostw świata w piłce nożnej w 2018 r.`,
    question: 'Gdzie odbyła się Olimpiada w 1980 roku?',
  }, {
    text: `Kirjasarjan ensimmäinen osa Harry Potter ja viisasten kivi (engl. Harry Potter and the Philosopher's Stone) ilmestyi alkuperäiskielellä vuonna 1997 ja sen viimeinen osa Harry Potter ja kuoleman varjelukset (engl. Harry Potter and the Deathly Hallows) vuonna 2007.
    Ensimmäisen kirjan julkaisusta lähtien kirjasarja on saanut suurta suosiota ympäri maailmaa, ja se on ollut sekä arvostelu- että taloudellinen menestys. Kirjasarja on myynyt yli 500 miljoonaa kappaletta ja se on käännetty yli 73 kielelle.
    Suomeksi Harry Potter -kirjasarjan kustansi Tammi ja sen käänsi Jaana Kapari-Jatta. Kirjasarja julkaistiin suomeksi vuosina 1998–2008.
    Rowlingin tarinaan perustuva näytelmä, Harry Potter ja kirottu lapsi, sai ensi-iltansa Lontoossa 30. heinäkuuta 2016, ja sen käsikirjoitus julkaistiin myöhemmin kirjan muodossa.`,
    question: 'Milloin kirjasarja julkaistiin suomeksi?',
  }, {
    text: `Kirjasarjan ensimmäinen osa Harry Potter ja viisasten kivi (engl. Harry Potter and the Philosopher's Stone) ilmestyi alkuperäiskielellä vuonna 1997 ja sen viimeinen osa Harry Potter ja kuoleman varjelukset (engl. Harry Potter and the Deathly Hallows) vuonna 2007.
    Ensimmäisen kirjan julkaisusta lähtien kirjasarja on saanut suurta suosiota ympäri maailmaa, ja se on ollut sekä arvostelu- että taloudellinen menestys. Kirjasarja on myynyt yli 500 miljoonaa kappaletta ja se on käännetty yli 73 kielelle.
    Suomeksi Harry Potter -kirjasarjan kustansi Tammi ja sen käänsi Jaana Kapari-Jatta. Kirjasarja julkaistiin suomeksi vuosina 1998–2008.
    Rowlingin tarinaan perustuva näytelmä, Harry Potter ja kirottu lapsi, sai ensi-iltansa Lontoossa 30. heinäkuuta 2016, ja sen käsikirjoitus julkaistiin myöhemmin kirjan muodossa.`,
    question: 'Как называется последняя книга про Гарри Поттера?',
  }],
  api: async (stateReq: Req) => {
    const req = {
      context_raw: [stateReq.text],
      question_raw: [stateReq.question],
    };
    return await axios.post('https://7014.lnsigo.mipt.ru/model', req);
  },
  renderAnswer: { type: 'textqa' },
};

const TexqQA = skillWrapper<Req, Res>('textqamu');
export default function () {
  return <TexqQA {...config}/>;
}
