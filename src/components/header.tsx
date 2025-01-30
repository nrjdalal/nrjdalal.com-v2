import ThemeToggle from "@/components/theme-toggle"
import { RiCodeAiFill, RiGithubFill, RiTwitterXFill } from "@remixicon/react"
import Link from "next/link"

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
  return (
    <div className="sticky top-0 flex h-14 w-full justify-between border-b">
      <div className="hover:bg-border/50 flex h-full min-w-64 cursor-pointer items-center justify-center gap-x-2 border-r px-5">
        <RiCodeAiFill className="size-6" />
        <p className="font-mono">NRJDALAL.COM</p>
      </div>
      <div className="text-muted-foreground flex cursor-pointer items-center divide-x font-medium">
        {navItems.map((item) => (
          <div
            key={item.name}
            className="hover:text-foreground hover:border-b-foreground flex h-full items-center px-7.5 hover:border-b-2 hover:pt-[2px]"
          >
            {item.name}
          </div>
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
