import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoSede from '../../assets/sira.jpg'; // Importación de la imagen de la sede

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
    <div style={{ ...styles.body, backgroundImage: `url(${fondoSede})` }}>
      {/* Capa de contraste con desenfoque suave sobre la foto */}
      <div style={styles.overlay}>
        <div style={styles.contentWrapper}>
          <button style={styles.btnVolver} onClick={() => navigate('/dashboard')}>
            ← Volver al Dashboard
          </button>

          <div style={styles.card}>
            <h2 style={styles.title}>👤 Perfil del Usuario</h2>
            
            {cargando ? (
              <p style={styles.loadingText}>Cargando información del servidor...</p>
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
              <p style={styles.errorText}>No se pudo obtener la información del perfil.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center 35%', // Encuadre alineado a la arquitectura de la sede
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: 'hidden'
  },
  overlay: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // Oscurecimiento equilibrado
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '750px'
  },
  btnVolver: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 22px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s ease',
    display: 'inline-block'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.65)', // Tarjeta cristalina limpia
    padding: '35px 30px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255, 255, 255, 0.6)'
  },
  title: {
    color: '#1e293b',
    fontSize: '24px',
    fontWeight: '800',
    marginTop: 0,
    marginBottom: '25px',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '12px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '22px'
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    color: '#64748b',
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  val: {
    fontSize: '16px',
    color: '#0f172a',
    margin: 0,
    fontWeight: '600',
    wordBreak: 'break-word'
  },
  badge: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    width: 'fit-content',
    fontWeight: '700',
    boxShadow: '0 4px 10px rgba(118, 75, 162, 0.3)'
  },
  loadingText: {
    color: '#475569',
    fontSize: '15px',
    fontWeight: '500'
  },
  errorText: {
    color: '#e11d48',
    fontSize: '15px',
    fontWeight: '500'
  }
};