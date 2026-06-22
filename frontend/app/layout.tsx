import type { Metadata } from "next";
import { AuthProvider } from "@/modules/auth/View/contexts/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vértice Company",
  description: "Clothing Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
