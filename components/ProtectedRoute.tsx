'use client'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');  // Redirige si no está autenticado
    }
  }, [user, loading, router]);

  if (loading) return <div>Cargando...</div>;

  return <>{user ? children : null}</>;
}
