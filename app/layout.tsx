import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationMenu } from '@/components/navigation/navigation-menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EventBrut - Neo-Brutalist Event Management',
  description: 'Browse and book events in a neo-brutalist aesthetic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationMenu />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-black text-white py-8 border-t-4 border-yellow-400">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="font-extrabold text-2xl">
                  EVENT<span className="text-yellow-400">BRUT</span>
                </h2>
                <p className="mt-2">Brutally simple event management.</p>
              </div>
              <div>
                <p>&copy; {new Date().getFullYear()} EventBrut. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}