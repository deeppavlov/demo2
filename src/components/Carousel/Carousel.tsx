import React, { FC, useRef, useState } from "react"
import { useLocation } from "react-router"
import classNames from "classnames/bind"
import { routesForDemo } from "router"
import { ReactComponent as DownArrow } from "assets/icons/down.svg"
import { ReactComponent as PrevArrow } from "assets/icons/prev.svg"
import { ReactComponent as NextArrow } from "assets/icons/next.svg"
import { Dropdown } from "components"
import { useHandleClickOutside } from "hooks"
import { findParentKey } from "utils"
import { DisplayTitles, RouteConfig, Titles } from "router/Routes"
import s from "./Carousel.module.scss"
interface CarouselProps {
  routes: [string, RouteConfig[]][]
  amount: number
}

export const Carousel: FC<CarouselProps> = (props) => {
  const { routes, amount } = props
  const cn = classNames.bind(s)

  const contentRef = useRef<HTMLDivElement>(null)

  const [startIndex, setStartIndex] = useState<number>(0)
  const [active, setActive] = useState<number | null>(null)

  const location = useLocation()
  const currentRoute = location.pathname.split("/")[2]
  const activeRouteBtn = findParentKey(routesForDemo, currentRoute)

  const handlePrevClick = () => {
    setActive(null)
    setStartIndex((current) => (current < 1 ? routes?.length - 1 : current - 1))
  }

  const handleNextClick = () => {
    setActive(null)
    setStartIndex((current) =>
      current === routes?.length - 1 ? 0 : current + 1
    )
  }

  const getArray = (start: number, amount: number) => {
    const cycle = start > routes?.length - amount
    const rest = routes.length - start
    const sliced = routes.slice(start, start + amount)

    return !cycle ? sliced : sliced.concat(routes.slice(0, amount - rest))
  }

  const routesToShow = () => getArray(startIndex, amount)

  useHandleClickOutside(contentRef, () => setActive(null))

  return (
    <div className={s.carousel}>
      <button className={s.prev} onClick={handlePrevClick}>
        <PrevArrow />
      </button>
      <div className={s.content} ref={contentRef}>
        {routesToShow()?.map((button, i) => {
          const title = button[0] as Titles
          return (
            <Dropdown
              key={button[0] + i}
              options={button[1]}
              onSelect={() => setActive(null)}
            >
              <button
                className={cn(
                  "btn",
                  active === i && "active",
                  activeRouteBtn === button[0] && "currentRoute",
                  !button[1].length && "disabled"
                )}
                key={i}
                onClick={() =>
                  button[1].length &&
                  setActive((prev) => (prev === i ? null : i))
                }
              >
                {DisplayTitles[title]}
                <DownArrow />
              </button>
            </Dropdown>
          )
        })}
      </div>
      <button className={s.next} onClick={handleNextClick}>
        <NextArrow />
      </button>
    </div>
  )
}
