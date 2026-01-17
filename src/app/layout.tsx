import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-ticaret Yönetim Paneli',
  description: 'Modern e-ticaret yönetim sistemi - Ürün ve sipariş yönetimi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto lg:ml-0">
            <div className="lg:pl-0 pl-0">
              <div className="pt-16 lg:pt-0">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}