import path from 'path';
import { defineConfig } from 'vite';

const inputDir = path.resolve(__dirname, 'src');
const globalAny = globalThis as typeof globalThis & {
  uniPlugin?: {
    options: Record<string, unknown>;
    preprocess: { vueContext: Record<string, unknown>; nvueContext: Record<string, unknown> };
    platforms: Record<string, unknown>;
    inputDir: string;
  };
};

globalAny.uniPlugin =
  globalAny.uniPlugin ??
  {
    options: {},
    preprocess: {
      vueContext: {},
      nvueContext: {},
    },
    platforms: {},
    inputDir,
  };

process.env.UNI_INPUT_DIR = inputDir;

export default defineConfig(async () => {
  const uniModule = await import('@dcloudio/vite-plugin-uni');
  const uni = (uniModule as { default?: { default?: () => unknown } }).default?.default ??
    (uniModule as { default?: () => unknown }).default ??
    (uniModule as unknown as () => unknown);

  return {
    root: 'src',
    plugins: [uni()],
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
  };
});