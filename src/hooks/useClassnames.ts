import classNames from "classnames/bind"

export const useClassnames = (s: any) => {
  const cn = classNames.bind(s)
  return cn
}
