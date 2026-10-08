import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"KREV1 — DECADE Project Driver",description:"An interactive single-page project portfolio. Open the driver, insert a project card, and transform to explore the work.",robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
