
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../css/global.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cubospresso",
  description: "Cubospresso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="pt-BR">
      <body className={inter.className}> 
        <AuthProvider>
          <CartProvider>
            <Header />  
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
