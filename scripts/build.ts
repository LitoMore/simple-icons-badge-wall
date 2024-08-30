import * as si from "simple-icons";
import { titleToSlug } from "simple-icons/sdk";
import { colorsForBackground } from "./vendor/badge-maker-color.js";
import path from "node:path";

const baseUrl = "https://img.shields.io/badge";
const icons = Object.values(si);
const projectRoot = path.join(import.meta.dirname, "..");
const readmeFile = path.join(projectRoot, "README.md");

const iconLines: string[] = [];
for (const icon of icons) {
  const { title, hex } = icon;
  const slug = icon.slug ?? titleToSlug(title);
  const logoColor = colorsForBackground("#" + hex);
  const uri = "/" + [title, hex].join("-");
  const url = new URL(baseUrl + uri);
  const query = new URLSearchParams({
    logo: slug,
    logoColor,
    style: "flat-square",
  }).toString();
  url.search = query;
  iconLines.push(`![${title}](${url})`);
}

const readme = await Bun.file(readmeFile).text();
await Bun.write(
  readmeFile,
  readme
    .replaceAll(/!\[\]\(.+\)\n/g, "")
    .replace("\n".repeat(3), "\n\n" + iconLines.join("\n") + "\n\n")
);
