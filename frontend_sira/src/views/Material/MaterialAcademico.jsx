import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActividadesDB } from '../../services/api'; // Ajusta la ruta según tu estructura

export default function MaterialAcademico() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol') || 'INSTRUCTOR';
  const esInstructor = rol === 'INSTRUCTOR';

  const materiasBase = [
    'Análisis y Desarrollo de Software',
    'Base de Datos MySQL'
  ];

  const [opcionesSelect, setOpcionesSelect] = useState(materiasBase);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(materiasBase[0]);
  const [nuevoArchivo, setNuevoArchivo] = useState(null);

  const [materiales, setMateriales] = useState([
    { id: 1, materia: 'Análisis y Desarrollo de Software', recurso: 'Guía_FastAPI_SQLAlchemy.pdf' },
    { id: 2, materia: 'Base de Datos MySQL', recurso: 'Modelo_Relacional_SIRA.sql' }
  ]);

  // CARGAR ACTIVIDADES DESDE LA BASE DE DATOS (API FASTAPI)
  useEffect(() => {
    const cargarActividadesDesdeBD = async () => {
      const actividadesBD = await getActividadesDB();
      
      if (actividadesBD && actividadesBD.length > 0) {
        // Extraer los títulos de las actividades registradas en MySQL
        const titulosBD = actividadesBD.map((act) => act.titulo.trim());

        // Combinar con las materias base sin duplicados
        const listaCombinada = Array.from(new Set([...materiasBase, ...titulosBD]));
        setOpcionesSelect(listaCombinada);
      }
    };

    cargarActividadesDesdeBD();
  }, []);

  const handleSubirRecurso = (e) => {
    e.preventDefault();
    if (!nuevoArchivo) return;

    const nuevoMaterial = {
      id: Date.now(),
      materia: materiaSeleccionada,
      recurso: nuevoArchivo.name
    };

    setMateriales([...materiales, nuevoMaterial]);
    setNuevoArchivo(null);
    e.target.reset();
  };

  const handleEliminarMaterial = (id) => {
    if (window.confirm('¿Deseas eliminar este recurso del material académico?')) {
      setMateriales(materiales.filter((m) => m.id !== id));
    }
  };

  const handleDescargar = (nombreArchivo) => {
    const element = document.createElement('a');
    const file = new Blob([`Contenido del recurso: ${nombreArchivo}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = nombreArchivo;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={styles.card}>
      <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>

      <h2 style={styles.title}>📚 Material Académico</h2>

      {esInstructor && (
        <form onSubmit={handleSubirRecurso} style={styles.uploadSection}>
          <h4 style={{ margin: '0 0 10px 0', color: '#4a5568' }}>Subir nuevo recurso</h4>
          <div style={styles.uploadFormGroup}>
            <select 
              value={materiaSeleccionada} 
              onChange={(e) => setMateriaSeleccionada(e.target.value)}
              style={styles.select}
            >
              {opcionesSelect.map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
            <input 
              type="file" 
              onChange={(e) => setNuevoArchivo(e.target.files[0])} 
              required 
              style={styles.fileInput}
            />
            <button type="submit" style={styles.btn}>Subir Recurso</button>
          </div>
        </form>
      )}

      <div style={styles.grid}>
        {materiales.map((m) => (
          <div key={m.id} style={styles.materialCard}>
            <h3 style={styles.materiaTitle}>{m.materia}</h3>
            <p style={styles.recursoName}>📄 {m.recurso}</p>
            <div style={styles.actionsGroup}>
              <button 
                style={styles.btnDownload} 
                onClick={() => handleDescargar(m.recurso)}
              >
                Descargar
              </button>
              {esInstructor && (
                <button 
                  style={styles.btnEliminar} 
                  onClick={() => handleEliminarMaterial(m.id)}
                  title="Eliminar recurso"
                >
                  🗑️
                </button>
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
  uploadSection: { padding: '20px', background: '#f0f4ff', borderRadius: '10px', marginBottom: '25px', border: '1px solid #d6e4ff' },
  uploadFormGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' },
  select: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', background: 'white' },
  fileInput: { padding: '5px' },
  btn: { background: '#667eea', color: 'white', border: 'none', padding: '9px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  materialCard: { padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px', textAlign: 'center', background: '#fafafa' },
  materiaTitle: { fontSize: '18px', color: '#2d3748', marginBottom: '10px' },
  recursoName: { color: '#4a5568', fontSize: '14px', marginBottom: '15px' },
  actionsGroup: { display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' },
  btnDownload: { background: '#764ba2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnEliminar: { background: '#e53e3e', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};