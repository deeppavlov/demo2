import { RefObject, useEffect } from "react"

export const useHandleClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event?.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClick, { capture: true })
    return () => {
      window.removeEventListener("click", handleClick, { capture: true })
    }
  }, [])
}
