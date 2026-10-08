import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data/site";
export const metadata: Metadata = {title:`${profile.name} — Portfolio`,description:profile.description,robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
