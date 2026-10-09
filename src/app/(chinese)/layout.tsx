import '@/components/styles/harness.css';

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
