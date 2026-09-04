import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Vistas existentes
import Dashboard from '../views/Dashboard/Dashboard';
import Login from '../views/login/Login';

// Nuevas vistas agregadas
import Perfil from '../views/Perfil/Perfil';
import Actividades from '../views/Actividades/Actividades';
import MaterialAcademico from '../views/Material/MaterialAcademico';
import Reportes from '../views/Reportes/Reportes';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz: redirige automáticamente a /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rutas principales */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rutas de las tarjetas del Dashboard */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/actividades" element={<Actividades />} />
        <Route path="/material" element={<MaterialAcademico />} />
        <Route path="/reportes" element={<Reportes />} />
        
        {/* Ruta comodín: redirige cualquier URL no existente a /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;