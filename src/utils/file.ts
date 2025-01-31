import fs from "fs"
import path from "path"

export const getSourceBySlug = async <T extends string>({
  directory = "content",
  formats = ["mdx", "md"] as T[],
  slug,
}: {
  directory?: string
  formats?: T[]
  slug: string | string[]
}): Promise<{
  format: T
  location: string
  source: string
} | null> => {
  try {
    const slugPath = Array.isArray(slug) ? slug.join("/") : slug
    const fileBasePath = path.join(process.cwd(), directory, slugPath)

    for (const format of formats) {
      const filePath = `${fileBasePath}.${format}`
      if (fs.existsSync(filePath)) {
        return {
          format,
          location: directory + "/" + slugPath + "." + format,
          source: await fs.promises.readFile(filePath, "utf8"),
        }
      }
    }

    if (!fs.existsSync(path.join(process.cwd(), directory))) {
      throw new Error(
        `The directory "${directory}" does not exist. Please provide a valid directory.`,
      )
    }

    return null
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred: ${error.message}`)
    } else {
      console.error("An unknown error occurred")
    }
    return null
  }
}
