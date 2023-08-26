import '../styles/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Ubuntu_Mono } from 'next/font/google'

const ubuntuMono = Ubuntu_Mono({ 
    subsets: ['latin'],
    weight: '400',
});

export const metadata = {
    icons: {
      icon: '/favicon.ico',
    },
    title: 'BabbevOS',
    description: 'Personal website of Daniel Babbev',
    openGraph: {
      title: 'BabbevOS',
      images: '/og-image.png',
      description: 'Personal website of Daniel Babbev',
    },
}

export default function RootLayout({
    children,
  }) {
    return (
      <html lang="en">
        <body>
            <main className={ubuntuMono.className}>
                {children}
            </main>
            <Analytics />
        </body>
      </html>
    )
}