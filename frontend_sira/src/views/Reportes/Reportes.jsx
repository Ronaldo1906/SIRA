import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reportes() {
  const navigate = useNavigate();
  const rol = localStorage.getItem('rol') || 'APRENDIZ';
  const esInstructor = rol === 'INSTRUCTOR';

  return (
    <div style={styles.card}>
        <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>
      <h2 style={styles.title}>📊 Reportes y Calificaciones</h2>

      {esInstructor ? (
        <table style={styles.table}>
          <thead>
            <tr style={styles.th}>
              <th>Aprendiz</th>
              <th>Actividad</th>
              <th>Nota (0-5)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ronaldo Meza</td>
              <td>API REST FastAPI</td>
              <td>5.0</td>
              <td><button style={styles.btnEdit}>Editar</button></td>
            </tr>
            <tr>
              <td>Valentina Contreras</td>
              <td>Modelado MySQL</td>
              <td>4.8</td>
              <td><button style={styles.btnEdit}>Editar</button></td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div style={styles.reporteAprendiz}>
          <div style={styles.scoreCard}>
            <h3>Promedio General</h3>
            <span style={styles.score}>4.9 / 5.0</span>
          </div>
          <p><strong>Estado Académico:</strong> Aprobado</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  btnVolver: { background: '#667eea', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
  title: { color: '#667eea', marginBottom: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { background: '#f8f9fa', textAlign: 'left', padding: '12px' },
  btnEdit: { background: '#667eea', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  reporteAprendiz: { textAlign: 'center', padding: '20px' },
  scoreCard: { background: '#f0f4ff', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '15px' },
  score: { fontSize: '32px', fontWeight: 'bold', color: '#764ba2' }
};