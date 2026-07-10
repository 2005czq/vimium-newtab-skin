import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { transform } from "lightningcss";

const [input = "style.css", output = "style.min.css"] = process.argv.slice(2);
const inputPath = resolve(input);
const outputPath = resolve(output);
const source = await readFile(inputPath);
const result = transform({
  filename: inputPath,
  code: source,
  minify: true,
});

await writeFile(outputPath, result.code);
console.log(`${input}: ${source.byteLength} bytes -> ${output}: ${result.code.byteLength} bytes`);
