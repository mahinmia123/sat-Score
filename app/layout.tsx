import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Free SAT Score Calculator 2026 | Digital SAT Score Estimator',
  description: 'Calculate your Digital SAT score instantly from raw scores — free, no signup required. Get Math & Reading/Writing section scores, percentile rankings, and college targets.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
