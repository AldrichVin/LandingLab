export const COLORS = {
  sky: '#b0bec5',
  skyLight: '#cfd8dc',
  skyDark: '#78909c',
  cloudSlate: '#90a4ae',
  cloudCream: '#d7ccc8',
  cloudSteel: '#a0aab0',
  ink: '#1a2332',
  inkLight: '#4a5568',
  glass: 'rgba(255,255,255,0.55)',
  glassBorder: 'rgba(255,255,255,0.25)',
  cardBg: 'rgba(255,255,255,0.6)',
} as const;

export const TYPOGRAPHY = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
} as const;

export const TIMING = {
  cloudDriftSlow: 40,
  cloudDriftFast: 20,
  heroEntrance: 0.8,
  cardStagger: 0.08,
  transitionOverlay: 450,
  emptyStateBob: 4,
} as const;

export const SCENE = {
  shapeCount: 7,
  bloomIntensity: 0.3,
  ambientLight: 0.6,
  cameraParallaxRange: 1.5,
} as const;

export const SPRINGS = {
  snappy: { stiffness: 400, damping: 30 },
  smooth: { stiffness: 200, damping: 28, mass: 0.8 },
  gentle: { stiffness: 120, damping: 20, mass: 1 },
  cursor: { stiffness: 400, damping: 40, mass: 0.2 },
  cursorRing: { stiffness: 200, damping: 30, mass: 0.5 },
} as const;

export const EASINGS = {
  snappyDecel: [0.22, 1, 0.36, 1] as const,
  sharpInOut: [0.76, 0, 0.24, 1] as const,
} as const;

export const CAROUSEL = {
  cardWidth: 320,
  cardGap: 40,
  perspective: 1200,
  depthPerStep: 80,
  rotationPerStep: 8,
  scalePerStep: 0.12,
  opacityPerStep: 0.2,
  dragThreshold: 50,
} as const;

export const CURSOR = {
  dotSize: 8,
  ringSize: 40,
  magneticRange: 80,
  magneticStrength: 0.3,
} as const;

export const ZINDEX = {
  background: 0,
  cloudsFar: 1,
  cloudsMid: 5,
  content: 10,
  pageViewer: 20,
  ambientFrame: 25,
  cloudsNear: 30,
  backButton: 40,
  scrollProgress: 45,
  navbar: 50,
  transitionOverlay: 60,
  cursor: 70,
} as const;
