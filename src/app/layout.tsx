// src/app/layout.tsx
import { AuthProvider } from '../../context/AuthContext';
import '../../styles/globals.css';

export default function RootLayout({
  children, // Aquí se renderizan las páginas
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
