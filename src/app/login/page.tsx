'use client';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/globals.css';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Limpiar el mensaje de error previo

    try {
      await login(email, password);
      setMessage('¡Inicio de sesión exitoso!');
      router.push('./dashboard');
    } catch (error: any) {
      // Si el error tiene una propiedad 'message', la usamos. Si no, mostramos un mensaje genérico.
      const errorMessage = error?.message || 'Ocurrió un error desconocido';
      setMessage(`Error: ${errorMessage}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Iniciar sesión</h1>

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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Entrar'}
        </button>

        {/* Mostrar el mensaje de error si existe */}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
}
