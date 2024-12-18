
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Bienvenido a SkillShare Connect
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Conéctate con profesionales, comparte tus habilidades y aprende nuevas competencias.
          </p>

          <div className="space-x-4">
            <Link href="/login">
              <p className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Iniciar Sesión
              </p>
            </Link>
            <Link href="/signup">
              <p className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Registrarse
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
