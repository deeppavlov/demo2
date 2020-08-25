import React, { Component, ChangeEvent, createRef, SyntheticEvent, KeyboardEvent } from 'react';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { State as Store, updatestore, loading as RequestLoading, SCI } from '../../../lib/store';
import { NerClass, Language } from '../utils';

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
  lang: Language;
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
    this.lang = pathname.split('/')[1] as Language;
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
        spansIndex++;
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
              color={'#0069b4'}
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

    const { bottom } = this.answersRef!.current!.getBoundingClientRect();
    const offset = Math.max(0, window.pageYOffset + bottom - window.innerHeight)
    window.scrollTo({
      top: offset,
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
        <div className={style.docker}>
          <a
          href="https://ngc.nvidia.com/catalog/containers/partners:deeppavlov"
          rel="noopener noreferrer"
          target="_blank"
          >
            <svg width="40" height="22">
                <g fill="#77b900">
                    {/* tslint:disable-next-line: max-line-length */}
                    <path d="M 12.406163,6.5667982 V 4.5791291 c 0.19257,-0.013645 0.387407,-0.024255 0.586045,-0.030323 5.435835,-0.1705661 9.00134,4.6704792 9.00134,4.6704792 0,0 -3.851326,5.3489577 -7.980893,5.3489577 -0.59438,0 -1.127344,-0.09628 -1.606492,-0.25699 V 8.2853416 c 2.115957,0.2554734 2.541273,1.1901762 3.813423,3.3105044 l 2.829369,-2.3856539 c 0,0 -2.065168,-2.7085894 -5.546524,-2.7085894 -0.37907,0 -0.741454,0.02653 -1.096268,0.065195 m 0,-6.5649061 v 2.9686141 c 0.194846,-0.015921 0.390441,-0.028048 0.586045,-0.034873 7.559367,-0.2547149 12.483462,6.1979951 12.483462,6.1979951 0,0 -5.656453,6.8779822 -11.54944,6.8779822 -0.539797,0 -1.04547,-0.05004 -1.520067,-0.134176 v 1.835291 c 0.405604,0.05154 0.827127,0.08186 1.26609,0.08186 5.483598,0 9.449404,-2.800316 13.290117,-6.114604 0.636076,0.51018 3.242549,1.749632 3.779314,2.293169 -3.651944,3.056547 -12.161258,5.520275 -16.985275,5.520275 -0.464744,0 -0.912043,-0.02805 -1.350246,-0.07049 v 2.578958 H 33.248832 V 0.0018921 Z m 0,14.3093624 v 1.56618 C 7.3334779,14.973813 5.9256246,9.7014187 5.9256246,9.7014187 c 0,0 2.4358862,-2.6979709 6.4805384,-3.1346205 v 1.7185434 c -0.0038,0 -0.0053,-7.656e-4 -0.0084,-7.656e-4 -2.122025,-0.2547067 -3.7808224,1.727646 -3.7808224,1.727646 0,0 0.9294724,3.33855 3.7891574,4.299025 M 3.3972387,9.4732424 c 0,0 3.0060088,-4.4354764 9.0089243,-4.8941133 V 2.9705062 C 5.7573123,3.5034326 3e-5,9.1336279 3e-5,9.1336279 c 0,0 3.2607459,9.4266161 12.406133,10.2893051 V 17.712725 C 5.6951446,16.868232 3.3972387,9.4732424 3.3972387,9.4732424"/>
                </g>
            </svg>
            <code>
              deeppavlov at NGC
            </code>
          </a>
          <a
          href="https://hub.docker.com/r/deeppavlov"
          rel="noopener noreferrer"
          target="_blank"
          >
            <svg width="40" height="22" viewBox="0 0 60 43">
                <g fill="#6395ca">
                    {/* tslint:disable-next-line: max-line-length */}
                    <path d="M3.757 15.768h6.04v5.873h-6.04V15.77zM11.17 15.768h6.04v5.873h-6.04V15.77zM11.17 8.24h6.04v5.87h-6.04V8.24zM18.58 15.768h6.043v5.873H18.58V15.77zM18.58 8.24h6.043v5.87H18.58V8.24zM25.993 15.768h6.042v5.873h-6.042V15.77zM25.993 8.24h6.042v5.87h-6.042V8.24zM33.405 15.768h6.042v5.873h-6.042V15.77zM25.993.708h6.042V6.58h-6.042V.708zM12.194 30.12c-.93 0-1.684.733-1.684 1.636 0 .902.755 1.635 1.684 1.635.928 0 1.683-.732 1.683-1.634 0-.903-.755-1.637-1.683-1.637"/>
                    {/* tslint:disable-next-line: max-line-length */}
                    <path d="M58.905 18.806c-2.03-1.138-4.73-1.294-7.03-.636-.283-2.377-1.89-4.46-3.8-5.953l-.758-.593-.638.716c-1.28 1.438-1.66 3.83-1.487 5.666.13 1.35.565 2.722 1.42 3.806-.65.38-1.388.682-2.045.9-1.34.44-2.795.685-4.21.685H.613l-.085.89c-.285 2.972.134 5.947 1.398 8.66l.544 1.078.062.1c3.737 6.17 10.3 8.768 17.452 8.768 13.846 0 25.265-6.01 30.51-18.708 3.505.178 7.09-.83 8.805-4.083l.437-.83-.832-.466zm-46.71 16.056c-1.764 0-3.198-1.394-3.198-3.106 0-1.713 1.434-3.107 3.197-3.107 1.763 0 3.197 1.393 3.197 3.106 0 1.712-1.433 3.106-3.196 3.106z"/>
                </g>
            </svg>
            <code>
              deeppavlov at Docker Hub
            </code>
          </a>
        </div>
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
