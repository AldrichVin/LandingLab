export const COLORS = {
  void: '#0a0a1a',
  voidLight: '#141428',
  cream: '#f5f0e8',
  mauve: '#b8a9c9',
  deepBlue: '#1a1a3e',
  warmCream: '#ede4d3',
  accent: '#c9a87c',
} as const;

export const TYPOGRAPHY = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
} as const;

export const TIMING = {
  cameraFlyDuration: 800,
  overlayFadeDuration: 400,
  nodeBreathCycle: 3000,
  idleDriftSpeed: 0.15,
} as const;

export const SCENE = {
  nodeBaseRadius: 0.3,
  nodeGlowIntensity: 2,
  particleCount: 800,
  constellationRadius: 8,
  cameraDefaultDistance: 15,
  cameraMinDistance: 5,
  cameraMaxDistance: 25,
} as const;
