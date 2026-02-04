import fs from "node:fs/promises";
import path from "node:path";

const FIGMA_TOKEN =
	process.env.FIGMA_TOKEN || process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_PAGE = process.env.FIGMA_PAGE;
const FIGMA_FRAME_PREFIX = process.env.FIGMA_FRAME_PREFIX || "";
const OUT_DIR = path.resolve(
	process.env.FIGMA_OUT_DIR || "..", // roxy_web/
	"..",
	"export_roxy_web_montazh",
	"svg"
);

if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
	console.error(
		"Missing FIGMA_TOKEN/FIGMA_PERSONAL_ACCESS_TOKEN or FIGMA_FILE_KEY."
	);
	process.exit(1);
}

async function figmaFetch(endpoint) {
	const res = await fetch(`https://api.figma.com/v1/${endpoint}`, {
		headers: {
			"X-Figma-Token": FIGMA_TOKEN,
		},
	});
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`Figma API error ${res.status}: ${text}`);
	}
	return res.json();
}

function sanitizeName(name) {
	return name
		.trim()
		.replace(/[\s]+/g, "_")
		.replace(/[\\/]+/g, "__")
		.replace(/[^\w.-]+/g, "_");
}

function collectPages(document) {
	return (document.children || []).filter((node) => node.type === "CANVAS");
}

function collectTopLevelFrames(page) {
	return (page.children || []).filter((node) =>
		["FRAME", "COMPONENT", "COMPONENT_SET"].includes(node.type)
	);
}

async function exportFrameSvg(frame, pageName) {
	const imageResp = await figmaFetch(
		`images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(frame.id)}&format=svg&svg_include_id=true&svg_outline_text=false`
	);
	const url = imageResp.images?.[frame.id.replace("-", ":")];
	if (!url) {
		throw new Error(`No SVG URL for node ${frame.id}`);
	}

	const svgRes = await fetch(url);
	if (!svgRes.ok) {
		const text = await svgRes.text().catch(() => "");
		throw new Error(`SVG download failed ${svgRes.status}: ${text}`);
	}
	const svg = await svgRes.text();

	const pageSafe = sanitizeName(pageName);
	const frameSafe = sanitizeName(frame.name);
	const filename = `${pageSafe}__${frameSafe}.svg`;
	const outPath = path.join(OUT_DIR, filename);
	await fs.writeFile(outPath, svg, "utf8");
	return { filename, id: frame.id, name: frame.name, page: pageName };
}

async function main() {
	await fs.mkdir(OUT_DIR, { recursive: true });

	const file = await figmaFetch(`files/${FIGMA_FILE_KEY}`);
	const pages = collectPages(file.document);
	const filteredPages = FIGMA_PAGE
		? pages.filter((p) => p.name === FIGMA_PAGE)
		: pages;

	if (!filteredPages.length) {
		throw new Error(
			FIGMA_PAGE
				? `Page not found: ${FIGMA_PAGE}`
				: "No pages found in file."
		);
	}

	const results = [];

	for (const page of filteredPages) {
		const frames = collectTopLevelFrames(page).filter((frame) =>
			FIGMA_FRAME_PREFIX ? frame.name.startsWith(FIGMA_FRAME_PREFIX) : true
		);

		for (const frame of frames) {
			const exported = await exportFrameSvg(frame, page.name);
			results.push(exported);
			process.stdout.write(`Exported: ${exported.filename}\n`);
		}
	}

	const manifestPath = path.join(OUT_DIR, "manifest.json");
	await fs.writeFile(manifestPath, JSON.stringify(results, null, 2), "utf8");
	process.stdout.write(`\nDone. Manifest: ${manifestPath}\n`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
