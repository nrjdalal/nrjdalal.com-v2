"use client"

import { useCopyToClipboard } from "@/hooks/use-copy"

export default function Component(props: {
  children: React.ReactNode
  __raw__?: string
}) {
  const [copiedText, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text })
      })
      .catch((error: Error) => {
        console.error("Failed to copy!", error)
      })
  }

  return !props.__raw__ ? (
    <code>{props.children}</code>
  ) : (
    <div className="relative overflow-scroll rounded-md bg-black p-5 text-white">
      <button
        className="absolute top-4 right-4 cursor-pointer rounded-sm bg-white px-2 text-black"
        onClick={handleCopy(props.__raw__)}
      >
        {copiedText === props.__raw__ ? "Copied" : "Copy"}
      </button>
      {props.children}
    </div>
  )
}
