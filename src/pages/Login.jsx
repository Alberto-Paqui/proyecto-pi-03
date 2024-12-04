import { useEffect, useState } from "react";
import { supabase } from "../Supabase/client";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // Controla si el correo fue enviado
  const [errorMessage, setErrorMessage] = useState(null); // Para mostrar errores
  const navigate = useNavigate();

  const onChange = ({ target }) => {
    setEmail(target.value);
    setErrorMessage(null); // Limpia mensajes de error al modificar el campo
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "http://localhost:5173/",
        },
      });

      if (error) {
        console.error("Error al enviar el enlace de inicio de sesión:", error.message);
        setErrorMessage("Hubo un problema al enviar el correo. Inténtalo nuevamente.");
      } else {
        setSubmitted(true);
        console.log("Enlace de inicio de sesión enviado correctamente");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setErrorMessage("Ocurrió un error inesperado. Inténtalo más tarde.");
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al verificar la sesión:", error.message);
        return;
      }

      if (data.session) {
        navigate("/"); // Si hay una sesión activa, redirigir a Home
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!submitted ? (
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
        >
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Iniciar Sesión
          </h1>
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your-name@site.com"
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            ¡Correo enviado!
          </h2>
          <p className="text-sm text-gray-600">
            Hemos enviado un enlace de inicio de sesión a <strong>{email}</strong>. 
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Enviar otro correo
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
