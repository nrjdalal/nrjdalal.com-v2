import { getSourceBySlug } from "@/utils/file"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight" // Import rehype-highlight
import rehypeRaw from "rehype-raw"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import "./hljs.css"

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
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {source}
    </Markdown>
  )
}
