import "@/app/hljs.css"
import Code from "@/components/mdx/code"
import { getSourceBySlug } from "@/utils/file"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
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
      className="prose mx-auto max-w-screen-md p-5"
      remarkPlugins={[remarkFrontmatter, remarkGfm, remarkToc]}
      rehypePlugins={[
        rehypeRaw,
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === "element" && node?.tagName === "pre") {
              node.properties.className = [
                "not-prose",
                ...(node.properties.className || []),
              ]
              const [codeElement] = node.children
              if (codeElement.tagName !== "code") return
              node.children.at(-1).properties["__raw__"] =
                codeElement.children[0]?.value
            }
          })
        },
        rehypeHighlight,
      ]}
      components={{
        code: ({ children, ...props }) => <Code {...props}>{children}</Code>,
      }}
    >
      {source}
    </Markdown>
  )
}
