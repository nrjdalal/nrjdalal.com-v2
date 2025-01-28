import SmartMDX from "@/utils/mdx"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = (await params).slug

  return <SmartMDX slug={slug} directory="content" />
}
