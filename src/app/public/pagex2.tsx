"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase";

export default function PublicPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchPublicProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*"); // Solo proyectos públicos

      if (error) console.error("Error fetching public projects:", error);
      else setProjects(data || []);
    };

    fetchPublicProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">Mi Portafolio</h1>
        <p className="mt-4 text-xl">Proyectos que destacan mi experiencia profesional</p>
      </header>

      {/* Projects Section */}
      <section className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded shadow-md hover:shadow-lg transition"
          >
            <img
              src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
              alt={project.name}
              className="w-full h-40 object-cover rounded-t"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">{project.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
              <div className="mt-4 flex justify-between">
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Código
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Ver Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">¡Conectemos!</h2>
          <p className="mt-4">¿Interesado en mis proyectos? Contáctame:</p>
          <div className="mt-4 space-x-4">
            <a
              href="https://linkedin.com/in/tu-perfil"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              href="mailto:tu-email@example.com"
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
