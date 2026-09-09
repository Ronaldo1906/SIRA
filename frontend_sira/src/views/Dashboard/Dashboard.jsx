import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoAuditorio from "../../assets/auditorio.jpg";

export default function Dashboard() {
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem('id_usuario') || 1;
  const [datosPerfil, setDatosPerfil] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/usuarios/${idUsuario}/perfil`)
      .then((res) => res.json())
      .then((data) => setDatosPerfil(data))
      .catch((err) => console.error("Error al cargar datos del usuario:", err));
  }, [idUsuario]);

  // Construcción dinámica de nombre, iniciales y rol desde la base de datos
  const nombreCompleto = datosPerfil
    ? `${datosPerfil.nombres} ${datosPerfil.apellidos}`
    : 'Cargando...';

  const iniciales = datosPerfil
    ? `${datosPerfil.nombres[0] || ''}${datosPerfil.apellidos[0] || ''}`.toUpperCase()
    : '..';

  const rolUsuario = datosPerfil ? datosPerfil.rol : 'Aprendiz';

  const handleLogout = () => {
    if (window.confirm('¿Seguro que quieres cerrar sesión?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const menuItems = [
    { icon: '👤', title: 'Perfil', desc: 'Ver y editar tu información personal y contraseña', path: '/perfil' },
    { icon: '📝', title: 'Actividades', desc: 'Revisa tareas, evaluaciones y fechas de entrega', path: '/actividades' },
    { icon: '📚', title: 'Material Académico', desc: 'Descarga guías, videos y recursos de tus cursos', path: '/material' },
    { icon: '📊', title: 'Reportes', desc: 'Consulta tus calificaciones y progreso académico', path: '/reportes' }
  ];

  return (
    <div style={{ ...styles.body, backgroundImage: `url(${fondoAuditorio})` }}>
      {/* Capa de oscurecimiento suave para dar legibilidad a los textos sobre la imagen */}
      <div style={styles.overlay}>
        
        {/* Navbar */}
        <nav style={styles.navbar}>
          <h1 style={styles.logo}>🎓 Sistema Académico</h1>
          <div style={styles.userInfo}>
            <span>{nombreCompleto}</span>
            <div style={styles.avatar}>{iniciales}</div>
            <button style={styles.btnLogout} onClick={handleLogout}>Salir</button>
          </div>
        </nav>

        {/* Contenido Principal */}
        <div style={styles.container}>
          <div style={styles.welcome}>
            <h2>Bienvenido, {rolUsuario}</h2>
            <p>Selecciona una opción para continuar</p>
          </div>

          <div style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                style={styles.card} 
                onClick={() => navigate(item.path)}
              >
                <div style={styles.cardIcon}>{item.icon}</div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <footer style={styles.footer}>
          © 2026 Sistema de Aprendizaje Virtual | SENA Bogotá
        </footer>

      </div>
    </div>
  );
}

const styles = {
  body: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  overlay: {
    minHeight: '100vh',
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // Oscurecimiento sutil
    backdropFilter: 'blur(2px)', // Desenfoque suave al fondo
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between'
  },
  navbar: {
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  logo: {
    fontSize: '20px',
    margin: 0,
    fontWeight: '700'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'white',
    color: '#667eea',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  btnLogout: {
    background: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    padding: '8px 15px',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  container: {
    maxWidth: '1100px',
    margin: '40px auto',
    padding: '0 20px',
    width: '100%'
  },
  welcome: {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.94)',
    padding: '35px 25px',
    borderRadius: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(0,0,0,0.18)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  cardIcon: {
    width: '70px',
    height: '70px',
    margin: '0 auto 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    fontSize: '35px',
    boxShadow: '0 6px 15px rgba(102, 126, 234, 0.35)'
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: '20px',
    marginBottom: '10px',
    fontWeight: '700'
  },
  cardDesc: {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0
  },
  footer: {
    textAlign: 'center',
    padding: '25px 20px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)'
  }
};