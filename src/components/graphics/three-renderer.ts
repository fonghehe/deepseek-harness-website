import { WebGLRenderer } from 'three';

export interface CanvasScene {
  ready: Promise<void>;
  resize(width: number, height: number): void;
  draw(elapsed: number): void;
  dispose(): void;
}

/** Both scenes share CSS-pixel resolution; no DPR multiplication or extra render loop. */
export function createSceneRenderer(canvas: HTMLCanvasElement, premultipliedAlpha = false) {
  try {
    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      premultipliedAlpha,
      powerPreference: 'low-power',
    });
    // The renderer defaults to DPR 1; avoid a redundant drawing-buffer resize.
    renderer.debug.checkShaderErrors = process.env.NODE_ENV !== 'production';
    renderer.setClearColor(0, 0);
    return renderer;
  } catch {
    // The CSS background remains visible when WebGL is unavailable.
    return null;
  }
}
