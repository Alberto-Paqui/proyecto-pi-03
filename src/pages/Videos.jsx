import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  "https://kvmqjolhevkpylaulbfo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bXFqb2xoZXZrcHlsYXVsYmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNzc4MDgsImV4cCI6MjA0Njk1MzgwOH0.k-A7ZYARLqrR5TKcF8Fa-B8p8gTIT_Sz1bAJsyqwdls"
);

const CDNURL = "https://kvmqjolhevkpylaulbfo.supabase.co/storage/v1/object/public/videos/";

function Videos() {
  const [videos, setVideos] = useState([]); // [video1, video2, video3]
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  async function getVideos() {
    const { data, error } = await supabase.storage.from('videos').list('');
    if (data !== null) {
      setVideos(data);
    } else {
      console.log(error);
      alert("Error grabbing files from Supabase");
    }
  }

  useEffect(() => {
    getVideos();
  }, []);

  async function uploadFile(e) {
    const videoFile = e.target.files[0];
    console.log("Upload!");

    const { error } = await supabase.storage
      .from('videos')
      .upload(uuidv4() + ".mp4", videoFile);

    if (error) {
      console.log(error);
      alert("Error uploading file to Supabase");
    }

    getVideos();
  }

  const filteredVideos = videos.filter(video =>
    video.name !== ".emptyFolderPlaceholder" && // Excluir archivo placeholder
    (searchQuery === '' || video.name === searchQuery)
  );

  return (
    <div className="mt-5 mx-auto p-8 bg-gradient-to-br from-indigo-50 to-green-50 shadow-xl rounded-2xl" style={{ maxWidth: "900px" }}>
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
        🎥 Transmisión de Video
      </h1>
  
      {/* Menú desplegable para seleccionar videos */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2">
          Buscar cursos:
        </label>
        <select
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:shadow-md transition-shadow"
        >
          <option value="">Todos los Videos</option>
          {videos
            .filter((video) => video.name !== ".emptyFolderPlaceholder")
            .map((video) => (
              <option key={video.name} value={video.name}>
                {video.name}
              </option>
            ))}
        </select>
      </div>
  
      {/* Subir video */}
      <div className="mb-8">
        <label className="block text-base font-semibold text-gray-800 mb-2">
          Subir video:
        </label>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => uploadFile(e)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:shadow-md transition-shadow"
        />
      </div>
  
      {/* Renderizar videos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video.name}
              className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300"
            >
              <video
                controls
                className="w-full h-40 object-cover"
              >
                <source src={CDNURL + video.name} type="video/mp4" />
              </video>
              {/* Nombre del video */}
              <p className="mt-2 text-center text-sm font-medium text-gray-700 truncate px-3 py-2 bg-gray-100">
                {video.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No se encontraron videos.
          </p>
        )}
      </div>
    </div>
  );
  
  
}

export default Videos;

