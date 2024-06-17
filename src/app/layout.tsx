import './globals.css'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'
import React, { ReactNode } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Zlagoda',
  description: 'v. 1.0.0',
}

export default function RootLayout({ children }: { children: ReactNode } ) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  )
}


