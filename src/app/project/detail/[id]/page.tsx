'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../../services/supabase';
import Navbar from '../../../../../components/Navbar';
import { useAuth } from '../../../../../context/AuthContext';

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const id = params?.id; // ID del proyecto desde la URL

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setProject(data);
    } catch (error: any) {
      console.error('Error fetching project details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;

  if (!project) return <div className="flex items-center justify-center min-h-screen">Proyecto no encontrado</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
          {/* Imagen del Proyecto */}
          <div className="relative">
            <img
              src={`https://payusyyavlpnktpzchzw.supabase.co/storage/v1/object/public/projects/${project.image_url}`}
              alt={project.name}
              className="w-full h-72 object-cover"
            />
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow text-sm font-medium text-gray-800">
              {new Date(project.created_at).toLocaleDateString('es-ES')}
            </div>
          </div>

          {/* Contenido del Proyecto */}
          <div className="p-8">
            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{project.name}</h1>

            {/* Descripción */}
            <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

            {/* Detalles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Tecnologías Usadas</h2>
                <p className="text-gray-600">
                  {project.technologies ? project.technologies : 'No especificadas'}
                </p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Fecha de Creación</h2>
                <p className="text-gray-600">
                  {new Date(project.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            {/* Enlace Relacionado */}
            {project.link && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">Enlace</h2>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  {project.link}
                </a>
              </div>
            )}

            {/* Botón para Volver */}
            {user ? ( <div className="text-center">
              <button
                onClick={() => history.back()}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Volver
              </button>
            </div>) : (<></>)
            }
          </div>
        </div>
      </div>
    </>
  );
}
