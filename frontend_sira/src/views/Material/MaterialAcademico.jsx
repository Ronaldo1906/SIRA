import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MaterialAcademico() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol') || 'APRENDIZ';
  const esInstructor = rol === 'INSTRUCTOR';

  const materiales = [
    { id: 1, materia: 'Análisis y Desarrollo de Software', recurso: 'Guía_FastAPI_SQLAlchemy.pdf' },
    { id: 2, materia: 'Base de Datos MySQL', recurso: 'Modelo_Relacional_SIRA.sql' }
  ];

  return (
    <div style={styles.card}>
        <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>
      <h2 style={styles.title}>📚 Material Académico</h2>

      {esInstructor && (
        <div style={styles.uploadSection}>
          <input type="file" style={{ marginBottom: '10px' }} />
          <button style={styles.btn}>Subir Recurso a la Ficha</button>
        </div>
      )}

      <div style={styles.grid}>
        {materiales.map((m) => (
          <div key={m.id} style={styles.materialCard}>
            <h3>{m.materia}</h3>
            <p>📄 {m.recurso}</p>
            <button style={styles.btnDownload}>Descargar</button>
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
  uploadSection: { padding: '15px', background: '#f0f4ff', borderRadius: '10px', marginBottom: '20px' },
  btn: { background: '#667eea', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  materialCard: { padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px', textAlign: 'center' },
  btnDownload: { background: '#764ba2', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px' }
};