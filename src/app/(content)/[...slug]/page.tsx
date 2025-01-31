import "@/app/hljs.css"
import Code from "@/components/mdx/code"
import { DashboardTableOfContents } from "@/components/shadcn-toc"
import { getSourceBySlug } from "@/utils/file"
import { getTableOfContents } from "@/utils/shadcn-toc"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
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

  const { source, location } = result

  const toc = await getTableOfContents(source)

  return (
    <div className="relative flex">
      <div className="w-2/3">
        <Markdown
          className="prose dark:prose-invert mt-5 w-full max-w-screen-md p-5 2xl:mx-24"
          remarkPlugins={[remarkFrontmatter, remarkGfm]}
          rehypePlugins={[
            rehypeSlug,
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
            code: ({ children, ...props }) => (
              <Code {...props}>{children}</Code>
            ),
          }}
        >
          {source}
        </Markdown>
      </div>

      <DashboardTableOfContents
        edit={
          "https://github.com/nrjdalal/nrjdalal.com-v2/blob/main/" + location
        }
        toc={toc}
      />
    </div>
  )
}
