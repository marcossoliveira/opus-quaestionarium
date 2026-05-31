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
      {/* Apply saved a11y settings synchronously to avoid flash */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var s = localStorage.getItem('a11y-size') || 'normal';
            var c = localStorage.getItem('a11y-contrast') || 'normal';
            document.documentElement.setAttribute('data-a11y-size', s);
            document.documentElement.setAttribute('data-a11y-contrast', c);
          } catch(e) {}
        `}} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
