import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-static';

export async function GET() {
  const brand = await readFile(path.join(process.cwd(), 'public/brand/brand.png'));
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        background: '#0d0e13',
        color: '#f5f6fa',
        fontFamily: 'sans-serif',
      }}
    >
      <img
        src={`data:image/png;base64,${brand.toString('base64')}`}
        width={450}
        height={147}
        alt="DeepSeek"
      />
      <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, marginTop: 40 }}>
        DeepSeek Harness
      </div>
      <div style={{ display: 'flex', fontSize: 30, color: '#aeb5c8', marginTop: 24 }}>
        Plugins. Productivity. Possibility.
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
