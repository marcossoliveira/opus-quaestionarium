import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'Questionário Socioeconômico – Coral Opus Liberi',
  description:
    'Formulário socioeconômico para coralistas do Coral Opus Liberi. Suas respostas ajudam a planejar ações de inclusão e apoio.',
  icons: { icon: '/opusliberi-logo.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaff' },
    { media: '(prefers-color-scheme: dark)', color: '#100b1f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
