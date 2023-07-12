import React, { FC, RefObject, SyntheticEvent } from "react"
import { Example, Input } from "components/BaseSkill"
import s from "./Examples.module.scss"

interface ExamplesProps {
  inputs: any
  examples: any
  answers: any

  onFormSubmit: (e: SyntheticEvent) => void
  renderExamples: (ex: Example, i: number) => JSX.Element
  renderInput: (input: Input, i: number) => JSX.Element
  renderAnswers: (answers: any) => void
  onAsk: () => void
  answersRef: RefObject<HTMLDivElement>
}

export const Examples: FC<ExamplesProps> = (props) => {
  const {
    inputs,
    examples,
    answers,
    onFormSubmit,
    renderExamples,
    renderInput,
    renderAnswers,
    onAsk,
    answersRef,
    children,
  } = props
  return (
    <div className={s.inputArea}>
      <form className={s.inputs} onSubmit={onFormSubmit}>
        <div className={s.examplesQuestion}>
          <div className={s.examples}>
            <p>Examples</p>
            <ul>{examples.map(renderExamples)}</ul>
            {children}
          </div>
          <div className={s.question}>
            {inputs.map(renderInput)}
            <button type="button" onClick={onAsk} className={s.button}>
              Ask
            </button>
            <div>
              {answers && (
                <div className={s.answers} id="answers" ref={answersRef}>
                  <p style={{ color: "#3300ff", fontWeight: 600 }}>Result</p>
                  {renderAnswers(answers)}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
