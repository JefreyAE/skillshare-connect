import ProtectedRoute from "../../../../../components/ProtectedRoute"; 

export default function RootLayout({
  children, // Aquí se renderizan las páginas
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
