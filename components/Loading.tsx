export default function Loading() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          {/* Spinner Principal */}
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* Spinner Secundario */}
          <div className="absolute inset-1 border-4 border-gray-300 border-b-transparent rounded-full animate-spin-slower"></div>
        </div>
        <p className="text-blue-600 font-semibold mt-4">Cargando, por favor espera...</p>
      </div>
    );
  }
  