import { getSourceBySlug } from "@/utils/file"
import Markdown from "react-markdown"

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

  return <Markdown className="text-red-500">{source}</Markdown>
}
