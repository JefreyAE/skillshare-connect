"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfileAndProjects = async () => {
      if (user) {
        try {
          // Obtén el perfil del usuario
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profileError) throw profileError;

          setProfile(profileData);

          // Obtén los proyectos asociados al usuario
          const { data: projectData, error: projectError } = await supabase
            .from("projects")
            .select("*")
            .eq("profile_id", user.id); // Relaciona por el ID del usuario

          if (projectError) throw projectError;

          setProjects(projectData);
        } catch (error) {
          console.error("Error fetching profile or projects:", error);
        }
      }
    };

    fetchProfileAndProjects();
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
          <Link
            href={"/project/create"}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Proyecto
          </Link>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[calc(100vh-100px)] overflow-y-auto">
  {projects.length > 0 ? (
    projects.map((project) => (
      <div
        key={project.id}
        className="p-6 bg-white rounded shadow-md hover:shadow-lg flex flex-col"
      >
        <img
          src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
          alt={project.name}
          className="mb-4 w-full h-40 object-cover rounded"
        />
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p className="text-gray-600 mb-4 flex-1 overflow-hidden text-ellipsis line-clamp-3">
          {project.description}
        </p>
        <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Ver Detalles
        </button>
      </div>
    ))
  ) : (
    <p className="text-gray-600">No tienes proyectos aún.</p>
  )}
</section>

      </main>
    </div>
  );
}
