export default function BackgroundScene() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(180deg, #90a4ae 0%, #b0bec5 40%, #cfd8dc 100%)',
      }}
    />
  );
}
