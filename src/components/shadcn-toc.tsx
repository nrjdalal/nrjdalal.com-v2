// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { TableOfContents } from "@/utils/shadcn-toc"
import { RiGithubFill } from "@remixicon/react"
import Link from "next/link"

interface TocProps {
  toc: TableOfContents
  edit?: string
}

export function DashboardTableOfContents({ toc, edit }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split("#")[1])
        : [],
    [toc],
  )
  const activeHeading = useActiveItem(itemIds)

  if (!toc?.items?.length) {
    return null
  }

  return (
    <div className="relative hidden w-1/3 pr-5 xl:block">
      <div className="sticky top-24 space-y-2 text-sm">
        <p className="font-medium">On This Page</p>
        <Tree tree={toc} activeItem={activeHeading} />
        {edit && (
          <Link
            href={edit}
            target="_blank"
            className="text-muted-foreground hover:text-foreground mt-8 flex w-25 gap-x-1.5 rounded-sm text-xs"
          >
            <RiGithubFill className="inline size-4" />{" "}
            <span className="mt-[0.5px]">Edit this page</span>
          </Link>
        )}
      </div>
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 4 ? (
    <ul className={cn("m-0 list-none", level > 2 && "pl-4")}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "hover:text-foreground inline-block no-underline transition-colors",
                item.url === `#${activeItem}`
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
