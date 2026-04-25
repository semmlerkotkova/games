import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hry pro děti",
  description: "AI generátor interaktivních her pro děti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-amber-50">
        <header className="bg-amber-400 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-amber-900">🎲 Hry pro děti</h1>
            <p className="text-sm text-amber-800">AI generátor her na cesty</p>
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
