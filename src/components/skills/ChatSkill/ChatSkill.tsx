import React, {
  Component,
  ChangeEvent,
  createRef,
  SyntheticEvent,
  KeyboardEvent,
} from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { withRouter, RouteComponentProps } from "react-router-dom"
import {
  State as Store,
  updatestore,
  loading as RequestLoading,
  SCI,
} from "../../../lib/store"
import { Language } from "../utils"

import style from "./ChatSkill.module.scss"
// Moved interfaces into index file because of --isolatedModules
// https://github.com/Microsoft/TypeScript/issues/21194
import { ChatSkillProps, DispatchProps, StateProps, Answer } from "."
type Props<Res = any> = ChatSkillProps<Res> &
  DispatchProps &
  StateProps &
  RouteComponentProps
interface State {
  error: any
  message: string
  agreed: boolean
  rating: number
  dialog_id: null | string
}

class ChatSkill extends Component<Props, State> {
  lang: Language
  answersRef: React.RefObject<HTMLDivElement>
  inputRef: React.RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)
    const {
      location: { pathname },
      componentState,
    } = props
    let initState: any = {}
    if (componentState) {
      initState = componentState
    } else {
      initState["message"] = ""
      initState["agreed"] = false
      initState["rating"] = 0
      initState["dialog_id"] = null
    }
    this.state = initState
    this.lang = pathname.split("/")[1] as Language
    this.answersRef = createRef()
    this.inputRef = createRef()
  }

  componentDidMount() {
    const { title } = this.props
    window.gtag("event", "view_item", {
      event_category: "Open page",
      event_label: `${title} ${this.lang}`,
    })

    this.scrollMessages("auto")
    this.scrollToInput()
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

  onCntrlEnterPress = (e: KeyboardEvent) => {
    e.persist()
    if (e.key === "Enter" && e.ctrlKey) {
      this.onAsk()
    }
  }

  renderAnswers = (answers: Answer[]) => {
    return answers.map(this.renderBasic)
  }

  renderBasic = (mes: Answer, i: number) => {
    const rest = { ...mes }
    delete rest.answer
    delete rest.question
    const text = mes.answer
    let answer: any = mes.answer
    var idx
    var temp_dlg
    if (text.includes("#+#")) {
      idx = text.indexOf("#") - 1
      answer = text.slice(0, idx)
    }
    if (text.includes("Oh, and remember this dialog's id: ")) {
      temp_dlg = text.indexOf("Oh, and remember this dialog's id: ") - 1
      answer = text.slice(0, temp_dlg)
      temp_dlg = temp_dlg + 36
    }
    return [
      <div
        className={style.user}
        dir={this.isRTL(mes.question)}
        key={`question${i}`}
      >
        <p>{mes.question}</p>
      </div>,
      <div
        className={style.bot}
        dir={this.isRTL(mes.question)}
        key={`answer${i}`}
      >
        <p>{answer}</p>
      </div>,
    ]
  }

  /*

  moved from renderBasic
  ,
      <div className={style.reaction} key={`reaction${i}`}>
        {mes.rating === 0 &&
         <div>
           <button onClick={() => this.setUttRating(i, 1)}>&#x1f44d;</button>
           <button onClick={() => this.setUttRating(i, 2)}>&#x1f44e;</button>
         </div>
        }
        {mes.rating === 1 && <span>&#x1f44d;</span>}
        {mes.rating === 2 && <span>&#x1f44e;</span>}
      </div>

  */

  setUttRating = async (i: number, rating: number) => {
    const { updateStore, answers, utteranceRating, dispatchLoading } =
      this.props
    let messages = answers || []
    dispatchLoading()

    await utteranceRating(messages[i].utt_id, rating)
      .then(() => {
        messages[i].rating = rating
        updateStore(messages)
      })
      .catch((error) => {
        console.error(error)
        this.setState({ error: true })
      })

    setTimeout(dispatchLoading, 200)
  }

  renderScore = (rating: number) => {
    let spans = []
    for (let i = 5; i > 0; i--) {
      spans.push(
        <span
          key={i}
          onClick={() => {
            if (i !== rating) this.setRating(i)
          }}
        >
          {i <= rating ? "★" : "☆"}
        </span>
      )
    }
    return spans
  }

  setRating = async (rating: number) => {
    const { dialogRating, dispatchLoading } = this.props
    dispatchLoading()
    if (this.state.dialog_id !== null) {
      await dialogRating(this.state.dialog_id, rating)
        .then(() => {
          this.setState({ rating })
        })
        .catch((error) => {
          console.error(error)
          this.setState({ error: true })
        })
    }
    setTimeout(dispatchLoading, 200)
  }

  scrollMessages = (behavior: "smooth" | "auto" = "smooth") => {
    const answersDiv = this.answersRef!.current
    if (answersDiv) {
      answersDiv.scrollTo({
        top: answersDiv.scrollHeight,
        behavior,
      })
    }
  }

  scrollToInput = () => {
    const inputDiv = this.inputRef!.current!
    if (inputDiv == null) {
      return
    }
    const { top, bottom } = inputDiv.getBoundingClientRect()
    if (top < 0 || bottom > window.innerHeight) {
      const offset = Math.max(
        0,
        window.pageYOffset + bottom - window.innerHeight
      )
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
      function scrollListener() {
        if (window.pageYOffset === offset) {
          window.removeEventListener("scroll", scrollListener)
          inputDiv.getElementsByTagName("input")[0].focus()
        }
      }
      window.addEventListener("scroll", scrollListener)
    } else {
      inputDiv.getElementsByTagName("input")[0].focus()
    }
  }

  onAsk = async () => {
    const state = { ...this.state }
    delete state.error

    const { messageApi, updateStore, title, dispatchLoading, answers } =
      this.props
    const question = this.state["message"]
    if (question.length === 0) {
      return
    }
    if (document.activeElement) {
      const elem = document.activeElement as HTMLElement
      elem.blur()
    }
    dispatchLoading()
    let messages = answers || []
    const response = await messageApi(question).catch((error) => {
      // dispatchLoading();
      console.error(error)
      this.setState({ error: true })
    })
    setTimeout(dispatchLoading, 200)
    if (!response) {
      return
    }

    let { response: answer, dialog_id, utt_id } = response.data
    if (dialog_id !== state.dialog_id) {
      // A new dialog started
      updateStore([])
      this.setState({ rating: 0, dialog_id })
    }
    if (answer) {
      const commentIndex = answer.indexOf("#+#")
      if (commentIndex > -1) {
        answer = answer.substring(0, commentIndex)
      }
      answer = answer.trim()
      messages.push({ question, answer, utt_id, rating: 0 })
    }

    window.gtag("event", "view_item", {
      event_category: "Made request",
      event_label: `${title} ${this.lang}`,
    })

    updateStore(messages)

    this.scrollMessages()

    this.scrollToInput()
    this.setState({ message: "" })
  }

  reset = async () => {
    const { resetApi, updateStore, dispatchLoading } = this.props
    dispatchLoading()
    await resetApi().catch((error) => {
      dispatchLoading()
      console.error(error)
      this.setState({ error: true })
    })
    setTimeout(dispatchLoading, 200)
    updateStore([])
    this.setState({ rating: 0, dialog_id: null })
  }

  agree = () => {
    this.setState({ agreed: true }, this.scrollToInput)
  }

  onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    this.onAsk()
  }

  onErrorClose = () => this.setState({ error: false })

  render() {
    const { title, desc, answers, loading } = this.props
    const { agreed, error, rating, dialog_id } = this.state
    let alink = "https://7022.deeppavlov.ai/conversation/" + dialog_id
    return (
      <div className={style.container}>
        {loading && (
          <div className={style.modal}>
            <div className={style.ldsRing}>
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {error && (
          <div className={style.modal} onClick={this.onErrorClose}>
            <div className={style.close} />
            <div className={style.error}>
              {this.lang !== "ru"
                ? "Sorry, an error occurred. Please, try again later."
                : "Извините, произошла ошибка. Пожалуйста, попробуйте позднее."}
            </div>
          </div>
        )}
        <p className={style.title}>{title}</p>
        {desc && <div>{desc}</div>}

        {agreed && answers && answers.length > 0 && (
          <div className={style.answers} id="answers" ref={this.answersRef}>
            {this.renderAnswers(answers)}
          </div>
        )}
        {agreed && (
          <div className={style.inputArea}>
            <form className={style.inputs} onSubmit={this.onFormSubmit}>
              <div className={style.inputGroup} ref={this.inputRef}>
                <input
                  placeholder={
                    this.lang !== "ru"
                      ? "Write a message..."
                      : "Написать сообщение..."
                  }
                  value={this.state["message"]}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    this.setState({ message: e.target.value })
                  }
                  onKeyPress={this.onCntrlEnterPress}
                  className={style.formControl}
                />
                <div className={style.inputGroupAppend}>
                  <button
                    type="button"
                    onClick={this.onAsk}
                    className={style.button}
                  >
                    {this.lang !== "ru" ? "Send" : "Отправить"}
                  </button>
                </div>
              </div>
              {dialog_id && (
                <div>
                  <div className={style.ratingDialogTitle}>
                    Rate Your Dialog:
                  </div>
                  <div className={style.rating}>{this.renderScore(rating)}</div>
                  <div className={style.ratingDialogTitle}>
                    Dialog Id: {dialog_id}.<br></br>
                    You can share the dialog via this <a href={alink}>link</a>.
                    <br></br>
                    Dialog will become available two hours after the last
                    message is received.
                  </div>
                  <div className={style.ratingDialogTitle}>
                    <a href="https://deeppavlov.ai/feedbackdream/">
                      Share Your Feedback With Us!
                    </a>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={this.reset}
                className={style.button}
              >
                {this.lang !== "ru"
                  ? "Start new dialog"
                  : "Начать новый диалог"}
              </button>
            </form>
          </div>
        )}
        {!agreed && (
          <div className={style.disclaimer}>
            <h1>Disclaimer of responsibility</h1>
            <p>
              Bot responses are generated automatically. DeepPavlov shall bear
              no responsibility for accuracy, relevance, and correctness of the
              information received by the User through the chat bot.
            </p>
            <p>
              DeepPavlov shall bear no responsibility for the information
              received by the User through the chatbot, including if this
              information hurts the user's feelings related to ethics and
              standards of living. Information received by the User through the
              bot does not appeal for any actions, including ethnic and
              religious hatred; does not promote anything, including
              non-traditional sexual orientation, violence, drug use, alcohol
              and smoking; it&rsquo;s not intended to offend anyone&rsquo;s
              feelings on religious, gender, political or any other grounds,
              including insulting government officials and state symbols of any
              country.
            </p>
            <p>
              DeepPavlov shall bear no responsibility for the information
              received by the User through the bot, including, but not limited
              to, if this information violates the rights of the third parties
              to intellectual property and equivalent means of identification;
              the right to information constituting a trade secret; the rights
              of minors; contains negative and critical statements regarding
              religion, politics, racial, ethnic, gender, personal qualities and
              abilities, sexual orientation and appearance of the third parties;
              contains insults to specific individuals or organizations;
              violates generally accepted moral standards and ethical norms,
              promotes hatred and / or discrimination.
            </p>
            <p>
              By using the bot, you explicitly give permission for your
              conversation data to be released publicly in any sources and by
              any ways.
            </p>
            <p>
              <strong>
                DeepPavlov has the right to store and publicly share your
                conversation data without compliance to special requirements.
              </strong>
            </p>
            <p>
              If you consider this unacceptable, we kindly ask you not to use
              the bot. By using the chat bot, you explicitly give your
              permission to receive any information; all claims and complaints
              on bot functioning shall not be considered by DeepPavlov.
            </p>
            <button type="button" onClick={this.agree} className={style.button}>
              Agree
            </button>
          </div>
        )}
      </div>
    )
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
      updateStore: (messages: any[]) =>
        dispatch(updatestore(stateKey, messages)),
      dispatchLoading: () => dispatch(RequestLoading()),
      safeComponentState: (state: State) =>
        dispatch(SCI(`${stateKey}Component`, state)),
    })
  )(withRouter(ChatSkill))
}

export default withConnect
