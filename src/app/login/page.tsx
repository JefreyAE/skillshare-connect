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
    setMessage('');

    try {
      await login(email, password);
      setMessage('¡Inicio de sesión exitoso!');
      router.push('./dashboard');
    } catch (error: any) {
      const errorMessage = error?.message || 'Ocurrió un error desconocido';
      setMessage(`Error: ${errorMessage}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-500 to-blue-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Bienvenido
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Inicia sesión para continuar
        </p>

        {message && (
          <div
            className={`p-3 mb-4 text-center rounded ${
              message.includes('Error')
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {message}
          </div>
        )}

        <label className="block text-gray-700 font-medium mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          required
        />

        <label className="block text-gray-700 font-medium mb-2">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
          required
        />

        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white font-bold ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } transition duration-300`}
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
