import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse 60% 60% at 50% 0%, #032c33, #040c15)',
        color: '#e8f0f3',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, display: 'flex' }}>
        Desenvolve<span style={{ color: '#00bdbe' }}>Tech</span>
      </div>
      <div style={{ marginTop: 24, fontSize: 32, color: '#7e939f', display: 'flex' }}>
        Desenvolvendo soluções tecnológicas
      </div>
    </div>,
    { ...size },
  );
}
