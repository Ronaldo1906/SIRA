import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem('id_usuario');

  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // 1. Validar si el usuario está autenticado
    if (!idUsuario) {
      navigate('/login');
      return;
    }

    // 2. Realizar la petición si existe idUsuario
    fetch(`http://localhost:8000/usuarios/${idUsuario}/perfil`)
      .then((res) => res.json())
      .then((data) => {
        setPerfil(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar perfil:", err);
        setCargando(false);
      });
  }, [idUsuario, navigate]);

  return (
    <div style={styles.container}>
      <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>

      <div style={styles.card}>
        <h2>👤 Perfil del Usuario</h2>
        {cargando ? (
          <p>Cargando información del servidor...</p>
        ) : perfil ? (
          <div style={styles.infoGrid}>
            <div style={styles.infoGroup}>
              <label style={styles.label}>Nombres y Apellidos:</label>
              <p style={styles.val}>{perfil.nombres} {perfil.apellidos}</p>
            </div>
            <div style={styles.infoGroup}>
              <label style={styles.label}>Correo Electrónico:</label>
              <p style={styles.val}>{perfil.email}</p>
            </div>
            <div style={styles.infoGroup}>
              <label style={styles.label}>Rol asignado:</label>
              <span style={styles.badge}>{perfil.rol}</span>
            </div>
            {perfil.id_ficha && (
              <div style={styles.infoGroup}>
                <label style={styles.label}>Número de Ficha:</label>
                <p style={styles.val}>{perfil.id_ficha}</p>
              </div>
            )}
            <div style={styles.infoGroup}>
              <label style={styles.label}>Teléfono de Contacto:</label>
              <p style={styles.val}>{perfil.tel_aprendiz || perfil.tel_instructor || 'No registrado'}</p>
            </div>
          </div>
        ) : (
          <p>No se pudo obtener la información.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: "'Segoe UI', sans-serif" },
  btnVolver: { background: '#667eea', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
  card: { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.08)' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' },
  infoGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { color: '#888', fontSize: '13px', fontWeight: '600' },
  val: { fontSize: '16px', color: '#333', margin: 0, fontWeight: '500' },
  badge: { background: '#764ba2', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', width: 'fit-content', fontWeight: 'bold' }
};