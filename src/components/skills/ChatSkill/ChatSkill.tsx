import React, { Component, ChangeEvent, createRef, SyntheticEvent, KeyboardEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { State as Store, updatestore, loading as RequestLoading, SCI } from '../../../lib/store';

import style from './ChatSkill.module.scss';
// Moved interfaces into index file because of --isolatedModules
// https://github.com/Microsoft/TypeScript/issues/21194
import { ChatSkillProps, DispatchProps, StateProps, Answer } from '.';
type Props<Res = any> = ChatSkillProps<Res> & DispatchProps & StateProps & RouteComponentProps;
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
    const { location: { pathname }, componentState } = props;
    let initState: any = {};
    if (componentState) {
      initState = componentState;
    }
    else {
      initState['message'] = '';
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

  onCntrlEnterPress = (e: KeyboardEvent) => {
    e.persist();
    if (e.key === 'Enter' && e.ctrlKey) {
      this.onAsk();
    }
  }

  renderAnswers = (answers: Answer[]) => {
    return answers.map(this.renderBasic);
  }

  renderBasic = (mes: Answer, i: number) => {
    const rest = { ...mes };
    delete rest.answer;
    delete rest.question;
    let answer: any = mes.answer;
    return [
      <div className={style.user} dir={this.isRTL(mes.question)} key={`question${i}`}>
        <p>{mes.question}</p>
      </div>,
      <div className={style.bot} dir={this.isRTL(mes.question)} key={`answer${i}`}>
        <p>{answer}</p>
      </div>
    ];
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

    const { messageApi, updateStore, title, dispatchLoading, answers } = this.props;
    dispatchLoading();
    let messages = answers || [];
    const question = this.state['message'];
    const response = await messageApi(question).catch((error) => {
      dispatchLoading();
      console.error(error);
      this.setState({ error: true });
    });

    let answer: string = response.data.response;
    const commentIndex = answer.indexOf('#+#');
    if (commentIndex > -1) {
      answer = answer.substring(0, commentIndex);
    }
    answer = answer.trim()

    messages.push({ question: question, answer: answer });

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
    const { title, desc, answers, loading } = this.props;
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
        {answers && <div className={style.answers} id="answers" ref={this.answersRef}>
          {(this.renderAnswers(answers))}
        </div>}
        <div className={style.inputArea}>
          <form className={style.inputs} onSubmit={this.onFormSubmit}>
            <div className={style.inputGroup}>
              <input
                placeholder={this.lang !== 'ru' ? 'Write a message...' : 'Написать сообщение...'}
                value={this.state['message']}
                onChange={(e: ChangeEvent<HTMLInputElement>) => this.setState({ 'message': e.target.value })}
                onKeyPress={this.onCntrlEnterPress}
                className={style.formControl}
              />
              <div className={style.inputGroupAppend}>
                <button type="button" onClick={this.onAsk} className={`${style.button} ${style.btn}`}>
                  {this.lang !== 'ru' ? 'Ask' : 'Спросить'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function withConnect(stateKey: string) {
  return connect<StateProps, DispatchProps>(
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
