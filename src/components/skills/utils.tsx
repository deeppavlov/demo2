import React, { Component, createRef } from 'react';

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
  ORG: { color: colors.red, text: 'Companies, agencies, institutions, etc.' },
  LOC: { color: colors.yellow, text: 'Non-GPE locations, mountain ranges, bodies of water.' },
  PER: { color: colors.green, text: 'People, including fictional.' },
};

const intentsClasses = {
  AddToPlaylist: { color: colors.blue },
  BookRestaurant: { color: colors.grey },
  GetWeather: { color: colors.green },
  PlayMusic: { color: colors.red },
  RateBook: { color: colors.yellow },
  SearchCreativeWork: { color: colors.cyan },
  SearchScreeningEvent: { color: colors.dark },
};

const ontonotesClasses = {
  PERSON: { color: colors.blue, text: 'People, including fictional.' },
  NORP: { color: colors.red, text: 'Nationalities or religious or political groups.' },
  ORG: { color: colors.cyan, text: 'Companies, agencies, institutions, etc.' },
  LOC: { color: colors.green, text: 'Non-GPE locations, mountain ranges, bodies of water.' },
  GPE: { color: colors.yellow, text: 'Countries, cities, states.' },
  DATE: { color: colors.dark, text: 'Absolute or relative dates or periods.' },
  MONEY: { color: colors.grey, text: 'Monetary values, including unit.' },
  FAC:  { color: colors.grey, text: 'Buildings, airports, highways, bridges, etc.' },
  PRODUCT: { color: colors.grey, text: 'Objects, vehicles, foods, etc. (Not services.)' },
  EVENT: { color: colors.grey, text: 'Named hurricanes, battles, wars, sports events, etc.' },
  WORK_OF_ART: { color: colors.grey, text: 'Titles of books, songs, etc.' },
  LAW: { color: colors.grey, text: 'Named documents made into laws.' },
  LANGUAGE: { color: colors.grey, text: 'Any named language.' },
  TIME: { color: colors.grey, text: 'Times smaller than a day.' },
  PERCENT: { color: colors.grey, text: 'Percentage, including &quot;%&quot;.' },
  QUANTITY: { color: colors.grey, text: 'Measurements, as of weight or distance.' },
  ORDINAL: { color: colors.grey, text: '&quot;first&quot;, &quot;second&quot;, etc.' },
  CARDINAL: { color: colors.grey, text: 'Numerals that do not fall under another type.' },
};

const renderNerClasses = (classes: {[key: string]: {color: string; text?: string; }}) => {
  return Object.entries(classes).map(([key, value]: [string, {color: string; text?: string; }], i: number) => (
    <NerClass label={key} {...value} key={i}/>
  ));
};
export { renderNerClasses, ontonotesClasses, ruNerStyles, intentsClasses };

interface NerClassProps {
  label: string;
  color: string;
  text?: string;
}
interface NerClassState {
  clicked: boolean;
}
class NerClass extends Component<NerClassProps, NerClassState> {
  ref: React.RefObject<HTMLSpanElement>;

  constructor (props: NerClassProps) {
    super(props);
    this.ref = createRef();
    this.state = {
      clicked: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (event: any) => {
    if (this.ref && !this.ref.current!.contains(event.target)) {
      this.setState({ clicked: false });
    }
  }
  render () {
    const { label, color, text } = this.props;
    const { clicked } = this.state;
    return (
      <span
        className="card margin_r"
        style={{ backgroundColor: color }}
        onClick={() => this.setState({ clicked: !clicked })}
        ref={this.ref}
      >
        {`${label}`}
        {(clicked && text) && (
          <div className="tooltip">
            <div className="tooltipInner" style={{ backgroundColor: color }}>{text}</div>
          </div>
        )}
      </span>
    );
  }
}
