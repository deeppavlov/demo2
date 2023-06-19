import React, {
  Component,
  ChangeEvent,
  createRef,
  SyntheticEvent,
  KeyboardEvent,
} from "react"
import cn from "classnames"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"
import {
  State as Store,
  updatestore,
  loading as RequestLoading,
  SCI,
} from "../../../lib/store"
import {
  BaseSkillProps,
  DispatchProps,
  StateProps,
  Example,
  Input,
  Answer,
} from "./"
import {
  NerClass,
  Language,
  renderNerClasses,
  intentsClasses,
  ontonotesClasses,
  ruNerStyles,
} from "../utils"
import s from "./BaseSkill.module.scss"

type Props<Req = any, Res = any> = BaseSkillProps<Req, Res> &
  DispatchProps &
  StateProps &
  RouteComponentProps
interface State {
  error: any
  question: string
  [key: string]: string
}

class BaseSkill extends Component<Props, State> {
  lang: Language
  answersRef: React.RefObject<HTMLDivElement>
  tooltipRef: React.RefObject<HTMLSpanElement>
  constructor(props: Props) {
    super(props)
    const {
      inputs,
      examples,
      location: { pathname },
      componentState,
    } = props
    let initState: any = {}
    if (componentState) {
      initState = componentState
    } else {
      inputs.forEach((input: Input) => {
        initState[`${input.name}`] = examples[0][input.name]
      })
    }
    this.state = initState
    this.lang = pathname.split("/")[1] as Language
    this.answersRef = createRef()
    this.tooltipRef = createRef()
  }

  componentDidMount() {
    const { title } = this.props
    window.gtag("event", "view_item", {
      event_category: "Open page",
      event_label: `${title} ${this.lang}`,
    })
    console.log("", this.tooltipRef?.current?.getClientRects()[0].left)
  }

  componentWillUnmount() {
    const { safeComponentState } = this.props
    safeComponentState(this.state)
  }

  isRTL = (s: string) => {
    const ltrChars =
      "A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF" +
      "\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF"
    const rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC"
    const rtlDirCheck = new RegExp(`^[^${ltrChars}]*[${rtlChars}]`)

    return rtlDirCheck.test(s) ? "rtl" : "ltr"
  }

