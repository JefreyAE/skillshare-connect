
export default function RootLayout({
  children, // Aquí se renderizan las páginas
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
