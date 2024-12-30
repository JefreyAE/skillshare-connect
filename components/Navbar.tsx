'use client';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-300">
          SkillShare Connect
        </Link>

        {/* Menú principal */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-white hover:text-gray-300"
              >
                Dashboard
              </Link>
              <Link
                href={`/public/${user.id}`}
                className="text-white hover:text-gray-300"
              >
                Mi perfil
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
