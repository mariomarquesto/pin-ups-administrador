import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      localStorage.setItem('adminAuth', 'true');
      navigate('/');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDF8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #E8DCD0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{ color: '#2C1810', textAlign: 'center', marginBottom: '10px' }}>
          Pin-Ups Admin
        </h1>
        <p style={{ color: '#B45F2B', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
          Panel de Administración
        </p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-input"
            style={{ marginBottom: '20px' }}
          />
          {error && (
            <p style={{ color: '#D9534F', fontSize: '12px', marginBottom: '15px', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            className="admin-btn-primary"
            style={{ width: '100%' }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;