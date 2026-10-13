// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://agent-md.loclv.com',
	integrations: [
		starlight({
			title: 'agent-md',
			description: 'A CLI that helps you write LLM-friendly markdown',
			logo: {
				src: './src/assets/logo.svg',
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/loclv/agent-md' },
			],
			editLink: {
				baseUrl: 'https://github.com/loclv/agent-md-docs/edit/main/',
			},
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'CLI Usage Guide', slug: 'guides/cli-usage' },
						{ label: 'LLM & Agent Integration', slug: 'guides/llm-agent-integration' },
						{ label: 'Markdown Writing Rules', slug: 'guides/markdown-writing-rules' },
						{ label: 'Configuration Guide', slug: 'guides/configuration' },
						{ label: 'VS Code Extension', slug: 'guides/vscode-extension' },
						{ label: 'Formatting Examples', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Command Reference', slug: 'reference/commands' },
						{ label: 'Validation Rules', slug: 'reference/rules' },
						{ label: 'Configuration Reference', slug: 'reference/configuration' },
						{ label: 'Rust Library API', slug: 'reference/rust-api' },
						{ label: 'Quick Cheat Sheet', slug: 'reference/example' },
					],
				},
				{
					label: 'Developer',
					items: [
						{ label: 'Architecture & SIMD', slug: 'developer/architecture' },
					],
				},
			],
		}),
	],
});
