import React from "react"
import Github from "../../assets/github.svg"
import nvidia from "../../assets/nvidia.svg"
import docker from "../../assets/docker.svg"
import { CustomLink } from "components/CustomLink/CustomLink"
import s from "./Buttons.module.scss"

export const Buttons = () => {
  return (
    <div className={s.buttons}>
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
