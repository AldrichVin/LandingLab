import { motion, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/shared/hooks/useReducedMotion';
import { useMouseParallax } from '@/shared/hooks/useMouseParallax';
import { COLORS, TIMING } from '@/shared/design-tokens';

interface CloudConfig {
  readonly color: string;
  readonly width: number;
  readonly top: string;
  readonly startX: number;
  readonly duration: number;
  readonly opacity: number;
  readonly zIndex: number;
  readonly blur: number;
  readonly scale: number;
  readonly parallaxStrength: number;
}

const PARALLAX_BY_LAYER = { far: 10, mid: 20, near: 35 } as const;

const CLOUDS: readonly CloudConfig[] = [
  // Far layer — slow, translucent, blurred
  { color: COLORS.cloudCream, width: 320, top: '8%', startX: -100, duration: TIMING.cloudDriftSlow, opacity: 0.35, zIndex: 1, blur: 2, scale: 1, parallaxStrength: PARALLAX_BY_LAYER.far },
  { color: COLORS.cloudSlate, width: 280, top: '18%', startX: 800, duration: 38, opacity: 0.3, zIndex: 1, blur: 3, scale: 0.9, parallaxStrength: PARALLAX_BY_LAYER.far },
  { color: COLORS.cloudSteel, width: 240, top: '65%', startX: -200, duration: 36, opacity: 0.25, zIndex: 1, blur: 2, scale: 0.8, parallaxStrength: PARALLAX_BY_LAYER.far },

  // Mid layer
  { color: COLORS.cloudSlate, width: 360, top: '12%', startX: 500, duration: 30, opacity: 0.5, zIndex: 5, blur: 1, scale: 1.1, parallaxStrength: PARALLAX_BY_LAYER.mid },
  { color: COLORS.cloudCream, width: 300, top: '32%', startX: -150, duration: 28, opacity: 0.45, zIndex: 5, blur: 0, scale: 1, parallaxStrength: PARALLAX_BY_LAYER.mid },
  { color: COLORS.cloudSteel, width: 220, top: '72%', startX: 600, duration: 34, opacity: 0.4, zIndex: 5, blur: 1, scale: 0.9, parallaxStrength: PARALLAX_BY_LAYER.mid },
  // Extra mid-layer clouds to fill gaps
  { color: COLORS.cloudCream, width: 260, top: '45%', startX: 300, duration: 32, opacity: 0.4, zIndex: 5, blur: 1, scale: 0.95, parallaxStrength: PARALLAX_BY_LAYER.mid },
  { color: COLORS.cloudSlate, width: 240, top: '55%', startX: -100, duration: 26, opacity: 0.35, zIndex: 5, blur: 0, scale: 1.05, parallaxStrength: PARALLAX_BY_LAYER.mid },

  // Near layer — faster, bolder, in front
  { color: COLORS.cloudSlate, width: 400, top: '5%', startX: -300, duration: TIMING.cloudDriftFast, opacity: 0.6, zIndex: 30, blur: 0, scale: 1.2, parallaxStrength: PARALLAX_BY_LAYER.near },
  { color: COLORS.cloudCream, width: 350, top: '78%', startX: 700, duration: 22, opacity: 0.55, zIndex: 30, blur: 0, scale: 1.15, parallaxStrength: PARALLAX_BY_LAYER.near },
];

function CloudSvg({ color, width }: { color: string; width: number }) {
  const height = width * 0.35;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="48" rx="90" ry="22" fill={color} />
      <ellipse cx="70" cy="38" rx="50" ry="30" fill={color} />
      <ellipse cx="130" cy="35" rx="45" ry="28" fill={color} />
      <ellipse cx="100" cy="30" rx="40" ry="25" fill={color} />
      <ellipse cx="55" cy="45" rx="35" ry="20" fill={color} />
      <ellipse cx="145" cy="42" rx="30" ry="18" fill={color} />
    </svg>
  );
}

function CloudItem({ cloud, index }: { cloud: CloudConfig; index: number }) {
  const reducedMotion = useReducedMotion();
  const { x: mouseX, y: mouseY } = useMouseParallax(!reducedMotion);
  const travelDistance = typeof window !== 'undefined' ? window.innerWidth + cloud.width + 200 : 1600;

  const parallaxX = useTransform(mouseX, (v) => v * cloud.parallaxStrength);
  const parallaxY = useTransform(mouseY, (v) => v * cloud.parallaxStrength * 0.6);

  return (
    <motion.div
      initial={{ x: cloud.startX }}
      animate={
        reducedMotion
          ? { x: cloud.startX }
          : {
              x: [cloud.startX, cloud.startX + travelDistance, cloud.startX - travelDistance / 2, cloud.startX],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: cloud.duration,
              repeat: Infinity,
              ease: 'linear',
            }
      }
      style={{
        position: 'absolute',
        top: cloud.top,
        zIndex: cloud.zIndex,
        opacity: cloud.opacity,
        filter: cloud.blur > 0 ? `blur(${cloud.blur}px)` : undefined,
        scale: cloud.scale,
        translateX: reducedMotion ? 0 : parallaxX,
        translateY: reducedMotion ? 0 : parallaxY,
      }}
    >
      <CloudSvg color={cloud.color} width={cloud.width} />
    </motion.div>
  );
}

export default function CloudLayer() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {CLOUDS.map((cloud, i) => (
        <CloudItem key={i} cloud={cloud} index={i} />
      ))}
    </div>
  );
}
