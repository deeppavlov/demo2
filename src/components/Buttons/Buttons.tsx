import React, { FC } from "react"
import Github from "../../assets/github.svg"
import nvidia from "../../assets/nvidia.svg"
import docker from "../../assets/docker.svg"
import { CustomLink } from "components/CustomLink/CustomLink"
import classNames from "classnames/bind"
import s from "./Buttons.module.scss"

interface ButtonsProps {
  reverse?: boolean
}
export const Buttons: FC<ButtonsProps> = (props) => {
  const { reverse } = props
  const cn = classNames.bind(s)
  return (
    <div className={cn("buttons", reverse && "reverse")}>
      <CustomLink href="https://github.com/deeppavlov/DeepPavlov">
        <button className={s.github}>
          <img src={Github} alt="Github" />
          <p>Github</p>
        </button>
      </CustomLink>

      <CustomLink href="https://ngc.nvidia.com/catalog/containers/partners:deeppavlov">
        <button>
          <img src={nvidia} alt="NGC" />
          <p>NGC</p>
        </button>
      </CustomLink>

      <CustomLink href="https://hub.docker.com/r/deeppavlov">
        <button>
          <img src={docker} alt="Docker Hub" />
          <p>Docker Hub</p>
        </button>
      </CustomLink>
    </div>
  )
}
