'use client';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between">
        <Link className="text-2xl font-bold" href="/">
          SkillShare Connect
        </Link>
        <div className="flex items-center">
          {user ? (
            <>
              <Link className="mr-4" href="/dashboard">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link className="mr-4" href="/login">
                Iniciar sesión
              </Link>
              <Link
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                href="/signup"
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
