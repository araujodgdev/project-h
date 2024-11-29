import type { Metadata } from "next";
import "./globals.css";




export const metadata: Metadata = {
  title: "Project H",
  description: "Sua plataforma exclusiva para compartilhar ideias e colaborar com colegas da universidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased overflow-x-hidden h-screen scroll-smooth`}
      >
        {children}
      </body>
    </html>
  );
}
