'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../services/supabase';
import Navbar from '../../../components/Navbar';

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirige si no está autenticado
    } else if (user) {
      fetchUserProfile();
    }
  }, [user, loading, router]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, bio, linkedin')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setFull_name(data.full_name || '');
      setEmail(data.email || '');
      setBio(data.bio || '');
      setLinkedin(data.linkedin || '');
    } catch (error: any) {
      console.error('Error al cargar el perfil:', error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name, email, bio, linkedin })
        .eq('id', user?.id);

      if (error) throw error;

      alert('Perfil actualizado con éxito');
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error.message);
      alert('Error al actualizar el perfil');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Mi Perfil</h1>
            <p className="text-gray-600">Administra tu información personal</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2">
                Biografía
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                rows={4}
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2">
                Perfil de LinkedIn
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="https://www.linkedin.com/in/tu-perfil"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
