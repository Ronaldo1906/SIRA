import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Actividades() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol') || 'APRENDIZ';
  const esInstructor = rol === 'INSTRUCTOR';

  const [actividades, setActividades] = useState([
    { id: 1, titulo: 'Taller de FastAPI y Pydantic', fecha: '2026-09-10', estado: 'Pendiente' },
    { id: 2, titulo: 'Diagrama Entidad Relación', fecha: '2026-09-15', estado: 'Entregado' }
  ]);

  const [nuevaTarea, setNuevaTarea] = useState('');

  const handleCrearTarea = (e) => {
    e.preventDefault();
    setActividades([...actividades, { id: Date.now(), titulo: nuevaTarea, fecha: '2026-09-20', estado: 'Asignada' }]);
    setNuevaTarea('');
  };

  return (
    <div style={styles.card}>
            
            <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
        </button>
        
        <h2 style={styles.title}>📝 {esInstructor ? 'Gestión de Actividades' : 'Mis Actividades'}</h2>

        {esInstructor ? (
            <form onSubmit={handleCrearTarea} style={styles.form}>
            <input
                type="text"
                placeholder="Título de la nueva actividad"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                required
                style={styles.input}
            />
            <button type="submit" style={styles.btn}>Crear Actividad</button>
            </form>
        ) : null}

        <div style={styles.list}>
            {actividades.map((act) => (
            <div key={act.id} style={styles.item}>
                <div>
                <strong>{act.titulo}</strong>
                <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Fecha límite: {act.fecha}</p>
                </div>
                {esInstructor ? (
                <span style={styles.badge}>{act.estado}</span>
                ) : (
                <button style={styles.btnEntregar}>Adjuntar Entrega</button>
                )}
            </div>
            ))}
        </div>
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  btnVolver: { background: '#667eea', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
  title: { color: '#667eea', marginBottom: '20px' },
  form: { display: 'flex', gap: '10px', marginBottom: '25px' },
  input: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' },
  btn: { background: '#667eea', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px' },
  badge: { background: '#764ba2', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' },
  btnEntregar: { background: '#48bb78', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }
};