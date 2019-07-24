import React from 'react';

const ruNerStyles = {
  ORG: 'org',
  LOC: 'loc',
  PERSON: 'person',
};

const ontonotesClasses = {
  PERSON: 'person',
  NORP: 'norp',
  ORG: 'org',
  LOC: 'loc',
  GPE: 'gpe',
  DATE: 'date',
  MONEY: 'money',
  FAC:  'fac',
  PRODUCT: 'product',
  EVENT: 'event',
  WORK_OF_ART: 'work_of_art',
  LAW: 'law',
  LANGUAGE: 'language',
  TIME: 'time',
  PERCENT: 'percent',
  QUANTITY: 'quantity',
  ORDINAL: 'ordinal',
  CARDINAL: 'cardinal',
};

const renderNerClasses = (classes: {[key: string]: string}) => {
  return Object.entries(classes).map(([key, value]: [string, string], i: number) => (
    <span className={`card margin_r ${value}`} key={i}>
      {`${key}`}
    </span>
  ));
};
export { renderNerClasses, ontonotesClasses, ruNerStyles };
