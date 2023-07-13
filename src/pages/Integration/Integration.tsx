import React, { FC, useState } from "react"
import classnames from "classnames/bind"
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism"
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-async-light"
import { ReactComponent as Copy } from "assets/icons/copy.svg"
import { Switcher } from "components/Switcher/Switcher"
import { Snippets } from "types"
import s from "./Integration.module.scss"

interface IntegrationProps {
  snippets: {
    [Snippets.cli]: string
    [Snippets.python]: string
    [Snippets.restApi]: string
  }
}

export const Integration: FC<IntegrationProps> = (props) => {
  const { snippets } = props
  const cn = classnames.bind(s)

  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<Snippets>(Snippets.cli)

  const script = snippets[activeTab]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
    } catch (e) {
      console.log("e = ", e)
    }
    setIsCopied((prev) => true)
    setTimeout(() => {
      setIsCopied((prev) => false)
    }, 1000)
  }

  return (
    <div className={s.container}>
      <p className={s.integrationTitle}>Integration</p>
      <div className={s.btns}>
        <Switcher activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          className={cn(s.copyBtn, isCopied && "active")}
          onClick={handleCopy}
        >
          <Copy />
          {!isCopied ? "Copy Code" : " Copied! "}
        </button>
      </div>
      <SyntaxHighlighter
        customStyle={{ margin: "0px", borderRadius: "12px" }}
        language={"python"}
        style={nightOwl}
      >
        {script}
      </SyntaxHighlighter>
    </div>
  )
}