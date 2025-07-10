import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = e.target.email.value;
    const pass = e.target.password.value;
    if (user === "admin@globseg.cl" && pass === "Colina1468") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="flex h-screen justify-center items-center bg-gray-100">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-80 space-y-4">
            <h2 className="text-xl font-bold text-center">Login GlobSeg</h2>
            <input name="email" type="email" placeholder="Correo" className="w-full border p-2 rounded" required />
            <input name="password" type="password" placeholder="Contraseña" className="w-full border p-2 rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Ingresar</button>
          </form>
        </div>
      } />
      {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
    </Routes>
  );
}