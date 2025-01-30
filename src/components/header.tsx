"use client"

import ThemeToggle from "@/components/theme-toggle"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import {
  RiBrushAiFill,
  RiCodeAiFill,
  RiGithubFill,
  RiMenu4Fill,
  RiTwitterXFill,
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC, useState } from "react"

const doesPathMatchHref = (pathname: string, href: string): boolean => {
  const cleanedPathname = pathname.split(/[?#]/)[0]

  if (href === "/") {
    return (
      cleanedPathname === "/" ||
      pathname.startsWith("/#") ||
      pathname.startsWith("/?")
    )
  }

  if (href === cleanedPathname) {
    return true
  }

  if (href === "/ui") {
    return (
      cleanedPathname === "/ui" ||
      pathname.startsWith("/ui#") ||
      pathname.startsWith("/ui?")
    )
  }

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

interface NavigationLinksProps {
  items: { name: string; href: string }[]
  hoveredItem: string | null
  setHoveredItem: (item: string | null) => void
}

const NavigationLinks: FC<NavigationLinksProps> = ({
  items,
  hoveredItem,
  setHoveredItem,
}) => {
  const pathname = usePathname()

  return (
    <>
      <div className="text-muted-foreground hidden cursor-pointer items-center divide-x font-medium lg:flex">
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
                "bg-foreground absolute bottom-0 left-0 h-[2px] transition-all ease-in-out",
                doesPathMatchHref(pathname, item.href)
                  ? hoveredItem && hoveredItem !== item.href
                    ? "w-0 duration-1000"
                    : "w-full duration-200"
                  : "w-0 duration-1000 group-hover:w-[90%]",
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
      <Drawer>
        <DrawerTrigger className="hover:text-foreground text-muted-foreground flex aspect-square h-full cursor-pointer items-center justify-center lg:hidden">
          <RiMenu4Fill className="size-6" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="sr-only">
            <DrawerTitle>Menu</DrawerTitle>
            <DrawerDescription>Navigation links</DrawerDescription>
          </DrawerHeader>
          <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-y-2 p-5">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "hover:bg-border/50 flex h-14 w-full cursor-pointer items-center justify-center gap-x-2 rounded-sm px-5",
                  doesPathMatchHref(pathname, item.href) && "bg-border/50",
                )}
              >
                <p>{item.name}</p>
              </Link>
            ))}
            <div className="flex h-14">
              {socialLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  className="hover:bg-border/50 flex aspect-square h-full cursor-pointer items-center justify-center gap-x-2 rounded-md px-5"
                >
                  <link.icon className="size-6" />
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const Component: FC = () => {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="bg-background sticky top-0 z-50 flex h-12 w-full justify-between border-b lg:h-14">
      <div className="flex">
        <Link
          href="/"
          className={cn(
            "hover:bg-border/50 flex h-full cursor-pointer items-center justify-center gap-x-2 border-r px-5 lg:min-w-64",
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
            pathname.startsWith("/ui") && "lg:min-w-64",
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

export default Component
