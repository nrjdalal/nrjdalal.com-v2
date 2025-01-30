"use client"

import { RiMoonFill, RiSunFill } from "@remixicon/react"
import { useTheme } from "next-themes"
import { useId } from "react"

export default function ThemeToggle() {
  const id = useId()
  const { theme, setTheme } = useTheme()

  return (
    <>
      <input
        id={id}
        type="checkbox"
        name="theme-toggle"
        className="peer sr-only"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      />
      <label
        htmlFor={id}
        className="hover:bg-border/50 flex aspect-square h-full cursor-pointer items-center justify-center"
        aria-hidden="true"
      >
        <RiSunFill className="size-4 dark:hidden" aria-hidden="true" />
        <RiMoonFill className="hidden size-4 dark:block" aria-hidden="true" />
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </>
  )
}