  renderInput = (input: Input, i: number) => (
    <div key={i}>
      <p className={s.title}>{input.title}</p>
      {input.type === "text" && (
        <input
          dir={this.isRTL(this.state[`${input.name}`])}
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            this.setState({ [`${input.name}`]: e.target.value })
          }
          onKeyPress={this.onCntrlEnterPress}
        />
      )}
      {input.type === "textarea" && (
        <textarea
          dir={this.isRTL(this.state[`${input.name}`])}
          placeholder={input.title}
          value={this.state[`${input.name}`]}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            this.setState({ [`${input.name}`]: e.target.value })
          }
          onKeyPress={this.onCntrlEnterPress}
        />
      )}
    </div>
  )

  onCntrlEnterPress = (e: KeyboardEvent) => {
    e.persist()
    if (e.key === "Enter" && e.ctrlKey) {
      this.onAsk()
    }
  }

  onExample = (ex: Example) => async () => {
    await this.setState(ex)
    // this.onAsk();
  }

  renderExamples = (ex: Example, i: number) => {
    const { question } = this.state
    let checker = question === ex.question
    const rest = { ...this.state }
    delete rest.question
    delete rest.error
    if (Object.keys(rest).length > 0) {
      Object.keys(rest).forEach((key) => {
        checker = checker && rest[key] === ex[key]
      })
    }

    return (
      <span style={{ position: "relative" }}>
        <li
          // type="button"
          className={cn(checker && s.active, "tooltipLi")}
          onClick={this.onExample(ex)}
          key={i}
        >
          <span className={cn("tooltipEx")}>{ex.question}</span>
          {ex.question}
        </li>
      </span>
    )
  }

  renderAnswers = (answers: Answer[]) => {
    const { renderAnswer } = this.props
    if (!renderAnswer || renderAnswer.type === "basic") {
      return answers.map(this.renderBasic)
    } else if (renderAnswer.type === "ner") {
      return answers.map(this.renderNer)
    } else if (renderAnswer.type === "ranking") {
      return answers.map(this.renderRanking)
    } else if (renderAnswer.type === "intent") {
      return answers.map(this.renderIntent)
    } else if (renderAnswer.type === "textqa") {
      return answers.map(this.renderQA)
    }
  }

  renderRanking = (mes: Answer, i: number) => {
    return (
      <div key={i}>
        <p>{mes.question}</p>
        <ul key={i}>
          {mes.answer[0].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  renderIntent = (mes: Answer, i: number) => {
    const { colors } = this.props.renderAnswer!
    return (
      <div className={s.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>
          <span
            className="card"
            style={{
              backgroundColor: colors![mes.answer[0].toString()].color!,
            }}
          >
            {mes.answer[0]}
          </span>
        </p>
        <p>{mes.question}</p>
      </div>
    )
  }

  renderNer = (mes: Answer, i: number) => {
    const { answer } = mes
    const colors: {
      [key: string]: {
        color: string
        text?: string
        tip?: string
      }
    } = this.props.renderAnswer!.colors!

    Object.keys(colors!).forEach((key) => (colors[key].tip = key))
    const classes: string[] = []
    // AWESOME MAGIC
    answer[1].forEach((value: string) => {
      if (value !== "O") {
        classes.push(value.replace("I-", "").replace("B-", ""))
      } else {
        classes.push("")
      }
    })

    const spans: string[] = []
    const reducedColors: { color: string; text?: string; tip?: string }[] = []
    let spansIndex = 0

    answer[0].forEach((item: string, i: number) => {
      if (answer[1][i].substring(0, 1) === "B") {
        spansIndex++
        spans[spansIndex] = `${item} `
        reducedColors[spansIndex] = colors![classes[i]]
      } else if (answer[1][i].substring(0, 1) === "I") {
        spans[spansIndex] += `${item} `
      } else {
        spansIndex++
        spans[spansIndex] = item
      }
    })
    return (
      <div dir={this.isRTL(answer[0].join(""))} className={s.ner} key={i}>
        {spans.map((item, i) => {
          if (reducedColors[i]) {
            return (
              <NerClass
                key={i}
                color={reducedColors[i].color}
                label={item}
                text={reducedColors[i].text}
                tip={reducedColors[i].tip}
              />
            )
          }
          return `${item} `
        })}
      </div>
    )
  }

  renderBasic = (mes: Answer, i: number) => {
    const rest = { ...mes }
    delete rest.answer
    delete rest.question
    let answer: any = mes.answer[0]
    if (typeof answer === "string" && !answer) {
      answer = this.lang !== "ru" ? "I don't know" : "Я не знаю"
    }
    return (
      <div className={s.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>{answer}</p>
        <p>{mes.question}</p>
        {Object.values(rest).map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    )
  }

  renderQA = (mes: Answer, i: number) => {
    const rest = { ...mes }
    delete rest.answer
    delete rest.question
    let answer: any = mes.answer[0]
    if (typeof answer === "string" && !answer) {
      answer = this.lang !== "ru" ? "I don't know" : "Я не знаю"
    }
    if (rest.text) {
      const array = (rest.text as string).split(answer)
      return (
        <div className={s.basic} dir={this.isRTL(mes.question)} key={i}>
          <p className={s.bAnswer}>
            {this.lang !== "ru" ? "Answer: " : "Oтвет: "}
            {answer}
          </p>
          <p className={s.question}>
            {this.lang !== "ru" ? "Question: " : "Вопрос: "}
            {mes.question}
          </p>
          <p>
            {array[0]}{" "}
            <NerClass key={i} color={"#0069b4"} label={answer} tip={"A"} />{" "}
            {array[1]}
          </p>
        </div>
      )
    }
    return (
      <div className={s.basic} dir={this.isRTL(mes.question)} key={i}>
        <p>
          {this.lang !== "ru" ? "Answer: " : "Ответ: "}
          {answer}
        </p>
        <p>
          {this.lang !== "ru" ? "Question: " : "Вопрос: "}
          {mes.question}
        </p>
      </div>
    )
  }

  onAsk = async () => {
    if (document.activeElement) {
      const elem = document.activeElement as HTMLElement
      elem.blur()
    }

    const state = { ...this.state }
    delete state.error
    let checker = true
    Object.values(state).forEach((item) => {
      checker = checker && Boolean(item)
    })
    if (!checker) {
      alert(this.lang !== "ru" ? "Fill all fields." : "Заполните все поля.")
      return
    }

    const { api, updateStore, title, dispatchLoading, answers } = this.props
    dispatchLoading()
    let messages = answers
    const response = await api(this.state).catch((error) => {
      dispatchLoading()
      console.error(error)
      this.setState({ error: true })
    })
    if (messages) {
      messages.splice(0, 0, { ...this.state, answer: response.data[0] })
    } else {
      messages = [{ ...this.state, answer: response.data[0] }]
    }

    window.gtag("event", "view_item", {
      event_category: "Made request",
      event_label: `${title} ${this.lang}`,
    })
    setTimeout(dispatchLoading, 200)

    updateStore(messages)

    const { bottom } = this.answersRef!.current!.getBoundingClientRect()
    const offset = Math.max(0, window.pageYOffset + bottom - window.innerHeight)
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    })
    this.answersRef!.current!.scrollTop = 0
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    this.onAsk()
  }

  onErrorClose = () => this.setState({ error: false })

  render() {
    const { title, desc, answers, inputs, examples, loading } = this.props
    const { error } = this.state
    const disableTip = true
    const pathName = this.props.location.pathname
    return (
      <div className={s.container}>
        {loading && (
          <div className={s.modal}>
            <div className={s.ldsRing}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {error && (
          <div className={s.modal} onClick={this.onErrorClose}>
            <div className={s.close} />
            <div className={s.error}>
              {this.lang !== "ru"
                ? "Sorry, an error occurred. Please, try again later."
                : "Извините, произошла ошибка. Пожалуйста, попробуйте позднее."}
            </div>
          </div>
        )}
        <p className={s.title}>{title}</p>
        {desc && <div>{desc}</div>}
        <div className={s.inputArea}>
          <form className={s.inputs} onSubmit={this.onFormSubmit}>
            <div className={s.examplesQuestion}>
              <div className={s.examples}>
                <p>{this.lang !== "ru" ? "Examples" : "Примеры"}</p>
                <ul>{examples.map(this.renderExamples)}</ul>
                <div className={s.classesList} style={{ marginTop: "58px" }}>
                  {pathName === "/ru/ner" && (
                    <div>
                      <div className={s.title}>Classes</div>
                      <span className={s.annotation}>
                        <span className={s.click}>Click</span>
                        on an <b>entity</b>
                        to see its class description
                      </span>
                      <div className={s.classes}>
                        {renderNerClasses(ruNerStyles, disableTip)}
                      </div>
                    </div>
                  )}
                  {pathName === "/en/ner" && (
                    <div>
                      <div className={s.title}>Classes</div>
                      <span className={s.annotation}>
                        <span className={s.click}>Click</span>
                        on an <b>entity</b>
                        to see its class description
                      </span>
                      <div className={s.classes}>
                        {renderNerClasses(ontonotesClasses, disableTip)}
                      </div>
                    </div>
                  )}
                  {pathName === "/mu/ner" && (
                    <div>
                      <div className={s.title}>Classes</div>
                      <span className={s.annotation}>
                        <span className={s.click}>Click</span>
                        on an <b>entity</b>
                        to see its class description
                      </span>
                      <div className={s.classes}>
                        {renderNerClasses(ontonotesClasses, disableTip)}
                      </div>
                    </div>
                  )}
                  {pathName === "/en/intent" && (
                    <div>
                      <div className={s.title}>Classes</div>
                      <span className={s.annotation}>
                        <span className={s.click}>Click</span>
                        on an <b>entity</b>
                        to see its class description
                      </span>
                      <div className={s.classes}>
                        {renderNerClasses(intentsClasses, disableTip)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={s.question}>
                {inputs.map(this.renderInput)}
                <button type="button" onClick={this.onAsk} className={s.button}>
                  {this.lang !== "ru" ? "Ask" : "Спросить"}
                </button>
                <div>
                  {answers && (
                    <div
                      className={s.answers}
                      id="answers"
                      ref={this.answersRef}
                    >
                      <p style={{ color: "#3300ff", fontWeight: 600 }}>
                        {this.lang !== "ru" ? "Result" : "Результат"}
                      </p>
                      {this.renderAnswers(answers)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
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
      updateStore: (messages: any[]) =>
        dispatch(updatestore(stateKey, messages)),
      dispatchLoading: () => dispatch(RequestLoading()),
      safeComponentState: (state: State) =>
        dispatch(SCI(`${stateKey}Component`, state)),
    })
  )(withRouter(BaseSkill))
}

export default withConnect
