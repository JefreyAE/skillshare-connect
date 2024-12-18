'use client';
import { useState } from 'react';
import { supabase } from '../../../services/supabase';
import { useAuth } from '../../../context/AuthContext';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Limpiar mensaje previo

    try {
      // Registro del usuario en Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Guardar perfil en la base de datos
      console.log(data.user?.id);

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user?.id, email: data.user?.email }]);

      if (profileError) throw profileError;

      setMessage('Cuenta creada con éxito. Verifica tu correo.');
    } catch (error: any) {
      const errorMessage = error?.message || 'Ocurrió un error desconocido';
      setMessage(`Error: ${errorMessage}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Crear una cuenta</h1>

        <label className="block mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
}
