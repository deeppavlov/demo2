import React, { FC, useRef, useState } from "react"
import { useLocation } from "react-router"
import classnames from "classnames/bind"
import { useHandleClickOutside } from "hooks/useHandleClickOutside"
import { NavLink } from "react-router-dom"
import { RouteConfig } from "router/Routes"
import s from "./Dropdown.module.scss"

interface DropdownProps {
  options: RouteConfig[]
  onSelect: (option: string) => void
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { options, onSelect, children } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const cn = classnames.bind(s)

  const location = useLocation()
  const activeTab = location.pathname.split("/")[1]
  const activeRoute = location.pathname.split("/")[2]

  const handleToggle = (): void => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: { link: string }): void => {
    onSelect(option.link)
    setIsOpen(false)
  }

  useHandleClickOutside(dropdownRef, () => setIsOpen(false)) //maybe use callback ref for list of dropdowns

  return (
    <div onClick={handleToggle} className={s.dropdown} ref={dropdownRef}>
      {children}
      {isOpen && (
        <ul className={s.options}>
          {options.map((option, i) => {
            const isEmpty = option.component === null

            return (
              <NavLink
                key={i}
                exact
                className={s.navLink}
                activeClassName={s.activeNavLink}
                to={
                  !isEmpty ? `/${activeTab}/${option.link}` : location.pathname // need to find another way
                }
              >
                <li
                  className={cn(
                    s.option,
                    activeRoute === option.link && "currentRoute",
                    isEmpty && "disabled"
                  )}
                  key={option?.link + i}
                  onClick={() => !isEmpty && handleSelect(option)}
                >
                  {option?.title}
                </li>
              </NavLink>
            )
          })}
        </ul>
      )}
    </div>
  )
}
