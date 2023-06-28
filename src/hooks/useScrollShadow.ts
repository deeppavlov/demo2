import { useEffect, useRef } from "react"

export const useScrollShadow = () => {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) =>
        entry.target.classList.toggle(
          "stickyShadow",
          entry.intersectionRatio < 1
        ),
      { threshold: [1] }
    )
    observer.observe(ref?.current!)
    return () => observer.disconnect()
  }, [])
  return {ref}
}
