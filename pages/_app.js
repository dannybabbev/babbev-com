import '../styles/global.css';
import { Analytics } from '@vercel/analytics/react';
import { Ubuntu_Mono } from 'next/font/google'

const ubuntuMono = Ubuntu_Mono({ 
    subsets: ['latin'],
    weight: '400',
 });

export default function App({ Component, pageProps }) {

    return (
        <main className={ubuntuMono.className}>
            <Component {...pageProps} /> 
            <Analytics />
        </main>
    )
}