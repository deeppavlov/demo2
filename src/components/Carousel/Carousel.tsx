import React, { FC, useState } from "react"
import Prev from "../../assets/prev.svg"
import Next from "../../assets/next.svg"
import Down from "../../assets/down.svg"
import { Dropdown } from "../Dropdown/Dropdown"
import classNames from "classnames/bind"
import s from "./Carousel.module.scss"

interface CarouselProps {
  buttons: string[] //FIX
  amount: number
}

export const Carousel: FC<CarouselProps> = ({ buttons, amount }) => {
  const [startIndex, setStartIndex] = useState<number>(0)
  const [active, setActive] = useState<number | null>(null)

  const handleClick = (index: number) => {
    console.log("index = ", index)
  }

  const handlePrevClick = () => {
    setActive(null)
    setStartIndex((current) =>
      current < 1 ? buttons?.length - 1 : current - 1
    )
  }

  const handleNextClick = () => {
    setActive(null)
    setStartIndex((current) =>
      current === buttons?.length - 1 ? 0 : current + 1
    )
  }

  const getArray = (start: number, amount: number) => {
    const cycle = start > buttons?.length - amount
    const rest = buttons.length - start
    const sliced = buttons.slice(start, start + amount)

    return !cycle ? sliced : sliced.concat(buttons.slice(0, amount - rest))
  }

  const buttonsToShow = () => getArray(startIndex, amount)

  const cn = classNames.bind(s)
  return (
    <div className={s.carousel}>
      {buttonsToShow()?.map((button, index) => (
        <Dropdown
          key={button + index}
          options={[button, index.toString()]}
          onSelect={(option: string) => {
            console.log("option = ", option)
            setActive(null)
          }}
        >
          <button
            className={cn("btn", active === index && "active")}
            key={index}
            onClick={() => {
              setActive((prev) => (prev === index ? null : index))
              handleClick(index)
            }}
          >
            {button}
            <img src={Down} />
          </button>
        </Dropdown>
      ))}
      <button className={s.prev} onClick={handlePrevClick}>
        <img src={Prev} />
      </button>
      <button className={s.next} onClick={handleNextClick}>
        <img src={Next} />
      </button>
    </div>
  )
}
