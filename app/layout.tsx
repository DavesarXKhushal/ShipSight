import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ShipSight - Smart Barcode-Linked Video Proof for Ecommerce',
  description: 'Revolutionary video management system that automatically links packing videos to order barcodes. Reduce return fraud and protect your ecommerce business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
