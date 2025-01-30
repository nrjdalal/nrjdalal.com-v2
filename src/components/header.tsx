"use client"

import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { RiCodeAiFill, RiGithubFill, RiTwitterXFill } from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "home", href: "/" },
  { name: "blogs", href: "/blogs" },
  { name: "projects", href: "/projects" },
  { name: "contact", href: "/contact" },
]

const socialLinks = [
  { href: "https://github.com/nrjdalal", icon: RiGithubFill },
  { href: "https://x.com/nrjdalal_com", icon: RiTwitterXFill },
]

export default function Component() {
  const pathname = usePathname()

  return (
    <div className="bg-background sticky top-0 z-50 flex h-14 w-full justify-between border-b">
      <Link
        href="/"
        className="hover:bg-border/50 flex h-full min-w-64 cursor-pointer items-center justify-center gap-x-2 border-r px-5"
      >
        <RiCodeAiFill className="size-6" />
        <p className="font-mono">NRJDALAL.COM</p>
      </Link>
      <div className="text-muted-foreground flex cursor-pointer items-center divide-x font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "hover:text-foreground hover:border-b-foreground flex h-full items-center px-7.5 hover:border-b-2 hover:pt-[2px]",
              pathname === item.href &&
                "text-foreground border-b-foreground border-b-2 pt-[2px]",
            )}
          >
            {item.name}
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
    </div>
  )
}
