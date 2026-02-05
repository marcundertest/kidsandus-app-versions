import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Kids&Us Apps Versions Dashboard';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #334155)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 'bold',
          marginBottom: 20,
          background: 'linear-gradient(to right, #ffffff, #94a3b8)',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Kids&Us
      </div>
      <div style={{ fontSize: 80, fontWeight: 'bold' }}>Apps Versions</div>
      <div style={{ fontSize: 32, marginTop: 40, opacity: 0.8, fontWeight: 'normal' }}>
        Real-time Version Dashboard
      </div>
    </div>,
    {
      ...size,
    }
  );
}
