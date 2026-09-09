import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import fondoSede from '../../assets/sede.jpg'; // Ruta a la imagen de la sede

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const data = await login(credentials);

      // Limpia la sesión anterior antes de guardar los nuevos datos
      localStorage.clear();

      // Guardar información retornada por el servidor
      if (data.token) localStorage.setItem('token', data.token);
      
      const idUsuario = data.id_usuario || data.id;
      if (idUsuario) {
        localStorage.setItem('id_usuario', idUsuario);
      }

      const nombreCompleto = data.nombres && data.apellidos 
        ? `${data.nombres} ${data.apellidos}`.trim() 
        : data.usuario || credentials.username;

      localStorage.setItem('usuario', nombreCompleto);

      if (data.rol) {
        localStorage.setItem('rol', data.rol);
      }

      // Redirigir al panel principal
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Credenciales inválidas. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ ...styles.body, backgroundImage: `url(${fondoSede})` }}>
      {/* Capa de contraste y desenfoque suave para enfocar el edificio de fondo */}
      <div style={styles.overlay}>
        <div style={styles.card}>
          <div style={styles.iconHeader}>🎓</div>
          <h2 style={styles.title}>SIRA</h2>
          <p style={styles.subtitle}>Ingresa tus credenciales para continuar</p>
          
          {errorMsg && <div style={styles.errorAlert}>{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Usuario</label>
              <input
                type="text"
                name="username"
                style={styles.input}
                placeholder="Ej. Aprendiz"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Contraseña</label>
              <input
                type="password"
                name="password"
                style={styles.input}
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
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
    backgroundPosition: 'center 55%',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflow: 'hidden'
  },
  overlay: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.93)',
    padding: '40px 32px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    // Garantiza que la tarjeta reciba clics de los inputs
    position: 'relative',
    zIndex: 5,
    pointerEvents: 'auto'
  },
  iconHeader: {
    width: '65px',
    height: '65px',
    margin: '0 auto 15px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    boxShadow: '0 6px 15px rgba(102, 126, 234, 0.4)'
  },
  title: {
    color: '#1e293b',
    fontSize: '26px',
    fontWeight: '800',
    marginBottom: '5px'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '25px'
  },
  errorAlert: {
    backgroundColor: '#ffe6e6',
    color: '#d93025',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '18px',
    border: '1px solid #ffcccc'
  },
  inputGroup: {
    textAlign: 'left',
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#334155',
    marginBottom: '6px',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    background: '#ffffff',
    color: '#0f172a', // Asegura que el texto que escribes sea totalmente visible
    position: 'relative',
    zIndex: 10,
    pointerEvents: 'auto'
  },
  button: {
    width: '100%',
    padding: '13px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 8px 18px rgba(118, 75, 162, 0.35)'
  }
};