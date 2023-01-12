import { sveltekit } from "@sveltejs/kit/vite";
import { readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { promisify } from "node:util";
import { exec as callbackExec } from "node:child_process";
import { EOL } from "node:os";
const exec = promisify(callbackExec);

export const getGitRoot = async () => {
	const { stdout, stderr } = await exec("git rev-parse --show-toplevel");

	if (stderr) {
		throw new Error(stderr);
	}

	return stdout.replaceAll(EOL, "");
};

const rootDir = await getGitRoot();
// The path for the current project, just like __dirname
const projectDir = resolve("");

const projectDepth = relative(projectDir, rootDir);

//The path is relative to the project's own svelte.config.js
const modulePaths = [`${projectDepth}/node_modules`, `${projectDepth}/libs`];

/** @type {import('vite').UserConfig} */
const config = {
	assetsInclude: ["**/*.m4a", "**/*.ogg", "**/*.aac"],
	plugins: [sveltekit()],
	server: {
		port: 3000,
		fs: {
			allow: modulePaths
		}
	},
	preview: {
		port: 3000
	},
	ssr: {
		format: "esm"
	}
};

export default config;
