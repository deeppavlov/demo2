import React, { Component, ChangeEvent, createRef, SyntheticEvent, KeyboardEvent } from 'react';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { State as Store, updatestore, loading as RequestLoading, SCI } from '../../../lib/store';
import { NerClass } from '../utils';

import style from './BaseSkill.module.scss';
// Moved interfaces into index file because of --isolatedModules
// https://github.com/Microsoft/TypeScript/issues/21194
import { BaseSkillProps, DispatchProps, StateProps, Example, Input, Answer } from './';
type Props<Req = any, Res = any> = BaseSkillProps<Req, Res> & DispatchProps & StateProps & RouteComponentProps;
interface State {
  error: any;
  question: string;
  [key:string]: string;
}

class BaseSkill extends Component<Props, State> {
  lang: 'ru' | 'en' | 'mu';
  answersRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    const { inputs, examples, location: { pathname }, componentState } = props;
    let initState: any = {};
    if (componentState) {
      initState = componentState;
    } else {
      inputs.forEach((input: Input) => {
        initState[`${input.name}`] = examples[0][input.name];
      });
    }
    this.state = initState;
    this.lang = pathname.split('/')[1] as 'ru' | 'en' | 'mu';
    this.answersRef = createRef();
  }

  componentDidMount () {
    const { title } = this.props;
    window.gtag('event', 'view_item', {
      event_category: 'Open page',
      event_label: `${title} ${this.lang}`,
    });
  }

  componentWillUnmount () {
    const { safeComponentState } = this.props;
    safeComponentState(this.state);
  }

  isRTL = (s: string) => {
    const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
      '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
    const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
    const rtlDirCheck = new RegExp(`^[^${ltrChars}]*[${rtlChars}]`);

    return rtlDirCheck.test(s) ? 'rtl' : 'ltr';
  }

  renderInput = (input: Input, i: number) => (
    <div key={i}>
      <p>{input.title}</p>
      {input.type === 'text' && (
        <input
          dir={this.isRTL(this.state[`${input.name}`])}
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ [`${input.name}`]: e.target.value })}
          onKeyPress={this.onCntrlEnterPress}
        />
      )}
      {input.type === 'textarea' && (
        <textarea
          dir={this.isRTL(this.state[`${input.name}`])}
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ [`${input.name}`]: e.target.value })}
          onKeyPress={this.onCntrlEnterPress}
        />
      )}
    </div>
  )

  onCntrlEnterPress = (e: KeyboardEvent) => {
    e.persist();
    if (e.key === 'Enter' && e.ctrlKey) {
      this.onAsk();
    }
  }

  onExample =  (ex: Example) => async () => {
    await this.setState(ex);
    // this.onAsk();
  }

  renderExamples = (ex: Example, i: number) => {
    const { question } = this.state;
    let checker = question === ex.question;
    const rest = { ...this.state };
    delete rest.question;
    delete rest.error;
    if (Object.keys(rest).length > 0) {
      Object.keys(rest).forEach((key) => {
        checker = checker && rest[key] === ex[key];
      });
    }
    return (
      <button
        type="button" className={cn(checker && style.active)} onClick={this.onExample(ex)} key={i} >
        {ex.question}
      </button>
    );
  }

  renderAnswers = (answers: Answer[]) => {
    const { renderAnswer } = this.props;
    if (!renderAnswer || renderAnswer.type === 'basic') {
      return answers.map(this.renderBasic);
    } else if (renderAnswer.type === 'ner') {
      return answers.map(this.renderNer);
    } else if (renderAnswer.type === 'ranking') {
      return answers.map(this.renderRanking);
    } else if (renderAnswer.type === 'intent') {
      return answers.map(this.renderIntent);
    } else if (renderAnswer.type === 'textqa') {
      return answers.map(this.renderQA);
    }
  }

  renderRanking = (mes: Answer, i: number) => {
    return (
      <div key={i}>
        <p>{mes.question}</p>
        <ul key={i}>
          {mes.answer[0].map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    );
  }

  renderIntent = (mes: Answer, i: number) => {
    const { colors } = this.props.renderAnswer!;
    return (
      <div className={style.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>
          <span className="card" style={{ backgroundColor: colors![mes.answer[0].toString()].color! }}>
            {mes.answer[0]}
          </span>
        </p>
        <p>{mes.question}</p>
      </div>
    );
  }

  renderNer = (mes: Answer, i: number) => {
    const { answer } = mes;
    const colors: {
      [key: string]: {
        color: string;
        text?: string;
        tip?: string;
      };
    } = this.props.renderAnswer!.colors!;

    Object.keys(colors!).forEach(key => colors[key].tip = key);
    const classes: string[] = [];
    // AWESOME MAGIC
    answer[1].forEach((value: string) => {
      if (value !== 'O') {
        classes.push(value.replace('I-', '').replace('B-', ''));
      } else {
        classes.push('');
      }
    });

    const spans: string[] = [];
    const reducedColors: {color: string, text?: string, tip?: string}[] = [];
    let spansIndex = 0;

    answer[0].forEach((item: string, i: number) => {
      if (answer[1][i].substring(0, 1) === 'B') {
        spans[spansIndex] = `${item} `;
        reducedColors[spansIndex] =  colors![classes[i]];
      } else if (answer[1][i].substring(0, 1) === 'I') {
        spans[spansIndex] += `${item} `;
      } else {
        spansIndex++;
        spans[spansIndex] = item;
      }
    });
    return (
      <div dir={this.isRTL(answer[0].join(''))} className={style.ner} key={i}>
        {spans.map((item, i) => {
          if (reducedColors[i]) {
            return <NerClass key={i}
              color={reducedColors[i].color}
              label={item}
              text={reducedColors[i].text}
              tip={reducedColors[i].tip}
            />;
          }
          return `${item} `;
        },
      )}
      </div>
    );
  }

  renderBasic = (mes: Answer, i: number) => {
    const rest = { ...mes };
    delete rest.answer;
    delete rest.question;
    let answer: any = mes.answer[0];
    if (typeof answer === 'string' && !answer) {
      answer = this.lang !== 'ru' ? 'I don\'t know' : 'Я не знаю';
    }
    return (
      <div className={style.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>{answer}</p>
        <p>{mes.question}</p>
        {Object.values(rest).map((item, i) => <p key={i}>{item}</p>)}
      </div>
    );
  }

  renderQA = (mes: Answer, i: number) => {
    const rest = { ...mes };
    delete rest.answer;
    delete rest.question;
    let answer: any = mes.answer[0];
    if (typeof answer === 'string' && !answer) {
      answer = this.lang !== 'ru' ? 'I don\'t know' : 'Я не знаю';
    }
    if (rest.text) {
      const array = (rest.text as string).split(answer);
      return (
        <div className={style.basic} dir={this.isRTL(mes.question)} key={i}>
          <p>{this.lang !== 'ru' ? 'A: ' : 'O: ' }{answer}</p>
          <p>{this.lang !== 'ru' ? 'Q: ' : 'В: ' }{mes.question}</p>
          <p>{array[0]} <NerClass key={i}
              color={'#007bff'}
              label={answer}
              tip={'A'}
            /> {array[1]}</p>
        </div>
      );
    }
    return (
      <div className={style.basic} dir={this.isRTL(mes.question)} key={i}>
          <p>{this.lang !== 'ru' ? 'A: ' : 'O: ' }{answer}</p>
          <p>{this.lang !== 'ru' ? 'Q: ' : 'В: ' }{mes.question}</p>
        </div>
    );
  }

  onAsk =  async () => {
    if (document.activeElement) {
      const elem = document.activeElement as HTMLElement;
      elem.blur();
    }

    const state = { ...this.state };
    delete state.error;
    let checker = true;
    Object.values(state).forEach((item) => { checker = checker && Boolean(item); });
    if (!checker) {
      alert(this.lang !== 'ru' ? 'Fill all fields.' : 'Заполните все поля.');
      return;
    }

    const { api, updateStore, title, dispatchLoading, answers } = this.props;
    dispatchLoading();
    let messages = answers;
    const response = await api(this.state).catch((error) => {
      dispatchLoading();
      console.error(error);
      this.setState({ error: true });
    });
    if (messages) {
      messages.splice(0, 0, { ...this.state, answer: response.data[0] });
    } else {
      messages = [{ ...this.state, answer: response.data[0] }];
    }

    window.gtag('event', 'view_item', {
      event_category: 'Made request',
      event_label: `${title} ${this.lang}`,
    });
    setTimeout(dispatchLoading, 200);

    updateStore(messages);

    const { top } = this.answersRef!.current!.getBoundingClientRect();
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
    this.answersRef!.current!.scrollTop = 0;
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    this.onAsk();
  }

  onErrorClose = () => this.setState({ error: false });

  render() {
    const { title, desc, answers, inputs, examples, loading } = this.props;
    const { error } = this.state;
    return (
      <div className={style.container}>
        {loading && <div className={style.modal}>
          <div className={style.ldsRing}><div/><div/><div/><div/></div>
        </div>}
        {error && <div className={style.modal} onClick={this.onErrorClose}>
          <div className={style.close}/>
          <div className={style.error}>
            {this.lang !== 'ru' ?
              'Sorry, an error occurred. Please, try again later.' :
              'Извините, произошла ошибка. Пожалуйста, попробуйте позднее.'
            }
          </div>
        </div>}
        <p className={style.title}>{title}</p>
        {desc && <div>{desc}</div>}
        <div className={style.inputArea}>
          <form className={style.inputs} onSubmit={this.onFormSubmit}>
            {inputs.map(this.renderInput)}
            <button type="button" onClick={this.onAsk} className={style.button}>
              {this.lang !== 'ru' ? 'Ask' : 'Спросить'}
            </button>
          </form>
          <div className={style.examples}>
            <p>{this.lang !== 'ru' ? 'Examples' : 'Примеры'}</p>
            {examples.map(this.renderExamples)}
          </div>
        </div>
        {answers && <div className={style.answers} id="answers" ref={this.answersRef}>
          <p>{this.lang !== 'ru' ? 'Results' : 'Результаты'}</p>
          {(this.renderAnswers(answers))}
        </div>}
      </div>
    );
  }
}

function withConnect<Req, Res>(stateKey: string) {
  return connect<StateProps, DispatchProps, BaseSkillProps<Req, Res>>(
    (state: Store) => ({
      answers: state[stateKey],
      loading: state.loading,
      componentState: state[`${stateKey}Component`],
    }),
    (dispatch: Dispatch) => ({
      updateStore: (messages: any[]) => dispatch(updatestore(stateKey, messages)),
      dispatchLoading: () => dispatch(RequestLoading()),
      safeComponentState: (state: State) => dispatch(SCI(`${stateKey}Component`, state)),
    }),
  )(withRouter(BaseSkill));
}

export default withConnect;
