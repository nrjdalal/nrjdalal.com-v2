"use client"

import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import {
  RiBrushAiFill,
  RiCodeAiFill,
  RiGithubFill,
  RiTwitterXFill,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "home", href: "/" },
  { name: "blogs", href: "/blogs" },
  { name: "projects", href: "/projects" },
  { name: "contact", href: "/contact" },
]

const uiNavItems = [
  { name: "home", href: "/ui" },
  { name: "docs", href: "/ui/docs" },
  { name: "components", href: "/ui/components" },
  { name: "blocks", href: "/ui/blocks" },
]

const socialLinks = [
  { href: "https://github.com/nrjdalal", icon: RiGithubFill },
  { href: "https://x.com/nrjdalal_com", icon: RiTwitterXFill },
]

const NavigationLinks = ({
  items,
}: Readonly<{
  items: {
    name: string
    href: string
  }[]
}>) => {
  const pathname = usePathname()

  return (
    <div className="text-muted-foreground flex cursor-pointer items-center divide-x font-medium">
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "group relative flex h-full items-center px-7.5",
            pathname === item.href
              ? "text-foreground"
              : "hover:text-foreground",
          )}
        >
          {item.name}
          <span
            className={cn(
              "bg-foreground absolute bottom-0 left-0 h-[2px] w-full transition-all duration-500 ease-in-out",
              pathname === item.href
                ? "group-hover:w-0"
                : "w-0 group-hover:w-full",
            )}
          />
        </Link>
      ))}
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          className="hover:text-foreground hover:border-foreground flex aspect-square h-full items-center justify-center hover:border-t-2 hover:border-r-2 hover:pb-[2px] hover:pl-[1px]"
        >
          <link.icon className="size-6" />
        </Link>
      ))}
      <ThemeToggle />
    </div>
  )
}

export default function Component() {
  const pathname = usePathname()

  return (
    <div className="bg-background sticky top-0 z-50 flex h-14 w-full justify-between border-b">
      <div className="flex">
        <Link
          href="/"
          className={cn(
            "hover:bg-border/50 flex h-full min-w-64 cursor-pointer items-center justify-center gap-x-2 border-r px-5",
            pathname.startsWith("/ui") && "hidden",
          )}
        >
          <RiCodeAiFill className="size-6" />
          <p className="font-mono">NRJDALAL.COM</p>
        </Link>
        <Link
          href="/ui"
          className={cn(
            "hover:bg-border/50 flex h-full cursor-pointer items-center justify-center gap-x-2 border-r px-5",
            pathname.startsWith("/ui") && "min-w-64",
          )}
        >
          <RiBrushAiFill className="size-6" />
          <p
            className={cn("font-mono", !pathname.startsWith("/ui") && "hidden")}
          >
            NRJDALAL.COM/UI
          </p>
        </Link>
        <Link
          href="/"
          className={cn(
            "hidden",
            pathname.startsWith("/ui") &&
              "hover:bg-border/50 flex h-full cursor-pointer items-center justify-center gap-x-2 border-r px-5",
          )}
        >
          <RiCodeAiFill className="size-6" />
        </Link>
      </div>

      {!pathname.startsWith("/ui") && <NavigationLinks items={navItems} />}
      {pathname.startsWith("/ui") && <NavigationLinks items={uiNavItems} />}
    </div>
  )
}
