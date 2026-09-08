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

  // LÓGICA DEL PROFESOR / INSTRUCTOR (Sin alterar)
  const handleCrearTarea = (e) => {
    e.preventDefault();
    if (!nuevaTarea.trim()) return;
    setActividades([
      ...actividades, 
      { id: Date.now(), titulo: nuevaTarea, fecha: '2026-09-20', estado: 'Asignada' }
    ]);
    setNuevaTarea('');
  };

  const handleEliminarActividad = (id) => {
    if (window.confirm('¿Deseas eliminar esta actividad?')) {
      setActividades(actividades.filter((act) => act.id !== id));
    }
  };

  // -----------------------------------------------------------------
  // LÓGICA EXCLUSIVA DEL APRENDIZ (Adjuntar Entrega)
  // -----------------------------------------------------------------
  const handleAdjuntarArchivo = (idActividad, event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      setActividades((prevActividades) =>
        prevActividades.map((act) =>
          act.id === idActividad
            ? { ...act, estado: 'Entregado', archivoAdjunto: archivo.name }
            : act
        )
      );
      alert(`¡Archivo "${archivo.name}" entregado con éxito!`);
    }
  };

  return (
    <div style={styles.card}>
      <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>

      <h2 style={styles.title}>📝 {esInstructor ? 'Gestión de Actividades' : 'Mis Actividades'}</h2>

      {/* FORMULARIO DEL PROFESOR */}
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

      {/* LISTA DE ACTIVIDADES */}
      <div style={styles.list}>
        {actividades.map((act) => (
          <div key={act.id} style={styles.item}>
            <div>
              <strong>{act.titulo}</strong>
              <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Fecha límite: {act.fecha}</p>
              
              {/* Muestra el nombre del archivo si el Aprendiz ya adjuntó una entrega */}
              {!esInstructor && act.archivoAdjunto && (
                <p style={{ margin: '4px 0 0 0', color: '#38a169', fontSize: '12px', fontWeight: 'bold' }}>
                  📎 Archivo entregado: {act.archivoAdjunto}
                </p>
              )}
            </div>

            <div style={styles.accionesContainer}>
              {esInstructor ? (
                /* VISTA DEL INSTRUCTOR */
                <>
                  <span style={styles.badge}>{act.estado}</span>
                  <button 
                    style={styles.btnEliminar} 
                    onClick={() => handleEliminarActividad(act.id)}
                    title="Eliminar actividad"
                  >
                    🗑️ Eliminar
                  </button>
                </>
              ) : (
                /* VISTA DEL APRENDIZ (Botonera de entrega con input file oculto) */
                <label style={styles.btnEntregar}>
                  {act.archivoAdjunto ? 'Reemplazar Entrega' : 'Adjuntar Entrega'}
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleAdjuntarArchivo(act.id, e)}
                  />
                </label>
              )}
            </div>
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
  btn: { background: '#667eea', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '10px' },
  accionesContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  badge: { background: '#764ba2', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '500' },
  btnEntregar: { background: '#48bb78', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'inline-block' },
  btnEliminar: { background: '#e53e3e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }
};