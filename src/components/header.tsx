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
import { useState } from "react"

// Utility function to check if the path matches the navigation href
const doesPathMatchHref = (pathname, href) => {
  // Remove any anchor or query parameters from the pathname
  const cleanedPathname = pathname.split(/[?#]/)[0]

  // Exact match for home route
  if (href === "/") {
    return (
      cleanedPathname === "/" ||
      pathname.startsWith("/#") ||
      pathname.startsWith("/?")
    )
  }

  // Exact match or match with #anchor or ?query for specific routes
  if (href === cleanedPathname) {
    return true
  }

  // For route `/ui`, it should only match exactly with `/ui` or `/ui#` or `/ui?`
  if (href === "/ui" && cleanedPathname === "/ui") {
    return (
      pathname.startsWith("/ui#") ||
      pathname.startsWith("/ui?") ||
      pathname === "/ui"
    )
  }

  // Match for routes with /slug
  const regex = new RegExp(`^${href}/[^/]+.*$`)
  return regex.test(cleanedPathname)
}

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
  hoveredItem,
  setHoveredItem,
}: Readonly<{
  items: {
    name: string
    href: string
  }[]
  hoveredItem: string | null
  setHoveredItem: (item: string | null) => void
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
            doesPathMatchHref(pathname, item.href)
              ? "text-foreground"
              : "hover:text-foreground",
          )}
          onMouseEnter={() => setHoveredItem(item.href)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {item.name}
          <span
            className={cn(
              "bg-foreground absolute bottom-0 left-0 h-[2px] transition-all duration-1000 ease-in-out",
              doesPathMatchHref(pathname, item.href)
                ? hoveredItem && hoveredItem !== item.href
                  ? "w-0"
                  : "w-full"
                : "w-0 group-hover:w-[90%]",
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

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

      {!pathname.startsWith("/ui") && (
        <NavigationLinks
          items={navItems}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      )}
      {pathname.startsWith("/ui") && (
        <NavigationLinks
          items={uiNavItems}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      )}
    </div>
  )
}
