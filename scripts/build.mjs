import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const [blockly, blocks, messages, customBlocks, generator, importer, app, markup, styles, component] = await Promise.all([
  "node_modules/blockly/blockly_compressed.js", "node_modules/blockly/blocks_compressed.js",
  "node_modules/blockly/msg/en.js", "src/actr-blocks.js", "src/actr-generator.js",
  "src/actr-lisp-importer.js", "src/app.js", "src/editor.html", "styles.css", "src/blockly-act-r.js",
].map(read));

// Blockly 10 uses a shared sprite and CSS cursor URLs. Inline these at build time
// so copying the single ESM file also copies every runtime asset.
const assets = {};
for (const [name, mime] of Object.entries({ "sprites.png": "image/png", "handdelete.cur": "image/x-icon", "handclosed.cur": "image/x-icon" })) {
  const data = await readFile(new URL(`node_modules/blockly/media/${name}`, root));
  assets[name] = `data:${mime};base64,${data.toString("base64")}`;
}
const spriteExpression = "this.workspace.options.pathToMedia+SPRITE$$module$build$src$core$sprites.url";
if (blockly.split(spriteExpression).length !== 6) throw new Error("Blockly sprite references changed; review asset inlining.");
let bundledBlockly = blockly.replaceAll(spriteExpression, JSON.stringify(assets["sprites.png"]));
for (const [name, uri] of Object.entries(assets)) bundledBlockly = bundledBlockly.replaceAll(`<<<PATH>>>/${name}`, uri);

const runtime = [bundledBlockly, blocks, messages, customBlocks, generator, importer, app]
  .map((source) => source.replace(/^\/\/# sourceMappingURL=.*$/gm, ""))
  .join("\n;\n")
  .replace(/<\/script/gi, "<\\/script");
const document = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blockly ACT-R</title><style>${styles}</style></head><body>${markup}<script>
/* ACTR_COMPONENT_CONFIG */
try {\n${runtime}\n} catch (error) { window.ACTREditorBootError = error.message; }
</script></body></html>`;

await mkdir(new URL("dist/", root), { recursive: true });
await writeFile(new URL("dist/blockly-act-r.js", root), `// Includes Blockly 10.4.3 (Apache-2.0); see THIRD_PARTY_NOTICES.txt.\nconst EDITOR_DOCUMENT = ${JSON.stringify(document)};\n${component}`);
await Promise.all([
  copyFile(new URL("src/blockly-act-r.d.ts", root), new URL("dist/blockly-act-r.d.ts", root)),
  copyFile(new URL("THIRD_PARTY_NOTICES.txt", root), new URL("dist/THIRD_PARTY_NOTICES.txt", root)),
]);
console.log(`Built ${fileURLToPath(new URL("dist/blockly-act-r.js", root))}`);
