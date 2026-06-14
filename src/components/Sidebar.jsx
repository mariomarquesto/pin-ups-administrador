import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaBox, 
  FaPlus, 
  FaChartLine, 
  FaShoppingCart,
  FaSignOutAlt
} from 'react-icons/fa';

function Sidebar({ isOpen, setIsOpen }) {
  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/login';
  };

  const menuItems = [
    { path: '/', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/products', icon: <FaBox />, label: 'Productos' },
    { path: '/add-product', icon: <FaPlus />, label: 'Agregar Producto' },
    { path: '/sales', icon: <FaChartLine />, label: 'Ganancias' },
    { path: '/orders', icon: <FaShoppingCart />, label: 'Pedidos' },
  ];

  return (
    <div style={{
      width: isOpen ? '260px' : '70px',
      backgroundColor: '#212529',  // Negro/gris oscuro elegante
      color: '#ffffff',
      transition: 'all 0.3s ease',
      position: 'fixed',
      height: '100vh',
      overflow: 'hidden',
      zIndex: 1000
    }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #495057' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '20px'
          }}
        >
          ☰
        </button>
        {isOpen && (
          <h2 style={{ marginTop: '15px', fontSize: '20px', color: '#f85606' }}>
            Pin-Ups Admin
          </h2>
        )}
      </div>
      
      <nav style={{ padding: '20px 0' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              fontSize: isOpen ? '14px' : '18px',
              justifyContent: isOpen ? 'flex-start' : 'center',
              backgroundColor: isActive ? '#f85606' : 'transparent',
              borderLeft: isActive ? '3px solid #f85606' : 'none'
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.style.backgroundColor.includes('#f85606')) {
                e.currentTarget.style.backgroundColor = '#343a40';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
        
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            color: '#ffffff',
            background: 'none',
            border: 'none',
            width: '100%',
            cursor: 'pointer',
            fontSize: isOpen ? '14px' : '18px',
            justifyContent: isOpen ? 'flex-start' : 'center',
            marginTop: '40px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343a40'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FaSignOutAlt />
          {isOpen && <span>Cerrar Sesión</span>}
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;