import { useState } from "react";
const API_URL = "http://localhost:5107";

function getBearerToken(rawToken) {
  if (!rawToken) {
    return "";
  }

  return rawToken.startsWith("Bearer ") ? rawToken : `Bearer ${rawToken}`;
}

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("apiToken") ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/Login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Usuario o contrasena incorrecta");
      }

      const data = await response.json();
      const bearerToken = getBearerToken(data.token ?? data.Token);

      const validationResponse = await fetch(`${API_URL}/Login/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: bearerToken,
        }),
      });

      if (!validationResponse.ok) {
        throw new Error("El token recibido no pudo validarse.");
      }

      localStorage.setItem("apiToken", bearerToken);
      localStorage.setItem("loginUsername", username);
      setToken(bearerToken);

      try {
        await navigator.clipboard.writeText(bearerToken);
        setMessage("Inicio de sesión correcto. Redirigiendo...");
      } catch {
        setMessage("Inicio de sesión correcto. Redirigiendo...");
      }

      window.location.href = "/users/Dashboard";
      return;
    } catch (error) {
      localStorage.removeItem("apiToken");
      setToken("");
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("apiToken");
    localStorage.removeItem("loginUsername");
    setToken("");
    setMessage("Sesion cerrada.");
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900">
      <form
        className="mx-auto w-full max-w-sm space-y-4 border border-slate-300 p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold">Iniciar sesion</h1>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Usuario</span>
          <input
            className="w-full border border-slate-300 px-3 py-2 outline-none focus:border-slate-700"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium">Contrasena</span>
          <input
            className="w-full border border-slate-300 px-3 py-2 outline-none focus:border-slate-700"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button
          className="w-full bg-slate-900 px-3 py-2 font-medium text-white disabled:bg-slate-400"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        {message ? <p className="text-sm">{message}</p> : null}

        {token ? (
          <div className="space-y-3 border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-700">
              Token Bearer guardado y copiado. Pegalo en Authorization.
            </p>

            <textarea
              className="h-28 w-full resize-none border border-slate-300 p-3 text-xs outline-none focus:border-slate-700"
              value={token}
              readOnly
              onFocus={(event) => event.target.select()}
            />

            <button
              className="w-full bg-slate-900 px-3 py-2 font-medium text-white"
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:5107/swagger/index.html";
              }}
            >
              Abrir API
            </button>

            <button
              className="w-full border border-slate-300 px-3 py-2 font-medium text-slate-700"
              type="button"
              onClick={logout}
            >
              Cerrar sesion
            </button>
          </div>
        ) : null}
      </form>
    </main>
  );
}

export default App;
