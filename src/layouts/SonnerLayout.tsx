import { Toaster } from '@/components/ui/sonner'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
