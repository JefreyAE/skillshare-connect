'use client';
import { useParams } from 'next/navigation'; 
import { useEffect, useState } from 'react';
import { supabase } from '../../../../services/supabase'; 

export default function PublicProfile() {
  const params = useParams<{ id: string }>();
  const id = params?.id; // Obtén el identificador de la URL

  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // 'grid' para diseño actual, 'list' para diseño anterior

  useEffect(() => {
    if (id) {
      fetchPublicData();
    }
  }, [id]);

  const fetchPublicData = async () => {
    try {
      setLoading(true);

      // Obtén la información del perfil
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, bio, linkedin')
        .eq('id', id)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);

      // Obtén los proyectos asociados al perfil
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', id); // Filtra por el ID del perfil

      if (projectsError) throw projectsError;

      setProjects(projectsData);
    } catch (error: any) {
      console.error('Error fetching public data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  if (!profile) return <div>Perfil no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100">
       <header className="bg-blue-600 text-white text-center py-10">
        <h1 className="text-4xl font-bold">Mi Portafolio</h1>
        <p className="mt-4 text-xl">Proyectos que destacan mi experiencia profesional</p>
      </header>
     

      <div className="mb-6 flex justify-end m-6">
        <button
          onClick={() => setViewMode('grid')}
          className={`py-2 px-4 rounded-l ${
            viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`py-2 px-4 rounded-r ${
            viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          List View
        </button>
      </div>

      <section className="m-8">
        <h2 className="text-2xl font-bold mb-6">Proyectos</h2>
        {projects.length > 0 ? (
          viewMode === 'grid' ? (
            // Diseño actual (Grid View)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 bg-white rounded shadow-md hover:shadow-lg flex flex-col"
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
                </div>
              ))}
            </div>
          ) : (
            // Diseño anterior (List View)
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-white rounded shadow-md flex items-start space-x-4"
                >
                  <img
                    src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
                    alt={project.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="text-gray-600">No hay proyectos disponibles.</p>
        )}
      </section>
       {/* Contact Section */}
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
