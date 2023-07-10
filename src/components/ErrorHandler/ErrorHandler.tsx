import React, { FC } from "react"
import s from "./ErrorHandler.module.scss"

interface ErrorHandlerProps {
  error?: any
  onErrorClose?: any
}

export const ErrorHandler: FC<ErrorHandlerProps> = (props) => {
  const { error, onErrorClose } = props

  return (
    <>
      {error && (
        <div className={s.modal} onClick={onErrorClose}>
          <div className={s.close} />
          <div className={s.error}>
            Sorry, an error occurred. Please, try again later.{" "}
          </div>
        </div>
      )}
    </>
  )
}
