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
