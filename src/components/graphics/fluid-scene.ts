import {
  BufferAttribute,
  BufferGeometry,
  Camera,
  GLSL3,
  Mesh,
  NoBlending,
  RawShaderMaterial,
  Scene,
  Vector2,
  Vector3,
  type IUniform,
} from 'three';
import { fluidVertexShader, fluidFragmentShader } from './fluid-shaders';
import { createSceneRenderer, type CanvasScene } from './three-renderer';
import { visibleScissor } from './visible-scissor';

/** Three.js owns a full-screen triangle, shader program, flow texture and GPU resources. */
export function createFluidScene(canvas: HTMLCanvasElement): CanvasScene | null {
  const renderer = createSceneRenderer(canvas);
  if (!renderer) return null;
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
  );
  const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;
  const uniforms: Record<string, IUniform> = {
    u_time: { value: 0 },
    u_resolution: { value: new Vector2(1, 1) },
    u_offset: { value: new Vector2(-1.24, -0.48) },
    u_lightPos: { value: new Vector2(0.89, 0.46) },
  };
  Object.entries({
    scale: 1.19,
    grain: 0.005,
    distortBoost: 2.2,
    swirlBoost: 0.8,
    glowIntensity: 0.13,
    lightCore: coarse ? 0 : 0.14,
    lightHalo: coarse ? 0 : 0.2,
    vignette: 0.38,
    bloomThreshold: 0.61,
    bloomRange: 0.18,
    bloomStrength: 0.4,
  }).forEach(([name, value]) => {
    uniforms[`u_${name}`] = { value };
  });
  Object.entries({
    c1: '#000000',
    c2: '#000000',
    c3: '#204a7e',
    c4: '#cec8bb',
    c5: '#000000',
    glowColor1: '#fff7d1',
    glowColor2: '#538dca',
    glowColor3: '#2d448b',
  }).forEach(([name, hex]) => {
    // Raw shader colors retain the reference values, without sRGB-to-linear conversion.
    uniforms[`u_${name}`] = {
      value: new Vector3(
        parseInt(hex.slice(1, 3), 16) / 255,
        parseInt(hex.slice(3, 5), 16) / 255,
        parseInt(hex.slice(5, 7), 16) / 255,
      ),
    };
  });
  const material = new RawShaderMaterial({
    vertexShader: fluidVertexShader.replace('#version 300 es\n', ''),
    fragmentShader: fluidFragmentShader.replace('#version 300 es\n', ''),
    glslVersion: GLSL3,
    uniforms,
    depthTest: false,
    depthWrite: false,
    blending: NoBlending,
    toneMapped: false,
  });
  const scene = new Scene();
  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  const camera = new Camera();
  const clip = visibleScissor(renderer, canvas);
  return {
    ready: renderer.compileAsync(scene, camera).then(() => undefined),
    resize(width, height) {
      renderer.setSize(width, height, false);
      clip.invalidate();
      uniforms.u_resolution.value.set(width, height);
    },
    draw(elapsed) {
      clip.update();
      uniforms.u_time.value = elapsed * 0.17;
      renderer.render(scene, camera);
    },
    dispose() {
      clip.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
