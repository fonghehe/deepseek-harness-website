import {
  BoxGeometry,
  Camera,
  GLSL3,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  RawShaderMaterial,
  Scene,
} from 'three';
import { tileShape } from './tile-shape';
import { createSceneRenderer, type CanvasScene } from './three-renderer';

const vertexSource = `#version 300 es
in vec3 position;
in vec3 target;
in vec3 scattered;
in float opacity;
in float index;
in float scale;
uniform float time;
uniform float gather;
uniform float angle;
uniform float aspect;
out float weight;
void main(){
  float g=smoothstep(0.,1.,gather);
  vec3 p=mix(scattered,target,g)+position*scale;
  float f=mix(.2,.06,g);
  p+=vec3(sin(time*.5+index*.1),cos(time*.4+index*.07),sin(time*.3+index*.13)*.7)*f;
  float rx=.03*sin(.15*time), ry=.05*sin(.2*time);
  // XYZ Euler rotation: local Z, then Y, then X (the original scene's group matrix).
  p=vec3(p.x*cos(angle)-p.y*sin(angle),p.x*sin(angle)+p.y*cos(angle),p.z);
  p=vec3(p.x*cos(ry)+p.z*sin(ry),p.y,-p.x*sin(ry)+p.z*cos(ry));
  p=vec3(p.x,p.y*cos(rx)-p.z*sin(rx),p.y*sin(rx)+p.z*cos(rx));
  p.y+=.1*sin(.3*time);
  p.z-=22.;
  float focal=1./tan(radians(25.));
  gl_Position=vec4(p.x*focal/aspect,p.y*focal,-1.0002*p.z-.20002,-p.z);
  weight=opacity;
}`;
const fragmentSource = `#version 300 es
precision highp float;
in float weight;
uniform float time;
uniform float gather;
out vec4 color;
void main(){float shimmer=sin(time*1.2+weight*10.)*.1+.9;float alpha=weight*shimmer*mix(.8,1.2,gather)*min(1.,time*.7);color=vec4(.55,.6,.75,alpha);}`;

/** One instanced Three.js mesh gathers translucent tiles into the authored mark. */
export function createTileScene(canvas: HTMLCanvasElement): CanvasScene | null {
  const renderer = createSceneRenderer(canvas, true);
  if (!renderer) return null;
  const source = new BoxGeometry(0.05, 0.05, 0.015);
  const box = source.toNonIndexed();
  source.dispose();
  const geometry = new InstancedBufferGeometry();
  geometry.setAttribute('position', box.getAttribute('position'));
  box.dispose();
  geometry.instanceCount = tileShape.length;
  const attribute = (name: string, values: number[], size: number) => {
    geometry.setAttribute(name, new InstancedBufferAttribute(new Float32Array(values), size));
  };
  attribute(
    'target',
    tileShape.flatMap(([x, y]) => [(x - 12) * 0.18, (12 - y) * 0.18, 0]),
    3,
  );
  attribute(
    'scattered',
    tileShape.flatMap(() => {
      const angle = Math.random() * Math.PI * 2,
        polar = Math.acos(2 * Math.random() - 1),
        radius = 5 * (0.5 + 0.5 * Math.random());
      return [
        Math.sin(polar) * Math.cos(angle) * radius,
        Math.sin(polar) * Math.sin(angle) * radius,
        Math.cos(polar) * radius * 0.4,
      ];
    }),
    3,
  );
  attribute(
    'opacity',
    tileShape.map(([, , value]) => 0.25 + 0.55 * value),
    1,
  );
  attribute(
    'index',
    tileShape.map((_, index) => index),
    1,
  );
  attribute(
    'scale',
    tileShape.map(() => 0.5 + Math.random()),
    1,
  );
  const uniforms = {
    time: { value: 0 },
    gather: { value: 0 },
    angle: { value: 0 },
    aspect: { value: 1 },
  };
  const material = new RawShaderMaterial({
    vertexShader: vertexSource.replace('#version 300 es\n', ''),
    fragmentShader: fragmentSource.replace('#version 300 es\n', ''),
    glslVersion: GLSL3,
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const scene = new Scene();
  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  const camera = new Camera();
  let previous = 0;
  let dirty = true;
  let progress = 0;
  const invalidate = () => {
    dirty = true;
  };
  window.addEventListener('scroll', invalidate, { passive: true });
  window.addEventListener('resize', invalidate, { passive: true });
  return {
    ready: renderer.compileAsync(scene, camera).then(() => undefined),
    resize(width, height) {
      dirty = true;
      renderer.setSize(width, height, false);
      uniforms.aspect.value = width / height;
    },
    draw(elapsed) {
      const delta = Math.min(0.1, elapsed - previous);
      previous = elapsed;
      if (dirty) {
        const rect = canvas.getBoundingClientRect();
        progress = Math.min(1, Math.max(0, 1 - (rect.top + rect.height * 0.5) / innerHeight));
        dirty = false;
      }
      uniforms.gather.value += (progress - uniforms.gather.value) * Math.min(1, 2.5 * delta);
      uniforms.angle.value += 0.06 * (1 - 0.5 * uniforms.gather.value) * delta;
      uniforms.time.value = elapsed;
      renderer.render(scene, camera);
    },
    dispose() {
      window.removeEventListener('scroll', invalidate);
      window.removeEventListener('resize', invalidate);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
