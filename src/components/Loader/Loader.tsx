import React, { FC } from "react"
import s from "./Loader.module.scss"

interface LoaderProps {
  loading?: boolean
}

export const Loader: FC<LoaderProps> = (props) => {
  const { loading } = props

  return (
    <div className={s.loader}>
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
    </div>
  )
}
