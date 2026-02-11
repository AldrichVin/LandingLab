export const COLORS = {
  sky: '#c4bde0',
  skyLight: '#d8d0e8',
  skyDark: '#9890b8',
  cloudPink: '#e8a0b8',
  cloudCream: '#f5e8d0',
  cloudYellow: '#f0e0b0',
  ink: '#2a2450',
  inkLight: '#5c5480',
  glass: 'rgba(255,255,255,0.65)',
  glassBorder: 'rgba(255,255,255,0.3)',
  cardBg: 'rgba(255,255,255,0.7)',
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
