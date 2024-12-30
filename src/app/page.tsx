import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-500 to-blue-600 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl"></div>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl text-center p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
            Bienvenido a <span className="text-green-600">SkillShare Connect</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Únete a una comunidad de profesionales para compartir tus habilidades, 
            conectar con otros expertos y aprender cosas nuevas.
          </p>
          <p className="text-sm text-gray-500 mb-8 italic">
            "El conocimiento crece cuando se comparte."
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <p className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                Iniciar Sesión
              </p>
            </Link>
            <Link href="/signup">
              <p className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                Registrarse
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
