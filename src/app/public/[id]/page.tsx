"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../../../services/supabase";
import Link from "next/link";
import Loading from "../../../../components/Loading";

export default function PublicProfile() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (id) {
      fetchPublicData();
    }
  }, [id]);

  const fetchPublicData = async () => {
    try {
      setLoading(true);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, bio, linkedin")
        .eq("id", id)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);

      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("profile_id", id);

      if (projectsError) throw projectsError;

      setProjects(projectsData);
    } catch (error: any) {
      console.error("Error fetching public data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (!profile) return <div>Perfil no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="relative bg-blue-600 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-700 opacity-90"></div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Mi Portafolio
          </h1>
          <p className="mt-4 text-xl font-medium">
            Proyectos que destacan mi experiencia profesional
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-white text-blue-600 px-5 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Ver Proyectos
            </a>
            <a
              href="#contact"
              className="bg-gray-700 px-5 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Contacto
            </a>
            <button
                onClick={() => history.back()}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Volver
              </button>
          </div>
        </div>
      </header>

      {/* Toggle View Mode */}
      <div className="mb-6 flex justify-end px-8 mt-4">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-3 rounded-l ${
            viewMode === "grid" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          aria-label="Grid View"
        >
          <span>🔲</span>
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-3 rounded-r ${
            viewMode === "list" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          aria-label="List View"
        >
          <span>📋</span>
        </button>
      </div>

      {/* Projects Section */}
      <section className="px-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Proyectos</h2>
        {projects.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 bg-white rounded shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col"
                >
                  <img
                    src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
                    alt={project.name}
                    className="mb-4 w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="text-gray-600 mb-4 text-ellipsis line-clamp-3">
                    {project.description}
                  </p>
                  <Link href={`/project/detail/${project.id}`} className="mt-auto py-2 px-4 bg-blue-600 text-white text-center rounded hover:bg-blue-700">
                    Ver más
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-white rounded shadow-md flex items-start space-x-4 hover:shadow-lg transition"
                >
                  <img
                    src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
                    alt={project.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">¡Conectemos!</h2>
          <p className="mt-4">¿Interesado en mis proyectos? Contáctame:</p>
          <div className="mt-4 space-x-4">
            <a
              href={profile.linkedin}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
