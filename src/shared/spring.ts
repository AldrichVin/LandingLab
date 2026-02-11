import * as THREE from 'three';

const SPRING_DAMPING = 0.15;

export function dampedLerp(current: number, target: number, delta: number, speed = SPRING_DAMPING): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta * 60));
}

export function dampedLerpV3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  delta: number,
  speed = SPRING_DAMPING,
): void {
  const factor = 1 - Math.exp(-speed * delta * 60);
  current.lerp(target, factor);
}

export function dampedLerpColor(
  current: THREE.Color,
  target: THREE.Color,
  delta: number,
  speed = SPRING_DAMPING,
): void {
  const factor = 1 - Math.exp(-speed * delta * 60);
  current.lerp(target, factor);
}
