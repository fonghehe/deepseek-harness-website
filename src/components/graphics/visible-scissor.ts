import type { WebGLRenderer } from 'three';

/** Preserve full-canvas coordinates while shading only visible pixels (plus blur overscan). */
export function visibleScissor(renderer: WebGLRenderer, canvas: HTMLCanvasElement) {
  let dirty = true;
  const invalidate = () => {
    dirty = true;
  };
  window.addEventListener('scroll', invalidate, { passive: true });
  window.addEventListener('resize', invalidate, { passive: true });
  renderer.setScissorTest(true);
  return {
    invalidate,
    update() {
      if (!dirty) return;
      const rect = canvas.getBoundingClientRect();
      const left = Math.max(0, Math.floor(-rect.left - 32));
      const top = Math.max(0, Math.floor(-rect.top - 32));
      const right = Math.min(canvas.width, Math.ceil(innerWidth - rect.left + 32));
      const bottom = Math.min(canvas.height, Math.ceil(innerHeight - rect.top + 32));
      renderer.setScissor(
        left,
        canvas.height - bottom,
        Math.max(0, right - left),
        Math.max(0, bottom - top),
      );
      dirty = false;
    },
    dispose() {
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
    },
  };
}
