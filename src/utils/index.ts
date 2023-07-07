export const findParentKey = (data: any, targetLink: string) =>
  Object.keys(data).find((key) =>
    data[key].some((item: any) => item.link === targetLink)
  )

export const capitalizeFirstLetter = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const stringFromCamelCase = (s: string) => {
  return s.split(/(?=[A-Z])/).join(" ")
}
