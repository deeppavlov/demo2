import { useMemo, useState, useEffect } from "react"

function useMediaQuery(query: string) {
  const mediaQuery = useMemo(() => window.matchMedia(query), [query])
  const [match, setMatch] = useState(mediaQuery.matches)

  useEffect(() => {
    const onChange = () => setMatch(mediaQuery.matches)
    mediaQuery.addEventListener("change", onChange)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [mediaQuery])

  return match
}
export function useMediaQueries() {
  const minWidth667 = useMediaQuery("(min-width: 667px)")
  const minWidth768 = useMediaQuery("(min-width: 768px)")
  const minWidth1024 = useMediaQuery("(min-width: 1024px)")
  const minWidth1280 = useMediaQuery("(min-width: 1280px)")

  return { minWidth1024, minWidth1280, minWidth768, minWidth667 }
}
//FIX