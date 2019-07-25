import React from 'react';

const colors = {
  red: '#dc3545',
  blue: '#007bff',
  cyan: '#17a2b8',
  green: '#28a745',
  yellow: '#ffc107',
  dark: '#343a40',
  grey: '#6c757d',
};

const ruNerStyles = {
  ORG: colors.red,
  LOC: colors.yellow,
  PER: colors.green,
};

const intentsClasses = {
  AddToPlaylist: colors.blue,
  BookRestaurant: colors.grey,
  GetWeather: colors.green,
  PlayMusic: colors.red,
  RateBook: colors.yellow,
  SearchCreativeWork: colors.cyan,
  SearchScreeningEvent: colors.dark,
};

const ontonotesClasses = {
  PERSON: colors.blue,
  NORP: colors.red,
  ORG: colors.cyan,
  LOC: colors.green,
  GPE: colors.yellow,
  DATE: colors.dark,
  MONEY: colors.grey,
  FAC:  colors.grey,
  PRODUCT: colors.grey,
  EVENT: colors.grey,
  WORK_OF_ART: colors.grey,
  LAW: colors.grey,
  LANGUAGE: colors.grey,
  TIME: colors.grey,
  PERCENT: colors.grey,
  QUANTITY: colors.grey,
  ORDINAL: colors.grey,
  CARDINAL: colors.grey,
};

const renderNerClasses = (classes: {[key: string]: string}) => {
  return Object.entries(classes).map(([key, value]: [string, string], i: number) => (
    <span className="card margin_r" style={{ backgroundColor: value }} key={i}>
      {`${key}`}
    </span>
  ));
};
export { renderNerClasses, ontonotesClasses, ruNerStyles, intentsClasses };
