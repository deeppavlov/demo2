import React, { Component, ChangeEvent, createRef } from 'react';
import cn from 'classnames';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { State as Store, updatestore } from '../../../lib/store';

import style from './BaseSkill.module.scss';
// Moved interfaces into index file because of --isolatedModules
// https://github.com/Microsoft/TypeScript/issues/21194
import { BaseSkillProps, DispatchProps, StateProps, Example, Input, Answer } from './';
type Props<Req = any, Res = any> = BaseSkillProps<Req, Res> & DispatchProps & StateProps & RouteComponentProps;
interface State {
  question: string;
  [key:string]: string;
}

class BaseSkill extends Component<Props, State> {
  lang: 'ru' | 'en' | 'mu';
  answersRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    const { inputs, examples, location: { pathname } } = props;
    const initState: any = {};
    inputs.forEach((input: Input) => {
      initState[`${input.name}`] = examples[0][input.name];
    });
    this.state = initState;
    this.lang = pathname.split('/')[1] as 'ru' | 'en' | 'mu';
    this.answersRef = createRef();
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
        />
      )}
      {input.type === 'textarea' && (
        <textarea
          dir={this.isRTL(this.state[`${input.name}`])}
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => this.setState({ [`${input.name}`]: e.target.value })}
        />
      )}
    </div>
  )

  onExample =  (ex: Example) => async () => {
    await this.setState(ex);
    // this.onAsk();
  }

  renderExamples = (ex: Example, i: number) => {
    const { question } = this.state;
    return (
      <div className={cn(question === ex.question && style.active)} onClick={this.onExample(ex)} key={i} >
        {ex.question}
      </div>
    );
  }

  renderAnswers = (answers: Answer[]) => {
    const { renderAnswer } = this.props;
    if (!renderAnswer || renderAnswer.type === 'basic' || renderAnswer.type === 'textqa') {
      return answers.map(this.renderBasic);
    } else if (renderAnswer.type === 'ner') {
      return answers.map(this.renderNer);
    } else if (renderAnswer.type === 'ranking') {
      return answers.map(this.renderRanking);
    } else if (renderAnswer.type === 'intent') {
      return answers.map(this.renderIntent);
    }
  }

  renderRanking = (mes: Answer, i: number) => {
    return (
      <div>
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
          <span className="card" style={{ backgroundColor: colors![mes.answer[0][0]] }}>
            {mes.answer[0]}
          </span>
        </p>
        <p>{mes.question}</p>
      </div>
    )
  }

  renderNer = (mes: Answer, i: number) => {
    const { answer } = mes;
    const { colors } = this.props.renderAnswer!;
    const classes: string[] = [];
    // AWESOME MAGIC
    answer[1].forEach((value: string) => {
      if (value !== 'O') {
        classes.push(value.replace('I-', '').replace('B-', ''));
      } else {
        classes.push('');
      }
    });
    let prev = '';
    const toRender = answer[0].map((item: string, i: number) => {
      // B = begin of token
      if (answer[1][i].substring(0, 1) === 'B') {
        const color =  colors![classes[i]];
        prev = 'B';
        return `<span class="card" style="background: ${color};">${item} `;
      } else if (answer[1][i].substring(0, 1) === 'I') {
        prev = 'I';
        return `${item} `;
      }
      if (prev) {
        prev = '';
        return `</span> ${item} `;
      }
      return `${item} `;
    }).join('');
    return (
      <div dir={this.isRTL(toRender)} className={style.ner} key={i} dangerouslySetInnerHTML={{ __html: toRender }}/>
    );
  }

  renderBasic = (mes: Answer, i: number) => {
    const rest = { ...mes };
    delete rest.answer;
    delete rest.question;
    return (
      <div className={style.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>{mes.answer[0]}</p>
        <p>{mes.question}</p>
        {Object.keys(rest).map((item, i) => <p key={i}>{rest[item]}</p>)}
      </div>
    );
  }

  onAsk =  async () => {
    const { api, updateStore } = this.props;
    let messages = this.props.answers;
    const response = await api(this.state);
    if (messages) {
      messages.splice(0, 0, { ...this.state, answer: response.data[0] });
    } else {
      messages = [{ ...this.state, answer: response.data[0] }];
    }
    updateStore(messages);
    const { top } = this.answersRef!.current!.getBoundingClientRect();
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
    this.answersRef!.current!.scrollTop = 0;
  }

  render() {
    const { title, desc, answers, docker, inputs, examples } = this.props;
    return (
      <div className={style.container}>
        <p className={style.title}>{title}</p>
        {desc && <div>{desc}</div>}
        {docker && (
          <div className={style.docker}>
            <a
            href={`https://hub.docker.com/r/${docker}`}
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
                docker pull {docker}
              </code>
            </a>
          </div>
        )}
        <div className={style.inputArea}>
          <div className={style.inputs}>
            {inputs.map(this.renderInput)}
            <button onClick={this.onAsk} className={style.button}>{this.lang !== 'ru' ? 'Ask' : 'Спросить'}</button>
          </div>
          <div className={style.examples}>
            <p>{this.lang !== 'ru' ? 'Examples' : 'Примеры'}</p>
            {examples.map(this.renderExamples)}
          </div>
        </div>
        <div className={style.answers} id="answers" ref={this.answersRef}>
          {answers &&  <p>{this.lang !== 'ru' ? 'Results' : 'Результаты'}</p>}
          {answers && (this.renderAnswers(answers))}
        </div>
      </div>
    );
  }
}

function withConnect<Req, Res>(stateKey: string) {
  return connect<StateProps, DispatchProps, BaseSkillProps<Req, Res>>(
    (state: Store) => ({ answers: state[stateKey] }),
    (dispatch: Dispatch) => ({ updateStore: (messages: any[]) => dispatch(updatestore(stateKey, messages)) }),
  )(withRouter(BaseSkill));
}

export default withConnect;
