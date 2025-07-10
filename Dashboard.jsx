import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldCheck, MapPin, Users } from 'lucide-react';

const API_URL = "https://script.google.com/macros/s/AKfycby2Fdaa6B5-phXj0G1lJdXHD4m5dDNTtFDIdlH1H0rBVrGdt6ndOIOIvcmI2_8yNHFQ/exec";

export default function Dashboard() {
  const [rondas, setRondas] = useState([]);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const datosRondas = data.Dashboard?.map(d => ({
          name: d.Día,
          rondas: Number(d.Total),
        })) || [];

        const datosReportes = data.UltimosReportes || [];
        setRondas(datosRondas);
        setReportes(datosReportes);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">GlobSeg</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <ShieldCheck className="w-5 h-5" /> <span>Rondas</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <Users className="w-5 h-5" /> <span>Patrulleros</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <MapPin className="w-5 h-5" /> <span>Mapa</span>
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Resumen General</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500">Rondas activas</p>
            <h3 className="text-2xl font-bold">{rondas.reduce((acc, r) => acc + r.rondas, 0)}</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500">Patrulleros activos</p>
            <h3 className="text-2xl font-bold">5</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-gray-500">Zonas cubiertas</p>
            <h3 className="text-2xl font-bold">8</h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Rondas por día</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rondas}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rondas" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Últimos Reportes</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="text-gray-500 p-2">Fecha</th>
                <th className="text-gray-500 p-2">Patrullero</th>
                <th className="text-gray-500 p-2">Zona</th>
                <th className="text-gray-500 p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{r.Fecha}</td>
                  <td className="p-2">{r.Patrullero}</td>
                  <td className="p-2">{r.Zona}</td>
                  <td className={`p-2 ${r.Estado === "Finalizado" ? "text-green-600" : "text-yellow-600"}`}>
                    {r.Estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}