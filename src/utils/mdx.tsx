import fs from "fs"
import type { Element } from "hast"
import type { Html } from "mdast"
import type { Raw, State } from "mdast-util-to-hast"
import { MDXRemote, type MDXRemoteOptions } from "next-mdx-remote-client/rsc"
import path from "path"
import { readingTime } from "reading-time-estimator"
import recmaMdxChangeProps from "recma-mdx-change-props"
import recmaMdxEscapeMissingComponents from "recma-mdx-escape-missing-components"
import rehypeHighlight from "rehype-highlight"
import rehypeHighlightLines, {
  type HighlightLinesOptions,
} from "rehype-highlight-code-lines"
import rehypePreLanguage from "rehype-pre-language"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import remarkEmoji from "remark-emoji"
import remarkFlexibleCodeTitles from "remark-flexible-code-titles"
import remarkFlexibleContainers, {
  type FlexibleContainerOptions,
} from "remark-flexible-containers"
import remarkFlexibleMarkers from "remark-flexible-markers"
import remarkFlexibleParagraphs from "remark-flexible-paragraphs"
import remarkFlexibleToc from "remark-flexible-toc"
import remarkGfm from "remark-gfm"
import remarkInsert from "remark-ins"
import { type PluggableList } from "unified"

export default async function SmartMDX({
  slug,
  directory,
}: {
  slug: string | string[]
  directory: string
}) {
  slug = Array.isArray(slug) ? slug.join("/") : slug

  const result = await getMarkdownFromSlug({
    slug,
    directory,
  })

  if (!result) {
    return <p>Page not found</p>
  }

  const { source, format } = result

  const options: MDXRemoteOptions = {
    disableImports: true, // import statements in MDX don't work in pages router
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
    vfileDataIntoScope: "toc", // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions: format === "md" ? remarkRehypeOptions : undefined,
    },
  }

  return <MDXRemote source={source} options={options} />
}

const getMarkdownFromSlug = async ({
  slug,
  directory,
}: {
  slug: string
  directory: string
}) => {
  const basePath = path.join(process.cwd(), directory, slug)
  const formats = ["md", "mdx"]

  for (const format of formats) {
    const fullPath = `${basePath}.${format}`
    if (fs.existsSync(fullPath)) {
      return {
        source: await fs.promises.readFile(fullPath, "utf8"),
        format: format as "md" | "mdx",
      }
    }
  }
}

// from @mdx-js/mdx
const nodeTypes = [
  "mdxFlowExpression",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
  "mdxTextExpression",
  "mdxjsEsm",
]

const toTitleCase = (str: string | undefined) => {
  if (!str) return

  return str.replace(/\b\w+('\w{1})?/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  })
}

const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkInsert,
  remarkFlexibleMarkers, // order of plugins matters
  remarkEmoji,
  remarkFlexibleParagraphs,
  [
    remarkFlexibleContainers,
    {
      title: () => null,
      containerTagName: "admonition",
      containerProperties: (type, title) => {
        return {
          ["data-type"]: type?.toLowerCase(),
          ["data-title"]: title ?? toTitleCase(type),
        }
      },
    } as FlexibleContainerOptions,
  ],
  remarkFlexibleCodeTitles,
  remarkFlexibleToc,
]

const rehypePlugins: PluggableList = [
  rehypeHighlight,
  [
    rehypeHighlightLines,
    {
      showLineNumbers: true,
      lineContainerTagName: "div",
    } as HighlightLinesOptions,
  ],
  rehypeSlug,
  rehypePreLanguage,
  [rehypeRaw, { passThrough: nodeTypes }], // to allow HTML elements in "md" format, "passThrough" is for "mdx" works as well
]

const recmaPlugins: PluggableList = [
  [
    recmaMdxEscapeMissingComponents,
    ["Bar", "Toc", "ContextConsumer", "ComponentFromOuterProvider"],
  ],
  recmaMdxChangeProps,
]

export const plugins = {
  remarkPlugins,
  rehypePlugins,
  recmaPlugins,
}

function html(state: State, node: Html): Element | Raw | undefined {
  if (state.options.allowDangerousHtml) {
    // check if it is a react component name pattern, then return undefined
    const component_name = node.value.match(/<([A-Z][^\/\s>]+)/)?.[1]
    if (component_name) return

    const result: Raw = { type: "raw", value: node.value }
    state.patch(node, result)
    return state.applyData(node, result)
  }

  return undefined
}

const remarkRehypeOptions = { handlers: { html } }
