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
        background: 'radial-gradient(ellipse 60% 60% at 50% 0%, #103b38, #070c14)',
        color: '#f4f7fb',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 72, fontWeight: 700, display: 'flex' }}>
        Desenvolve<span style={{ color: '#22d3c8' }}>Tech</span>
      </div>
      <div style={{ marginTop: 24, fontSize: 32, color: '#8fa1b8', display: 'flex' }}>
        Desenvolvendo soluções tecnológicas
      </div>
    </div>,
    { ...size },
  );
}
