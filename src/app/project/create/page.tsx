"use client";
import { useState } from "react";
import { supabase } from "../../../../services/supabase";
import Navbar from "../../../../components/Navbar";
import { useAuth } from "../../../../context/AuthContext";

export default function AddProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const handleFileChange = (event: any) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const profileId = user?.id; // ID del usuario autenticado
      let imageUrl = "";

      // Subir la imagen
      if (image) {
        const { data, error } = await supabase.storage
          .from("projects") // El nombre del bucket donde guardas las imágenes
          .upload(`images/${Date.now()}-${image.name}`, image);

        if (error) throw error;
        imageUrl = data.path; // Obtenemos la URL de la imagen
      }

      // Insertar los datos del proyecto en la base de datos
      const { error: insertError } = await supabase
        .from("projects") // Nombre de la tabla
        .insert([{ name: projectName, description, image_url: imageUrl, profile_id: profileId }]);

      if (insertError) throw insertError;

      alert("Project added successfully!");
      setProjectName("");
      setDescription("");
      setImage(null);
    } catch (error: any) {
      console.error("Error adding project:", error.message);
      alert("Failed to add project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
        {/* Encabezado */}
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Add a New Project
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-semibold text-gray-700"
            >
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="projectImage"
              className="block text-sm font-semibold text-gray-700"
            >
              Project Image
            </label>
            <input
              id="projectImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-indigo-50 file:text-indigo-700 file:hover:bg-indigo-100"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
