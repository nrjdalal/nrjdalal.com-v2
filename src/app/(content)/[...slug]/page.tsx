import "@/app/hljs.css"
import { getSourceBySlug } from "@/utils/file"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string | string[] }>
}) {
  const slug = (await params).slug

  const result = await getSourceBySlug({ slug })

  if (!result) {
    return null
  }

  const { source } = result

  return (
    <Markdown
      className="prose"
      remarkPlugins={[remarkFrontmatter, remarkGfm]}
      rehypePlugins={[
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const [codeElement] = node.children
              if (codeElement.tagName !== "code") return
              node.__raw__ = codeElement.children[0]?.value
            }
          })
        },
        rehypeHighlight,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              const preElement = node.children.at(-1)
              preElement.properties["__raw__"] = node.__raw__
            }
          })
        },
        rehypeRaw,
      ]}
    >
      {source}
    </Markdown>
  )
}
