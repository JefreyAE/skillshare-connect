'use client';

import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabase';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) console.error(error);
        else setProfile(data);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 text-xl font-bold">SkillShare Connect</div>
        <nav className="flex-1 px-4 py-6">
          <ul>
            <li className="mb-4">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <Link
                href="/profile"
                className="block py-2 px-4 rounded hover:bg-gray-700"
              >
                Perfil
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">
                Configuración
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Bienvenido, {profile?.full_name}
          </h1>
          <button className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">
            Nuevo Proyecto
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-bold">Proyecto {idx + 1}</h2>
              <p className="text-gray-600">Descripción breve del proyecto.</p>
              <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                Ver Detalles
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
