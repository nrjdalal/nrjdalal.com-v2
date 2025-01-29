"use client"

import { useCopyToClipboard } from "@/hooks/use-copy"
import { useState } from "react"

export default function Component(props: {
  children: React.ReactNode
  __raw__?: string
}) {
  const [, copy] = useCopyToClipboard()
  const [buttonText, setButtonText] = useState("Copy")

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        setButtonText("Copied")
        console.log("Copied!", { text })
        setTimeout(() => {
          setButtonText("Copy")
        }, 2000)
      })
      .catch((error: Error) => {
        console.error("Failed to copy!", error)
      })
  }

  return !props.__raw__ ? (
    <code>{props.children}</code>
  ) : (
    <div className="relative">
      <button
        className="absolute top-4 right-4 cursor-pointer rounded-sm bg-white px-2 text-black"
        onClick={handleCopy(props.__raw__)}
      >
        {buttonText}
      </button>
      <div className="overflow-scroll rounded-md bg-black p-5 text-white">
        <code>{props.children}</code>
      </div>
    </div>
  )
}
