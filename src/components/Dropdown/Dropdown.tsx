import React, { FC, useEffect, useRef, useState } from "react"
import s from "./Dropdown.module.scss"

interface DropdownProps {
  options: string[]
  onSelect: (option: string) => void
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { options, onSelect, children } = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleToggle = (): void => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string): void => {
    setSelectedOption(option)
    onSelect(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event: globalThis.Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => handleClickOutside(e))

    return () => {
      document.removeEventListener("click", (e) => handleClickOutside(e))
    }
  }, [])

  return (
    <div className={s.dropdown} ref={dropdownRef}>
      <div className={s.header} onClick={handleToggle}>
        {children}
      </div>
      {isOpen && (
        <ul className={s.options}>
          {options.map((option) => (
            <li
              className={s.option}
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
