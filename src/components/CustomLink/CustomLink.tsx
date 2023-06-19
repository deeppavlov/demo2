import React, { FC } from "react"
import s from "./CustomLink.module.scss"

interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const CustomLink: FC<CustomLinkProps> = (props) => {
  const { children, ...otherProps } = props

  return (
    <a
      className={s.customlink}
      target="_blank"
      rel="noopener noreferrer"
      {...otherProps}
    >
      {children}
    </a>
  )
}
